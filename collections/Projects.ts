import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
    slug: 'projects',
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
            name: 'description',
            type: 'textarea',
            required: true,
        },
        {
            name: 'content',
            type: 'richText',
            required: false,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
        {
            name: 'technologies',
            type: 'array',
            fields: [
                {
                    name: 'tech',
                    type: 'text',
                },
            ],
        },
        {
            name: 'projectUrl',
            type: 'text',
            label: 'Project URL',
        },
        {
            name: 'githubUrl',
            type: 'text',
            label: 'GitHub URL',
        },
        {
            name: 'featured',
            type: 'checkbox',
            defaultValue: false,
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
