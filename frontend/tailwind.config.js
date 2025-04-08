/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}', './app/**/*.{js,jsx}', './src/**/*.{js,jsx}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(346.8, 77.2%, 49.8%)', // Ruby color
                    foreground: '#fff' // White for contrast
                },
                secondary: {
                    DEFAULT: 'hsl(346.8, 77.2%, 39.8%)', // Darker Ruby color
                    foreground: '#fff' // White for contrast
                },
                destructive: {
                    DEFAULT: 'hsl(346.8, 77.2%, 59.8%)', // Lighter Ruby color for destructive actions
                    foreground: '#fff' // White for contrast
                },
                muted: {
                    DEFAULT: 'hsl(346.8, 77.2%, 69.8%)', // Muted Ruby color
                    foreground: '#000' // Dark color for text
                },
                accent: {
                    DEFAULT: 'hsl(346.8, 77.2%, 49.8%)', // Accent Ruby color
                    foreground: '#fff' // White for contrast
                },
                popover: {
                    DEFAULT: 'hsl(346.8, 77.2%, 89.8%)', // Light Ruby for popover backgrounds
                    foreground: '#000' // Dark color for text
                },
                card: {
                    DEFAULT: 'hsl(346.8, 77.2%, 79.8%)', // Light Ruby for card backgrounds
                    foreground: '#000' // Dark color for text
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
}
