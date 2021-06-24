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
            <note-list :notes="notes"/> //will be get from the compouted
        </section>
    `,
    data() {
        return {
            notes: [],
            searchBy: '',
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
                .then(res => this.notes = res)
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
        },
        deleteNote(noteId) {
            keepService.remove(noteId)
                .then(() => this.loadNotes())
        },
        setSearch(search) {
            console.log('here', search);
            // this.notes = keepService.getBySearch(this.notes, this.searchBy)
        }
    },
    computed: {

    },
    created() {
        this.loadNotes(),
            eventBus.$on('toggleIsDone', this.toggleIsDone),
            eventBus.$on('deleteNote', this.deleteNote),
            eventBus.$on('searchInKeep', this.setSearch),
            eventBus.$on('onSaveNote', this.saveNote)
    },
    destroyed() {
        eventBus.$off('toggleIsDone', this.toggleIsDone),
            eventBus.$off('deleteNote', this.deleteNote),
            eventBus.$off('searchInKeep', this.setSearch)

    },
    components: {
        noteList,
        noteAdd,
        sideBar
    },
}