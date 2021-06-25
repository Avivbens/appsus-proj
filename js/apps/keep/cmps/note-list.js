// import { keepService } from '../services/keep-service.js'
import notePreview from './note-preview.js'

export default {
    props: ['notes'],
    template: `
    <section>
        <ul class="note-list border" >
            <note-preview 
            v-for="note in notes"
            v-if="note.isPinned"
            :key="note.id" class="note-preview-container" 
            :note="note"/>
            <!-- :note="note"  @click.native="goToNote(note)"/> -->
        </ul>
        <!-- --------------------- -->
        <ul class="note-list border" >
            <note-preview 
            v-for="note in notes"
            v-if="!note.isPinned"
            :key="note.id" class="note-preview-container" 
            :note="note"/>
            <!-- :note="note"  @click.native="goToNote(note)"/> -->
        </ul>
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

    },
    created() {

    },
    destroyed() {

    },
    components: {
        notePreview

    },
}