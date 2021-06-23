import mailSummery from './mail-summery.js'

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

                            <button>📩</button>
                            <button>✖</button>
                        </span>
                    </span>
                </section>


                <mail-summery 
                    v-if="summery"
                    :mail="summery"
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
            const minusButtons = (this.hoverBody) ? 120 : 20
            const screenW = (window.innerWidth * 0.7 - minusButtons) / 8
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
        }
    },
    created() {
        this.updateBodyToShow()
    },
    mounted() {
        window.addEventListener('resize', this.updateBodyToShow)
    },
    components: {
        mailSummery,
    },
}
