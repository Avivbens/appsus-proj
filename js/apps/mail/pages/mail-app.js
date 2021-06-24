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
                :mainCounter="unreadMails"
                @setFilter="setFilter"
                />

                <progress-bar
                v-if="mails"
                :ratio="readRatio"
                />
            </div>

            <mail-list 
            :mails="mailsToShow"
            @saveMail="saveMail"
            @removeMail="removeMail"
            @archiveMail="archiveMail"
            @starMail="starMail"
            v-if="mails"
            />

        </main>
    `,
    data() {
        return {
            mails: null,
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
            unreadMails: 0
        }
    },
    methods: {
        loadMails() {
            mailService.query()
                .then((res) => {
                    this.mails = res
                })
        },
        removeMail(mail) {
            mailService.remove(mail)
                .then((res) => {
                    this.mails = res
                })
        },
        archiveMail(mail) {
            mailService.toggleArchive(mail.id)
                .then((res) => {
                    this.mails = res
                })
        },
        starMail(mail) {
            mailService.toggleStar(mail.id)
                .then((res) => {
                    this.mails = res
                })
        },
        saveDraft(mail) {
            mailService.postDraft(mail)
                .then(() => {
                    this.loadMails()
                })
        },
        saveMail(mail) {
            mailService.save(mail)
                .then((res) => {
                    this.mails = res
                })
        },
        setFilter(filter) {
            this.filterBy = filter
        },
        onSearch(val) {
            this.searchBy = val
        },
        searchMails(mails) {
            return mailService.getBySearch(mails, this.searchBy)
        },
        getMailsByFilter() {
            if (!this.filterBy || this.filterBy === 'all') {
                return this.mails
            }
            return mailService.getByFilter(this.mails, this.filterBy)
        },
        updateUnreadCounter() {
            const currMails = this.searchMails(this.getMailsByFilter())

            let counter = 0
            currMails.forEach(mail => {
                if (!mail.isRead) counter++
            })

            this.unreadMails = counter
        }
    },
    computed: {
        mailsToShow() {
            return this.searchMails(this.getMailsByFilter())
        },
        readRatio() {
            this.updateUnreadCounter()
            const currMails = this.searchMails(this.getMailsByFilter())

            let counter = 0
            currMails.forEach(mail => {
                if (mail.isRead) counter++
            })

            if (!this.mailsToShow.length) {
                return 100
            }

            return counter / this.mailsToShow.length * 100
        },
    },
    created() {

        eventBus.$on('reloadMails', this.loadMails)

        eventBus.$on('saveAsDraft', this.saveDraft)
        eventBus.$on('removeMail', this.removeMail)
        eventBus.$on('searchInMail', this.onSearch)

        this.loadMails()
    },
    destroyed() {
        eventBus.$off('reloadMails')

        eventBus.$off('saveDraft', this.saveDraft)
        eventBus.$off('removeMail', this.removeMail)
        eventBus.$off('searchInMail')
    },
    components: {
        mailPreview,
        mailList,
        sideBar,
        progressBar
    },
}
