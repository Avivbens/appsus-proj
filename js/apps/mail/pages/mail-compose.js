import { mailService } from "../services/mail-service.js"
import { eventBus } from "../../../services/event-bus.js"

export default {
    template: `
        <main
        class="mail-compose">

        <h4>New Message</h4>

            <form>
                <input v-model="newMail.to" type="text" placeholder="To:">
                <input type="text" placeholder="Cc:">
                <input type="text" placeholder="Bcc:">
                <input v-model="newMail.subject" type="text" placeholder="Subject:">
            
                <textarea v-model="newMail.body" name="mailBody" cols="30" rows="10" placeholder="Your Message"></textarea>

                <div class="compose-buttons-area">
                    <button
                    @click="onSendMail"
                    >
                    Send
                    </button>


                    <span>
                        <button
                        @click.prevent="onDeclareChanges"
                    
                        >✖</button>

                        <button
                        @click="onSaveAsDraft"
                        >
                        Draft
                        </button>
                    </span>
                </div>
            </form>
        </main> 
    `,
    data() {
        return {
            newMail: {
                sender: 'You',
                to: '',
                subject: '',
                body: '',
                categories: ['sent mails']
            }
        }
    },
    methods: {
        onDeclareChanges() {
            if (confirm('Are you sure?')) this.$router.push('/misterEmail')
        },
        onSendMail() {
            const mail = this.createMail()

            // Set delay when sending mail
            setTimeout(() => {
                mailService.post(mail)
                    .then(() => {
                        eventBus.$emit('reloadMails')
                    })
            }, 3500)

            this.$router.push('/misterEmail')
        },
        onSaveAsDraft() {
            let mail = this.createMail()

            eventBus.$emit('saveAsDraft', mail)
            this.$router.push('/misterEmail')
        },
        createMail() {
            return mailService.createMail(
                this.newMail.sender,
                this.newMail.subject,
                this.newMail.body,
                this.newMail.categories,
                this.newMail.to,
            )
        }
    },
    computed: {

    },
    created() {

    },
    destroyed() {

    },
    watch: {
        data: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {

            }
        }
    },
}
