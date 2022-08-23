const environment = process.env.NODE_ENV || 'development';
require('dotenv').config();

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth-next',
  ],

  proxy: {
    '/api':
      environment === 'development'
        ? process.env.API_URL
        : 'https://www.example.org',
  },

  axios: {
    baseURL: process.env.API_URL,
    browserBaseURL: process.env.API_BROWSER_URL,
    credentials: true,
  },

  auth: {
    redirect: {
        login: '/login', 
        logout: '/login', 
        callback: false,
        home: '/home'
    },
    strategies: {
        User: {
            provider: 'laravel/jwt',
            url: '/Users',
            token: {
                property: 'access_token',
                maxAge: 60 * 60,
            },
            refreshToken: {
                property: 'access_token',
                maxAge: 20160 * 60,
            },
            
            endpoints: {
                login: { url: '/login', method: 'post', propertyName: 'access_token' },
                logout: { url: '/logout', method: 'post' },
                refresh: { url: '/refresh', method: 'post' , propertyName: 'access_token'}, 
                user: { url: '/me', method: 'get', propertyName: false},
            }
        }
    },
},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
