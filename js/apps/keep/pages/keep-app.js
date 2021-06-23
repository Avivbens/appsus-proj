import noteList from '../cmps/note-list.js'
import noteAdd from '../cmps/note-add.js'
import sideBar from '../../../cmps/side-bar.js'
import { keepService } from '../services/keep-service.js'
import { eventBus } from "../../../services/event-bus.js"


export default {
    props: [],
    template: `
        <section 
        class="keep-app">
            <side-bar 
            class="keep-side-bar"
            :categories="categories"
            @setFilter="setFilter"
            />
            <note-add @save="saveNote"/>
            <note-list :notes="notes"/>
        </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: '',
            categories: [
                'notes',
                'todos',
                'alerts',
                'work',
                'personal',
                'trash',
            ],
        }
    },
    methods: {
        loadNotes() {
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
        },
        setFilter(filter) {
            this.filterBy = filter
            this.updateNotesToShow()
        },
        updateNotesToShow() {
            if (!this.filterBy) return
            keepService.getByFilter(this.filterBy)
                .then(res => this.notes = res)
        },
        toggleIsDone({ noteId, todoIdx }) {
            keepService.toggleIsDone({ noteId, todoIdx })
                .then(res => this.notes = res)
        }
    },
    computed: {

    },
    created() {
        this.loadNotes(),
            eventBus.$on('toggleIsDone', this.toggleIsDone)

    },
    destroyed() {

    },
    components: {
        noteList,
        noteAdd,
        sideBar
    },
}