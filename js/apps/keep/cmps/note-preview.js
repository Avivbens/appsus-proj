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
        <section 
        class="note-preview" 
        :class="note.type"
        :style="{backgroundColor: bgc}">
        
            <button @click="deleteNote">
                <i class="fas fa-trash-alt"></i>
            </button>
            <button @click="pinNote">
                <i class="fas fa-thumbtack"></i>
            </button>

            <button @click="shareNote">
                <i class="fas fa-share-alt"></i>
            </button>
            
            <button
            class="color-btn"
            > 
                <i class="fas fa-palette">
                    <input v-model="bgc" type="color">
                </i> 
            </button>


            <button v-if="isEditable" @click="onEditNote">
                <i class="fas fa-edit"></i>
            </button>
            
            <component 
            :note="note"
            :bgc="bgc"
            :is="cmp"
            :editMode="editMode"
            @offEditMode="offEdit"
                />

        </section>
    `,
    data() {
        return {
            cmp: 'txtCmp',
            editMode: false,
            bgc: '000000'
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
        },
        onUpdateColor(ev) {
            this.bgc = ev.value
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
        this.bgc = this.note.bgc
    },
    destroyed() {

    },
    watch: {
        bgc() {
            this.note.bgc = this.bgc
            eventBus.$emit('onUpdateColor', this.note)
        }
    }

}
