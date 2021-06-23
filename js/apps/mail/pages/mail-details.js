import { mailService } from "../services/mail-service.js"
// import componentName from 'url'

export default {
    template: `
        <main
        class="mail-details"
        v-if="mail"
        >
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
                mailService.get(id)
                    .then(mail => this.mail = mail)
            }
        }

    },
    components: {
        // componentName

    },
}
