import { eventBus } from "../../../../services/event-bus.js"
export default {
    props: ['note'],
    template: `
        <section>
                <li @click.stop="addNewLine('li')" class="note-main-area">
                    <input class="title-input" v-model="note.info.title" placeholder="Title" @input="onSave">
                    <br>
                    <div v-for="(line, idx) in note.info.todos" > 
                        <span class="delete-todo" @click.stop="deleteTodo(idx)"><i class="fas fa-trash-alt"></i></span> 
                        <span :class="{'far fa-check-circle': line.isDone, 'far fa-circle': !line.isDone}" class="clickable" @click.stop="toggleIsDone(idx)"></span>
                        <input :class="{done: line.isDone}" class="txt-input"  type="text" v-model="note.info.todos[idx].txt"
                            @input.stop="addNewLine(idx),onSave()" placeholder="write your todo"/>
                    </div>
                </li>
        </section>
    `,
    methods: {
        isDone(todo) {
            return { done: todo.isDone }
        },
        toggleIsDone(todoIdx) {
            this.note.info.todos[todoIdx].isDone = !this.note.info.todos[todoIdx].isDone // taking with the dom because it the only way it works
                // eventBus.$emit('toggleIsDone', { noteId: this.note.id, todoIdx })
            this.cleanLastLine()
        },
        onSave() {
            eventBus.$emit('onSaveNote', this.note)
        },
        addNewLine() {
            if (!this.checkIfLastLineIsEmpty()) this.note.info.todos.push({ txt: '', isDone: false })
        },
        cleanLastLine() {
            if (this.checkIfLastLineIsEmpty()) this.note.info.todos.pop()
            this.onSave();
        },
        deleteTodo(idx) {
            this.note.info.todos.splice(idx, 1)
            this.onSave()
        },
        checkIfLastLineIsEmpty() {
            if (this.note.info.todos.length === 0) return true
            return (this.note.info.todos[this.note.info.todos.length - 1].txt === '')
        }
    },
    created() {
        document.addEventListener('click', this.cleanLastLine)
    },
    destroyed() {
        document.removeEventListener('click', this.cleanLastLine)
    },
}