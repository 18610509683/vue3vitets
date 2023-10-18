import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import { resolve } from 'path'
import autoprefixer from 'autoprefixer'
const Version = new Date().getTime();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          // entry: 'src/other-main.ts',
          filename: 'index.html',
          template: 'index.html',
          injectOptions: {
            data: {
              title: 'index',
              Version,
              // injectScript: `<script src="./inject.js"></script>`,
            },
          },
        },
      ],
    }),
  ],
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
    // 忽略后缀名的配置选项
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 9', '> 1%'],
          grid: true,
        })
      ]
    }
  },
  build: {
    target:'es2020',
    chunkSizeWarningLimit: 1500,  //1500kB以下不警告
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // 打包后文件命名
        chunkFileNames: `static/[name].[hash].${Version}.js`,
        entryFileNames: `static/[name].[hash].${Version}.js`,
        assetFileNames: `static/[name].[hash].${Version}.[ext]`
      }
    },
    // 图片大小分界线：大于 4kb，图片正常打包。小于 4kb，图片会转化为 base64。
    assetsInlineLimit: 40960,  // 40kb
    // 打包后名称，默认是 dist
    outDir: "dist",
    // 打包后静态目录名称
    assetsDir: "static"
  }  
})
