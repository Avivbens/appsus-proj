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
            searchBy: '',
            readRatio: 100
        }
    },
    methods: {
        loadMails() {
            this.getMailsByFilter()
                .then((res) => {
                    // if (res.length) {
                    this.mailsToShow = res
                    this.updateReadRatio(res)
                        // } else {
                        //     mailService.postMany(mailService.createFirstMails())
                        //         .then(res => {
                        //             this.mailsToShow = res
                        //             this.updateReadRatio(res)
                        //         })
                        // }
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
                .then(() => {
                    this.getMailsByFilter()
                        .then(res => {
                            this.mailsToShow = res
                            this.updateReadRatio(res)
                        })
                })
        },
        archiveMail(mail) {
            mailService.toggleArchive(mail.id)
                .then(() => {
                    this.getMailsByFilter()
                        .then((res) => {
                            this.mailsToShow = res
                            this.updateReadRatio(res)
                        })
                })
        },
        starMail(mail) {
            mailService.toggleStar(mail.id)
                .then(() => {
                    this.getMailsByFilter()
                        .then((res) => {
                            this.mailsToShow = res
                            this.updateReadRatio(res)
                        })
                })
        },
        saveMail(mail) {
            mailService.save(mail)
                .then(() => {
                    this.getMailsByFilter()
                    this.updateReadRatio(this.mailsToShow)
                })
        },
        setFilter(filter) {
            this.filterBy = filter
            this.getMailsByFilter()
                .then((res) => {
                    this.searchMails(res)
                    this.updateReadRatio(res)
                })
        },
        onSearch(val) {
            this.getMailsByFilter()
                .then(res => {
                    this.searchMails(res, val)
                    this.updateReadRatio(this.mailsToShow)
                })
        },
        searchMails(mails, val = this.searchBy) {
            this.searchBy = val
            this.mailsToShow = mailService.getBySearch(mails, this.searchBy)
        },
        getMailsByFilter() {
            if (!this.filterBy || this.filterBy === 'all') {
                return mailService.query()
                    .then(res => {
                        return res
                    })
            }
            return mailService.getByFilter(this.filterBy)
                .then(res => {
                    return res
                })
        }
    },
    created() {
        eventBus.$on('removeMail', this.removeMail)
        eventBus.$on('archiveMail', this.archiveMail)
        eventBus.$on('starMail', this.starMail)

        eventBus.$on('saveMail', this.saveMail)
        eventBus.$on('reloadMails', this.loadMails)
        eventBus.$on('searchInMail', this.onSearch)

        this.loadMails()
        this.getMailsByFilter()
            .then(res => {

                this.mailsToShow = res
            })
    },
    destroyed() {
        eventBus.$off('removeMail')
        eventBus.$off('archiveMail')
        eventBus.$off('saveMail')
        eventBus.$off('reloadMails')
        eventBus.$off('searchInMail')
    },
    components: {
        mailPreview,
        mailList,
        sideBar,
        progressBar
    },
}
