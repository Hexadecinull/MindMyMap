import { fileURLToPath, URL } from 'node:url'
import { defineConfig }        from 'vite'
import { viteStaticCopy }      from 'vite-plugin-static-copy'
import path                    from 'path'
import fs                      from 'fs'
import vue                     from '@vitejs/plugin-vue'

const LEGACY_SCRIPTS = [
  '<script src="./static/js/mindmap.js"></script>',
  '<script src="./static/js/purify.js"></script>',
  '<script src="./static/js/qrcode.js"></script>'
].join('\n    ')

function injectLegacyScripts (html) {
  return html.replace('</head>', `    ${LEGACY_SCRIPTS}\n  </head>`)
}

export default defineConfig(({ mode }) => {
  const isDistMode = mode === 'dist'

  const staticTargets = []

  if (isDistMode) {
    staticTargets.push({
      src:  path.resolve(__dirname, 'inc') + '/!(*.(db|sqlite|sqlite3|db-shm|db-wal))',
      dest: './inc'
    })
  }

  const copyDotfilesAndInjectScripts = {
    name: 'copy-dotfiles-and-inject-scripts',

    // Dev server only — for builds, closeBundle handles injection instead.
    // ctx.bundle is undefined during dev; defined during build.
    transformIndexHtml: {
      order: 'post',
      handler (html, ctx) {
        if (ctx.bundle) return html
        return injectLegacyScripts(html)
      }
    },

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
          console.warn('[vite] No .env found — skipping (CI writes it to dist/ directly).')
        }
      }

      const indexPath = path.join(outDir, 'index.html')
      if (fs.existsSync(indexPath)) {
        const html = fs.readFileSync(indexPath, 'utf-8')
        fs.writeFileSync(indexPath, injectLegacyScripts(html))
      }
    }
  }

  return {
    base: './',
    plugins: [
      vue(),
      viteStaticCopy({ targets: staticTargets }),
      copyDotfilesAndInjectScripts
    ],
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
