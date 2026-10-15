import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { profile } from '../data/profile';

// Guide du site pour les LLM, au format https://llmstxt.org (titre H1, résumé, sections de liens).
export const GET: APIRoute = async ({ site }) => {
    const url = (path: string) => new URL(path, site).href;

    const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
    const articles = (await getCollection('articles')).sort(
        (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
    );
    const expertises = await getCollection('expertises');

    const projectLine = (project: CollectionEntry<'projects'>) => {
        const stack = project.data.techStack.length > 0 ? ` Stack : ${project.data.techStack.join(', ')}.` : '';
        return `- [${project.data.title}](${url(`/projets/${project.id}/`)}): ${project.data.summary}${stack}`;
    };

    const lines = [
        `# ${profile.name}`,
        '',
        `> ${profile.fullName} (${profile.name}), ${profile.jobTitle} à ${profile.locality}, ${profile.countryName}. ` +
            "Plus de 5 ans d'expérience en applications web, API et plateformes métier (Laravel, React, Java/Spring Boot).",
        '',
        `Ce site est le portfolio professionnel d'${profile.name} : expertises, projets (produits en ligne et missions présentées sans données confidentielles) et articles techniques. Contenu en français.`,
        '',
        `- Domaines : ${profile.knowsAbout.join(', ')}`,
        `- Localisation : ${profile.locality}, ${profile.countryName}`,
        `- Contact : ${profile.email} · ${profile.telephoneDisplay} (téléphone et WhatsApp)`,
        '',
        '## Pages principales',
        '',
        `- [Accueil](${url('/')}): présentation, expertises et projets phares.`,
        `- [À propos](${url('/a-propos/')}): parcours, expérience et compétences.`,
        `- [Projets](${url('/projets/')}): toutes les réalisations.`,
        `- [Articles](${url('/articles/')}): tutoriels et retours d'expérience.`,
        `- [Contact](${url('/contact/')}): WhatsApp, téléphone, email et formulaire de contact.`,
        '',
        '## Expertises',
        '',
        ...expertises.map((e) => `- [${e.data.title}](${url(`/expertises/${e.id}/`)}): ${e.data.description}`),
        '',
        '## Produits en ligne',
        '',
        ...projects.filter((p) => p.data.visibility === 'public').map(projectLine),
        '',
        '## Missions et études de cas',
        '',
        ...projects.filter((p) => p.data.visibility === 'case_study').map(projectLine),
        '',
        '## Articles',
        '',
        ...articles.map((a) => `- [${a.data.title}](${url(`/articles/${a.id}/`)}): ${a.data.excerpt}`),
        '',
        '## Optional',
        '',
        `- [CV (PDF)](${url('/cv-axel-toure.pdf')}): CV complet.`,
        ...profile.socials.map((s) => `- [${s.label}](${s.url}): profil ${s.label}.`),
        '',
    ];

    return new Response(lines.join('\n'), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
};
