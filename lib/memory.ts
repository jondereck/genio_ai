import { Redis } from "@upstash/redis";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";

// Custom type for the 'alterKey' object
export type AlterKey = {
  alterName: string;
  modelName: string;
  userId: string;
};

// MemoryManager class definition
export class MemoryManager {
  private static instance: MemoryManager;
  private history: Redis;
  private vectorDBClient: PineconeClient;

  // Constructor to initialize Redis and PineconeClient
  public constructor() {
    this.history = Redis.fromEnv();
    this.vectorDBClient = new PineconeClient();
  }

  // Initialize the PineconeClient
  public async init() {
    if (this.vectorDBClient instanceof PineconeClient) {
      await this.vectorDBClient.init({
        apiKey: process.env.PINECONE_API_KEY!,
        environment: process.env.PINECONE_ENVIRONMENT!,
      });
    }
  }

  // Perform vector search on chat history
  public async vectorSearch(
    recentChatHistory: string,
    alterFileName: string
  ) {
    // Cast this.vectorDBClient to PineconeClient
    const PineconeClient = <PineconeClient>this.vectorDBClient;

    // Get the Pinecone index based on environment variable
    const pineconeIndex = PineconeClient.Index(process.env.PINECONE_INDEX! || "");

    // Create a vector store with OpenAI embeddings and Pinecone index
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
      { pineconeIndex }
    );

    // Perform similarity search using vector store
    const similarDocs = await vectorStore.similaritySearch(recentChatHistory, 3, { fileName: alterFileName })
      .catch((err) => {
        console.log("Failed to get vector search results.", err);
      });

    return similarDocs;
  }

  // Get an instance of MemoryManager and initialize it
  public static async getInstance(): Promise<MemoryManager> {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
      await MemoryManager.instance.init();
    }

    return MemoryManager.instance;
  }

  // Generate Redis key based on 'alterKey'
  private generateRedisAlterKey(alterKey: AlterKey): string {
    return `${alterKey.alterName}-${alterKey.modelName}-${alterKey.userId}`;
  }

  // Write a chat message to Redis history
  public async writeToHistory(text: string, alterKey: AlterKey) {
    if (!alterKey || typeof alterKey.userId == "undefined") {
      console.log("Alter key set incorrectly");
      return "";
    }

    const key = this.generateRedisAlterKey(alterKey);
    const result = await this.history.zadd(key, {
      score: Date.now(),
      member: text,
    });
    return result;
  }

  // Read the latest chat history for 'alterKey'
  public async readLatestHistory(alterKey: AlterKey): Promise<string> {
    if (!alterKey || typeof alterKey.userId == "undefined") {
      console.log("Alter key set incorrectly");
      return "";
    }

    const key = this.generateRedisAlterKey(alterKey);
    let result = await this.history.zrange(key, 0, Date.now(), {
      byScore: true,
    });

    result = result.slice(-30).reverse();
    const recentChats = result.reverse().join(" \n");
    return recentChats;
  }

  // Seed chat history with initial content
  public async seedChatHistory(
    seedContent: string,
    delimiter: string = "\n",
    companionKey: AlterKey
  ) {
    const key = this.generateRedisAlterKey(companionKey);
    if (await this.history.exists(key)) {
      console.log("User already has chat history");
      return;
    }

    const content = seedContent.split(delimiter);
    let counter = 0;
    for (const line of content) {
      await this.history.zadd(key, { score: counter, member: line });
      counter += 1;
    }
  }
}
