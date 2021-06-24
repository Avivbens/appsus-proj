import { mailService } from "../services/mail-service.js"
import { eventBus } from "../../../services/event-bus.js"
// import componentName from 'url'

export default {
    template: `
        <main
        class="mail-details"
        v-if="mail"
        >

            <aside class="details-buttons-area">
                <button 
                class="clickable"
                @click.stop="onDeleteMail(mail)"
                >✖</button>


                <button 
                class="clickable"
                @click.stop="onExitFullSize"
                >➡</button>

            </aside>


            <h1 class="details-title">
                {{mail.subject}}
            </h1>

            <h4 class="details-sender">
                {{mail.sender}}
            </h4>

            <p class="details-body">
                {{mail.body}}
            </p>

        </main>
    `,
    data() {
        return {
            mail: null
        }
    },
    methods: {
        onDeleteMail(mail) {
            eventBus.$emit('removeMail', mail)
            this.onExitFullSize()
        },
        onExitFullSize() {
            this.$router.push('/misterEmail')
        }
    },
    computed: {

    },
    created() {

    },
    destroyed() {

    },
    watch: {
        '$route.params.id': {
            immediate: true,
            handler() {
                const id = this.$route.params.id
                console.log('id :>> ', id)
                mailService.get(id)
                    .then(mail => this.mail = mail)
            }
        }

    },
    components: {
        // componentName

    },
}
