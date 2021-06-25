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
                v-if="draftEdit"
                class="clickable"
                @click="onEditDraft"
                >
                <i class="fas fa-edit"></i>
                </button>


                <button 
                v-else
                class="clickable"
                @click="onReply"
                >
                <i class="fas fa-reply"></i>
                </button>

                <button 
                class="clickable"
                @click="onDeleteMail(mail)"
                >
                <i class="fas fa-trash-alt"></i>
                </button>


                <button 
                class="clickable"
                @click="onExitFullSize"
                >
                <i class="fas fa-inbox"></i>
                </button>

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
        },
        onEditDraft() {
            const url = `/misterEmail/newMail/?edit=true&sender=${this.mail.sender}&to=${this.mail.to}&subject=${this.mail.subject}&body=${this.mail.body}`
            this.$router.push(url)
        },
        onReply() {
            const url = `/misterEmail/newMail/?reply=true&sender=${this.mail.sender}&to=${this.mail.to}&subject=RE: ${this.mail.subject}&body=${this.mail.body}`
            this.$router.push(url)
        }
    },
    computed: {
        draftEdit() {
            return this.mail.categories.includes('drafts')
        }
    },
    watch: {
        '$route.params.id': {
            immediate: true,
            handler() {
                const id = this.$route.params.id
                mailService.get(id)
                    .then(mail => this.mail = mail)
            }
        },
    },
}
