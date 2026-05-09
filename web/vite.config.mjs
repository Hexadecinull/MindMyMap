import { fileURLToPath, URL } from 'node:url'
import { defineConfig }        from 'vite'
import { viteStaticCopy }      from 'vite-plugin-static-copy'
import path                    from 'path'
import fs                      from 'fs'
import vue                     from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
	const isDistMode = mode === 'dist'

	const staticTargets = [
		{ src: path.resolve(__dirname, 'README.md'), dest: './' },
		{ src: path.resolve(__dirname, 'LICENSE'),   dest: './' }
	]

	if (isDistMode) {
		staticTargets.push({
			src:  path.resolve(__dirname, 'inc') + '/!(*.(db|sqlite|sqlite3|db-shm|db-wal))',
			dest: './inc'
		})
	}

	const copyDotfiles = {
		name: 'copy-dotfiles',
		closeBundle () {
			const outDir = path.resolve(__dirname, 'dist')

			fs.copyFileSync(
				path.resolve(__dirname, '.htaccess'),
				path.join(outDir, '.htaccess')
			)

			if (isDistMode) {
				const incOut = path.join(outDir, 'inc')
				fs.mkdirSync(incOut, { recursive: true })
				fs.copyFileSync(
					path.resolve(__dirname, 'inc', '.htaccess'),
					path.join(incOut, '.htaccess')
				)

				const localEnv = path.resolve(__dirname, '.env')
				if (fs.existsSync(localEnv)) {
					fs.copyFileSync(localEnv, path.join(outDir, '.env'))
				} else {
					console.warn('[copy-dotfiles] No .env found — skipping (CI writes it directly to dist/).')
				}
			}
		}
	}

	return {
		base: './',
		plugins: [ vue(), viteStaticCopy({ targets: staticTargets }), copyDotfiles ],
		resolve: {
			alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
		},
		define: {
			app_version: JSON.stringify(process.env.npm_package_version)
		},
		server: {
			port: 8080,
			proxy: { '^/inc': { target: 'http://127.0.0.1:8000', changeOrigin: true } }
		},
		build: {
			target:    ['es2019'],
			assetsDir: 'static/assets'
		}
	}
})
