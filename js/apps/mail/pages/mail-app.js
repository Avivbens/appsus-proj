import mailPreview from '../cmps/mail-preview.js'
import progressBar from '../cmps/progress-bar.js'
import mailList from '../cmps/mail-list.js'
import sideBar from '../../../cmps/side-bar.js'
import { mailService } from "../services/mail-service.js"
import { eventBus } from "../../../services/event-bus.js"

export default {
    template: `
        <main class="mail-app">
            <div
            class="mail-side-bar-container"
            >   
                <router-link
                class="mail-compose-btn"
                to="/misterEmail/newMail"
                >
                    ➕ Compose
                </router-link>

                <side-bar
                class="mail-side-bar"
                :categories="categories"
                @setFilter="setFilter"
                />

                <progress-bar
                :ratio="readRatio"
                />
            </div>

            <mail-list 
            :mails="mailsToShow"
            v-if="mailsToShow"
            />

        </main>
    `,
    data() {
        return {
            mailsToShow: null,
            categories: [
                'all',
                'inbox',
                'sent mails',
                'starred',
                'archived',
                'drafts'
            ],
            filterBy: 'inbox',
            readRatio: 100
        }
    },
    methods: {
        loadMails() {
            mailService.query()
                .then((res) => {
                    if (res.length) {
                        this.mailsToShow = res
                        this.updateReadRatio(res)
                    } else {
                        mailService.postMany(mailService.createFirstMails())
                            .then(res => {
                                this.mailsToShow = res
                                this.updateReadRatio(res)
                            })
                    }
                })
        },
        updateReadRatio(mails) {
            let counter = 0
            mails.forEach(mail => {
                if (mail.isRead) counter++
            })

            if (!mails.length) {
                this.readRatio = 100
                return
            }

            this.readRatio = counter / mails.length * 100
        },
        removeMail(mail) {
            mailService.remove(mail)
                .then((res) => {
                    this.mailsToShow = res
                    this.updateReadRatio(res)
                })
        },
        archiveMail(mail) {
            mailService.toggleArchive(mail.id)
                .then(res => {
                    this.mailsToShow = res
                    this.updateReadRatio(res)
                })
                .then(() => {
                    this.updateMailsToShow()
                })
        },
        saveMail(mail) {
            mailService.save(mail)
            this.updateMailsToShow()
        },
        setFilter(filter) {
            this.filterBy = filter
            this.updateMailsToShow()
        },
        updateMailsToShow() {
            if (!this.filterBy || this.filterBy === 'all') {
                mailService.query()
                    .then(res => {
                        this.mailsToShow = res
                        this.updateReadRatio(res)
                    })
                return
            }
            mailService.getByFilter(this.filterBy)
                .then(res => {
                    this.mailsToShow = res
                    this.updateReadRatio(res)
                })
        }
    },
    created() {
        eventBus.$on('removeMail', this.removeMail)
        eventBus.$on('archiveMail', this.archiveMail)
        eventBus.$on('saveMail', this.saveMail)

        this.loadMails()
        this.updateMailsToShow()
    },
    destroyed() {
        eventBus.$off('removeMail')
        eventBus.$off('archiveMail')
    },
    components: {
        mailPreview,
        mailList,
        sideBar,
        progressBar
    },
}
