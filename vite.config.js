import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'

// https://vite.dev/config/
export default {
  base: '/',
  content: ['./index.html','./src/**/*.{vue,md}'],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: { textDecoration: 'none' },
            'a:hover': { textDecoration: 'underline' },
            img: { borderRadius: theme('borderRadius.xl'), boxShadow: theme('boxShadow.md') },
            code: { fontWeight: '600', padding: '0.15rem 0.35rem', borderRadius: '0.35rem' },
            pre: { borderRadius: theme('borderRadius.xl') },
          }
        }
      })
    }
  },
  plugins: [
    tailwindcss(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({ })
  ],
}
