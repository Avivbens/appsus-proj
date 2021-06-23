import mailPreview from '../cmps/mail-preview.js'
import mailList from '../cmps/mail-list.js'
import { mailService } from "../services/mail-service.js"
import { eventBus } from "../../../services/event-bus.js"

export default {
    template: `
        <main>

            <mail-list 
            :mails="mailsToShow"
            v-if="mailsToShow"
            />

        </main>
    `,
    data() {
        return {
            mailsToShow: null
        }
    },
    methods: {
        loadMails() {
            mailService.query()
                .then((res) => {
                    if (res.length) this.mailsToShow = res
                    else {
                        mailService.postMany(mailService.createFirstMails())
                            .then(res => {
                                this.mailsToShow = res
                            })
                    }
                })
        },
        removeMail(mail) {
            mailService.remove(mail)
                .then((res) => {
                    this.mailsToShow = res
                })
        }
    },
    computed: {

    },
    created() {
        this.loadMails()
        eventBus.$on('removeMail', this.removeMail)
    },
    destroyed() {
        eventBus.$off('removeMail')
    },
    components: {
        mailPreview,
        mailList
    },
    // watch: {
    //     // /misterEmail
    //     '$route.params.id': {
    //         immediate: true,
    //         deep: true,
    //         handler(newValue, oldValue) {

    //         }
    //     }
    // },
}
