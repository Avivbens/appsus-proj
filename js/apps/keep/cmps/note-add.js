import noteTxt from './note-txt.js'
import noteImg from './note-img.js'
import noteVideo from './note-video.js'
import noteTodos from './note-todos.js'
import { eventBus } from "../../../services/event-bus.js"

export default {
    components: {
        noteTxt,
        noteTodos,
        noteImg,
        noteVideo
    },
    props: [],
    template: `

        <section class="border">
            <div class="btn-mode">
                  <span  class="bold" style="font-size:40px" @click="cmp = 'noteTxt'">text | </span> 
                  <span  class="bold" style="font-size:40px" @click="cmp = 'noteTodos'">list | </span>
                  <span  class="bold" style="font-size:40px" @click="cmp = 'noteImg'">img |</span>
                  <span  class="bold" style="font-size:40px" @click="cmp = 'noteVideo'">video</span>
            </div>

            <form @submit.prevent="save" class="border">

                <component :is="cmp" @setVal="setAns"/>

                <button>Save</button>

            </form>
        </section>
    `,
    data() {
        return {
            note: {
                type: '',
                isPinned: false,
                info: {
                    title: '',
                    txt: '',
                    todos: [],
                    imgUrl: '',
                    videoUrl: '',
                },
                category: ['']
            },
            cmp: 'noteTxt'
        }
    },
    methods: {
        save() {
            if (this.note.type === 'noteTodos') this.note.info.todos.pop() //remove last empty line
            this.$emit('save', this.note)
        },
        setAns(val) {
            this.note = JSON.parse(JSON.stringify(val))
        },
        editNote(note) {
            //     console.log('note', note)
            this.cmp = note.type
                //     console.log('this.note1 :>> ', this.note);
                //     this.note = JSON.parse(JSON.stringify(note))
                //     console.log('this.note2 :>> ', this.note);
        }
    },
    created() {
        eventBus.$on('editNote', this.editNote)

    }
}