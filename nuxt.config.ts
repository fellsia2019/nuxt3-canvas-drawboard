export default defineNuxtConfig({

    css: ['~/assets/style/main.scss',],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/style/global/variables.scss";',
                },
            },
        },
    },

    typescript: {
        strict: true,
    },


    build: {
        loaders: {
            scss: {
                implementation: require('sass'),
            },
        },
    },

    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
});
