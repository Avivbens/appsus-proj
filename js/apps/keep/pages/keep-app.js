import noteList from '../cmps/note-list.js'
import { keepService } from '../services/keep-service.js'

export default {
    props: [],
    template: `
        <section>
            <note-list :notes="notes"/>
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
            console.log('here')

            keepService.query()
                .then(res => {
                    if (res.length) this.notes = res
                    else {
                        keepService.postMany(keepService.createFirstNotes())
                            .then(res => this.notes = res)
                    }
                })
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
        noteList
    },
}
