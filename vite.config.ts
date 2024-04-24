import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import { resolve } from 'path'
import autoprefixer from 'autoprefixer'
import viteCompression from 'vite-plugin-compression'
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"

//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite'

import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// import { visualizer } from 'rollup-plugin-visualizer'
const Version = new Date().getTime();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    //element按需导入
    AutoImport({
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ['vue', 'vue-router'],
      dts: "src/auto-import.d.ts",
      //element
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      //element
      resolvers: [ElementPlusResolver()],
      //默认存放位置
      //dts: "src/components.d.ts",
    }),
    // // visualizer({ open: true }), // 自动开启分析页面
    // viteCompression({
    //   filter: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 需要压缩的文件
    //   threshold: 1024, // 文件容量大于这个值进行压缩
    //   algorithm: 'gzip', // 压缩方式
    //   ext: 'gz', // 后缀名
    //   deleteOriginFile: true, // 压缩后是否删除压缩源文件
    // }),
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
      '~':resolve(__dirname, './UIThemeStyle/src'),
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
    target: 'es2020',
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
