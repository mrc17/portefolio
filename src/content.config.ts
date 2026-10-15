import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        visibility: z.enum(['public', 'case_study']),
        techStack: z.array(z.string()),
        sector: z.string().optional(),
        demoUrl: z.url().optional(),
        repoUrl: z.url().optional(),
        order: z.number().default(0),
        publishedAt: z.coerce.date(),
    }),
});

const articles = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
    schema: z.object({
        title: z.string(),
        excerpt: z.string(),
        publishedAt: z.coerce.date(),
    }),
});

const expertises = defineCollection({
    loader: file('./src/content/expertises.json'),
    schema: z.object({
        title: z.string(),
        seoTitle: z.string(),
        description: z.string(),
        intro: z.string().optional(),
        points: z.array(z.string()).optional(),
        projects: z.array(reference('projects')),
    }),
});

export const collections = { projects, articles, expertises };
