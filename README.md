# 🎨 Modern Portfolio with Next.js & Payload CMS

A stunning, high-performance portfolio website built with Next.js 15 and Payload CMS 3.0.

## ✨ Features

- 🚀 **Next.js 15** with App Router
- 📝 **Payload CMS 3.0** - Powerful headless CMS
- 🎨 **Modern Design** - Gradient backgrounds, animations, glassmorphism
- 🔐 **Secure Authentication** - HttpOnly cookies, RBAC
- 📱 **Fully Responsive** - Mobile-first design
- ⚡ **Optimized Performance** - Fast loading, SEO-ready
- 🎯 **TypeScript** - Type-safe development
- 💅 **Tailwind CSS v4** - Modern styling

## 📦 Collections

- **Users** - Authentication & user management
- **Projects** - Showcase your work
- **Skills** - Display your expertise
- **Experience** - Work history
- **Media** - Image management with auto-resizing
- **Pages** - Custom pages with SEO

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL database (or use Vercel Postgres)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file:
   ```env
   DATABASE_URL=your_postgres_connection_string
   PAYLOAD_SECRET=your_secret_key_min_32_characters
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Website: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## 🌐 Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo>
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `PAYLOAD_SECRET` - Generate a secure random string (min 32 chars)
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NEXT_PUBLIC_SERVER_URL` - Your production URL

4. Click "Deploy"

### Step 3: Set up Vercel Postgres (Optional)

1. In your Vercel project dashboard, go to "Storage"
2. Click "Create Database" → "Postgres"
3. Copy the connection string to `DATABASE_URL`

### Step 4: Connect Your Hostinger Domain

1. In Vercel, go to your project → "Settings" → "Domains"
2. Add your domain (e.g., `yourdomain.com`)
3. Vercel will provide DNS records

4. In Cloudflare DNS, add these records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   Proxy: ON (orange cloud)

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   Proxy: ON (orange cloud)
   ```

5. Wait 5-10 minutes for DNS propagation
6. SSL certificate will be auto-generated ✅

## 📝 Creating Your First Admin User

1. Visit `/admin` on your deployed site
2. Click "Create your first user"
3. Fill in your details
4. Start managing your content!

## 🎨 Customization

### Update Homepage Content

Edit `app/page.tsx` to customize:
- Hero section text
- Features
- Call-to-action buttons

### Add New Collections

1. Create a new file in `collections/` folder
2. Import it in `payload.config.ts`
3. Restart the dev server

### Styling

- Global styles: `app/globals.css`
- Tailwind config: Built-in with Tailwind v4
- Custom animations: Already included in globals.css

## 📚 Tech Stack

- **Framework**: Next.js 15
- **CMS**: Payload CMS 3.0
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Hosting**: Vercel (recommended)
- **DNS**: Cloudflare

## 🔒 Security Features

- ✅ HttpOnly cookies (XSS protection)
- ✅ CSRF protection
- ✅ Role-based access control
- ✅ Secure password hashing
- ✅ JWT authentication
- ✅ API key support

## 📊 Performance

- ⚡ Server Components
- 🖼️ Automatic image optimization
- 📦 Code splitting
- 🚀 Edge runtime support
- 💾 Built-in caching

## 🆘 Troubleshooting

### Database Connection Issues

If you see database errors:
1. Check your `DATABASE_URL` is correct
2. Ensure PostgreSQL is running
3. Verify network access to database

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Admin Panel Not Loading

1. Check `PAYLOAD_SECRET` is set
2. Verify database migrations ran
3. Check browser console for errors

## 📖 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🤝 Support

For issues or questions:
1. Check the documentation links above
2. Review existing GitHub issues
3. Create a new issue with details

## 📄 License

MIT License - feel free to use this for your own portfolio!

---

**Built with ❤️ using Next.js and Payload CMS**
