/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/vanillajs" />

declare const __APP_VERSION__: string;
declare const __COMPANY_CD__: string;

interface ImportMetaEnv {
  readonly VITE_APP_API_HOST: string;
  readonly VITE_APP_API_TIMEOUT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
