import { eventBus } from "../../../../services/event-bus.js"
export default {
    props: ['note', 'editMode'],
    template: `
        <section>

                <li
                v-if="editMode"
                >
                    <button 
                    class="save-changes"
                    @click="onSave"
                    >
                    Save
                    </button>


                    <input v-model="newNote.info.title" placeholder="Title">
                    <br>
                    <div v-for="(line, idx) in newNote.info.todos" > 
                        <input type="text" v-model="newNote.info.todos[idx].txt"
                            @input="addNewLine(idx)" placeholder="□ write your todo here"/>
                    </div> 
                </li>

        <!-- --------------------------- -->

                <li 
                class="note-preview"
                v-else
                >
                    <h2>{{note.info.title}}</h2>
                    <p
                        v-for="(todo,idx) in note.info.todos"
                        :class="isDone(todo)" @click="toggleIsDone(idx)">
                        <span>□</span> 
                        {{todo.txt}}
                    </p>
                </li>

                
        </section>
    `,
    methods: {
        isDone(todo) {
            return { done: todo.isDone }
        },
        toggleIsDone(todoIdx) {
            eventBus.$emit('toggleIsDone', { noteId: this.note.id, todoIdx })
        },
        onSave() {
            console.log('this.newNote :>> ', this.newNote);
            eventBus.$emit('onSaveNote', this.newNote)
            this.$emit('offEditMode', this.newNote)
        },
        addNewLine(idx) {
            if (idx === this.note.info.todos.length - 1) this.note.info.todos.push({ txt: '', isDone: false })
        },
    },
    data() {
        return {
            newNote: null,
        }
    },
    watch: {
        editMode() {
            this.newNote = JSON.parse(JSON.stringify(this.note))
        }
    },
}