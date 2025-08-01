// vite.config.ts
import { defineConfig, loadEnv } from "file:///app/code/node_modules/vite/dist/node/index.js";
import react from "file:///app/code/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/app/code";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react({
        // Enable Fast Refresh
        fastRefresh: true,
        // Exclude node_modules from Fast Refresh
        exclude: /node_modules/
      })
    ],
    // Path resolution
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src"),
        "@components": resolve(__vite_injected_original_dirname, "src/components"),
        "@context": resolve(__vite_injected_original_dirname, "src/context"),
        "@services": resolve(__vite_injected_original_dirname, "src/services"),
        "@utils": resolve(__vite_injected_original_dirname, "src/utils"),
        "@styles": resolve(__vite_injected_original_dirname, "src/styles")
      }
    },
    // Development server configuration
    server: {
      port: 5173,
      host: true,
      cors: true,
      open: false,
      hmr: {
        overlay: true
      }
    },
    // Preview server configuration
    preview: {
      port: 4173,
      host: true
    },
    // Build optimization
    build: {
      target: "esnext",
      minify: "terser",
      sourcemap: mode === "development",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            router: ["react-router-dom"],
            ui: ["lucide-react"],
            utils: ["date-fns", "lodash-es"],
            charts: ["recharts"]
          }
        }
      },
      terserOptions: {
        compress: {
          drop_console: mode === "production",
          drop_debugger: mode === "production"
        }
      },
      chunkSizeWarningLimit: 1e3
    },
    // Dependency optimization
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "react-hot-toast",
        "lucide-react"
      ],
      exclude: ["@vite/client", "@vite/env"]
    },
    // Define global constants
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify((/* @__PURE__ */ new Date()).toISOString())
    },
    // CSS configuration
    css: {
      devSourcemap: mode === "development",
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },
    // Environment variables
    envPrefix: ["VITE_", "NODE_ENV"],
    // Performance optimizations
    esbuild: {
      target: "esnext",
      platform: "browser",
      format: "esm"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwL2NvZGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9hcHAvY29kZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vYXBwL2NvZGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpO1xuXG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgcmVhY3Qoe1xuICAgICAgICAvLyBFbmFibGUgRmFzdCBSZWZyZXNoXG4gICAgICAgIGZhc3RSZWZyZXNoOiB0cnVlLFxuICAgICAgICAvLyBFeGNsdWRlIG5vZGVfbW9kdWxlcyBmcm9tIEZhc3QgUmVmcmVzaFxuICAgICAgICBleGNsdWRlOiAvbm9kZV9tb2R1bGVzLyxcbiAgICAgIH0pLFxuICAgIF0sXG5cbiAgICAvLyBQYXRoIHJlc29sdXRpb25cbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICAgICdAY29tcG9uZW50cyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvbmVudHMnKSxcbiAgICAgICAgJ0Bjb250ZXh0JzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29udGV4dCcpLFxuICAgICAgICAnQHNlcnZpY2VzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvc2VydmljZXMnKSxcbiAgICAgICAgJ0B1dGlscyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3V0aWxzJyksXG4gICAgICAgICdAc3R5bGVzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvc3R5bGVzJyksXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAvLyBEZXZlbG9wbWVudCBzZXJ2ZXIgY29uZmlndXJhdGlvblxuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogNTE3MyxcbiAgICAgIGhvc3Q6IHRydWUsXG4gICAgICBjb3JzOiB0cnVlLFxuICAgICAgb3BlbjogZmFsc2UsXG4gICAgICBobXI6IHtcbiAgICAgICAgb3ZlcmxheTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIFByZXZpZXcgc2VydmVyIGNvbmZpZ3VyYXRpb25cbiAgICBwcmV2aWV3OiB7XG4gICAgICBwb3J0OiA0MTczLFxuICAgICAgaG9zdDogdHJ1ZSxcbiAgICB9LFxuXG4gICAgLy8gQnVpbGQgb3B0aW1pemF0aW9uXG4gICAgYnVpbGQ6IHtcbiAgICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgICBtaW5pZnk6ICd0ZXJzZXInLFxuICAgICAgc291cmNlbWFwOiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgICAgICAgIHJvdXRlcjogWydyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICAgICAgICB1aTogWydsdWNpZGUtcmVhY3QnXSxcbiAgICAgICAgICAgIHV0aWxzOiBbJ2RhdGUtZm5zJywgJ2xvZGFzaC1lcyddLFxuICAgICAgICAgICAgY2hhcnRzOiBbJ3JlY2hhcnRzJ10sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgICAgZHJvcF9jb25zb2xlOiBtb2RlID09PSAncHJvZHVjdGlvbicsXG4gICAgICAgICAgZHJvcF9kZWJ1Z2dlcjogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgICB9LFxuXG4gICAgLy8gRGVwZW5kZW5jeSBvcHRpbWl6YXRpb25cbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgJ3JlYWN0JyxcbiAgICAgICAgJ3JlYWN0LWRvbScsXG4gICAgICAgICdyZWFjdC1yb3V0ZXItZG9tJyxcbiAgICAgICAgJ3JlYWN0LWhvdC10b2FzdCcsXG4gICAgICAgICdsdWNpZGUtcmVhY3QnLFxuICAgICAgXSxcbiAgICAgIGV4Y2x1ZGU6IFsnQHZpdGUvY2xpZW50JywgJ0B2aXRlL2VudiddLFxuICAgIH0sXG5cbiAgICAvLyBEZWZpbmUgZ2xvYmFsIGNvbnN0YW50c1xuICAgIGRlZmluZToge1xuICAgICAgX19BUFBfVkVSU0lPTl9fOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5ucG1fcGFja2FnZV92ZXJzaW9uKSxcbiAgICAgIF9fQlVJTERfVElNRV9fOiBKU09OLnN0cmluZ2lmeShuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkpLFxuICAgIH0sXG5cbiAgICAvLyBDU1MgY29uZmlndXJhdGlvblxuICAgIGNzczoge1xuICAgICAgZGV2U291cmNlbWFwOiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnLFxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIjtgLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gRW52aXJvbm1lbnQgdmFyaWFibGVzXG4gICAgZW52UHJlZml4OiBbJ1ZJVEVfJywgJ05PREVfRU5WJ10sXG5cbiAgICAvLyBQZXJmb3JtYW5jZSBvcHRpbWl6YXRpb25zXG4gICAgZXNidWlsZDoge1xuICAgICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgICAgIHBsYXRmb3JtOiAnYnJvd3NlcicsXG4gICAgICBmb3JtYXQ6ICdlc20nLFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNk0sU0FBUyxjQUFjLGVBQWU7QUFDblAsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUZ4QixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFNO0FBQ2pELFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUUzQyxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUE7QUFBQSxRQUVKLGFBQWE7QUFBQTtBQUFBLFFBRWIsU0FBUztBQUFBLE1BQ1gsQ0FBQztBQUFBLElBQ0g7QUFBQTtBQUFBLElBR0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxRQUM3QixlQUFlLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsUUFDbEQsWUFBWSxRQUFRLGtDQUFXLGFBQWE7QUFBQSxRQUM1QyxhQUFhLFFBQVEsa0NBQVcsY0FBYztBQUFBLFFBQzlDLFVBQVUsUUFBUSxrQ0FBVyxXQUFXO0FBQUEsUUFDeEMsV0FBVyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxNQUM1QztBQUFBLElBQ0Y7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLFFBQ0gsU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUdBLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUE7QUFBQSxJQUdBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLFdBQVcsU0FBUztBQUFBLE1BQ3BCLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGNBQWM7QUFBQSxZQUNaLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFBQSxZQUM3QixRQUFRLENBQUMsa0JBQWtCO0FBQUEsWUFDM0IsSUFBSSxDQUFDLGNBQWM7QUFBQSxZQUNuQixPQUFPLENBQUMsWUFBWSxXQUFXO0FBQUEsWUFDL0IsUUFBUSxDQUFDLFVBQVU7QUFBQSxVQUNyQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxlQUFlO0FBQUEsUUFDYixVQUFVO0FBQUEsVUFDUixjQUFjLFNBQVM7QUFBQSxVQUN2QixlQUFlLFNBQVM7QUFBQSxRQUMxQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLHVCQUF1QjtBQUFBLElBQ3pCO0FBQUE7QUFBQSxJQUdBLGNBQWM7QUFBQSxNQUNaLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFNBQVMsQ0FBQyxnQkFBZ0IsV0FBVztBQUFBLElBQ3ZDO0FBQUE7QUFBQSxJQUdBLFFBQVE7QUFBQSxNQUNOLGlCQUFpQixLQUFLLFVBQVUsUUFBUSxJQUFJLG1CQUFtQjtBQUFBLE1BQy9ELGdCQUFnQixLQUFLLFdBQVUsb0JBQUksS0FBSyxHQUFFLFlBQVksQ0FBQztBQUFBLElBQ3pEO0FBQUE7QUFBQSxJQUdBLEtBQUs7QUFBQSxNQUNILGNBQWMsU0FBUztBQUFBLE1BQ3ZCLHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBR0EsV0FBVyxDQUFDLFNBQVMsVUFBVTtBQUFBO0FBQUEsSUFHL0IsU0FBUztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
