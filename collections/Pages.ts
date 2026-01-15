import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                description: 'URL-friendly version of the title',
            },
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'metaTitle',
            type: 'text',
            admin: {
                description: 'SEO title (leave empty to use page title)',
            },
        },
        {
            name: 'metaDescription',
            type: 'textarea',
            admin: {
                description: 'SEO description',
            },
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'published',
            options: [
                {
                    label: 'Draft',
                    value: 'draft',
                },
                {
                    label: 'Published',
                    value: 'published',
                },
            ],
        },
    ],
}
