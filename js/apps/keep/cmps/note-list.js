import { keepService } from '../services/keep-service.js'
import notePreview from './note-preview.js'

export default {
    props: ['notes'],
    template: `
       <ul class="note-list border" >
              <note-preview 
              v-for="note in notes"
               :key="note.id" class="note-preview-container" 
               :note="note"  @click.native="goToNote(note)"/>
       </ul>
    `,
    data() {
        return {

        }
    },
    methods: {
        goToNote(note) {
            this.$router.push('/note/' + note.id)
        }
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