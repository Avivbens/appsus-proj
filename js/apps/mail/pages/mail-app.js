import mailPreview from '../cmps/mail-preview.js'
import mailList from '../cmps/mail-list.js'
import sideBar from '../../../cmps/side-bar.js'
import { mailService } from "../services/mail-service.js"
import { eventBus } from "../../../services/event-bus.js"

export default {
    template: `
        <main class="mail-app">
            <side-bar
            class="mail-side-bar"
            :categories="categories"
            @setFilter="setFilter"
            />

            <mail-list 
            :mails="mailsToShow"
            v-if="mailsToShow"
            />

        </main>
    `,
    data() {
        return {
            mailsToShow: null,
            categories: ['inbox', 'starred', 'sent mails', 'drafts'],
            filterBy: ''
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
        },
        setFilter(filter) {
            this.filterBy = filter
            this.updateMailsToShow()
        },
        updateMailsToShow() {
            if (!this.filterBy) return
            mailService.getByFilter(this.filterBy)
                .then(res => this.mailsToShow = res)
        }
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
        mailList,
        sideBar
    },
}
