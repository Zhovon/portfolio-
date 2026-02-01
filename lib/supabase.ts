import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface ContactMessage {
    id?: string
    name: string
    email: string
    subject?: string
    message: string
    created_at?: string
}

export async function saveContactMessage(data: ContactMessage) {
    const { data: result, error } = await supabase
        .from('messages')
        .insert([{
            name: data.name,
            email: data.email,
            subject: data.subject || 'Contact Form Submission',
            message: data.message,
        }])
        .select()

    if (error) {
        console.error('Error saving message:', error)
        throw error
    }

    return result
}

export async function getContactMessages() {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching messages:', error)
        throw error
    }

    return data
}
