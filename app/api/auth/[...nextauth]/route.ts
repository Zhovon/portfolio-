import NextAuth, { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { createSupabaseClient } from "@/lib/supabase-browser"

// Initialize Supabase for user profile sync
const getSupabaseAdmin = () => {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createSupabaseClient(url, key)
}

// Helper: Sync user to profiles table on first login
async function syncUserToSupabase(user: any) {
  try {
    const supabase = getSupabaseAdmin()
    if (!supabase) return

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: user.name || 'User',
        email: user.email,
        github_handle: user.email?.split('@')[0] || undefined,
        avatar_url: user.image,
        theme_preference: 'system',
        reduced_motion: false,
      })

    if (error) {
      console.error('Error syncing user to Supabase:', error)
    }
  } catch (err) {
    console.error('Profile sync exception:', err)
  }
}

// Next-Auth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || process.env.NEXT_PUBLIC_GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      authorization: {
        params: {
          scope: "read:user,user:email",
        },
      },
      profile: (profile: any) => ({
        id: String(profile.id),
        name: profile.name,
        email: profile.email,
        image: profile.avatar_url,
      }),
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (user) {
        await syncUserToSupabase(user)
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },

    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token?.id || token?.sub || ''
      }
      return session
    },
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    newUser: '/onboarding',
  },

  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET || 'zhovon-development-secret-change-in-prod',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
export default handler