export default {
    props: [],
    template: `
        <nav>
            <img
            class="clickable"
            @click="onToggleMenu" 
            src="/img/menu.svg" alt=""/>

            <section v-if="isNavOpen">
                <span @click="onToggleMenu"><router-link to="/">Home</router-link> |</span>
                <span @click="onToggleMenu"><router-link to="/misterEmail">Email</router-link> |</span>
                <span @click="onToggleMenu"><router-link to="/missKeep" >Keep</router-link> |</span>
                <span @click="onToggleMenu"><router-link to="/about" >About</router-link> </span>
            </section>
        </nav>

    `,
    data() {
        return {
            isNavOpen: false
        }
    },
    methods: {
        onToggleMenu() {
            this.isNavOpen = !this.isNavOpen
        }
    },
}
