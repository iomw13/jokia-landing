import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    // Al usar "class", Tailwind activa dark: solo cuando <html> tiene class="dark"
    // Como la web SIEMPRE será oscura, agregamos "dark" hardcodeada en el layout.tsx
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                jokia: {
                    primary: '#C23BFF', // violeta neon (consistente con los componentes)
                    secondary: '#7850FF',
                    accent: '#00ff00',
                    dark: '#0A0A0F',
                    darker: '#050509',
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                glow: '0 0 20px rgba(194, 59, 255, 0.15)',
                'glow-lg': '0 0 40px rgba(194, 59, 255, 0.2)',
                'glow-purple': '0 0 20px rgba(194, 59, 255, 0.15)',
                glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            },
            animation: {
                'border-beam':
                    'border-beam calc(var(--duration)*1s) infinite linear',
                'fade-in': 'fade-in 0.5s ease-out forwards',
                float: 'float 6s ease-in-out infinite',
            },
            keyframes: {
                'border-beam': {
                    '100%': {
                        'offset-distance': '100%',
                    },
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
