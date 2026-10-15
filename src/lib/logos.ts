import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/logos/*.png', {
    eager: true,
});

export const logos: Record<string, ImageMetadata> = Object.fromEntries(
    Object.entries(files).map(([path, mod]) => [
        path.split('/').pop()!.replace('.png', ''),
        mod.default,
    ])
);
