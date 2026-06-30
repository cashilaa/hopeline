/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_ADMIN_USERNAME: string
  readonly VITE_ADMIN_PASSWORD: string
  readonly DEV: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// CSS module declarations
declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
