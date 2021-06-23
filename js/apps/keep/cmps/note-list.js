import { keepService } from '../services/keep-service.js'
import notePreview from './note-preview.js'

export default {
    props: ['notes'],
    template: `
       <ul class="note-list">
           <li v-for="note in notes" :key="note.id" class="note-preview-container">
              {{note.title}}
              <note-preview :note="note"  @click.native="select(note)"/>
           </li>
       </ul>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {

    },
    created() {

    },
    destroyed() {

    },
    components: {
        notePreview

    },
}
