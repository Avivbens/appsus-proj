import { eventBus } from "../../../services/event-bus.js"

export default {
    props: ['note'],
    template: `
      <section class="border">
      <button @click="deleteNote">X</button>
        <li v-if="note.type === 'noteTxt'" class="note-preview">
          <h2>{{note.info.title}}</h2>
          <p>{{note.info.txt}}</p>

        </li>

        <li v-else-if="note.type === 'noteTodos'" class="note-preview">

        
          <h2>{{note.info.title}}</h2>
          <p v-for="(todo,idx) in note.info.txt"
           :class="isDone(todo)" @click="toggleIsDone(idx)"
           ><span>□</span> {{todo.txt}}</p>

        </li>

        <li v-else-if="note.type === 'noteImg'" class="note-preview">

          <!-- <h2>{{note.info.title}}</h2> -->
          <img :src="note.info.imgUrl" alt="no img">

        </li>

        <li v-else-if="note.type === 'noteVideo'" class="note-preview">

          <!-- <h2>{{note.info.title}}</h2> -->
          <!-- <video :src="note.info.videoUrl" alt="no video" controls></video> -->
          <iframe width="560" height="315" :src="'https://www.youtube.com/embed/'+note.info.videoUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        </li>

      </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        toggleIsDone(todoIdx) {
            eventBus.$emit('toggleIsDone', { noteId: this.note.id, todoIdx })
        },
        isDone(todo) {
            return { done: todo.isDone }
        },
        deleteNote() {
            eventBus.$emit('deleteNote', this.note.id)
        }
    },
    computed: {

    },

    created() {

    },
    destroyed() {

    },

}