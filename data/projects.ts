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
    // --- RECENT OFFICE & ENTERPRISE SYSTEMS ---
    {
        id: 'real-crm',
        title: 'BIW CRM & Staff Operations System',
        slug: 'biw-crm-system',
        description: 'Multi-role enterprise CRM & ticketing platform with dynamic room allocation, sequence-guaranteed staff UIDs, and real-time webhook sync.',
        techStack: [{ name: 'Next.js 16' }, { name: 'React Query' }, { name: 'PostgreSQL' }, { name: 'Supabase Auth' }],
        category: 'Enterprise CRM / Operations',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Architected and developed a full-stack staff management and ticketing ecosystem. The platform enforces multi-role security (Owner, Therapist, Staff), provides interactive room assignments, and resolves Postgres sequence drift through chronological joining-date UID re-ordering (`BIW 0001`). All database updates trigger real-time Google Sheets webhooks without disrupting user authentication credentials.',
        technologies: ['Next.js 16', 'React Query', 'TypeScript', 'PostgreSQL', 'Supabase Auth', 'Tailwind CSS'],
        metrics: [
            { value: '100%', label: 'UID Chronology' },
            { value: '0 Drift', label: 'DB Sequences' },
            { value: '<200ms', label: 'Webhook Sync' }
        ]
    },
    {
        id: 'real-shopify',
        title: 'Shopify Service Booking & Liquid Engine',
        slug: 'shopify-booking-engine',
        description: 'Seamless Shopify 2.0 integration displaying interactive appointment booking modals for service products while preserving standard checkout for physical items.',
        techStack: [{ name: 'Shopify Liquid' }, { name: 'Next.js Embed' }, { name: 'HTML5/CSS3' }],
        category: 'E-Commerce / Storefront Automation',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Engineered an intelligent storefront snippet that inspects Shopify product tags (`product.tags contains "Service"`). It automatically replaces default "Add to Cart" / "Buy Now" buttons with a sleek "Book Appointment" trigger that opens a high-performance modal overlay. Configured Next.js headers (`frame-ancestors`) to ensure secure iFrame cross-origin communication.',
        technologies: ['Shopify Liquid', 'JavaScript (ES6)', 'Next.js App Embed', 'CSS Backdrop Filter'],
        metrics: [
            { value: '0', label: 'Theme Leakage' },
            { value: '100%', label: 'Mobile Responsive' },
            { value: 'Instant', label: 'Modal Trigger' }
        ]
    },
    {
        id: 'real-migration',
        title: 'Employee Roster & Sequence Migration Engine',
        slug: 'employee-roster-migration',
        description: 'Automated python-powered migration pipeline to import branch employee records, chronologically sort joining dates, and regenerate staff UIDs.',
        techStack: [{ name: 'Python 3' }, { name: 'SQLAlchemy' }, { name: 'PostgreSQL' }],
        category: 'Data Engineering & Utilities',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Built custom data engineering scripts to process incoming branch employee data files. The engine parses raw roster datasets, chronologically ranks employee joining dates, regenerates sequential UIDs, and updates database records while preserving existing authentication credentials and triggering external webhooks.',
        technologies: ['Python 3', 'SQLAlchemy', 'PostgreSQL', 'Pandas', 'REST Webhooks'],
        metrics: [
            { value: '500+', label: 'Records Synced' },
            { value: '0%', label: 'Data Loss' },
            { value: 'Real-Time', label: 'Sync Pipeline' }
        ]
    },
    {
        id: 'real-ai-agent',
        title: 'Omnichannel AI Agent & Workflow Platform',
        slug: 'ai-agent-automation-platform',
        description: 'Multi-agent automation system connecting messaging channels, local LLM orchestration (Ollama), cloud AI models, and GitHub repository synchronization.',
        techStack: [{ name: 'N8n Workflows' }, { name: 'Ollama / Local LLM' }, { name: 'Python' }, { name: 'GitHub Actions' }],
        category: 'AI Engineering & Automation',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Designed an autonomous multi-agent orchestration architecture. Incorporates N8n workflows for message routing across WhatsApp, Instagram, and Messenger; local LLM deployment (Ollama) for privacy-conscious data processing; cloud GLM-5 integration for complex reasoning; and automated GitHub workflow YAMLs for multi-repo sync.',
        technologies: ['N8n Workflows', 'Ollama', 'Python', 'GitHub Actions', 'REST APIs'],
        metrics: [
            { value: 'Multi-Channel', label: 'Routing' },
            { value: '100%', label: 'Local AI Privacy' },
            { value: 'Automated', label: 'Git Sync' }
        ]
    },

    // --- CLIENT CMS & UI/UX DESIGN PROJECTS ---
    {
        id: 'cms-your-solution',
        title: 'Your Solution KSA',
        slug: 'your-solution-ksa',
        description: 'Enterprise technology solutions and corporate services platform tailored for clients in Saudi Arabia.',
        techStack: [{ name: 'WordPress' }, { name: 'PHP' }, { name: 'Elementor' }],
        category: 'Enterprise CMS / WordPress',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Designed and deployed a responsive corporate web portal for Your Solution KSA. Built on WordPress with custom styling, optimized page loads, and multi-language structural readiness for enterprise service delivery.',
        technologies: ['WordPress', 'PHP', 'MySQL', 'Elementor', 'CSS3'],
        liveUrl: 'https://yoursolutionksa.com/'
    },
    {
        id: 'cms-biw-salon',
        title: 'BIW Salon & Luxury Service Portal',
        slug: 'biw-salon-portal',
        description: 'Luxury salon & beauty service portal featuring online service catalogs, pricing schedules, and appointment triggers.',
        techStack: [{ name: 'WordPress' }, { name: 'Shopify Embed' }, { name: 'PHP' }],
        category: 'E-Commerce & Service CMS',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Developed a high-end salon service portal for BIW Salon. Integrated custom service menus, appointment scheduling overlays, and responsive mobile layouts for premium customer experiences.',
        technologies: ['WordPress', 'Shopify Embed', 'PHP', 'JavaScript', 'Tailwind CSS'],
        liveUrl: 'https://biw.salon'
    },
    {
        id: 'cms-ip-tech',
        title: 'IP Tech Saudi Arabia',
        slug: 'ip-tech-saudi',
        description: 'Industrial technology solutions and infrastructure engineering platform for Saudi Arabia enterprise sector.',
        techStack: [{ name: 'WordPress' }, { name: 'PHP' }, { name: 'MySQL' }],
        category: 'Corporate CMS / Infrastructure',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Created an authoritative industrial platform for IP Tech Saudi Arabia, highlighting technical capabilities, engineering project portfolios, and corporate inquiry workflows.',
        technologies: ['WordPress', 'PHP', 'MySQL', 'Custom Theme', 'SEO'],
        liveUrl: 'https://iptech.com.sa/'
    },
    {
        id: 'uiux-pdf-edit-lab',
        title: 'PDF-Edit-Lab Product Design System',
        slug: 'pdf-edit-lab',
        description: 'Comprehensive UI/UX design system and interactive Figma prototype for an online PDF editing suite.',
        techStack: [{ name: 'Figma' }, { name: 'UI/UX Design' }, { name: 'Prototyping' }],
        category: 'Product Design & UI/UX',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=3555&auto=format&fit=crop',
        longDescription: 'Designed a complete product design suite for PDF-Edit-Lab. Built high-fidelity interactive prototypes in Figma, component libraries, dark/light interface systems, and user flow architectures.',
        technologies: ['Figma', 'UI/UX Prototyping', 'Design System', 'User Testing'],
        liveUrl: 'https://www.figma.com/proto/wxGzgFIG8nWmducJrUPLJT/PDF-Edit-Lab.com-project?node-id=16-2'
    },
    {
        id: 'cms-aggie-mutuma',
        title: 'Aggie Mutuma Leadership Platform',
        slug: 'aggie-mutuma',
        description: 'Executive leadership coaching, personal brand, and keynote speaker digital platform.',
        techStack: [{ name: 'WordPress' }, { name: 'PHP' }, { name: 'CSS3' }],
        category: 'Personal Brand CMS / WordPress',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Built a sleek personal brand platform for executive coach Aggie Mutuma. Features booking intake forms, media coverage highlights, and structured service offerings.',
        technologies: ['WordPress', 'PHP', 'CSS3', 'SEO', 'Lead Generation'],
        liveUrl: 'https://aggiemutuma.com/'
    },
    {
        id: 'cms-trans-bay-capital',
        title: 'Trans Bay Capital',
        slug: 'trans-bay-capital',
        description: 'Financial investment firm platform showcasing private equity assets, portfolio capital growth, and investor relations.',
        techStack: [{ name: 'WordPress' }, { name: 'PHP' }, { name: 'MySQL' }],
        category: 'Financial & Capital CMS',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Developed a corporate capital management platform for Trans Bay Capital, emphasizing portfolio security, investor disclosure materials, and executive leadership profiles.',
        technologies: ['WordPress', 'PHP', 'MySQL', 'Custom Styling', 'Security'],
        liveUrl: 'https://trans-baycap.com/'
    },
    {
        id: 'cms-bridgepoint-capital',
        title: 'Bridgepoint Capital Management',
        slug: 'bridgepoint-capital',
        description: 'Global private equity and investment capital platform featuring corporate portfolio management.',
        techStack: [{ name: 'WordPress' }, { name: 'PHP' }, { name: 'Custom Theme' }],
        category: 'Corporate Financial CMS',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Engineered a corporate web platform for Bridgepoint Capital. Features structured investment portfolio showcases, corporate compliance pages, and global office contact routes.',
        technologies: ['WordPress', 'PHP', 'Custom Theme', 'Financial Security'],
        liveUrl: 'https://www.bridgepoint.capital/'
    },

    // --- GITHUB REPOSITORIES & PRODUCTION APPS ---
    {
        id: 'repo-tailor',
        title: 'Tailor SaaS',
        slug: 'tailor-saas',
        description: 'A comprehensive SaaS platform tailored for bespoke service management and high-availability operations.',
        techStack: [{ name: 'React' }, { name: 'Render' }, { name: 'Node.js' }],
        category: 'SaaS Platform',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Designed and deployed Tailor SaaS, a production platform hosted at tailor.zhovon.com. Features advanced authentication, dynamic email verification workflows, and environment-aware configurations built to scale gracefully on Render.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Render'],
        liveUrl: 'https://tailor.zhovon.com',
        metrics: [{ value: '99.9%', label: 'Uptime' }, { value: 'Robust', label: 'Auth Flow' }]
    },
    {
        id: 'repo-rukaya',
        title: 'Rukaya AI',
        slug: 'rukaya-ai',
        description: 'A native-like mobile PWA Islamic companion with offline capabilities and AI guidance.',
        techStack: [{ name: 'TypeScript' }, { name: 'PWA' }, { name: 'Next.js' }],
        category: 'PWA / Mobile AI App',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Built on a "True Offline" PWA architecture with Service Workers and IndexedDB, ensuring full availability without an internet connection. Features an offline-first AI chatbot, haptic Tasbeeh counter, and native installation flow.',
        technologies: ['TypeScript', 'Next.js', 'Service Workers', 'IndexedDB', 'Tailwind CSS'],
        liveUrl: 'https://rukaya.zhovon.com',
        githubUrl: 'https://github.com/Zhovon/Rukaya-Ai',
        metrics: [{ value: '100%', label: 'Offline Ready' }, { value: 'Native', label: 'PWA Feel' }]
    },
    {
        id: 'repo-biw-tracking',
        title: 'Tracking System for BIW',
        slug: 'tracking-system-for-biw',
        description: 'Discord Mini application and task tracking system for BIW operational workflow management.',
        techStack: [{ name: 'TypeScript' }, { name: 'Discord SDK' }, { name: 'Next.js' }],
        category: 'Workflow & Team Tools',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Custom operational task tracker built specifically for BIW team communication and task logging. Features Discord Mini integration, activity streams, and status dashboards.',
        technologies: ['TypeScript', 'Discord API', 'Next.js', 'Tailwind CSS'],
        githubUrl: 'https://github.com/Zhovon/Tracking-System-For-BIW'
    },
    {
        id: 'repo-biw-tracker',
        title: 'BIW Activity & Task Tracker',
        slug: 'biw-tracker',
        description: 'Dedicated task manager for BIW back-office task scheduling and real-time activity status.',
        techStack: [{ name: 'TypeScript' }, { name: 'React' }, { name: 'Node.js' }],
        category: 'Management Systems',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Internal task management interface providing daily task logs, attendance metrics, and priority scheduling for operational personnel.',
        technologies: ['TypeScript', 'React', 'Node.js', 'Express'],
        githubUrl: 'https://github.com/Zhovon/BIW-Tracker-'
    },
    {
        id: 'repo-arcade-racer',
        title: 'DADADADA - Arcade Drift Racer',
        slug: 'arcade-drift-racer',
        description: 'Interactive canvas-driven 2D/3D arcade racing game with physics simulation and high-score tracking.',
        techStack: [{ name: 'TypeScript' }, { name: 'Next.js' }, { name: 'Canvas API' }],
        category: 'Game Engineering',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'High-frame-rate browser arcade drifting game featuring dynamic vehicle physics, track rendering, particle systems, and persistent high scores.',
        technologies: ['TypeScript', 'HTML5 Canvas', 'Next.js', 'Web Audio API'],
        githubUrl: 'https://github.com/Zhovon/DADADADA'
    },
    {
        id: 'repo-openclaw',
        title: 'OpenClaw Personal AI Assistant',
        slug: 'openclaw-ai-assistant',
        description: 'Cross-platform agentic AI assistant framework for multi-OS deployment and personal task execution.',
        techStack: [{ name: 'TypeScript' }, { name: 'Node.js' }, { name: 'Agentic SDK' }],
        category: 'AI Agents & Assistants',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Autonomous personal assistant platform designed to run across operating systems with localized file tools, command execution, and AI agent skills.',
        technologies: ['TypeScript', 'Node.js', 'LLM Prompting', 'Electron/CLI'],
        githubUrl: 'https://github.com/Zhovon/openclaw'
    },
    {
        id: 'repo-vscodium-rust',
        title: 'VSCodium Rust AI-Native IDE',
        slug: 'vscodium-rust-ai-ide',
        description: 'AI-native IDE integration with agentic workflows, PyTorch ML Studio, and ROCm-optimized local AI.',
        techStack: [{ name: 'Rust' }, { name: 'PyTorch' }, { name: 'TypeScript' }],
        category: 'DevTools & AI Systems',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Built for security researchers and cross-platform developers. Features iPhone emulation, PyTorch ML Studio integration, and ROCm-accelerated local LLM inference.',
        technologies: ['Rust', 'PyTorch', 'ROCm', 'C++', 'TypeScript'],
        githubUrl: 'https://github.com/Zhovon/vscodium-rust'
    },
    {
        id: 'repo-booking-plugin',
        title: 'Booking Plugin WP Alternative',
        slug: 'booking-plugin-wp',
        description: 'High-performance PHP booking plugin designed as a lightweight alternative to heavy WordPress extensions.',
        techStack: [{ name: 'PHP' }, { name: 'WordPress' }, { name: 'MySQL' }],
        category: 'CMS & Plugins',
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'A streamlined booking plugin architecture engineered for WordPress sites, reducing script size by 80% while retaining dynamic availability slots.',
        technologies: ['PHP 8', 'WordPress API', 'MySQL', 'JavaScript'],
        githubUrl: 'https://github.com/Zhovon/Booking-plugin-'
    },
    {
        id: 'repo-foundation',
        title: 'Foundation AI Guide Generator',
        slug: 'foundation-ai-guide-generator',
        description: 'AI-assisted writing engine for non-profits to generate compelling fundraising and donation guides.',
        techStack: [{ name: 'JavaScript' }, { name: 'React' }, { name: 'OpenAI API' }],
        category: 'AI Applications',
        image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Generative AI content tool that assists foundations in drafting tailored donation materials and donor campaign guidelines.',
        technologies: ['JavaScript', 'React', 'OpenAI API', 'Tailwind CSS'],
        githubUrl: 'https://github.com/Zhovon/Foundation'
    },
    {
        id: 'repo-educare',
        title: 'Educare Learning Platform',
        slug: 'educare-learning-platform',
        description: 'Interactive educational platform template with course modules, progress tracking, and student UI.',
        techStack: [{ name: 'HTML5' }, { name: 'CSS3' }, { name: 'JavaScript' }],
        category: 'EdTech / Web Apps',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Clean responsive educational portal featuring structured course layouts, video lessons, quiz interfaces, and student progress dashboards.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
        githubUrl: 'https://github.com/Zhovon/educare'
    },
    {
        id: 'repo-digital-marketing',
        title: 'Digital Marketing Analytics Hub',
        slug: 'digital-marketing-hub',
        description: 'Centralized campaign tracking dashboard for monitoring multi-channel ad performance and ROI.',
        techStack: [{ name: 'Next.js' }, { name: 'Recharts' }, { name: 'Supabase' }],
        category: 'Marketing Tech',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
        longDescription: 'Consolidates digital marketing metrics across ad channels, delivering real-time ROI tracking, campaign visualizations, and client reporting tools.',
        technologies: ['Next.js', 'Recharts', 'Supabase', 'Vercel'],
        githubUrl: 'https://github.com/Zhovon/Digital-Marketing'
    },
    {
        id: 'repo-pos',
        title: 'POS - Point of Sale Platform',
        slug: 'pos-point-of-sale-system',
        description: 'Full-featured web-based point-of-sale software for retail inventory, sales billing, and receipts.',
        techStack: [{ name: 'JavaScript' }, { name: 'Node.js' }, { name: 'SQLite/Postgres' }],
        category: 'Business Systems',
        image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Lightweight POS interface managing barcode items, daily sales registers, inventory counts, and printed customer receipts.',
        technologies: ['JavaScript', 'Node.js', 'Express', 'SQL'],
        githubUrl: 'https://github.com/Zhovon/POS'
    },
    {
        id: 'repo-python-ecommerce',
        title: 'Python E-Commerce Engine',
        slug: 'python-e-commerce-engine',
        description: 'Backend e-commerce system built with Python, featuring product catalogs and order processing.',
        techStack: [{ name: 'Python' }, { name: 'Flask/Django' }, { name: 'HTML5' }],
        category: 'E-Commerce Backends',
        image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Modular Python e-commerce application providing cart handling, checkout routes, admin inventory management, and database models.',
        technologies: ['Python', 'SQLAlchemy', 'HTML5/CSS3', 'Jinja2'],
        githubUrl: 'https://github.com/Zhovon/python-e-commerce'
    },

    {
        id: 'repo-turbo-plugin',
        title: 'Turbo Plugin Utility',
        slug: 'turbo-plugin-utility',
        description: 'High-performance utility plugin accelerating web asset compression and script delivery.',
        techStack: [{ name: 'PHP' }, { name: 'JavaScript' }, { name: 'Node.js' }],
        category: 'DevTools',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=3538&auto=format&fit=crop',
        longDescription: 'DevTool utility designed to compress runtime assets, automate lazy loading, and speed up page load speeds across CMS setups.',
        technologies: ['PHP', 'JavaScript', 'Webpack', 'Node.js'],
        githubUrl: 'https://github.com/Zhovon/turbo-plugin'
    },
    {
        id: 'repo-live-weather',
        title: 'Live Weather Tracker',
        slug: 'live-weather-tracker',
        description: 'Real-time weather tracking application with interactive maps, alerts, and OpenWeather API sync.',
        techStack: [{ name: 'PHP' }, { name: 'React' }, { name: 'OpenWeather API' }],
        category: 'API Utilities',
        image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Delivers hyper-local forecasts, temperature graphs, wind metrics, and severe weather notices synced via open weather APIs.',
        technologies: ['PHP', 'React', 'Geocoding API', 'Tailwind CSS'],
        githubUrl: 'https://github.com/Zhovon/Live-weather-'
    },
    {
        id: 'repo-deepsite',
        title: 'DeepSite Local Engine',
        slug: 'deepsite-local-engine',
        description: 'Autonomous deployment engine for orchestrating localized website preview nodes.',
        techStack: [{ name: 'TypeScript' }, { name: 'Node.js' }, { name: 'Docker' }],
        category: 'DevOps & Tooling',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Local development host engine allowing developers to generate instantaneous local site previews and staging environments.',
        technologies: ['TypeScript', 'Node.js', 'Express', 'CLI'],
        githubUrl: 'https://github.com/Zhovon/deepsite-for-local-'
    },
    {
        id: 'repo-marketing-suite',
        title: 'Marketing Analytics Suite',
        slug: 'marketing-analytics-suite',
        description: 'TypeScript-based marketing analytics platform for conversion funnel monitoring and lead tracking.',
        techStack: [{ name: 'TypeScript' }, { name: 'React' }, { name: 'PostgreSQL' }],
        category: 'Marketing Systems',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Comprehensive marketing performance platform tracking lead conversion rates, campaign touchpoints, and analytics visualizations.',
        technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Recharts'],
        githubUrl: 'https://github.com/Zhovon/Marketing'
    },
    {
        id: 'repo-typing-speed',
        title: 'Typing Speed Tester',
        slug: 'typing-speed-tester',
        description: 'Distraction-free typing speed analyzer with real-time WPM metrics, accuracy calculation, and analytics.',
        techStack: [{ name: 'JavaScript' }, { name: 'HTML5' }, { name: 'CSS3' }],
        category: 'Interactive Tools',
        image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=3531&auto=format&fit=crop',
        longDescription: 'Zero-latency typing speed test platform calculating WPM, error rates, and key precision over dynamic time windows.',
        technologies: ['JavaScript', 'HTML5', 'CSS3', 'Local Storage'],
        githubUrl: 'https://github.com/Zhovon/typing-speed-tester'
    },
    {
        id: 'repo-inbio',
        title: 'InBio Developer Portfolio',
        slug: 'inbio-portfolio',
        description: 'Modern minimalist developer portfolio theme featuring smooth scroll animations and project showcases.',
        techStack: [{ name: 'React' }, { name: 'Framer Motion' }, { name: 'HTML5' }],
        category: 'Portfolio Themes',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=3555&auto=format&fit=crop',
        longDescription: 'High-performance single-page developer showcase template built with smooth Framer Motion animations and responsive dark layout.',
        technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Vercel'],
        githubUrl: 'https://github.com/Zhovon/inbio-portfolio'
    },
    {
        id: 'repo-refund-addon',
        title: 'E-Commerce Refund Management Addon',
        slug: 'ecommerce-refund-addon',
        description: 'Automated refund calculation and order adjustment addon for online store platforms.',
        techStack: [{ name: 'PHP' }, { name: 'JavaScript' }, { name: 'SQL' }],
        category: 'E-Commerce Plugins',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Store plugin handling partial refunds, restock adjustments, and customer notification emails for e-commerce platforms.',
        technologies: ['PHP', 'JavaScript', 'MySQL', 'REST API'],
        githubUrl: 'https://github.com/Zhovon/ecommerce-refund-addon'
    },
    {
        id: 'repo-shifat',
        title: 'Shifat Custom UI Layout System',
        slug: 'shifat-ui-layout-system',
        description: 'Custom CSS grid and typography layout framework designed for modern web applications.',
        techStack: [{ name: 'CSS3' }, { name: 'HTML5' }],
        category: 'Design Systems',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=3555&auto=format&fit=crop',
        longDescription: 'Clean CSS utility framework offering flex/grid layout helpers, custom scrollbars, and dark mode components.',
        technologies: ['CSS3', 'HTML5', 'PostCSS'],
        githubUrl: 'https://github.com/Zhovon/shifat'
    },
    {
        id: 'repo-code-snippet',
        title: 'Code Snippet Repository',
        slug: 'code-snippet-repository',
        description: 'Developer snippet collection and code management repository for rapid function reuse.',
        techStack: [{ name: 'PHP' }, { name: 'SQL' }],
        category: 'Developer Utilities',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=3538&auto=format&fit=crop',
        longDescription: 'Organized code library storing reusable helper functions, database queries, and middleware snippets.',
        technologies: ['PHP', 'MySQL', 'JavaScript'],
        githubUrl: 'https://github.com/Zhovon/code-snippet'
    },
    {
        id: 'repo-wtfjs',
        title: 'WTFJS Tricky Examples Engine',
        slug: 'wtfjs-tricky-examples',
        description: 'A curated breakdown of edge cases, type coercion quirks, and tricky JavaScript behaviors.',
        techStack: [{ name: 'JavaScript' }],
        category: 'Language Insights',
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Interactive exploratory repository illustrating unexpected JavaScript engine evaluation cases and ECMAScript specifications.',
        technologies: ['JavaScript (ESNext)', 'Markdown'],
        githubUrl: 'https://github.com/Zhovon/wtfjs'
    },
    {
        id: 'repo-vai',
        title: 'V-AI Model Platform',
        slug: 'v-ai-model-platform',
        description: 'TypeScript platform for AI model interfacing and prompt management.',
        techStack: [{ name: 'TypeScript' }, { name: 'AI Models' }],
        category: 'AI Systems',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=3540&auto=format&fit=crop',
        longDescription: 'Custom AI integration layer for prompt engineering, token optimization, and multi-model response handling.',
        technologies: ['TypeScript', 'Node.js', 'REST API'],
        githubUrl: 'https://github.com/Zhovon/V-ai-'
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
