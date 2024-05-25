import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: { exportType: 'name', default: true },
      include: "**/*.svg",
      exclude: "src/assets/images/flag/*.svg",
    }),
    react()
  ],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
})
