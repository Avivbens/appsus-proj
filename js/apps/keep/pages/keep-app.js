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
            
            <note-list :notes="notesToShow"
            v-if="pinnedNotes"
            /> 
        </section>
    `,
    data() {
        return {
            notes: [],
            searchBy: '',
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
                .then(res => this.notes = res)
        },
        saveNote(note) {
            keepService.save(note)
                .then(() => this.loadNotes())
        },
        setFilter(filter) {
            this.filterBy = filter
                // this.updateNotesToShow()
        },
        setSearch(searchStr) {
            console.log('here', searchStr);
            this.searchBy = searchStr

            // this.notes = keepService.getBySearch(this.notes, this.searchBy)
        },
        // updateNotesToShow() {
        //     if (!this.filterBy) return
        //     keepService.getByFilter(this.filterBy)
        //         .then(res => this.notes = res)
        // },
        toggleIsDone({ noteId, todoIdx }) {
            keepService.toggleIsDone({ noteId, todoIdx })
                .then(res => this.notes = res)
        },
        deleteNote(noteId) {
            keepService.remove(noteId)
                .then(() => this.loadNotes())
        },
        pinNote(note) {
            keepService.togglePinNode(note)
                .then((res) => this.notes = res)
        },

    },
    computed: {
        pinnedNotes() {
            if (!this.notes) return
            return this.notes.filter(note => note.isPinned)
        },
        restNotes() {
            if (!this.notes) return
            return this.notes.filter(note => !note.isPinned)
        },
        notesToShow() {
            return keepService.getNotesToShow(this.notes, this.searchBy, this.filterBy)
        }
    },
    created() {
        this.notes = this.loadNotes()
        eventBus.$on('toggleIsDone', this.toggleIsDone)
        eventBus.$on('deleteNote', this.deleteNote)
        eventBus.$on('searchInKeep', this.setSearch)
        eventBus.$on('onSaveNote', this.saveNote)
        eventBus.$on('pinNote', this.pinNote)
        eventBus.$on('onUpdateColor', this.saveNote)

    },
    destroyed() {
        eventBus.$off('toggleIsDone', this.toggleIsDone)
        eventBus.$off('deleteNote', this.deleteNote)
        eventBus.$off('searchInKeep', this.setSearch)

    },
    components: {
        noteList,
        noteAdd,
        sideBar
    },
}