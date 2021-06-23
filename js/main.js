import { router } from './router.js'
import appHeader from './cmps/app-header.js'

const options = {
    el: '#app',
    router,
    template: `
        <main>
            <app-header/>
            <router-view />
        </main>
    `,
    components: {
        appHeader
    },
}

new Vue(options)
