import txtCmp from '../cmps/preview-cmps/txt-cmp.js'
import todosCmp from '../cmps/preview-cmps/todos-cmp.js'
import imgCmp from '../cmps/preview-cmps/img-cmp.js'
import videoCmp from '../cmps/preview-cmps/video-cmp.js'
import { eventBus } from "../../../services/event-bus.js"
export default {
    components: {
        txtCmp,
        todosCmp,
        imgCmp,
        videoCmp
    },
    props: ['note'],
    template: `
      <section class="border">
            <button @click="deleteNote">X</button>
            <button @click="pinNote">Pin</button>

            <button @click="shareNote">Share</button>

            <button v-if="isEditable" @click="onEditNote">Edit</button>
            
            <component 
            :note="note"
            :is="cmp"
            :editMode="editMode"
            @offEditMode="offEdit"
                />

      </section>
    `,
    data() {
        return {
            cmp: 'txtCmp',
            editMode: false
        }
    },
    methods: {
        deleteNote() {
            eventBus.$emit('deleteNote', this.note.id)
        },
        onEditNote() {
            this.editMode = !this.editMode
        },
        offEdit() {
            this.editMode = false
        },
        pinNote() {
            eventBus.$emit('pinNote', this.note)
        },
        shareNote() {
            const url = `/misterEmail/newMail/?note=true&type=${this.note.type}&subject=${this.note.info.title}&body=${this.setShareBody()}`
            this.$router.push(url)
        },
        setShareBody() {
            const note = this.note.info
            let str = ''

            switch (this.note.type) {
                case 'noteTxt':
                    str = `${note.txt}`
                    break

                case 'noteTodos':
                    let todosStr = ''
                    note.todos.forEach(todo => {
                        todosStr += '□' + todo.txt + '\n'
                    })
                    str = `${todosStr}`
                    break

                case 'noteImg':
                    str = `${note.imgUrl}`
                    break

                case 'noteVideo':
                    str = `${note.videoUrl}`
                    break

                default:
                    str = `${note.txt}`
                    break
            }

            return str
        }
    },
    computed: {
        isEditable() {
            return this.note.type === 'noteTxt' || this.note.type === 'noteTodos'
        }
    },

    created() {
        switch (this.note.type) {
            case 'noteTxt':
                this.cmp = 'txtCmp'
                break
            case 'noteTodos':
                this.cmp = 'todosCmp'
                break
            case 'noteImg':
                this.cmp = 'imgCmp'
                break
            case 'noteVideo':
                this.cmp = 'videoCmp'
                break
        }
    },
    destroyed() {

    },

}
