import { profile } from '../data/profile';

// Manifeste Agentic Resource Discovery (https://agenticresourcediscovery.org/spec/).
// Servi sur /.well-known/ard.json (spec actuelle) et /.well-known/ai-catalog.json (chemin vérifié par Lighthouse).
export function ardManifest(site: URL) {
    const url = (path: string) => new URL(path, site).href;

    return {
        specVersion: '1.0',
        host: {
            displayName: profile.name,
            documentationUrl: url('/'),
            logoUrl: url('/favicon.svg'),
        },
        entries: [
            {
                identifier: `urn:air:${site.hostname}:llms-txt`,
                displayName: `${profile.name} — guide du site pour les LLM`,
                type: 'text/markdown',
                url: url('/llms.txt'),
                description: `Profil, expertises, projets et articles de ${profile.fullName}, ${profile.jobTitle} à ${profile.locality}.`,
                tags: ['portfolio', 'développeur full stack', 'Laravel', 'React', profile.locality],
                representativeQueries: [
                    `Qui est ${profile.name} ?`,
                    `Quels projets Laravel a réalisés ${profile.name} ?`,
                    `Trouver un développeur full stack à ${profile.locality}`,
                ],
            },
        ],
    };
}

export function ardResponse(site: URL) {
    return new Response(JSON.stringify(ardManifest(site), null, 4), {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
}
