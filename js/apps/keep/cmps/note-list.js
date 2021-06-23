import { keepService } from '../services/keep-service.js'
import notePreview from './note-preview.js'

export default {
    props: ['notes'],
    template: `
       <ul class="note-list border" >
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
        select(note) {
            //if this id is in the books so commit the selected, 
            //else , emit "add book"!
            keepService.query()
                .then((notes) => {
                    const isThere = notes.find((_note) => {
                        return _note.id === note.id
                    })
                    return isThere
                })
                .then(res => {
                    if (!res) this.$emit('addNote', note)
                    else this.$emit('selected', note);

                })

        },
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