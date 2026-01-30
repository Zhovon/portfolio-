import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    upload: {
        // Use local storage in development, Vercel Blob in production
        staticDir: process.env.BLOB_READ_WRITE_TOKEN ? undefined : 'public/media',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre',
            },
        ],
        mimeTypes: ['image/*'],
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
    ],
}
