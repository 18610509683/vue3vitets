// vite.config.ts
import { defineConfig } from "file:///D:/code/auto2/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/code/auto2/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { createHtmlPlugin } from "file:///D:/code/auto2/node_modules/vite-plugin-html/dist/index.mjs";
import { resolve } from "path";
import autoprefixer from "file:///D:/code/auto2/node_modules/autoprefixer/lib/autoprefixer.js";
import AutoImport from "file:///D:/code/auto2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/code/auto2/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///D:/code/auto2/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var __vite_injected_original_dirname = "D:\\code\\auto2";
var Version = (/* @__PURE__ */ new Date()).getTime();
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    //element按需导入
    AutoImport({
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ["vue", "vue-router"],
      dts: "src/auto-import.d.ts",
      //element
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      //element
      resolvers: [ElementPlusResolver()]
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
          filename: "index.html",
          template: "index.html",
          injectOptions: {
            data: {
              title: "index",
              Version
              // injectScript: `<script src="./inject.js"></script>`,
            }
          }
        }
      ]
    })
  ],
  base: "./",
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src")
    },
    // 忽略后缀名的配置选项
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 9", "> 1%"],
          grid: true
        })
      ]
    }
  },
  build: {
    target: "es2020",
    chunkSizeWarningLimit: 1500,
    //1500kB以下不警告
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
    assetsInlineLimit: 40960,
    // 40kb
    // 打包后名称，默认是 dist
    outDir: "dist",
    // 打包后静态目录名称
    assetsDir: "static"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXGF1dG8yXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjb2RlXFxcXGF1dG8yXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2RlL2F1dG8yL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJ1xuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbidcbi8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NXZ1ZVx1NEUyRGhvb2sgcmVhY3RpdmUgcmVmXHU3QjQ5XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiXG5cbi8vXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1dWktXHU3RUM0XHU0RUY2IFx1NkJENFx1NTk4Mlx1OEJGNGFudC1kZXNpZ24tdnVlICBlbGVtZW50LXBsdXNcdTdCNDlcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5cbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzXCI7XG5cbi8vIGltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXG5jb25zdCBWZXJzaW9uID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuXG4gICAgLy9lbGVtZW50XHU2MzA5XHU5NzAwXHU1QkZDXHU1MTY1XG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICAvL1x1NUI4OVx1ODhDNVx1NEUyNFx1ODg0Q1x1NTQwRVx1NEY2MFx1NEYxQVx1NTNEMVx1NzNCMFx1NTcyOFx1N0VDNFx1NEVGNlx1NEUyRFx1NEUwRFx1NzUyOFx1NTE4RFx1NUJGQ1x1NTE2NXJlZlx1RkYwQ3JlYWN0aXZlXHU3QjQ5XG4gICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJ10sXG4gICAgICBkdHM6IFwic3JjL2F1dG8taW1wb3J0LmQudHNcIixcbiAgICAgIC8vZWxlbWVudFxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIC8vZWxlbWVudFxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICAgIC8vXHU5RUQ4XHU4QkE0XHU1QjU4XHU2NTNFXHU0RjREXHU3RjZFXG4gICAgICAvL2R0czogXCJzcmMvY29tcG9uZW50cy5kLnRzXCIsXG4gICAgfSksXG4gICAgLy8gLy8gdmlzdWFsaXplcih7IG9wZW46IHRydWUgfSksIC8vIFx1ODFFQVx1NTJBOFx1NUYwMFx1NTQyRlx1NTIwNlx1Njc5MFx1OTg3NVx1OTc2MlxuICAgIC8vIHZpdGVDb21wcmVzc2lvbih7XG4gICAgLy8gICBmaWx0ZXI6IC9cXC4oanN8Y3NzfGpzb258dHh0fGh0bWx8aWNvfHN2ZykoXFw/LiopPyQvaSwgLy8gXHU5NzAwXHU4OTgxXHU1MzhCXHU3RjI5XHU3Njg0XHU2NTg3XHU0RUY2XG4gICAgLy8gICB0aHJlc2hvbGQ6IDEwMjQsIC8vIFx1NjU4N1x1NEVGNlx1NUJCOVx1OTFDRlx1NTkyN1x1NEU4RVx1OEZEOVx1NEUyQVx1NTAzQ1x1OEZEQlx1ODg0Q1x1NTM4Qlx1N0YyOVxuICAgIC8vICAgYWxnb3JpdGhtOiAnZ3ppcCcsIC8vIFx1NTM4Qlx1N0YyOVx1NjVCOVx1NUYwRlxuICAgIC8vICAgZXh0OiAnZ3onLCAvLyBcdTU0MEVcdTdGMDBcdTU0MERcbiAgICAvLyAgIGRlbGV0ZU9yaWdpbkZpbGU6IHRydWUsIC8vIFx1NTM4Qlx1N0YyOVx1NTQwRVx1NjYyRlx1NTQyNlx1NTIyMFx1OTY2NFx1NTM4Qlx1N0YyOVx1NkU5MFx1NjU4N1x1NEVGNlxuICAgIC8vIH0pLFxuICAgIGNyZWF0ZUh0bWxQbHVnaW4oe1xuICAgICAgbWluaWZ5OiB0cnVlLFxuICAgICAgcGFnZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIC8vIGVudHJ5OiAnc3JjL290aGVyLW1haW4udHMnLFxuICAgICAgICAgIGZpbGVuYW1lOiAnaW5kZXguaHRtbCcsXG4gICAgICAgICAgdGVtcGxhdGU6ICdpbmRleC5odG1sJyxcbiAgICAgICAgICBpbmplY3RPcHRpb25zOiB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiAnaW5kZXgnLFxuICAgICAgICAgICAgICBWZXJzaW9uLFxuICAgICAgICAgICAgICAvLyBpbmplY3RTY3JpcHQ6IGA8c2NyaXB0IHNyYz1cIi4vaW5qZWN0LmpzXCI+PC9zY3JpcHQ+YCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gIF0sXG4gIGJhc2U6ICcuLycsXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgfSxcbiAgICAvLyBcdTVGRkRcdTc1NjVcdTU0MEVcdTdGMDBcdTU0MERcdTc2ODRcdTkxNERcdTdGNkVcdTkwMDlcdTk4NzlcbiAgICBleHRlbnNpb25zOiBbJy5tanMnLCAnLmpzJywgJy50cycsICcuanN4JywgJy50c3gnLCAnLmpzb24nLCAnLnZ1ZSddXG4gIH0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgYXV0b3ByZWZpeGVyKHtcbiAgICAgICAgICBvdmVycmlkZUJyb3dzZXJzbGlzdDogWydBbmRyb2lkIDQuMScsICdpT1MgNy4xJywgJ0Nocm9tZSA+IDMxJywgJ2ZmID4gMzEnLCAnaWUgPj0gOScsICc+IDElJ10sXG4gICAgICAgICAgZ3JpZDogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiAnZXMyMDIwJyxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDE1MDAsICAvLzE1MDBrQlx1NEVFNVx1NEUwQlx1NEUwRFx1OEI2Nlx1NTQ0QVxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICAvLyBcdTYyNTNcdTUzMDVcdTU0MEVcdTY1ODdcdTRFRjZcdTU0N0RcdTU0MERcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6IGBzdGF0aWMvW25hbWVdLltoYXNoXS4ke1ZlcnNpb259LmpzYCxcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IGBzdGF0aWMvW25hbWVdLltoYXNoXS4ke1ZlcnNpb259LmpzYCxcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IGBzdGF0aWMvW25hbWVdLltoYXNoXS4ke1ZlcnNpb259LltleHRdYFxuICAgICAgfVxuICAgIH0sXG4gICAgLy8gXHU1NkZFXHU3MjQ3XHU1OTI3XHU1QzBGXHU1MjA2XHU3NTRDXHU3RUJGXHVGRjFBXHU1OTI3XHU0RThFIDRrYlx1RkYwQ1x1NTZGRVx1NzI0N1x1NkI2M1x1NUUzOFx1NjI1M1x1NTMwNVx1MzAwMlx1NUMwRlx1NEU4RSA0a2JcdUZGMENcdTU2RkVcdTcyNDdcdTRGMUFcdThGNkNcdTUzMTZcdTRFM0EgYmFzZTY0XHUzMDAyXG4gICAgYXNzZXRzSW5saW5lTGltaXQ6IDQwOTYwLCAgLy8gNDBrYlxuICAgIC8vIFx1NjI1M1x1NTMwNVx1NTQwRVx1NTQwRFx1NzlGMFx1RkYwQ1x1OUVEOFx1OEJBNFx1NjYyRiBkaXN0XG4gICAgb3V0RGlyOiBcImRpc3RcIixcbiAgICAvLyBcdTYyNTNcdTUzMDVcdTU0MEVcdTk3NTlcdTYwMDFcdTc2RUVcdTVGNTVcdTU0MERcdTc5RjBcbiAgICBhc3NldHNEaXI6IFwic3RhdGljXCJcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK04sU0FBUyxvQkFBb0I7QUFDNVAsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsZUFBZTtBQUN4QixPQUFPLGtCQUFrQjtBQUd6QixPQUFPLGdCQUFnQjtBQUd2QixPQUFPLGdCQUFnQjtBQUV2QixTQUFTLDJCQUEyQjtBQVpwQyxJQUFNLG1DQUFtQztBQWV6QyxJQUFNLFdBQVUsb0JBQUksS0FBSyxHQUFFLFFBQVE7QUFFbkMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBO0FBQUEsSUFHSixXQUFXO0FBQUE7QUFBQSxNQUVULFNBQVMsQ0FBQyxPQUFPLFlBQVk7QUFBQSxNQUM3QixLQUFLO0FBQUE7QUFBQSxNQUVMLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLElBQ25DLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQTtBQUFBLE1BRVQsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUE7QUFBQTtBQUFBLElBR25DLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFTRCxpQkFBaUI7QUFBQSxNQUNmLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxRQUNMO0FBQUE7QUFBQSxVQUVFLFVBQVU7QUFBQSxVQUNWLFVBQVU7QUFBQSxVQUNWLGVBQWU7QUFBQSxZQUNiLE1BQU07QUFBQSxjQUNKLE9BQU87QUFBQSxjQUNQO0FBQUE7QUFBQSxZQUVGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUNqQztBQUFBO0FBQUEsSUFFQSxZQUFZLENBQUMsUUFBUSxPQUFPLE9BQU8sUUFBUSxRQUFRLFNBQVMsTUFBTTtBQUFBLEVBQ3BFO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUEsUUFDUCxhQUFhO0FBQUEsVUFDWCxzQkFBc0IsQ0FBQyxlQUFlLFdBQVcsZUFBZSxXQUFXLFdBQVcsTUFBTTtBQUFBLFVBQzVGLE1BQU07QUFBQSxRQUNSLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLHVCQUF1QjtBQUFBO0FBQUEsSUFDdkIsYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBO0FBQUEsUUFFTixnQkFBZ0Isd0JBQXdCLE9BQU87QUFBQSxRQUMvQyxnQkFBZ0Isd0JBQXdCLE9BQU87QUFBQSxRQUMvQyxnQkFBZ0Isd0JBQXdCLE9BQU87QUFBQSxNQUNqRDtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsbUJBQW1CO0FBQUE7QUFBQTtBQUFBLElBRW5CLFFBQVE7QUFBQTtBQUFBLElBRVIsV0FBVztBQUFBLEVBQ2I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
