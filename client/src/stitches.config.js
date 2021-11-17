import { createStitches } from '@stitches/react'

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } =
  createStitches({
    media: {
      pressable: '(hover: none) and (pointer: coarse)',
      mobile: '(max-width: 1024px)',
      desktop: '(min-width: 1024px)',
    },
    theme: {
      fontSizes: {
        heading: '3.2rem',
        title: '2.4rem',
        body: '1.6rem',
        caption: '1.4rem',
        tooltip: '1.3rem',
        tiny: '1.2rem',
      },
    },
    utils: {
      maxWi: (value) => ({
        maxWidth: value,
        width: '100%',
      }),

      linearGradient: (value) => ({
        backgroundImage: `linear-gradient(${value})`,
      }),

      bg: (value) => ({
        backgroundColor: value,
      }),

      square: (value) => ({
        width: value,
        height: value,
      }),

      ellipse: (value) => ({
        width: value,
        height: value,
        borderRadius: '50%',
      }),
    },
  })

export const injectGlobalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  html: {
    height: '100%',
    fontFamily: `
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
    `,
    fontSize: '62.5%', // 10px to use rem easier
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },

  'body[data-theme="dark"]': {
    '--c-background': '#000',
    '--c-foreground': '#333',
    '--c-text': '#f2f2f2',
    '--c-inactiveText': '#a6a6a6',
    '--c-liner': '#e5e7eb',
  },

  'body[data-theme="light"]': {
    '--c-background': '#fff',
    '--c-foreground': '#d1d1d1',
    '--c-text': '#121212',
    '--c-inactiveText': '#8c8c8c',
    '--c-liner': '#333',
  },

  body: {
    '--headerHeight': '7rem',
    bg: 'var(--c-background)',
  },

  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },

  'button:disabled': {
    cursor: 'not-allowed',
    opacity: '0.3',
  },

  a: {
    textDecoration: 'none',
    color: 'inherit',
  },

  ul: {
    listStyle: 'none',
  },

  'textarea, input, select': {
    background: 'transparent',
    font: 'inherit',
  },

  select: {
    cursor: 'pointer',
  },

  '.container': {
    maxWi: '192rem',
    width: '100%',
    margin: '0 auto',
    padding: '0 2rem',
  },
})
