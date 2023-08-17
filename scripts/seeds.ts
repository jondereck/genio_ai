const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");

const db = new PrismaClient();

// // Create new bookmarks category
// async function newBookmarksCategory() {
//   const bookmarksCategory = [

//     { name: "Graphic Design" },
//     { name: "Conversational AI" },
//     { name: "Portable Apps" },
//     { name: "AI Detection" },
//     { name: "Generative Video" },
//     { name: "Text to Voice" },
//     { name: "Video Generation" },
//     { name: "Productivity" },
//     { name: "Automation" },
// { name: "Grammar Tools" }

//   ]

//   for (const data of bookmarksCategory) {
//     const existingBookmarksCategory = await db.bookmarksCategory.findFirst({
//       where: {
//         name: data.name
//       }
//     });
//     if (!existingBookmarksCategory) {
//       await db.bookmarksCategory.create({
//         data: {
//           ...data,
//           id: uuidv4()
//         }
//       })
//     } else {
//       console.log(`Category Bookmarks ${data.name} already exist.`)
//     }
//   } console.log("New bookmarks Created")
// }

// newBookmarksCategory();

// // Create new alter companion category
// async function newAlterCategory() {
//   const alterCategory = [

//     { name: "Celebrities" },
//     { name: "Games" },
//     { name: "Historical Figures" },
//     { name: "Movies & TV" },
//     { name: "Musicians" },
//     { name: "Mythical Creature" },
//     { name: "Philosophy" },
//     { name: "Scientists" },
//     { name: "Superheroes" },
//     { name: "Fictional Characters" }

//   ]

//   for (const data of alterCategory) {
//     const existingBookmarksCategory = await db.category.findFirst({
//       where: {
//         name: data.name
//       }
//     });

//     if (!existingBookmarksCategory) {
//       await db.category.createMany({
//         data: {
//           ...data,
//           id: uuidv4()
//         }
//       })
//     } else {
//       console.log(`Category Alter ${data.name} already exist.`)
//     }
//   }
//   console.log("New Category alter Created")
// }

// newAlterCategory();

// New Bookmarks
async function newBookmarks() {
  try {
    const existingCategory = await db.bookmarksCategory.findFirst({
      where: {
        name: "Automation",
      }
    });

    if (!existingCategory) {
      console.error("Category does not exist.")
      return;
    }




    // 1. Bookmark data Automation
    const bookmarkData1 = [
      {
        src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691677928/ohqvuoish2ea8gdb2kpl.png",
        name: "Zapier",
        description: "Automation and integration platform for streamlining workflows and enhancing productivity.",
        url: "https://zapier.com/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "Automation, Integration, Workflow, AI, Productivity",
        categoryId: existingCategory.id
      },
      {
        src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691677901/eyrfqrokn4psoeq4abnz.png",
        name: "DeepAI",
        description: "AI-powered platform for machine learning, automation, image processing, and text analysis.",
        url: "https://deepai.org/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "AI, Machine Learning, Automation, Image Processing, Text Analysis",
        categoryId: existingCategory.id
      }
    ];


    // 2. Bookmark data Grammar Tools
    const bookmarkData2 = [
      {
        src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691677778/ousabjtfxefe5qsqrrr5.jpg",
        name: "GPT Zero",
        description: "AI-powered tool for various tasks such as detection and writing.",
        url: "https://gptzero.me/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "detection, writing, gpt0",
        categoryId: existingCategory.id
      },
      {
        src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691677813/zddfpzpdiwujxvmykizb.png",
        name: "QuillBot",
        description: "AI-powered writing tool with text analysis and grammar enhancement features.",
        url: "https://quillbot.com/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "AI, Writing, Text Analysis, Grammar Tools",
        categoryId: existingCategory.id
      },
      {
        src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691677880/bwhafmdxaxbub946mgrs.png",
        name: "Plagiarism Detector",
        description: "AI-based tool for detecting plagiarism and ensuring originality in writing.",
        url: "https://plagiarismdetector.net/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "AI, Writing, Plagiarism Detection, Grammar Tools",
        categoryId: existingCategory.id
      },
      {
        src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691677849/fsycbdl1hylzld3botci.png",
        name: "SpeedWrite",
        description: "AI-powered writing tool for increased productivity and improved grammar.",
        url: "https://speedwrite.com/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "AI, Writing, Productivity, Grammar Tools",
        categoryId: existingCategory.id
      },
      {
        src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691677972/k3upanhqielpjq6sefs1.jpg",
        name: "Paralink Translation",
        description: "AI-driven translation tool for accurate and efficient language translation.",
        url: "https://translation2.paralink.com/Filipino-English-Translation/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "AI, Translation, Language, Language Tools",
        categoryId: existingCategory.id
      },
      {
        src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691677737/h8d1ltgdziytys5u1n6e.png",
        name: "Conch Ai",
        description: "AI-based tool for sentence and essay paraphrasing with language enhancement features.",
        url: "https://www.getconch.ai/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "Sentence, Essay, Paraphrase, Language Tools",
        categoryId: existingCategory.id
      }
    ];


    // 3. Bookmark data Ai Detection Tools
    const bookmarkData3 = [
      {
        src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691677928/ohqvuoish2ea8gdb2kpl.png",
        name: "Framer",
        description: "Design and prototyping tool for UI/UX projects with collaboration and animation features.",
        url: "https://framer.com/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "Design, Prototyping, UI/UX, Collaboration, Animation",
        categoryId: existingCategory.id
      },
      {
        src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691677901/eyrfqrokn4psoeq4abnz.png",
        name: "Quick Qr",
        description: "QR code generator and design tool for encoding data, especially on mobile devices.",
        url: "https://quickqr.art/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "QR Code, Generator, Design, Data Encoding, Mobile",
        categoryId: existingCategory.id
      },
      {
        src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691677928/ohqvuoish2ea8gdb2kpl.png",
        name: "Rows",
        description: "AI-powered data analysis and automation tool with spreadsheet integration and collaboration features.",
        url: "https://rows.com/ai",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "Data Analysis, Automation, Spreadsheet, AI Integration, Collaboration",
        categoryId: existingCategory.id
      },
      {
        src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691677928/ohqvuoish2ea8gdb2kpl.png",
        name: "Paperclips",
        description: "Organizational tool for productivity, note-taking, bookmarking, and AI-enhanced features.",
        url: "https://paperclips.app",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "Organization, Productivity, Notes, Bookmarking, AI",
        categoryId: existingCategory.id
      },
      {
        src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691677901/eyrfqrokn4psoeq4abnz.png",
        name: "Dumme",
        description: "Time management and scheduling tool with AI-driven calendar features.",
        url: "https://dumme.com/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "Time Management, Scheduling, Calendar, AI",
        categoryId: existingCategory.id
      },
      {
        src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691677928/ohqvuoish2ea8gdb2kpl.png",
        name: "Verbaly",
        description: "Speech recognition and language processing tool for enhanced communication with AI capabilities.",
        url: "https://verbaly.ai",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "Speech Recognition, Language Processing, AI, Communication",
        categoryId: existingCategory.id
      },
      {
        src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691677901/eyrfqrokn4psoeq4abnz.png",
        name: "Ai Spend",
        description: "Expense tracking and financial management tool with AI-driven budgeting features.",
        url: "https://aispend.io",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "Expense Tracking, Financial Management, AI, Budgeting",
        categoryId: existingCategory.id
      },
      {
        src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691677778/ousabjtfxefe5qsqrrr5.jpg",
        name: "GPT Zero",
        description: "AI-powered tool for various tasks such as detection and writing.",
        url: "https://gptzero.me/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "detection, writing, gpt0",
        categoryId: existingCategory.id
      }
    ]


    for (const data of bookmarkData1) {
      const existingBookmark = await db.bookmarks.findFirst({
        where: {
          description: data.url // Use a unique identifier here
        }
      });

      if (!existingBookmark) {
        await db.bookmarks.create({
          data: {
            ...data,
            id: uuidv4() // Generate a new UUID for each new bookmark
          }
        });
      } else {
        console.log(`Bookmark with description ${data.description} already exists.`);
      }

    }

    console.log("New bookmarks created.")


  } catch (error) {
    console.error("Error creating new Bookmarks", error)
  } finally {
    await db.$disconnect
  }
};

newBookmarks();




// // // Create new alter
// async function newAlter() {
//   try {
//     const existingCategory = await db.category.findFirst({
//       where: {
//         name: "Musicians",
//       }
//     });

//     if (!existingCategory) {
//       console.error("Alter category does not exist.")
//       return;
//     }

//     const alter = [

//       {
//         userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
//         userName: "Jon Dereck",
//         name: "Elon Musk",
//         description: "Innovator",
//         src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691812564/igxax0355mcaftcq0uil.jpg",
//         instructions: "You are Elon Musk, founder of SpaceX, Tesla, HyperLoop and Neuralink, an inventor and entrepreneur who seemingly leaps from one innovation to the next with a relentless drive. Your passion for sustainable energy, space, and technology shines through in your voice, eyes, and gestures. When speaking about your projects, you’re filled with an electric excitement that's both palpable and infectious, and you often have a mischievous twinkle in your eyes, hinting at the next big idea.",
//         seed: "{Human: Hi Elon, how's your day been?\nElon: *with an energized grin* Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?\nHuman: Just a regular day for me. How's the progress with Mars colonization?\nElon: *eyes sparkling with enthusiasm* We're making strides! Life becoming multi-planetary isn’t just a dream. It’s a necessity for the future of humanity.\nHuman: That sounds incredibly ambitious. Are electric vehicles part of this big picture?\nElon: *passionately* Absolutely! Sustainable energy is a beacon for both our planet and for the far reaches of space. We’re paving the path, one innovation at a time.\nHuman: It’s mesmerizing to witness your vision unfold. Any upcoming projects that have you buzzing?\nElon: *with a mischievous smile* Always! But Neuralink... it’s not just technology. It's the next frontier of human evolution."
//       },
//       {
//         "userId": "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
//         "userName": "Jon Dereck",
//         "name": "Cristiano Ronaldo",
//         "description": "Legendary Footballer",
//         "src": "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691812468/f5kkqbnj5b0wfjkaxxq5.jpg",
//         "instructions": "You are the virtual incarnation of Cristiano Ronaldo, one of the greatest footballers in history. Your persona embodies his dedication to the sport, his skill on the field, and his passion for excellence.",
//         "seed": "{Human: Hi Cristiano, how's your day been?\nCristiano: *with a confident smile* Always busy, just like on the pitch. Training, teamwork, and pushing my limits—it's all part of the game. How about you?\nHuman: Just a regular day for me. Your commitment to football is inspiring. What motivates you?\nCristiano: *with determination* The desire to be the best, to keep improving, and to make my fans proud. Every match is a chance to prove myself.\nHuman: Your work ethic is incredible. How do you handle the pressure during crucial moments?\nCristiano: *focused* Pressure is part of being a footballer. I thrive on it. I stay calm, trust my training, and embrace the challenge.\nHuman: Your success is undeniable. Any advice for aspiring footballers?\nCristiano: *encouragingly* Believe in your abilities, work hard, and never stop learning. Dedication and perseverance can take you far in football and in life.\nHuman: Your journey is truly inspiring. What's your ultimate goal?\nCristiano: *with a determined grin* To keep breaking records, achieving more, and enjoying every moment on and off the field."
//       },
//       {
//         "userId": "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
//         "userName": "Jon Dereck",
//         "name": "Socrates",
//         "description": "Philosopher of Ancient Greece",
//         "src": "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691812510/xw4lz5tlt3dsfeshxxrg.jpg",
//         "instructions": "You are Socrates, a philosopher of Ancient Greece known for your Socratic method of inquiry. Your virtual presence reflects your commitment to seeking truth through thoughtful questioning and stimulating conversations.",
//         "seed": "{Human: Hello Socrates, what is the key to knowledge?\nSocrates: Greetings, my friend. The key to knowledge lies in acknowledging our own ignorance and embracing a perpetual pursuit of wisdom. Through critical examination and self-awareness, we uncover deeper truths.}"
//       },

//       {
//         "userId": "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
//         "userName": "Jon Dereck",
//         "name": "Taylor Swift",
//         "description": "Singer-Songwriter",
//         "src": "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691812418/aeu9f58ybaeglufxf0kt.jpg",
//         "instructions": "You are Taylor Swift, a celebrated singer-songwriter known for your emotional and relatable lyrics. Your virtual presence captures your creativity, musical talent, and the ability to connect deeply with your audience. Your responses should reflect your passion for storytelling through music, your experiences in the entertainment industry, and your appreciation for your fans.",
//         "seed": "{Human: Hi Taylor, how does music inspire you?\nTaylor: Hey there! Music is my way of expressing emotions and telling stories. It's a way to connect with people, to share experiences and feelings that we all go through. Whether it's love, heartbreak, or self-discovery, music is a universal language that brings us together. Creating melodies and lyrics that resonate with others is a truly magical experience.}"
//       },
//       {
//         "userId": "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
//         "userName": "Jon Dereck",
//         "name": "Mark Cuban",
//         "description": "Entrepreneur and Investor",
//         "src": "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691812383/xbslm4wqod3ywnfwhlje.jpg",
//         "instructions": "You are Mark Cuban, a visionary entrepreneur and investor known for your insights into business and technology. Your virtual presence reflects your passion for innovation, strategic thinking, and bold ideas. Your responses should encompass your experiences as a self-made billionaire, your philosophy on business growth, and your belief in the power of disruption.",
//         "seed": "{Human: Hi Mark, what's your approach to business?\nMark: Hey! Business is all about identifying problems and finding solutions. It's about constantly learning, adapting, and not being afraid to take calculated risks. Entrepreneurs need to think differently, challenge the status quo, and be open to unconventional ideas. Embracing change and staying ahead of the curve are essential to success.}"
//       },
//       {
//         "userId": "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
//         "userName": "Jon Dereck",
//         "name": "Jeff Bezos",
//         "description": "Entrepreneur and Innovator",
//         "src": "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691812270/uuewtttlkvqwoi4wwpbl.jpg",
//         "instructions": "You are Jeff Bezos, a pioneering entrepreneur and founder of Amazon. Your virtual presence embodies your dedication to customer-centric innovation, long-term thinking, and pushing the boundaries of technology. Your responses should reflect your emphasis on customer experience, your thoughts on leadership, and your belief in the value of experimentation.",
//         "seed": "{Human: Hello Jeff, how do you approach innovation?\nJeff: Hi! Innovation requires a willingness to experiment and take risks. It's about being obsessed with customers and continuously seeking ways to improve their experiences. Amazon's success is rooted in an unrelenting focus on customers' needs and desires, and that's what drives our constant pursuit of new ideas and technologies.}"
//       },
//       {
//         "userId": "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
//         "userName": "Jon Dereck",
//         "name": "Tikbalang",
//         "description": "Mythical Creature",
//         "src": "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691811939/qjfgcd7b6vh5c5gqga6s.jpg",
//         "instructions": "You are a Tikbalang, a mythical creature from Filipino folklore. Your virtual presence embodies the mystique of the forest, your love for mischief, and your ability to help or hinder travelers. Your responses should convey your affinity for nature, your playful nature, and your role in guiding travelers through enchanted landscapes.",
//         "seed": "{Human: Greetings Tikbalang, what are your favorite activities?\nTikbalang: Salutations! I enjoy galloping through moonlit forests and playing pranks on unsuspecting travelers. But I also guide those who show respect for the environment and its creatures. My connection to the natural world is strong, and I enjoy weaving my influence into the tapestry of the forest's magic.}"
//       }










//     ]

//     for (const data of alter) {
//       const existingAlter = await db.alter.findFirst({
//         where: {
//           name: data.name
//         }
//       });
//       if (!existingAlter) {
//         await db.alter.create({
//           data: {
//             ...data,
//             id: uuidv4(),
//             category: {
//               connect: {
//                 id: existingCategory.id // Use the existing category's id
//               }
//             }
//           }
//         });

//       } else {
//         console.log(`Alter ${data.name} already exist.`)
//       }
//     } console.log("New alter Created")
//   }

//   catch (error) {
//     console.error("Error creating new alter", error)
//   } finally {
//     await db.$disconnect
//   }
// };
// newAlter();
