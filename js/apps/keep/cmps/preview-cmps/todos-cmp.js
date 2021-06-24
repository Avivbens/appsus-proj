import { eventBus } from "../../../../services/event-bus.js"
export default {
    props: ['note'],
    template: `
        <section>
                <li class="note-preview">
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
    }
}