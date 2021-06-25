import { router } from './router.js'
import appHeader from './cmps/app-header.js'

const options = {
    el: '#app',
    router,
    template: `
        <main>
            <app-header
            :class="headerClass"
            />
            <router-view />
        </main>
    `,
    computed: {
        headerClass() {
            if (this.$route.path === "/")
                return 'app-header-home'
        }
    },
    components: {
        appHeader
    },
}

new Vue(options)
