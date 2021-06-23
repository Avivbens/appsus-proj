import noteList from '../cmps/note-list.js'
import noteAdd from '../cmps/note-add.js'
import { keepService } from '../services/keep-service.js'

export default {
    props: [],
    template: `
        <section>
            <note-add @save="saveNote"/>
            <note-list :notes="notes"/>
            <note-details v-if="selectedNote" :note="selectedNote" @selected="selectNote"/>
        </section>
    `,
    data() {
        return {
            notes: [],
            selectedNote: null,
            // filterBy: null
        }
    },
    methods: {
        loadNotes() {
            console.log('happened');

            keepService.query()
                .then(res => {
                    if (res.length) {
                        console.log(res);

                        this.notes = res
                    } else {
                        keepService.postMany(keepService.createFirstNotes())
                            .then(res => this.notes = res)
                    }
                })
        },
        selectNote(note) {
            this.selectedNote = note;
        },
        saveNote(note) {
            keepService.save(note)
                .then(() => this.loadNotes())
        }
    },
    computed: {

    },
    created() {
        this.loadNotes()
    },
    destroyed() {

    },
    components: {
        noteList,
        noteAdd,
    },
}