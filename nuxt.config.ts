export default defineNuxtConfig({
  ssr: false,

  app: {
    baseURL: process.env.NODE_ENV === 'development' ? '/' : './'
  },
  devServer:{
    port: 33222
  },
  compatibilityDate: '2025-02-08'
})