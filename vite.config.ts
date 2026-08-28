import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // In production builds, swap the editor-preview auth bridge for plain
      // localStorage so no preview-host strings end up in the shipped bundle.
      ...(mode === 'development'
        ? {}
        : {
            [path.resolve(__dirname, "./src/integrations/supabase/previewAuthStorage.ts")]:
              path.resolve(__dirname, "./src/integrations/supabase/previewAuthStorage.prod.ts"),
          }),
    },
  },
}));
