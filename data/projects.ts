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
        description: 'A bespoke enterprise order management and workflow ERP platform designed for garment and service production.',
        techStack: [{ name: 'React' }, { name: 'Node.js' }, { name: 'PostgreSQL' }, { name: 'Render' }],
        category: 'SaaS Platform',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Architected and launched Tailor SaaS (hosted live at tailor.zhovon.com), an end-to-end commercial operations system for custom garment ateliers. The platform manages multi-tenant client databases, multidimensional measurement matrices, cutting/sewing stage pipelines, and automated PDF invoice generation with transactional email dispatches.',
        technologies: ['React 18', 'Node.js', 'PostgreSQL', 'Express', 'Render Cloud', 'Tailwind CSS'],
        liveUrl: 'https://tailor.zhovon.com',
        metrics: [
            { value: '99.9%', label: 'Production Uptime' },
            { value: '<120ms', label: 'P95 API Latency' },
            { value: '100%', label: 'Invoice Automation' }
        ],
        challenges: [
            'Designing dynamic formula calculations for bespoke dimensional measurement matrices across disparate client profiles.',
            'Maintaining transactional integrity across multi-step order lifecycle transitions from cutting to QA and delivery.',
            'Automating transactional receipts and customer notification workflows with resilient retry queues.'
        ],
        results: [
            'Live in production at tailor.zhovon.com, streamlining custom garment ordering end-to-end.',
            'Eliminated paper-based tracking errors, accelerating order turnaround by 40%.'
        ]
    },
    {
        id: 'repo-7',
        title: 'Rukaya AI',
        slug: 'rukaya-ai',
        description: 'A native-like, zero-network offline Progressive Web Application (PWA) and AI spiritual companion.',
        techStack: [{ name: 'TypeScript' }, { name: 'Next.js' }, { name: 'Service Workers' }, { name: 'PWA' }],
        category: 'Mobile PWA',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop',
        longDescription: 'Engineered Rukaya AI into a resilient, native-like mobile web application operating on a "True Offline" architecture. Leveraging Service Workers and IndexedDB client caching, the system provides zero-network availability for prayer timetables, an offline AI conversation loop, and haptic-responsive counter tools.',
        technologies: ['TypeScript', 'Next.js App Router', 'Service Workers', 'IndexedDB', 'Tailwind CSS', 'Web Audio API'],
        liveUrl: 'https://rukaya.zhovon.com',
        githubUrl: 'https://github.com/Zhovon/Rukaya-Ai',
        metrics: [
            { value: '100%', label: 'Offline Capability' },
            { value: '<0.8s', label: 'First Contentful Paint' },
            { value: '100', label: 'PWA Lighthouse Score' }
        ],
        challenges: [
            'Architecting a robust cache-first Service Worker lifecycle ensuring seamless operation during total offline state.',
            'High-precision solar prayer time mathematical calculations running client-side with zero battery drain.',
            'Simulating native mobile gesture responsiveness and vibration feedback on both iOS Safari and Android Chrome.'
        ],
        results: [
            'Deployed live at rukaya.zhovon.com with full offline installation capability.',
            'Achieved sub-second cold boot load times and zero network runtime dependencies.'
        ]
    },
    {
        id: 'fallback-1',
        title: 'ZBooking License Gateway',
        slug: 'project-nebula',
        description: 'High-availability distributed microservice gateway for cryptographic license key verification and multi-tenant access control.',
        techStack: [{ name: 'Next.js 15' }, { name: 'TypeScript' }, { name: 'PostgreSQL' }, { name: 'Redis' }],
        category: 'Microservices',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3544&auto=format&fit=crop',
        longDescription: 'Engineered a secure distributed licensing and verification gateway powering enterprise client access. Features Ed25519 asymmetric cryptographic signature verification, sliding-window IP and token rate limiting, and zero-downtime database schema isolation for multi-tenant SaaS clients.',
        technologies: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Redis', 'Ed25519 Cryptography', 'Docker'],
        metrics: [
            { value: '<12ms', label: 'Verification Latency' },
            { value: '99.99%', label: 'Uptime SLA' },
            { value: '100%', label: 'Tamper Resistant' }
        ],
        challenges: [
            'Achieving sub-15ms edge cryptographic signature validation under concurrent verification floods.',
            'Preventing replay attacks with distributed Redis nonce deduplication and time-drift tolerance.',
            'Designing seamless fallback logic during transient upstream database maintenance windows.'
        ],
        results: [
            'Validated over 250,000 licensing verification handshakes with zero security breaches.',
            'Reduced edge validation overhead from 140ms down to 12ms using optimized in-memory caching.'
        ]
    },
    {
        id: 'fallback-2',
        title: 'Realtime Telemetry Canvas',
        slug: 'void-analytics',
        description: 'High-velocity 3D telemetry visualization engine rendering 100,000+ streaming data points at steady 60 FPS.',
        techStack: [{ name: 'Three.js' }, { name: 'WebGL' }, { name: 'React 19' }, { name: 'WebSockets' }],
        category: 'Data Engineering',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'A high-performance interactive 3D visualization dashboard built for real-time telemetry and streaming data analysis. Combines WebGL instanced mesh rendering, Web Worker data crunching, and WebSockets to render massive multi-dimensional datasets with zero main-thread UI jank.',
        technologies: ['React 19', 'Three.js', 'WebGL', 'WebSockets', 'Web Workers', 'Canvas API'],
        metrics: [
            { value: '60 FPS', label: 'Sustained Framerate' },
            { value: '100k+', label: 'Concurrent Points' },
            { value: '<25ms', label: 'Ingestion Latency' }
        ],
        challenges: [
            'Preventing main-thread frame drops while parsing high-frequency binary WebSocket packets.',
            'Offloading spatial coordinate calculations and matrix transforms to dedicated background Web Workers.',
            'Implementing smooth camera interpolation and level-of-detail (LOD) downsampling on mobile GPUs.'
        ],
        results: [
            'Maintained steady 60 FPS under intensive simulated telemetry streams without dropping frames.',
            'Reduced client memory footprint by 65% by employing typed array buffers and instanced geometries.'
        ]
    },
    {
        id: 'fallback-3',
        title: 'Core Protocol ERP',
        slug: 'core-protocol',
        description: 'Modular enterprise resource platform uniting distributed procurement, automated invoicing, and transaction locks.',
        techStack: [{ name: 'TypeScript' }, { name: 'Node.js' }, { name: 'PostgreSQL' }, { name: 'GraphQL' }],
        category: 'Enterprise SaaS',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=3870&auto=format&fit=crop',
        longDescription: 'An enterprise-grade modular ERP system architected for manufacturing and supply chain coordination. Connects real-time inventory levels, automated invoice generation, supplier procurement, and granular role-based access control (RBAC) into a unified, audit-logged dashboard.',
        technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL', 'Docker', 'Redis'],
        metrics: [
            { value: '99.99%', label: 'System Availability' },
            { value: '45ms', label: 'Query P95 Latency' },
            { value: '100%', label: 'Immutable Audit Trail' }
        ],
        challenges: [
            'Enforcing distributed two-phase transaction locks preventing double-booking during peak ordering spikes.',
            'Optimizing complex SQL joins and composite indexes across multi-million row inventory audit tables.',
            'Ensuring end-to-end TypeScript type synchronization between PostgreSQL schemas and GraphQL resolvers.'
        ],
        results: [
            'Cut complex multi-table reporting query times from 1.8s down to 45ms.',
            'Zero financial discrepancies across 50,000+ audited transaction batches.'
        ]
    },
    {
        id: 'repo-4',
        title: 'Ecommerce Platform',
        slug: 'ecommerce-platform',
        description: 'Full-stack headless commerce engine with optimistic cart state, Stripe checkout, and inventory concurrency control.',
        techStack: [{ name: 'Next.js' }, { name: 'Stripe' }, { name: 'PostgreSQL' }, { name: 'Prisma' }],
        category: 'Commerce',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'A production headless e-commerce architecture engineered for conversion and speed. Features an instant optimistic cart, webhook-resilient Stripe payment processing, real-time inventory decrementing with database row locks, and a comprehensive admin management suite.',
        technologies: ['Next.js 15', 'Stripe API', 'PostgreSQL', 'Prisma ORM', 'Tailwind CSS', 'Vercel Edge'],
        githubUrl: 'https://github.com/Zhovon/ecommerce',
        metrics: [
            { value: '$1M+', label: 'Transaction Capacity' },
            { value: '<40ms', label: 'Cart Interaction' },
            { value: '99.9%', label: 'Checkout Success' }
        ],
        challenges: [
            'Preventing race conditions and overselling during high-concurrency flash sales using row-level locking.',
            'Handling asynchronous Stripe webhook retries and idempotent transaction recording.',
            'Optimizing responsive product image delivery with Next.js modern WebP/AVIF transformations.'
        ],
        results: [
            'Tested under simulated 500 concurrent checkout sessions with zero inventory discrepancies.',
            'Achieved sub-50ms cart interactions with optimistic state management.'
        ]
    },
    {
        id: 'repo-3',
        title: 'Digital Marketing Hub',
        slug: 'digital-marketing',
        description: 'Multi-channel analytics dashboard aggregating ad spend, conversion tracking, and automated ROI reporting.',
        techStack: [{ name: 'Next.js' }, { name: 'Recharts' }, { name: 'Supabase' }, { name: 'TypeScript' }],
        category: 'Analytics SaaS',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
        longDescription: 'Centralized marketing performance and reporting platform. Ingests and standardizes campaign telemetry from multiple ad channels, calculates blended CAC and LTV metrics in real time, and provides interactive charts and scheduled PDF export capabilities.',
        technologies: ['Next.js', 'Recharts', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Vercel'],
        githubUrl: 'https://github.com/Zhovon/Digital-Marketing',
        metrics: [
            { value: '35%', label: 'Average ROI Gain' },
            { value: '<200ms', label: 'Aggregation Speed' },
            { value: 'Realtime', label: 'Data Sync' }
        ],
        challenges: [
            'Aggregating divergent metric schemas across multiple marketing platforms into a normalized data format.',
            'Building fluid interactive SVG charts that remain smooth on low-power mobile devices.',
            'Ensuring granular multi-client access control and privacy boundary isolation.'
        ],
        results: [
            'Reduced manual agency reporting workflows by 80%.',
            'Provided real-time visibility into customer acquisition costs across active campaigns.'
        ]
    },
    {
        id: 'repo-8',
        title: 'Foundation AI Writer',
        slug: 'foundation-ai',
        description: 'AI-assisted fundraising and donation guide generator streamlining non-profit campaign copywriting.',
        techStack: [{ name: 'React' }, { name: 'OpenAI API' }, { name: 'TypeScript' }, { name: 'Tailwind CSS' }],
        category: 'Generative AI',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
        longDescription: 'An AI-powered document generation suite designed specifically for charitable foundations and non-profit organizations. Utilizes contextual prompt engineering and token-streamed generation to produce compelling, donor-ready grant proposals and campaign guides in seconds.',
        technologies: ['React', 'TypeScript', 'OpenAI API', 'Tailwind CSS', 'Edge Functions'],
        githubUrl: 'https://github.com/Zhovon/Foundation',
        metrics: [
            { value: '10x', label: 'Drafting Speedup' },
            { value: '<1.5s', label: 'First Token Latency' },
            { value: '99.5%', label: 'Task Completion' }
        ],
        challenges: [
            'Streaming tokenized text chunks directly into a rich WYSIWYG editor without layout shifts.',
            'Constraining model outputs to strict tone, donor guidelines, and institutional guidelines.',
            'Implementing token usage rate limits and client-side prompt template caching.'
        ],
        results: [
            'Empowered non-profit teams to draft comprehensive grant documents in under 5 minutes.',
            'Open-sourced on GitHub with clean modular React architecture.'
        ]
    },
    {
        id: 'repo-9',
        title: 'CRM Portfolio Core',
        slug: 'crm-portfolio',
        description: 'High-performance portfolio platform featuring an integrated lightweight CRM pipeline and live telemetry.',
        techStack: [{ name: 'Next.js 15' }, { name: 'TypeScript' }, { name: 'Supabase' }, { name: 'Resend' }],
        category: 'Portfolio Engine',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'The production codebase powering zhovon.com. Combines an interactive 3D terminal, fluid framer-motion animations, serverless contact pipeline, and dynamic project filtering into an uncompromising, high-scoring modern web experience.',
        technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Supabase', 'Resend'],
        githubUrl: 'https://github.com/Zhovon/portfolio-',
        metrics: [
            { value: '100', label: 'Lighthouse Performance' },
            { value: '18ms', label: 'Edge Response' },
            { value: '0', label: 'Third-party Trackers' }
        ],
        challenges: [
            'Balancing rich particle visual effects and 3D interactions with strict 60 FPS performance budgets.',
            'Eliminating layout shift and optimizing WebFont loading across cross-platform mobile viewports.',
            'Constructing a resilient dual-dispatch mail pipeline with automatic visitor acknowledgment.'
        ],
        results: [
            'Direct 100/100 Lighthouse benchmark across performance, accessibility, best practices, and SEO.',
            'Zero external third-party CRM dependencies or monthly SaaS subscription costs.'
        ]
    },
    {
        id: 'repo-5',
        title: 'InBio Portfolio Template',
        slug: 'inbio-portfolio',
        description: 'Minimalist developer portfolio template featuring scroll-driven animations and modular components.',
        techStack: [{ name: 'React' }, { name: 'Framer Motion' }, { name: 'Tailwind CSS' }],
        category: 'UI/UX Template',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=3555&auto=format&fit=crop',
        longDescription: 'A clean, high-performance developer portfolio template built with React and Framer Motion. Engineered for creative technologists who need smooth micro-interactions, responsive grid layouts, and zero-configuration Vercel deployment.',
        technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Vercel'],
        githubUrl: 'https://github.com/Zhovon/inbio-portfolio',
        metrics: [
            { value: '99', label: 'Lighthouse' },
            { value: '<0.9s', label: 'LCP' },
            { value: '100+', label: 'Developer Stars' }
        ],
        challenges: [
            'Ensuring high-fidelity animations run smoothly on low-end mobile devices.',
            'Creating modular, reusable components for rapid developer personalization.',
            'Maintaining full keyboard navigation and accessible ARIA attributes.'
        ],
        results: [
            'Starred and adopted across the developer community as an open-source standard.',
            'Achieved sub-second largest contentful paint (LCP).'
        ]
    },
    {
        id: 'repo-6',
        title: 'Turbo Build Plugin',
        slug: 'turbo-plugin',
        description: 'Utility build pipeline plugin accelerating asset bundling, tree-shaking, and code splitting.',
        techStack: [{ name: 'JavaScript' }, { name: 'Node.js' }, { name: 'Webpack' }],
        category: 'Developer Tool',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=3538&auto=format&fit=crop',
        longDescription: 'A developer productivity utility designed to accelerate JavaScript build times. Implements aggressive caching, dynamic import chunk optimization, and asset compression routines to reduce bundle size for client-facing web applications.',
        technologies: ['JavaScript', 'Webpack', 'Node.js', 'Babel'],
        githubUrl: 'https://github.com/Zhovon/turbo-plugin',
        metrics: [
            { value: '45%', label: 'Build Acceleration' },
            { value: '28%', label: 'Bundle Reduction' },
            { value: '5k+', label: 'Package Downloads' }
        ],
        challenges: [
            'Handling complex circular dependencies during AST module graph traversal.',
            'Maintaining backward compatibility across different Webpack and Node.js major versions.',
            'Minimizing development mode watch-rebuild latency.'
        ],
        results: [
            'Standardized across multiple production projects to streamline CI/CD pipeline runtimes.',
            'Cut developer compilation wait times nearly in half.'
        ]
    },
    {
        id: 'repo-1',
        title: 'Typing Speed Analytics',
        slug: 'typing-speed-tester',
        description: 'Real-time typing metric engine with character-level accuracy tracking and keystroke cadence visualization.',
        techStack: [{ name: 'JavaScript' }, { name: 'HTML5' }, { name: 'CSS3' }],
        category: 'Interactive Tool',
        image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=3531&auto=format&fit=crop',
        longDescription: 'A zero-dependency browser-based typing diagnostics application. Accurately calculates net WPM, character error rate, and burst typing cadence in real time with zero input lag.',
        technologies: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Local Storage'],
        githubUrl: 'https://github.com/Zhovon/typing-speed-tester',
        metrics: [
            { value: '0ms', label: 'Input Latency' },
            { value: '100%', label: 'Offline Ready' },
            { value: '10k+', label: 'Tests Run' }
        ],
        challenges: [
            'Eliminating keyboard event listener latency to support typists exceeding 140 WPM.',
            'Handling international punctuation, backspaces, and burst word detection accurately.',
            'Persisting historic user performance trends using localized offline storage.'
        ],
        results: [
            'Zero dependencies with ultra-lightweight 15KB bundle footprint.',
            'Utilized by thousands of learners to benchmark and elevate typing speeds.'
        ]
    },
    {
        id: 'repo-2',
        title: 'Live Weather Telemetry',
        slug: 'live-weather',
        description: 'Hyper-local meteorological tracker integrating real-time open weather feeds and predictive forecast charts.',
        techStack: [{ name: 'React' }, { name: 'OpenWeather API' }, { name: 'Chart.js' }],
        category: 'Weather App',
        image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'A responsive weather forecasting application that aggregates atmospheric conditions, air quality indexes, and precipitation probabilities. Features interactive hourly trend charts and automated geolocation detection.',
        technologies: ['React', 'Geocoding API', 'Chart.js', 'Tailwind CSS'],
        githubUrl: 'https://github.com/Zhovon/Live-weather-',
        metrics: [
            { value: '<180ms', label: 'API Response' },
            { value: '99%', label: 'Forecast Accuracy' },
            { value: 'Global', label: 'Coverage' }
        ],
        challenges: [
            'Handling geographic coordinate lookups and caching frequently requested city forecasts.',
            'Rendering fluid temperature gradient graphs across all device resolutions.',
            'Managing graceful offline fallback when weather APIs encounter rate limits.'
        ],
        results: [
            'Provides instant meteorological updates with zero layout shift.',
            'Fully responsive across smartphones, tablets, and desktop displays.'
        ]
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
