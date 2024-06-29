/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      'text': 'var(--text)',
      'background': 'var(--background)',
      'primary': 'var(--primary)',
      'secondary': 'var(--secondary)',
      'accent': 'var(--accent)',

      'text-light': 'var(--text-light)',
      'background-light': 'var(--background-light)',
      'primary-light': 'var(--primary-light)',
      'secondary-light': 'var(--secondary-light)',
      'accent-light': 'var(--accent-light)',

      'text-dark': 'var(--text-dark)',
      'background-dark': 'var(--background-dark)',
      'primary-dark': 'var(--primary-dark)',
      'secondary-dark': 'var(--secondary-dark)',
      'accent-dark': 'var(--accent-dark)',

      'card': 'var(--card)',
      'card-light': 'var(--card-light)',
      'card-dark': 'var(--card-dark)',
      'text-button': 'var(--text-button)',
      'border' : 'var(--border)',



      'red': {
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      'green': {
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
      },
      'blue': {
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      'orange': {
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
      },
      'yellow': {
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
      },
      'gray': {
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      'black': {
        100: '#e1e1e1',
        200: '#c2c2c2',
        300: '#a3a3a3',
        400: '#848484',
        500: '#656565',
        600: '#464646',
        700: '#272727',
        800: '#080808',
        900: '#000000',
      },
      'white': {
        100: '#ffffff',
        200: '#fefefe',
        300: '#fdfdfd',
        400: '#fcfcfc',
        500: '#fbfbfb',
        600: '#fafafa',
        700: '#f9f9f9',
        800: '#f8f8f8',
        900: '#f7f7f7',
      },
    },
    extend: {},
  },
  plugins: [],
}

