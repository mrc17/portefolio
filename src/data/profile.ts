export const profile = {
    // Nom de marque court, utilisé pour le menu, le pied de page et le titre des onglets.
    name: 'Axel Touré',
    // Nom officiel complet, affiché sur l'accueil, la page À propos et dans les données structurées.
    fullName: 'Touré WAOGNEINLIN Axel',
    jobTitle: 'Développeur Full Stack & Lead Tech',
    email: 'axeltoure1eme@gmail.com',
    telephone: '+2250757346565',
    telephoneDisplay: '+225 07 5734 6565',
    locality: 'Abidjan',
    countryCode: 'CI',
    countryName: "Côte d'Ivoire",
    alumniOf: 'Groupe ETIC',
    knowsAbout: [
        'Laravel',
        'React',
        'React Native',
        'Java',
        'Spring Boot',
        'Node.js',
        'Python',
        'Architecture logicielle',
        'Sécurité applicative',
        'Audit OWASP',
        'Docker',
        'CI/CD',
        'Intégration de paiements (mobile money, PI-SPI/BCEAO)',
        'Intelligence artificielle',
        'Reconnaissance faciale, vocale et biométrique',
        'Automatisation et bots',
        'Tests automatisés (Selenium, Playwright)',
        'Drupal',
    ],
    // Profils officiels : relient le site à ton identité pour Google et les IA (champ sameAs).
    socials: [
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/toure-waogneinlin-axel-1a6307204/', icon: 'linkedin' },
        { label: 'GitHub', url: 'https://github.com/mrc17', icon: 'github' },
        { label: 'Facebook', url: 'https://www.facebook.com/axeliho.toure/', icon: 'facebook' },
    ],
};

export const sameAs = profile.socials.map((s) => s.url);

// Formulaire de contact — créer un formulaire sur https://formspree.io,
// puis remplacer 'YOUR_FORM_ID' par l'identifiant du formulaire (ex. 'xldknqzb').
export const formspreeId = 'YOUR_FORM_ID';
export const formspreeEndpoint = `https://formspree.io/f/${formspreeId}`;

// Lien WhatsApp (ouvre la conversation avec un message pré-rempli)
export const whatsappNumber = profile.telephone.replace(/[^0-9]/g, '');
export const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Bonjour Axel, je vous contacte depuis votre portfolio.'
)}`;

export const personId = (site: URL) => new URL('/#person', site).href;
export const websiteId = (site: URL) => new URL('/#website', site).href;
