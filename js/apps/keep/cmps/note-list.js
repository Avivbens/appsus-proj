// import { keepService } from '../services/keep-service.js'
import notePreview from './note-preview.js'

export default {
    props: ['notes'],
    template: `
    <section class="note-list-container">
        <h3 v-if="pinnedNotes.length">Pinned</h3>   
        <div class="note-list" >
            <note-preview 
            v-for="note in pinnedNotes"
            v-if="pinnedNotes.length"
            :key="note.id"
            :note="note"/>
            <!-- :note="note"  @click.native="goToNote(note)"/> -->
        </div>
        <!-- --------------------- -->
        <h3 v-if="otherNotes.length && pinnedNotes.length">Notes</h3>   
        <div class="note-list" >
            <note-preview 
            v-for="note in otherNotes"
            v-if="otherNotes"
            :key="note.id"
            :note="note"/>
            <!-- :note="note"  @click.native="goToNote(note)"/> -->
        </div>
    </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        // goToNote(note) {
        //     this.$router.push('/note/' + note.id)
        // }
    },
    computed: {
        pinnedNotes() {
            return this.notes.filter(note => note.isPinned)
        },
        otherNotes() {
            return this.notes.filter(note => !note.isPinned)
        }
    },
    components: {
        notePreview

    },
}
