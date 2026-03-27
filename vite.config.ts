// vite config - vic vstupnich HTML stranek
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                loading: 'loading.html',
                game: 'game.html',
                computer: 'computer.html',
            }
        }
    }
})
