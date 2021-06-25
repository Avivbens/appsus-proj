import mailSummery from './mail-summery.js'
import { eventBus } from "../../../services/event-bus.js"

export default {
    props: ['mail'],
    template: `
        <article 
            class="mail-preview"
            :class="boldText"
            @mouseover="onHover(true)"
            @mouseleave="onHover(false)"
            @click="openSummery"
            v-if="mail">

                <section
                class="small-prev-container"
                v-if="!summery">

                    <button 
                    class="starred-mail-btn"
                    @click.stop="onStarMail"
                    :class="starredColor"
                    >
                    <i :class="starred"
                    ></i>
                    </button>

                    <span>
                        <span v-if="isSentMail">{{mail.to}}</span>
                        <span v-else>{{mail.sender}}</span>


                        <span>{{mail.subject}}</span>
                    </span>

                    <span ref="bodyContainer">
                        <span>{{bodyToShow}}</span>
                        <span>{{timeToShow}}</span>

                        <span
                        v-if="hoverBody"
                        class="preview-btns-container"
                        >

                            <button 
                                class="clickable"
                                @click.stop="onSendToArchive">
                                <i class="fas fa-archive"></i>
                            </button>

                            <button 
                                class="clickable"
                                @click.stop="onToggleMarkAsRead"> 
                                <i :class="readButton"></i>
                            </button>
                            
                            <button 
                                class="clickable"
                                @click.stop="onDeleteMail"
                                >
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </span>
                    </span>
                </section>


                <mail-summery 
                    v-else
                    :mail="summery"
                    @existSummery="summery=null"
                />

        </article>
    `,
    data() {
        return {
            hoverBody: false,
            bodyToShow: '',
            summery: null,
        }
    },
    methods: {
        updateBodyToShow() {
            const minusButtons = (this.hoverBody) ? 160 : 60

            let allText = this.mail.body
            if (!allText) return

            let stringWidth = 0
            let stringToShow = ''
            while (stringWidth < (window.innerWidth * 0.55 - minusButtons) - 20) {
                stringToShow += allText.charAt(0)
                allText = allText.substr(1)

                const fontSize = (this.mail.isRead) ? 16 : 18.5
                stringWidth = this.measureText(stringToShow, fontSize)
                if (!allText) {
                    this.bodyToShow = stringToShow
                    return
                }
            }

            this.bodyToShow = stringToShow + '...'

            // const minusButtons = (this.hoverBody) ? 160 : 20
            // const screenW = (window.innerWidth * 0.7 - minusButtons) / 9
            // this.bodyToShow = this.mail.body.substr(0, screenW) + '...'
        },
        measureText(str, fontSize = 16) {
            const widths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2796875, 0.2765625, 0.3546875, 0.5546875, 0.5546875, 0.8890625, 0.665625, 0.190625, 0.3328125, 0.3328125, 0.3890625, 0.5828125, 0.2765625, 0.3328125, 0.2765625, 0.3015625, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.2765625, 0.2765625, 0.584375, 0.5828125, 0.584375, 0.5546875, 1.0140625, 0.665625, 0.665625, 0.721875, 0.721875, 0.665625, 0.609375, 0.7765625, 0.721875, 0.2765625, 0.5, 0.665625, 0.5546875, 0.8328125, 0.721875, 0.7765625, 0.665625, 0.7765625, 0.721875, 0.665625, 0.609375, 0.721875, 0.665625, 0.94375, 0.665625, 0.665625, 0.609375, 0.2765625, 0.3546875, 0.2765625, 0.4765625, 0.5546875, 0.3328125, 0.5546875, 0.5546875, 0.5, 0.5546875, 0.5546875, 0.2765625, 0.5546875, 0.5546875, 0.221875, 0.240625, 0.5, 0.221875, 0.8328125, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.3328125, 0.5, 0.2765625, 0.5546875, 0.5, 0.721875, 0.5, 0.5, 0.5, 0.3546875, 0.259375, 0.353125, 0.5890625]
            const avg = 0.5279276315789471
            return str
                .split('')
                .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
                .reduce((cur, acc) => acc + cur) * fontSize
        },
        onHover(hover) {
            this.hoverBody = hover
            this.updateBodyToShow()
        },
        openSummery() {
            this.mail.isRead = true
            this.$emit('saveMail', this.mail)

            if (this.summery) {
                this.summery = null
                return
            }
            this.summery = this.mail
        },
        onToggleMarkAsRead() {
            this.mail.isRead = !this.mail.isRead
            this.$emit('saveMail', this.mail)
        },
        onDeleteMail() {
            this.$emit('removeMail', this.mail)
        },
        onSendToArchive() {
            this.$emit('archiveMail', this.mail)
        },
        onStarMail() {
            this.$emit('starMail', this.mail)
        },
    },
    computed: {
        boldText() {
            return { bold: !this.mail.isRead }
        },
        timeToShow() {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            const month = months[new Date(this.mail.sentAt).getMonth()]
            const res = `${month} ${new Date(this.mail.sentAt).getDay()}`

            return res
        },
        //<i class="fas fa-envelope-open-text"></i>

        readButton() {
            if (this.mail.isRead) return 'fas fa-envelope-open-text'
            return 'fas fa-envelope-open'
        },
        isSentMail() {
            return this.mail.categories.includes('sent mails')
        },
        starred() {
            return (!this.mail.isStarred) ? 'far fa-star' : 'fas fa-star'
        },
        starredColor() {
            return { starred: this.mail.isStarred }
        }
    },
    created() {
        this.updateBodyToShow()
    },
    mounted() {
        window.addEventListener('resize', this.updateBodyToShow)
    },
    watch: {
        mail() {
            this.updateBodyToShow()
            this.hoverBody = false
        },
    },
    components: {
        mailSummery,
    },
}
