import { eventBus } from '../../../services/event-bus.js';
export default {

    props: [],
    template: `

   

    <section>

            <input v-model="note.info.title" placeholder="Title" @change="reportVal">
         <br>
         <div v-for="(line, idx) in note.info.todos" > 
            <input type="text" v-model="note.info.todos[idx].txt" @change="reportVal"
                @input="addNewLine(idx)" placeholder="□ write your todo here"/>
        </div> 

    </section>

    `,
    data() {
        return {
            note: {
                id: null,
                type: 'noteTodos',
                isPinned: false,
                info: {
                    title: '',
                    txt: '',
                    todos: [{ txt: '', isDone: false }],
                    imgUrl: '',
                    videoUrl: '',
                },
                category: ['notes', 'todos'],
            },
        }
    },
    methods: {
        reportVal() {
            console.log('reporting....')
            this.$emit('setVal', this.note)
        },
        addNewLine(idx) {
            if (idx === this.note.info.todos.length - 1) this.note.info.todos.push({ txt: '', isDone: false })
        },
        cleanInput() {
            this.note.info.title = ''
            this.note.info.txt = ''
            this.note.info.todos = [{ txt: '', isDone: false }]
        }
    },
    created() {
        eventBus.$on('cleanInput', this.cleanInput)
    }
}