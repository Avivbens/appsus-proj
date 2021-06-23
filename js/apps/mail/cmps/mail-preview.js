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
            @click="openSummery(mail)"
            v-if="mail">

                <section
                class="small-prev-container"
                v-if="!summery">
                    <span>
                        <span>{{mail.sender}}</span>
                        <span>{{mail.subject}}</span>
                    </span>

                    <span ref="bodyContainer">
                        <span>{{bodyToShow}}</span>
                        <span>{{timeToShow}}</span>

                        <span
                        v-if="hoverBody">

                            <button 
                            class="clickable"
                            @click.stop="onSendToArchive"
                            
                            >📩</button>

                            <button 
                            class="clickable"
                            @click.stop="mail.isRead = !mail.isRead"
                            
                            >{{readButton}}</button>
                            
                            <button 
                            class="clickable"
                            @click.stop="onDeleteMail(mail)"
                            
                            >✖</button>
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
            const minusButtons = (this.hoverBody) ? 160 : 20
            const screenW = (window.innerWidth * 0.7 - minusButtons) / 9
            this.bodyToShow = this.mail.body.substr(0, screenW) + '...'
        },
        onHover(hover) {
            this.hoverBody = hover
            this.updateBodyToShow()
        },
        openSummery(mail) {
            if (this.summery) {
                this.summery = null
                return
            }
            this.summery = mail
        },
        measureText(str, fontSize = 10) {
            const widths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2796875, 0.2765625, 0.3546875, 0.5546875, 0.5546875, 0.8890625, 0.665625, 0.190625, 0.3328125, 0.3328125, 0.3890625, 0.5828125, 0.2765625, 0.3328125, 0.2765625, 0.3015625, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.2765625, 0.2765625, 0.584375, 0.5828125, 0.584375, 0.5546875, 1.0140625, 0.665625, 0.665625, 0.721875, 0.721875, 0.665625, 0.609375, 0.7765625, 0.721875, 0.2765625, 0.5, 0.665625, 0.5546875, 0.8328125, 0.721875, 0.7765625, 0.665625, 0.7765625, 0.721875, 0.665625, 0.609375, 0.721875, 0.665625, 0.94375, 0.665625, 0.665625, 0.609375, 0.2765625, 0.3546875, 0.2765625, 0.4765625, 0.5546875, 0.3328125, 0.5546875, 0.5546875, 0.5, 0.5546875, 0.5546875, 0.2765625, 0.5546875, 0.5546875, 0.221875, 0.240625, 0.5, 0.221875, 0.8328125, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.3328125, 0.5, 0.2765625, 0.5546875, 0.5, 0.721875, 0.5, 0.5, 0.5, 0.3546875, 0.259375, 0.353125, 0.5890625]
            const avg = 0.5279276315789471
            return str
                .split('')
                .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
                .reduce((cur, acc) => acc + cur) * fontSize
        },
        onDeleteMail(mail) {
            eventBus.$emit('removeMail', mail)
        }
    },
    computed: {
        boldText() {
            return { bold: this.mail.isRead }
        },
        timeToShow() {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            const month = months[new Date(this.mail.sentAt).getMonth()]
            const res = `${month} ${new Date(this.mail.sentAt).getDay()}`

            return res
        },
        readButton() {
            if (this.mail.isRead) return '💌'
            return '📧'
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
        }
    },
    components: {
        mailSummery,
    },
}
