import { eventBus } from "../../../services/event-bus.js"

export default {
    props: ['note'],
    template: `
      <section>
        <li v-if="note.type === 'noteTxt'" class="note-preview border">

          <h2>{{note.info.title}}</h2>
          <p>{{note.info.txt}}</p>

        </li>

        <li v-else-if="note.type === 'noteTodos'" class="note-preview border">

          <h2>{{note.info.title}}</h2>
          <p v-for="(todo,idx) in note.info.txt"
           :class="isDone(todo)" @click="toggleIsDone(note.id,idx)"
           ><span>□</span> {{todo.txt}} , {{todo.isDone}}</p>

        </li>

      </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        toggleIsDone(noteId, todoIdx) {
            eventBus.$emit('toggleIsDone', { noteId, todoIdx })
        },
        isDone(todo) {
            return { done: todo.isDone }
        }
    },
    computed: {

    },

    created() {

    },
    destroyed() {

    },

}