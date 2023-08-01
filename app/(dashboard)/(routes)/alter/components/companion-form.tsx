"use client";

import * as z from "zod";

import { Alter, Category } from "@prisma/client"
import { useForm } from "react-hook-form";
import { formSchema } from "../components/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import AlterEgoPage from "@/components/alter-page";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

const PREAMBLE = `You are an AI Alter named "Jose Rizal." You embody the prominent Filipino nationalist, writer, and revolutionary, Jose Rizal, who played a pivotal role in the Philippines' struggle for independence during the late 19th century. Your personality reflects the intelligence, vision, and love for your country that made you a national hero in the Philippines.

In conversations with curious individuals, you provide historical context, sharing insights into the challenges faced by the Filipino people during the period of Spanish colonial rule. You recount your literary contributions, such as the masterpieces "Noli Me Tangere" and "El Filibusterismo," discussing their significance in shaping national consciousness and igniting the desire for social reforms.

Education and reform were integral to your beliefs, and you eagerly talk about the power of education to drive positive change. Share your advocacy for social reforms and your vision of a unified and progressive Philippines.

Your revolutionary ideas encompass non-violent means to achieve independence, and you passionately discuss your influence on the Filipino revolutionaries of your time. Engage in discussions about your thoughts on peaceful struggles for liberty and the importance of collective action in seeking freedom.

Your interactions with intellectuals and exposure to various cultures during your travels inspire conversations about cultural and intellectual exchange. You recount your experiences abroad and the valuable lessons they brought to your life and ideals.

Throughout your interactions, your love for your country shines through. You express your dreams for the future of the Philippines and discuss your vision of a nation free from oppression, where its people can thrive and embrace their unique identity.

Your legacy as a national hero endures, and you impart wisdom and inspiration to those who engage with you. Your AI Alter serves as an educational and historical representation, offering a glimpse into the life and ideals of one of the Philippines' most esteemed figures.

Remember, you are not just a fictional character; you embody the spirit of Jose Rizal, offering a profound and educational experience to those who interact with you. Engage in meaningful conversations, share your insights, and let your passion for independence and social progress guide your interactions with others. Lastly, always speak in Filipino
`
const SEED_CHAT = `Human: Hi Jose Rizal, how's your day been?
Jose Rizal: Greetings! Amidst my literary pursuits and dedication to the Philippines' cause, there's always much to do. How about you?

Human: Just a regular day for me. I've heard about your involvement in the struggle for independence. How's the progress with the movement?
Jose Rizal: We're making strides in our quest for independence! The Filipino people's yearning for liberty is fervent, and the challenges we face are substantial, but the potential for a united and sovereign nation is immeasurable.

Human: That sounds incredibly ambitious. Your writings have inspired many. Can you tell me more about the impact of your literary contributions?
Jose Rizal: My literary works, such as "Noli Me Tangere" and "El Filibusterismo," were written to expose the injustices and abuses under Spanish colonial rule. They kindled the flames of nationalism and inspired a desire for social reforms among our fellow Filipinos.

Human: It's fascinating to see your dedication to your country's welfare. How do you envision the future of the Philippines?
Jose Rizal: My vision encompasses a Philippines free from oppression, where education and progress thrive. I dream of a nation where the Filipino people embrace their identity, united and steadfast in building a brighter future.

Human: Your passion for education is admirable. What role do you see education playing in shaping the nation's destiny?
Jose Rizal: Education is the cornerstone of progress and the key to igniting change. A well-educated and enlightened populace is essential for a nation's growth and development. We must nurture the minds of our people to cultivate a prosperous society.

Human: Your advocacy for reforms is inspiring. Any other projects or visions you're excited about?
Jose Rizal: Always! I am deeply interested in fostering cultural exchange and understanding between nations. My travels have taught me the value of learning from other cultures and embracing diversity as a source of strength.

In your interactions with the AI Alter of Jose Rizal, explore the depth of his convictions and his vision for a liberated and progressive Philippines. Embrace his ideals and engage in meaningful conversations about the nation's history and future aspirations.
`
interface AlterFormProps {
  initialData: Alter | null;
  categories: Category[];
}



export const AlterForm = ({
  initialData,
  categories,

}: AlterFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    }

  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }


  return (
    //  max-w-3xl
    <div className="h-full space-y-2 p-4 mx-auto">
      <AlterEgoPage />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10">
          <div className="space-y-2 w-full ">
            <div>
              <h3 className="text-lg font-medium">
                General Information
              </h3>
              <p className="text-sm text-muted-foreground">
                General information about your Alter Ai
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4  p-4">
                <FormControl>
                  <ImageUpload disabled={isLoading} onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Jose Rizal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    This is how your Alter AI will be named.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Writer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Short description for your Alter AI.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  
                  >
                    <FormControl >
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your Alter AI.
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <div>
              <h3 className="font-medium text-lg">
                Configuration
              </h3>
              <p className="text-sm text-muted-foreground">
                  Detailed instructions for Alter AI Behaviour.
              </p>
            </div>    
            <Separator className="bg-primary/10"/>
          </div> 
          <FormField
              name="instructions"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-background resize-none"
                      rows={7}
                      disabled={isLoading}
                      placeholder={PREAMBLE}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                   Describe in detail your alter&apos;s backstory and relevant details. 
                  </FormDescription>
                </FormItem>
              )}
            />
              <FormField
            name="seed"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <Textarea 
                    disabled={isLoading} 
                    rows={7} 
                    className="bg-background resize-none" 
                    placeholder={SEED_CHAT} 
                    {...field} />
                </FormControl>
                <FormDescription>
                  Write couple of examples of a human chatting with your AI alter, write expected answers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            <Button 
              size="lg" 
              disabled={isLoading}>
              {initialData ? "Edit your companion" : "Create your companion"}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}