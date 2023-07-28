"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
  {
    name: "Antonio",
    avatar: "A",
    title: "Software Engineeer",
    description: "This is the best application I've used!"
  },
  {
    name: "Emily",
    avatar: "E",
    title: "Web Developer",
    description: "The features are amazing, and it's so user-friendly!"
  },
  {
    name: "John",
    avatar: "J",
    title: "Data Analyst",
    description: "I've been able to accomplish tasks more efficiently with this tool."
  },
  {
    name: "Sophia",
    avatar: "S",
    title: "UX Designer",
    description: "The interface is sleek, and it has greatly improved my workflow."
  },
  {
    name: "Michael",
    avatar: "M",
    title: "Marketing Specialist",
    description: "I highly recommend this tool for anyone in the marketing field."
  },
  {
    name: "Olivia",
    avatar: "O",
    title: "Content Creator",
    description: "It's a game-changer for content creators like me!"
  },
  {
    name: "William",
    avatar: "W",
    title: "Entrepreneur",
    description: "Using this tool has been a game-changer for my business growth."
  },
  {
    name: "Linda",
    avatar: "L",
    title: "Graphic Designer",
    description: "As a graphic designer, I find this tool indispensable for my projects."
  } 
]

const LandingContent = () => {
  return ( 
    <div className="px-10 pb-20">
        <h2 className="text-center text-4xl text-white font-extrabold mb-10">
          Testimonials
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 ">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.name}
              className="bg-[#192339]/80 border-none text-white hover:ring-4 hover:ring-blue-300 transition-all duration-300"
            >
                <CardHeader>
                  <CardTitle className="flex items-center gap-x-2">
                    <div>
                      <p className="text-lg">{testimonial.name}</p>
                      <p className="text-zinc-400 text-sm">{testimonial.title}</p>
                    </div>
                  </CardTitle>
                  <CardContent className="pt-4 px-0">
                    {testimonial.description}
                  </CardContent>
                </CardHeader>

            </Card>
          ))}
        </div>
    </div>
   );
}
 
export default LandingContent;