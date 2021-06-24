import { eventBus } from "../../../services/event-bus.js"

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
                category: ['notes'],
            }

        }
    },
    methods: {
        reportVal() {
            this.$emit('setVal', this.note)
        },
        editNote(note) {
            if (note.type !== 'noteTxt') return
            this.note = JSON.parse(JSON.stringify(note))
        },

    },
    created() {
        eventBus.$on('editNote', this.editNote)

    }
}