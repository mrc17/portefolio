import { useEffect, useRef, useState, type ChangeEvent, type SubmitEvent } from 'react';
import { profile, formspreeEndpoint } from '../data/profile';

const FORMSPREE_ENDPOINT = formspreeEndpoint;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
    const [status, setStatus] = useState<Status>('idle');
    const [data, setData] = useState({ name: '', email: '', subject: '', message: '', _gotcha: '' });
    const successRef = useRef<HTMLDivElement>(null);

    // Le formulaire (et son bouton) disparaît après l'envoi : le focus passe sur le message de confirmation.
    useEffect(() => {
        if (status === 'success') {
            successRef.current?.focus();
        }
    }, [status]);

    function handleChange(field: keyof typeof data) {
        return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setData((prev) => ({ ...prev, [field]: e.target.value }));
        };
    }

    async function send() {
        setStatus('submitting');

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            setStatus('success');
            setData({ name: '', email: '', subject: '', message: '', _gotcha: '' });
            return 'Message envoyé. Axel Touré répondra rapidement.';
        } catch {
            setStatus('error');
            return `L'envoi a échoué. Écrire directement à ${profile.email}.`;
        }
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const result = send();

        // Envoi déclenché par un agent IA via WebMCP : on lui transmet le résultat.
        const native = e.nativeEvent as Event & { agentInvoked?: boolean; respondWith?: (response: Promise<string>) => void };
        if (native.agentInvoked) {
            native.respondWith?.(result);
        }
    }

    if (status === 'success') {
        return (
            <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                className="mt-8 rounded-lg border border-teal-500/30 bg-teal-500/10 px-4 py-3 text-sm text-teal-300">
                Votre message a bien été envoyé. Je vous répondrai rapidement.
            </div>
        );
    }

    const field =
        'mt-1 block w-full rounded-md border border-[#1f2937] bg-[#0f1620] px-3 py-2 text-slate-100 placeholder-slate-600 shadow-sm transition-colors focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400';
    const labelCls = 'block text-sm font-medium text-slate-300';

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
            toolname="contacter-axel-toure"
            tooldescription="Envoie un message à Axel Touré, développeur Full Stack et Lead Tech à Abidjan : proposition de projet, mission, recrutement ou question. L'utilisateur vérifie le message avant l'envoi."
        >
            {status === 'error' && (
                <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    Une erreur est survenue lors de l'envoi. Vous pouvez aussi écrire
                    directement à{' '}
                    <a href={`mailto:${profile.email}`} className="underline">
                        {profile.email}
                    </a>
                    .
                </div>
            )}

            <div>
                <label htmlFor="name" className={labelCls}>
                    Nom
                </label>
                <input id="name" name="name" type="text" required autoComplete="name" toolparamdescription="Nom complet de la personne qui écrit." value={data.name} onChange={handleChange('name')} className={field} />
            </div>

            <div>
                <label htmlFor="email" className={labelCls}>
                    Email
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" toolparamdescription="Adresse email à laquelle Axel peut répondre." value={data.email} onChange={handleChange('email')} className={field} />
            </div>

            <div>
                <label htmlFor="subject" className={labelCls}>
                    Sujet
                </label>
                <input id="subject" name="subject" type="text" toolparamdescription="Objet du message (facultatif)." value={data.subject} onChange={handleChange('subject')} className={field} />
            </div>

            <div>
                <label htmlFor="message" className={labelCls}>
                    Message
                </label>
                <textarea id="message" name="message" rows={5} required toolparamdescription="Contenu du message : besoin, contexte, délais et budget éventuel." value={data.message} onChange={handleChange('message')} className={field} />
            </div>

            {/* Piège anti-spam : sans attribut name pour ne pas apparaître dans l'outil WebMCP (sa valeur part via le state). */}
            <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={data._gotcha}
                onChange={handleChange('_gotcha')}
                className="hidden"
            />

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="rounded-lg bg-teal-400 px-5 py-3 text-sm font-semibold text-[#04201c] transition-colors hover:bg-teal-300 disabled:opacity-50"
            >
                {status === 'submitting' ? 'Envoi…' : 'Envoyer'}
            </button>
        </form>
    );
}
