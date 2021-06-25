import { eventBus } from '../../../services/event-bus.js'

export default {

    props: [],
    template: `
    <section>
            <input type="text" v-model="note.info.videoUrl" @change="reportVal"
                placeholder="paste URL here"/>
    </section>
    `,
    data() {
        return {
            note: {
                id: null,
                type: 'noteVideo',
                isPinned: false,
                info: {
                    title: '',
                    txt: '',
                    todos: [],
                    imgUrl: '',
                    videoUrl: ''
                },
                categories: ['videos', 'media'],
                bgc: '#ffffff'
            }
        }
    },
    methods: {
        reportVal() {
            this.note.info.videoUrl = this.note.info.videoUrl.split('=')[1].split('&')[0]
            this.$emit('setVal', this.note)
        },
        cleanInput() {
            this.note.info.videoUrl = ''
        }
    },
    created() {
        eventBus.$on('cleanInput', this.cleanInput)
    }
}
