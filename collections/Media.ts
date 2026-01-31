import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    // Upload functionality temporarily disabled until storage is properly configured
    // Uncomment this when you add Vercel Blob Storage or configure local storage
    /*
    upload: {
        staticDir: 'public/media',
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
    */
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
        {
            name: 'url',
            type: 'text',
            required: true,
            label: 'Image URL',
            admin: {
                description: 'Enter the full URL of the image (e.g., from Unsplash, Cloudinary, etc.)',
            },
        },
    ],
}
