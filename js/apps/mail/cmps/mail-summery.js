import { eventBus } from "../../../services/event-bus.js"

export default {
    props: ['mail'],
    template: `
        <section class="mail-summery">

            <aside class="summery-buttons-area">

                <button 
                v-if="!draftEdit"
                class="clickable"
                @click.stop="onReply"
                >
                <i class="fas fa-reply"></i>
                </button>

                <button 
                class="clickable"
                @click.stop="onShare"
                >
                <i class="fas fa-share-square"></i>
                </button>

                <button 
                class="clickable"
                @click.stop="onDeleteMail"
                >
                <i class="fas fa-trash-alt"></i>
                </button>

                <button 
                class="clickable"
                @click.stop="onFullSize"
                >
                <i class="fas fa-expand"></i>
                </button>

            </aside>

            <h2 class="summery-title">
                {{mail.subject}}
            </h2>

            <h5 class="summery-sender">
                {{mail.sender}}
            </h5>

            <p class="summery-body">
                {{mail.body}}
            </p>

        </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        onDeleteMail() {
            eventBus.$emit('removeMail', this.mail)
            this.$emit('existSummery')
        },
        onFullSize() {
            this.$router.push('/misterEmail/' + this.mail.id)
        },
        onReply() {
            const url = `/misterEmail/newMail/?reply=true&sender=${this.mail.sender}&to=${this.mail.to}&subject=RE: ${this.mail.subject}&body=${this.mail.body}`
            this.$router.push(url)
        },
        onShare() {
            const url = `/missKeep/?mail=true&sender=${this.mail.sender}&to=${this.mail.to}&subject=${this.mail.subject}&body=${this.mail.body}`
            this.$router.push(url)
        }
    },
    computed: {
        draftEdit() {
            return this.mail.categories.includes('drafts')
        }
    },

}
