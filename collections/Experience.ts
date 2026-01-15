import type { CollectionConfig } from 'payload'

export const Experience: CollectionConfig = {
    slug: 'experience',
    admin: {
        useAsTitle: 'position',
    },
    fields: [
        {
            name: 'position',
            type: 'text',
            required: true,
        },
        {
            name: 'company',
            type: 'text',
            required: true,
        },
        {
            name: 'location',
            type: 'text',
        },
        {
            name: 'startDate',
            type: 'date',
            required: true,
        },
        {
            name: 'endDate',
            type: 'date',
            admin: {
                description: 'Leave empty if currently working',
            },
        },
        {
            name: 'current',
            type: 'checkbox',
            defaultValue: false,
        },
        {
            name: 'description',
            type: 'richText',
            required: true,
        },
        {
            name: 'achievements',
            type: 'array',
            fields: [
                {
                    name: 'achievement',
                    type: 'text',
                },
            ],
        },
    ],
}
