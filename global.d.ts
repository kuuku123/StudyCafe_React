declare const SERVER_API_URL: string;
declare const NOTIFICATION_API_URL: string;
declare const API_GATEWAY_URL: string;
declare const AUTH_SERVER_URL: string;

declare module "dompurify" {
  // You can either provide a minimal type definition:
  const DOMPurify: {
    sanitize: (dirty: string, config?: any) => string;
    // add any other members you use...
  };
  export default DOMPurify;
}
