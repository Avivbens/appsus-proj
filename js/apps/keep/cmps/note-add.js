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
                
                <input
                    v-model="note.info.title" 
                    placeholder="Title">

                <component  :is="cmp" @setVal="setAns"/>

                <button>Save</button>

            </form>
            {{note}}
        </section>

    `,
    data() {
        return {
            note: {
                type: 'note',
                isPinned: false,
                info: {
                    title: '',
                    txt: ''
                }
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
                }
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
                }
            }
            this.cmp = 'noteTodos'
        },
        setAns(val) {
            const title = this.note.info.title
            const isPinned = this.note.isPinned
            if (val.type === 'noteTxt') {
                this.note = {
                    type: 'noteTxt',
                    isPinned,
                    info: {
                        title,
                        txt: val.txt
                    }
                }
            }
            if (val.type === 'noteTodos') {
                const valTxt = val.txt.slice();
                valTxt.pop();
                this.note = {
                    type: 'noteTodos',
                    isPinned,
                    info: {
                        title,
                        txt: valTxt
                    }
                }
            }

        },
    }
}




/* <section class="border">
<form @submit.prevent="save">
    <input v-model="note.info.title" placeholder="Title">
    <br>
    <br>
    <span style="padding:10px" @click="test">N</span><span style="padding:10px">I</span><span style="padding:10px">L</span>
    <textarea v-model="note.info.txt" placeholder="Write your note..."></textarea>
    <button>Save</button>
</form>
{{note}}
</section> */