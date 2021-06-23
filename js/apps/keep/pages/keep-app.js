import noteList from '../cmps/note-list.js'
import noteAdd from '../cmps/note-add.js'
import { keepService } from '../services/keep-service.js'

export default {
    props: [],
    template: `
        <section>
            <note-add @save="saveNote"/>
            <note-list :notes="notes"/>
        </section>
    `,
    data() {
        return {
            notes: [],
            // filterBy: null
        }
    },
    methods: {
        loadNotes() {
            console.log('happened');

            keepService.query()
                .then(res => {
                    if (res.length) {
                        this.notes = res
                    } else {
                        keepService.postMany(keepService.createFirstNotes())
                            .then(res => this.notes = res)
                    }
                })
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