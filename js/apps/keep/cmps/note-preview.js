import txtCmp from '../cmps/preview-cmps/txt-cmp.js';
import todosCmp from '../cmps/preview-cmps/todos-cmp.js';
import imgCmp from '../cmps/preview-cmps/img-cmp.js';
import videoCmp from '../cmps/preview-cmps/video-cmp.js';
import { eventBus } from "../../../services/event-bus.js"
export default {
    components: {
        txtCmp,
        todosCmp,
        imgCmp,
        videoCmp
    },
    props: ['note'],
    template: `
      <section class="border">
            <button @click="deleteNote">X</button>
            <button @click="onEditNote">Edit</button>
            
            <component 
            :note="note"
            :is="cmp"
            :editMode="editMode"
            @offEditMode="offEdit"
                />

      </section>
    `,
    data() {
        return {
            cmp: 'txtCmp',
            editMode: false
        }
    },
    methods: {
        deleteNote() {
            eventBus.$emit('deleteNote', this.note.id)
        },
        onEditNote() {
            this.editMode = !this.editMode
            console.log('editNote', this.note);
            eventBus.$emit('editNote', this.note)
        },
        offEdit() {
            this.editMode = false
        }
    },
    computed: {

    },

    created() {
        switch (this.note.type) {
            case 'noteTxt':
                this.cmp = 'txtCmp'
                break;
            case 'noteTodos':
                this.cmp = 'todosCmp'
                break;
            case 'noteImg':
                this.cmp = 'imgCmp'
                break;
            case 'noteVideo':
                this.cmp = 'videoCmp'
                break;
        }
    },
    destroyed() {

    },

}