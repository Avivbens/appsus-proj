import mailPreview from '../cmps/mail-preview.js'
import mailList from '../cmps/mail-list.js'
import { mailService } from "../services/mail-service.js"

export default {
    template: `
        <main v-if="mailsToShow">
            <mail-list 
            :mails="mailsToShow"/>
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
        }
    },
    computed: {

    },
    created() {
        this.loadMails()
    },
    destroyed() {

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
