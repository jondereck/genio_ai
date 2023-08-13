import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Button } from "./ui/button";

interface CodeWithCopyProps {
  code: string;
}

export const CodeWithCopy = ({ code }: CodeWithCopyProps) => {
  const [copied, setCopied] = useState(false);
  const copyCodeToClipboard = () => {
    const codeBlockMatches = code.match(/```([\s\S]+?)```/gm);
    if (codeBlockMatches) {
      const codeContent = codeBlockMatches.map(match => match.replace(/```/g, "")).join("\n");
      if (codeContent) {
        navigator.clipboard.writeText(codeContent.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };
  

  return (
    <div className="relative w-full">
      <ReactMarkdown
        className="text-sm overflow-hidden leading-7"
        components={{
          pre: ({ node, ...props }) => (
            <div className="relative overflow-auto w-full md:w-auto my-2 bg-black/10 p-2 rounded-lg">
              <pre {...props} />
              <button 
              
                className="absolute top-2 right-2 text-xs px-2 py-1 bg-background rounded-md hover:bg-gray-100 focus:outline-none"
                onClick={copyCodeToClipboard}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          ),
          code: ({ node, ...props }) => (
            <code className="bg-black/10 rounded-lg p-1" {...props} />
          ),
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-bold my-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl font-semibold my-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-medium my-2" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-gray-400 pl-4 my-3" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside my-1" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside my-3" {...props} />
          ),
          li: ({ node, ...props }) => <li className="my-3" {...props} />,
        }}
      >
        {code}
      </ReactMarkdown>
</div>
  );
};
