import { eventBus } from '../../../services/event-bus.js'
export default {

    props: [],
    template: `
        <section >
            <div>
                <input
                    v-model="note.info.title" @change="reportVal"
                    placeholder="Title" >
            </div>

            <div>
                <input type="text" v-model="note.info.txt" @change="reportVal" placeholder="write your note here"/>
            </div>

            {{note}}
        </section>
    `,
    data() {
        return {
            note: {
                id: null,
                type: 'noteTxt',
                isPinned: false,
                info: {
                    title: '',
                    txt: '',
                    todos: [],
                    imgUrl: '',
                    videoUrl: ''
                },
                categories: ['notes'],
                bgc: '#ffffff'
            }

        }
    },
    methods: {
        reportVal() {
            this.$emit('setVal', this.note)

        },
        cleanInput() {
            this.note.info.title = ''
            this.note.info.txt = ''
        }
    },
    created() {;
        eventBus.$on('cleanInput', this.cleanInput)
    },
    // watch: {
    //     '$route.query': {
    //         immediate: true,
    //         handler() {
    //             const query = this.$route.query
    //             if (query.mail) {
    //                 this.note.type = 'noteTxt'
    //                 this.note.info.title = query.subject
    //                 this.note.info.txt = `
    //                 Sender: ${query.sender}
    //                 To: ${query.to}
    //                 \n
    //                 ${query.body}
    //                 `
    //             }

    //             console.log('this.note :>> ', this.note)
    //             this.reportVal()
    //         }
    //     }
    // },
}