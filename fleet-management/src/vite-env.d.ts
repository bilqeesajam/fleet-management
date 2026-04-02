/// <reference types="vite/client" />

declare module '*.css' {
  const content: any;
  export default content;
}

declare module 'mapbox-gl/dist/mapbox-gl.css';