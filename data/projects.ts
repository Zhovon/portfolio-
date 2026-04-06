export interface TechStack {
    name: string
}

export interface Metric {
    value: string
    label: string
}

export interface Project {
    id: string
    title: string
    slug: string
    description: string
    techStack: TechStack[]
    image?: string
    // Extended fields for Case Study
    category?: string
    liveUrl?: string
    githubUrl?: string
    metrics?: Metric[]
    longDescription?: string
    challenges?: string[]
    results?: string[]
    technologies: string[] // Used in CaseStudyClient as string[]
}

export const FALLBACK_PROJECTS: Project[] = [
    {
        id: 'repo-11',
        title: 'Tailor SaaS',
        slug: 'tailor-saas',
        description: 'A comprehensive SaaS platform tailored for bespoke service management and high-availability operations.',
        techStack: [{ name: 'React' }, { name: 'Render' }, { name: 'Node.js' }],
        category: 'SaaS',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Designed and deployed Tailor SaaS, a robust production platform hosted at tailor.zhovon.com. Features advanced authentication, dynamic email verification workflows, and environment-aware configurations built to scale gracefully on Render.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Render'],
        liveUrl: 'https://tailor.zhovon.com',
        metrics: [
            { value: '99.9%', label: 'Uptime' },
            { value: 'Robust', label: 'Auth Flow' }
        ]
    },
    {
        id: 'repo-7',
        title: 'Rukaya AI',
        slug: 'rukaya-ai',
        description: 'A native-like mobile PWA Islamic companion with offline capabilities and AI guidance.',
        techStack: [{ name: 'TypeScript' }, { name: 'PWA' }, { name: 'Next.js' }],
        category: 'App',
        image: 'https://images.unsplash.com/photo-1598371343717-9154f85e4933?q=80&w=3540&auto=format&fit=crop', // Updated image symbolizing Islamic architecture
        longDescription: 'Transforming Rukaya AI into a resilient, native-like mobile experience. Built on a "True Offline" PWA architecture with Service Workers and IndexedDB, it ensures availability without an internet connection. Features include an offline-first AI chatbot, a haptic-feedback Tasbeeh counter linked to daily prayer times, and a frictionless native "Install App" flow.',
        technologies: ['TypeScript', 'Next.js', 'Service Workers', 'IndexedDB', 'Tailwind CSS'],
        liveUrl: 'https://rukaya.zhovon.com',
        metrics: [
            { value: '100%', label: 'Offline Ready' },
            { value: 'Native', label: 'PWA Feel' },
            { value: '<1s', label: 'Load Time' }
        ],
        githubUrl: 'https://github.com/Zhovon/Rukaya-Ai'
    },
    {
        id: 'fallback-1',
        title: 'Project Nebula',
        slug: 'project-nebula',
        description: 'Advanced autonomous fleet management system for deep-space logistics and telemetry.',
        techStack: [{ name: 'Next.js' }, { name: 'Payload' }],
        category: 'SaaS Platform',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3544&auto=format&fit=crop',
        longDescription: 'Project Nebula was conceived to solve the latency issues inherent in deep-space communication. By utilizing edge-computing nodes on satellite relays, we reduced packet loss by 400%.',
        technologies: ['Next.js', 'Payload CMS', 'PostgreSQL', 'Redis'],
        metrics: [
            { value: '400%', label: 'Efficiency' },
            { value: '2.5s', label: 'Latency' },
            { value: '10k', label: 'Users' }
        ],
        challenges: [
            'High latency in interplanetary data transmission.',
            'Synchronization of state across distributed nodes.',
            'Ensuring encryption at rest and in transit.'
        ],
        results: [
            'Successfully deployed to 3 planetary systems.',
            'Reduced operational costs by 30%.'
        ]
    },
    {
        id: 'fallback-2',
        title: 'Void Analytics',
        slug: 'void-analytics',
        description: 'Real-time data visualization engine for high-velocity interstellar transmission packets.',
        techStack: [{ name: 'Three.js' }, { name: 'React' }],
        category: 'Data Viz',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Void Analytics provides a 3D interface for visualizing complex data streams. It uses WebGL to render millions of data points in real-time without performance degradation.',
        technologies: ['React', 'Three.js', 'WebGL', 'D3.js'],
        metrics: [
            { value: '60FPS', label: 'Performance' },
            { value: '1M+', label: 'Data Points' },
            { value: '0.1s', label: 'Load Time' }
        ],
        challenges: [
            'Rendering millions of points without dropping frames.',
            'Creating an intuitive 3D navigation system.',
            'Handling real-time websocket data streams.'
        ],
        results: [
            'Awarded "Best Data Viz Tool" 2025.',
            'Used by major research institutions.'
        ]
    },
    {
        id: 'fallback-3',
        title: 'Core Protocol',
        slug: 'core-protocol',
        description: 'Bespoke enterprise architecture for modern digital manufacturing and growth.',
        techStack: [{ name: 'TypeScript' }, { name: 'Node.js' }],
        category: 'Enterprise',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=3870&auto=format&fit=crop',
        longDescription: 'Core Protocol is a modular ERP system designed for manufacturing. It connects inventory, production, and logistics into a single unified dashboard.',
        technologies: ['TypeScript', 'Node.js', 'GraphQL', 'Docker'],
        metrics: [
            { value: '99.9%', label: 'Uptime' },
            { value: '500+', label: 'Integration' },
            { value: '50%', label: 'Cost Cut' }
        ],
        challenges: [
            'Migrating legacy data from various formats.',
            'Ensuring zero downtime during deployment.',
            'Training staff on the new system.'
        ],
        results: [
            'Streamlined production by 150%.',
            'Full ROI achieved in 6 months.'
        ]
    },
    {
        id: 'repo-1',
        title: 'Typing Speed Tester',
        slug: 'typing-speed-tester',
        description: 'A real-time typing speed tester with analytics and progress tracking.',
        techStack: [{ name: 'JavaScript' }, { name: 'HTML5' }],
        category: 'Tool',
        image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=3531&auto=format&fit=crop',
        longDescription: 'Typing Speed Tester is a lightweight application designed to help users improve their typing speed and accuracy. It features real-time WPM calculation, error tracking, and a sleek, distraction-free interface.',
        technologies: ['JavaScript', 'HTML5', 'CSS3', 'Local Storage'],
        metrics: [
            { value: '0ms', label: 'Input Latency' },
            { value: '100%', label: 'Offline' },
            { value: '5k+', label: 'Users' }
        ],
        challenges: [
            'Implementing accurate WPM calculation logic.',
            'Ensuring cross-browser compatibility.',
            'Optimizing DOM updates for smooth performance.'
        ],
        results: [
            'Used by thousands of students to improve typing skills.',
            'Lightweight and fast, with zero dependencies.'
        ],
        githubUrl: 'https://github.com/Zhovon/typing-speed-tester'
    },
    {
        id: 'repo-2',
        title: 'Live Weather',
        slug: 'live-weather',
        description: 'Real-time weather tracking application with interactive maps and warnings.',
        techStack: [{ name: 'React' }, { name: 'OpenWeather API' }],
        category: 'App',
        image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Live Weather provides accurate, hyper-local weather forecasts. It integrates with open weather APIs to deliver real-time data, including temperature, humidity, wind speed, and precipitation alerts.',
        technologies: ['React', 'Geocoding API', 'Chart.js', 'Tailwind CSS'],
        metrics: [
            { value: '200ms', label: 'API Response' },
            { value: '99%', label: 'Accuracy' },
            { value: 'Global', label: 'Coverage' }
        ],
        challenges: [
            'Handling API rate limits and caching data.',
            'Visualizing complex weather data intuitively.',
            'Managing state for multiple locations.'
        ],
        results: [
            'Reliable source for daily weather updates.',
            'Responsive design works on all devices.'
        ],
        githubUrl: 'https://github.com/Zhovon/Live-weather-'
    },
    {
        id: 'repo-3',
        title: 'Digital Marketing Hub',
        slug: 'digital-marketing',
        description: 'Comprehensive dashboard for tracking digital marketing campaigns and ROI.',
        techStack: [{ name: 'Next.js' }, { name: 'Analytics' }],
        category: 'SaaS',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
        longDescription: 'Digital Marketing Hub centralizes campaign data from social media, email, and ad platforms. It offers actionable insights to optimize marketing spend and improve conversion rates.',
        technologies: ['Next.js', 'Recharts', 'Supabase', 'Vercel'],
        metrics: [
            { value: '30%', label: 'ROI Incr.' },
            { value: 'All-in-1', label: 'Dashboard' },
            { value: 'Real-time', label: 'Sync' }
        ],
        challenges: [
            'Aggregating data from disparate sources.',
            'Creating customizable reporting widgets.',
            'Ensuring data privacy and security.'
        ],
        results: [
            'Empowered agencies to scale client reporting.',
            'Reduced manual reporting time by 80%.'
        ],
        githubUrl: 'https://github.com/Zhovon/Digital-Marketing'
    },
    {
        id: 'repo-4',
        title: 'Ecommerce Platform',
        slug: 'ecommerce-platform',
        description: 'Scalable e-commerce solution with integrated payment gateways and inventory management.',
        techStack: [{ name: 'Next.js' }, { name: 'Stripe' }],
        category: 'Commerce',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'A complete e-commerce solution featuring a custom cart implementation, secure checkout with Stripe, and a comprehensive admin dashboard for product and order management.',
        technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma'],
        metrics: [
            { value: '$1M+', label: 'Processed' },
            { value: '50ms', label: 'Cart Op' },
            { value: '99.9%', label: 'Uptime' }
        ],
        challenges: [
            'Implementing secure and compliant payment processing.',
            'Handling concurrent inventory updates.',
            'Optimizing image delivery for thousands of products.'
        ],
        results: [
            'Powering 50+ online stores.',
            'Zero downtime during Black Friday traffic spikes.'
        ],
        githubUrl: 'https://github.com/Zhovon/ecommerce'
    },
    {
        id: 'repo-5',
        title: 'InBio Portfolio',
        slug: 'inbio-portfolio',
        description: 'Modern, minimalist developer portfolio template designed for performance.',
        techStack: [{ name: 'React' }, { name: 'Framer' }],
        category: 'Template',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=3555&auto=format&fit=crop',
        longDescription: 'InBio is a high-performance portfolio template for developers. It features scroll-driven animations, a dynamic project showcase, and a built-in contact form.',
        technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Vercel'],
        metrics: [
            { value: '100', label: 'Lighthouse' },
            { value: '<1s', label: 'LCP' },
            { value: '100+', label: 'Forks' }
        ],
        challenges: [
            'Balancing rich animations with performance.',
            'Ensuring accessibility across all interactive elements.',
            'Creating a flexible content management structure.'
        ],
        results: [
            'Widely adopted by the developer community.',
            'Featured in "Top React Templates" lists.'
        ],
        githubUrl: 'https://github.com/Zhovon/inbio-portfolio'
    },
    {
        id: 'repo-6',
        title: 'Turbo Plugin',
        slug: 'turbo-plugin',
        description: 'High-performance utility plugin for accelerating web development workflows.',
        techStack: [{ name: 'JavaScript' }, { name: 'Node.js' }],
        category: 'DevTool',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=3538&auto=format&fit=crop',
        longDescription: 'Turbo Plugin optimizes build processes and runtime performance. It includes tools for automatic code splitting, asset compression, and lazy loading.',
        technologies: ['JavaScript', 'Webpack', 'Node.js', 'Babel'],
        metrics: [
            { value: '50%', label: 'Build Time' },
            { value: '30%', label: 'Bundle Size' },
            { value: '5k', label: 'Downloads' }
        ],
        challenges: [
            'Reverse-engineering complex build tools.',
            'Ensuring compatibility with major frameworks.',
            'Minimizing overhead in development mode.'
        ],
        results: [
            'Standardized in 10+ enterprise projects.',
            'Saved hundreds of developer hours.'
        ],
        githubUrl: 'https://github.com/Zhovon/turbo-plugin'
    },
    {
        id: 'repo-8',
        title: 'Foundation AI',
        slug: 'foundation-ai',
        description: 'AI-assisted donation guide writing platform.',
        techStack: [{ name: 'JavaScript' }, { name: 'AI Generator' }],
        category: 'AI',
        image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'An AI-powered tool built to help foundations and nonprofits generate compelling donation guides efficiently, streamlining the fundraising process.',
        technologies: ['JavaScript', 'OpenAI API', 'React'],
        metrics: [
            { value: '10x', label: 'Faster Writing' }
        ],
        githubUrl: 'https://github.com/Zhovon/Foundation'
    },
    {
        id: 'repo-9',
        title: 'CRM Portfolio',
        slug: 'crm-portfolio',
        description: 'Modern portfolio ecosystem with a built-in CRM system for lead tracking.',
        techStack: [{ name: 'TypeScript' }, { name: 'CRM' }],
        category: 'SaaS',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'A versatile portfolio template that doubles as a business management tool, including a built-in CRM to track incoming leads directly from the site.',
        technologies: ['TypeScript', 'Next.js', 'Database Integration'],
        metrics: [
            { value: 'All-in-1', label: 'Solution' }
        ],
        githubUrl: 'https://github.com/Zhovon/portfolio-'
    }
]

export function getFeaturedProjects(): Project[] {
    return FALLBACK_PROJECTS
}

export function getProjectBySlug(slug: string) {
    return FALLBACK_PROJECTS.find(p => p.slug === slug)
}

export function getNextProject(currentSlug: string) {
    const currentIndex = FALLBACK_PROJECTS.findIndex(p => p.slug === currentSlug)
    if (currentIndex === -1) return null
    return FALLBACK_PROJECTS[(currentIndex + 1) % FALLBACK_PROJECTS.length]
}

export function getAllProjects() {
    return FALLBACK_PROJECTS
}
