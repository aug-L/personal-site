import { glob, file } from "astro/loaders";
import { defineCollection } from "astro/content/config";
import { z } from "astro/zod";

const projectTags = [
  "TypeScript",
  "LIVE",
  "HTML",
  "JavaScript",
  "React Native",
  "Backend API",
  "Node.js",
  "Docker",
  "Tailwind",
];
const blogTags = [];

const projects = defineCollection({
  loader: glob({ pattern: "src/content/projects/**/*.md" }),
  schema: z.object({
    id: z.number(),
    title: z.string().max(50),
    tools: z.preprocess(
      (val) => (Array.isArray(val) ? val : [val]),
      z.array(
        z.string(),
        // z.enum([
        //   "TypeScript",
        //   "LIVE",
        //   "HTML",
        //   "JavaScript",
        //   "React Native",
        //   "Backend API",
        //   "Node.js",
        //   "Docker",
        //   "Tailwind",
        // ]),
      ),
    ), // change categories here
    year: z.number(),
    liveSite: z.url().optional(),
    playStore: z.url().optional(),
    appStore: z.url().optional(),
    fdroid: z.url().optional(),
    apk: z.url().optional(),
    git: z.url().optional(),
    description: z.string().max(350),
    isFeatured: z.boolean(),
    isDraft: z.boolean(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "src/content/blog/**/*.md" }),
  schema: z.object({
    id: z.number(),
    slug: z.string().max(50),
    title: z.string().max(50),
    publishedDate: z.date(),
    category: z.enum(["systems", "ai", "productivity"]), // change and add blog categories here
    readingTime: z.number().optional(),
    isDraft: z.boolean(),
  }),
});

const experience = defineCollection({
  loader: file("src/content/resume/experience.yaml"),
  schema: z.object({
    id: z.number(),
    title: z.string().max(70),
    company: z.string().max(70).optional(),
    from: z.string().max(10),
    to: z.string().max(10),
    desc: z.string().max(500).optional(),
    tags: z.array(z.string()).optional(), // TODO add tags
  }),
});

const education = defineCollection({
  loader: file("src/content/resume/education.yaml"),
  schema: z.object({
    title: z.string().max(70),
    timeline: z.string().max(15),
    school: z.string().max(70),
  }),
});

const tools = defineCollection({
  loader: file("src/content/tools/tools.yaml"),
  schema: z.object({
    id: z.number(),
    name: z.string().max(50),
    items: z.array(
      z.object({
        id: z.number(),
        name: z.string().max(50),
        exp: z.number().optional(),
      }),
    ),
  }),
});

const skills = defineCollection({
  loader: file("src/content/tools/skills.yaml"),
  schema: z.object({
    name: z.string().max(50),
    exp: z.number().optional(),
  }),
});

const software = defineCollection({
  loader: file("src/content/tools/software.yaml"),
  schema: z.object({
    name: z.string().max(50),
    items: z.array(
      z.object({
        name: z.string().max(50),
      }),
    ),
  }),
});

const skillsAndTools = defineCollection({
  loader: file("src/content/tools/skillsAndTools.yaml"),
  schema: z.object({
    title: z.string().max(70),
    items: z.array(z.string()),
  }),
});

export const collections = {
  projects,
  blog,
  experience,
  education,
  tools,
  skills,
  software,
  skillsAndTools,
};
