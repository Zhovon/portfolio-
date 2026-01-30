import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
    slug: 'projects',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true, unique: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'thumbnail', type: 'upload', relationTo: 'media', required: true },
        { name: 'techStack', type: 'array', fields: [{ name: 'name', type: 'text' }] },
        { name: 'liveUrl', type: 'text' },
        { name: 'featured', type: 'checkbox', defaultValue: false },
    ],
}
