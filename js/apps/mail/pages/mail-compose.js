import { mailService } from "../services/mail-service.js"
import { eventBus } from "../../../services/event-bus.js"

export default {
    template: `
        <main
        class="mail-compose">

        <h4>New Message</h4>

            <form>
                <input v-model="to" type="text" placeholder="To:">
                <input type="text" placeholder="Cc:">
                <input type="text" placeholder="Bcc:">
                <input v-model="subject" type="text" placeholder="Subject:">
            
                <textarea 
                v-model="body" 
                name="mailBody" cols="30" 
                rows="10" placeholder="Your Message"
                >
                </textarea>




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
            sender: 'You',
            to: '',
            subject: '',
            body: '',
            categories: ['sent mails'],
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
                this.sender,
                this.subject,
                this.body,
                this.categories,
                this.to,
            )
        },
    },
    watch: {
        '$route.query': {
            immediate: true,
            handler() {
                const query = this.$route.query
                if (query.edit) {
                    console.log('query :>> ', query)
                    this.sender = query.sender
                    this.to = query.to
                    this.subject = query.subject
                    this.body = query.body
                } else if (query.reply) {
                    // TODO
                    this.body =
                        `
                        \n\n
------------------------------------------
        ${query.subject}
        from: ${query.sender}
------------------------------------------
                        \n
${query.body}
`
                }
            }
        }
    }
}
