import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 animate-pulse" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-white/90">Available for work</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-slide-up">
            Creative
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Developer
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 animate-slide-up animation-delay-200">
            Building exceptional digital experiences with modern technologies.
            Specialized in Next.js, React, and full-stack development.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-400">
            <Link
              href="/projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all hover:scale-105"
            >
              Get In Touch
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/50 rounded-full animate-scroll" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            What I Do
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Web Development</h3>
              <p className="text-white/60">Building responsive, performant web applications with modern frameworks and best practices.</p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">UI/UX Design</h3>
              <p className="text-white/60">Creating beautiful, intuitive interfaces that provide exceptional user experiences.</p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Performance</h3>
              <p className="text-white/60">Optimizing applications for speed, SEO, and scalability with cutting-edge techniques.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CMS Admin Link */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl font-semibold text-white">Content Management</h3>
            <p className="text-white/60 max-w-md">
              Manage your portfolio content with the built-in Payload CMS admin panel
            </p>
            <Link
              href="/admin"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:scale-105 transition-transform"
            >
              Go to Admin Panel
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
