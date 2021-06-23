import { eventBus } from "../../../services/event-bus.js"

export default {
    props: ['mail'],
    template: `
        <section class="mail-summery">

            <aside class="summery-buttons-area">
                <button 
                class="clickable"
                @click.stop="onDeleteMail(mail)"
                >✖</button>


                <button 
                class="clickable"
                @click.stop="onFullSize(mail)"
                >🔲</button>

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
        onDeleteMail(mail) {
            eventBus.$emit('removeMail', mail)
            this.$emit('existSummery')
        },
        onFullSize(mail) {
            this.$router.push('/misterEmail/' + mail.id)
        }
    },
    computed: {

    },
}
