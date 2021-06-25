import { eventBus } from '../../../../services/event-bus.js'
export default {
    components: {

    },
    props: ['note', 'editMode', 'bgc'],
    template: `
    <section >
        <li
        v-if="editMode && newNote"
        >
            <button 
            class="save-changes"
            @click="onSave"
            >
            Save
            </button>

            
            <input v-model="newNote.info.title" type="text" >
            <input v-model="newNote.info.txt" type="text" >
            <p>{{newNote.info.txt}}</p>

        </li>


        <li 
       
        v-else
        >
            <h2>{{newNote.info.title}}</h2>
            <p>{{newNote.info.txt}}</p>
        </li>

    </section>
    `,
    methods: {
        onSave() {
            eventBus.$emit('onSaveNote', this.newNote)
            this.$emit('offEditMode', this.newNote)
        }
    },
    computed: {

    },
    data() {
        return {
            newNote: null,
        }
    },
    created() {
        this.newNote = JSON.parse(JSON.stringify(this.note))
    },
}
