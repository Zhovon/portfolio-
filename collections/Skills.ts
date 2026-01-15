import type { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
    slug: 'skills',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'category',
            type: 'select',
            required: true,
            options: [
                {
                    label: 'Frontend',
                    value: 'frontend',
                },
                {
                    label: 'Backend',
                    value: 'backend',
                },
                {
                    label: 'Database',
                    value: 'database',
                },
                {
                    label: 'Tools',
                    value: 'tools',
                },
                {
                    label: 'Other',
                    value: 'other',
                },
            ],
        },
        {
            name: 'proficiency',
            type: 'number',
            min: 0,
            max: 100,
            required: true,
            admin: {
                description: 'Skill level from 0-100',
            },
        },
        {
            name: 'icon',
            type: 'text',
            admin: {
                description: 'Icon name or URL',
            },
        },
    ],
}
