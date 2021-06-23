import noteTxt from './note-txt.js'
import noteTodos from './note-todos.js'
export default {
    components: {
        noteTxt,
        noteTodos

    },
    props: [],
    template: `

        <section class="border">
                  <span  class="bold" style="font-size:40px" @click="changeToTxt">text | </span> 
                  <span  class="bold" style="font-size:40px" @click="changeToTodos">list</span>

            <form @submit.prevent="save" class="border">

                <component  :is="cmp" @setVal="setAns"/>

                <button>Save</button>

            </form>
            <!-- {{note}} -->
        </section>

    `,
    data() {
        return {
            note: {
                type: 'noteTxt',
                isPinned: false,
                info: {
                    title: '',
                    txt: ''
                },
                category: ['notes']
            },
            cmp: 'noteTxt'
        }
    },
    methods: {
        save() {
            this.$emit('save', this.note)
        },
        test() {
            console.log('test!')
        },
        changeToTxt() {

            this.note = {
                type: 'noteTxt',
                isPinned: false,
                info: {
                    title: '',
                    txt: ''
                },
                category: ['notes']
            }
            this.cmp = 'noteTxt'
        },
        changeToTodos() {

            this.note = {
                type: 'noteTodos',
                isPinned: false,
                info: {
                    title: '',
                    todos: []
                },
                category: ['notes', 'todos']

            }
            this.cmp = 'noteTodos'
        },
        setAns(val) { // later merge it to smaller if statment
            if (val.type === 'noteTxt') {
                this.note = {
                    type: 'noteTxt',
                    isPinned: val.isPinned,
                    info: {
                        title: val.title,
                        txt: val.txt
                    },
                    category: ['notes']
                }
            }
            if (val.type === 'noteTodos') {
                const valTxt = val.txt.slice()
                valTxt.pop()
                this.note = {
                    type: 'noteTodos',
                    isPinned: val.isPinned,
                    info: {
                        title: val.title,
                        txt: valTxt
                    },
                    category: ['notes', 'todos']
                }
            }

        },
    }
}