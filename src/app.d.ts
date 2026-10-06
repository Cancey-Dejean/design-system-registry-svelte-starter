// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      /** Full-height pages (e.g. the flows canvas) opt out of the site footer. */
      hideFooter?: boolean;
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
