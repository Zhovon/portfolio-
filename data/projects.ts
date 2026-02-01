export interface Project {
    id: string
    title: string
    slug: string
    description: string
    longDescription: string
    technologies: string[]
    category: 'Web Application' | 'SaaS' | 'Template' | 'Tool' | 'E-commerce'
    image: string
    githubUrl?: string
    liveUrl?: string
    featured: boolean
    metrics?: {
        label: string
        value: string
    }[]
    challenges?: string[]
    solutions?: string[]
    results?: string[]
}

export const projects: Project[] = [
    {
        id: '1',
        title: 'Typing Master Pro',
        slug: 'typing-master-pro',
        description: 'AI-powered typing speed tester with real-time analytics and intelligent performance feedback',
        longDescription: 'A comprehensive typing speed testing application featuring real-time WPM tracking, AI-powered feedback, multiple difficulty levels, and detailed progress analytics. Built with modern web technologies for a seamless user experience across all devices.',
        technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Tailwind CSS', 'Font Awesome'],
        category: 'Web Application',
        image: '/images/projects/typing-master.png',
        githubUrl: 'https://github.com/Zhovon/typing-speed-tester',
        liveUrl: 'https://typing-master.zhovon.com',
        featured: true,
        metrics: [
            { label: 'Performance Score', value: '98/100' },
            { label: 'Load Time', value: '<1s' },
            { label: 'Mobile Responsive', value: '100%' }
        ],
        challenges: [
            'Implementing real-time WPM calculation with high accuracy',
            'Creating an AI-powered feedback system for personalized improvement tips',
            'Designing an intuitive UI that works across all device sizes',
            'Managing session history and progress tracking without a backend'
        ],
        solutions: [
            'Developed custom algorithms for precise WPM and accuracy calculations',
            'Implemented intelligent pattern recognition for error analysis',
            'Used Tailwind CSS with custom responsive breakpoints',
            'Leveraged localStorage for client-side data persistence'
        ],
        results: [
            'Achieved 98+ Lighthouse performance score',
            'Zero backend dependencies - pure frontend application',
            'Support for 4 keyboard layouts (QWERTY, AZERTY, Colemak, Dvorak)',
            'Dark/Light theme with system auto-detection'
        ]
    },
    {
        id: '2',
        title: 'Digital Marketing Agency Template',
        slug: 'digital-marketing-template',
        description: 'Modern, conversion-focused agency website template with SEO optimization and mobile-responsive design',
        longDescription: 'A professional website template designed specifically for digital marketing agencies, SEO specialists, and marketing consultants. Features modern aesthetics, conversion-optimized layouts, and easy customization options.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'SEO Optimization'],
        category: 'Template',
        image: '/images/projects/digital-marketing.png',
        githubUrl: 'https://github.com/Zhovon/Digital-Marketing',
        liveUrl: 'https://marketing-template.zhovon.com',
        featured: true,
        metrics: [
            { label: 'SEO Score', value: '95/100' },
            { label: 'Conversion Rate', value: '+40%' },
            { label: 'Page Speed', value: 'A+' }
        ],
        challenges: [
            'Creating a template that works for various agency types',
            'Optimizing for both aesthetics and conversion rates',
            'Ensuring easy customization for non-technical users',
            'Implementing SEO best practices throughout'
        ],
        solutions: [
            'Modular component-based architecture for flexibility',
            'Strategic CTA placement based on conversion research',
            'Well-documented code with clear customization guides',
            'Semantic HTML with proper meta tags and structured data'
        ],
        results: [
            '95+ SEO score out of the box',
            'Mobile-first responsive design',
            'Conversion-optimized layout with strategic CTAs',
            'Easy customization with CSS variables'
        ]
    },
    {
        id: '3',
        title: 'Live Weather Dashboard',
        slug: 'live-weather-dashboard',
        description: 'Real-time weather tracking application with API integration and interactive visualizations',
        longDescription: 'A dynamic weather dashboard that provides real-time weather data using external APIs. Features include current conditions, forecasts, interactive maps, and location-based weather tracking.',
        technologies: ['JavaScript', 'Weather API', 'Chart.js', 'Geolocation API', 'CSS3'],
        category: 'Web Application',
        image: '/images/projects/weather-dashboard.png',
        githubUrl: 'https://github.com/Zhovon/Live-weather-',
        liveUrl: 'https://weather.zhovon.com',
        featured: false,
        metrics: [
            { label: 'API Response', value: '<200ms' },
            { label: 'Data Accuracy', value: '99.9%' },
            { label: 'Uptime', value: '99.5%' }
        ],
        challenges: [
            'Handling API rate limits efficiently',
            'Displaying complex weather data in an intuitive way',
            'Implementing accurate geolocation detection',
            'Managing real-time data updates'
        ],
        solutions: [
            'Implemented smart caching to reduce API calls',
            'Created custom data visualizations with Chart.js',
            'Used browser Geolocation API with fallback options',
            'Set up efficient polling mechanism for live updates'
        ],
        results: [
            'Sub-200ms API response times',
            'Support for multiple locations',
            '7-day forecast with hourly breakdowns',
            'Interactive weather maps and charts'
        ]
    },
    {
        id: '4',
        title: 'E-commerce Refund Management Addon',
        slug: 'ecommerce-refund-addon',
        description: 'Streamlined refund processing system for e-commerce platforms with automated workflows',
        longDescription: 'A comprehensive addon for e-commerce platforms that automates and simplifies the refund process. Features include automated refund approvals, customer communication, and detailed analytics.',
        technologies: ['PHP', 'MySQL', 'JavaScript', 'REST API', 'Payment Gateway Integration'],
        category: 'E-commerce',
        image: '/images/projects/refund-addon.png',
        githubUrl: 'https://github.com/Zhovon/ecommerce-refund-addon',
        featured: false,
        metrics: [
            { label: 'Processing Time', value: '-60%' },
            { label: 'Customer Satisfaction', value: '+35%' },
            { label: 'Manual Work', value: '-80%' }
        ],
        challenges: [
            'Integrating with multiple payment gateways',
            'Automating complex refund approval workflows',
            'Ensuring secure transaction handling',
            'Providing real-time status updates to customers'
        ],
        solutions: [
            'Built universal payment gateway adapter pattern',
            'Implemented rule-based automation engine',
            'Used industry-standard encryption and security practices',
            'Created webhook-based notification system'
        ],
        results: [
            '60% reduction in refund processing time',
            '80% decrease in manual administrative work',
            '35% improvement in customer satisfaction scores',
            'Support for major payment gateways (Stripe, PayPal, etc.)'
        ]
    },
    {
        id: '5',
        title: 'Portfolio CMS Platform',
        slug: 'portfolio-cms',
        description: 'Modern portfolio website with built-in CRM and content management system',
        longDescription: 'A full-featured portfolio platform combining a beautiful frontend with a powerful CRM system. Designed for freelancers and agencies to showcase work and manage client relationships.',
        technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'Tailwind CSS'],
        category: 'SaaS',
        image: '/images/projects/portfolio-cms.png',
        githubUrl: 'https://github.com/Zhovon/portfolio-',
        liveUrl: 'https://zhovon.com',
        featured: true,
        metrics: [
            { label: 'Lighthouse Score', value: '99/100' },
            { label: 'Build Time', value: '<30s' },
            { label: 'Bundle Size', value: '<200KB' }
        ],
        challenges: [
            'Creating a scalable CMS architecture',
            'Implementing real-time contact form with email notifications',
            'Optimizing for maximum performance',
            'Building a beautiful, modern UI that stands out'
        ],
        solutions: [
            'Leveraged Next.js 15 App Router for optimal performance',
            'Integrated Resend API for reliable email delivery',
            'Implemented code splitting and lazy loading',
            'Designed custom Emerald Nebula theme with smooth animations'
        ],
        results: [
            '99/100 Lighthouse performance score',
            'Sub-second page load times',
            'Automated email responses with branded templates',
            'Fully responsive across all devices'
        ]
    }
]

// Helper functions
export function getFeaturedProjects(): Project[] {
    return projects.filter(p => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find(p => p.slug === slug)
}

export function getProjectsByCategory(category: Project['category']): Project[] {
    return projects.filter(p => p.category === category)
}

export function getNextProject(currentSlug: string): Project {
    const currentIndex = projects.findIndex(p => p.slug === currentSlug)
    const nextIndex = (currentIndex + 1) % projects.length
    return projects[nextIndex]
}

