import type { CollectionConfig } from 'payload'

export const Messages: CollectionConfig = {
    slug: 'messages',
    admin: {
        useAsTitle: 'subject',
    },
    access: {
        create: () => true,
    },
    fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'subject', type: 'text', required: true },
        { name: 'message', type: 'textarea', required: true },
        {
            name: 'status',
            type: 'select',
            options: [
                { label: 'Unread', value: 'unread' },
                { label: 'Read', value: 'read' },
                { label: 'Archived', value: 'archived' }
            ],
            defaultValue: 'unread'
        },
    ],
}
