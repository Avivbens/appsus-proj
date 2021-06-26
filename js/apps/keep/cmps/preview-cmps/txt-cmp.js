import { eventBus } from '../../../../services/event-bus.js'
export default {
    props: ['note', 'bgc'],
    template: `
    <section >
        <li class="note-main-area">
            <input class="title-input" v-model="note.info.title" type="text"@input.stop="onSave"  >
            <input class="txt-input" v-model="note.info.txt" type="text" @input.stop="onSave" >
        </li>
    </section>
    `,
    methods: {
        onSave() {
            eventBus.$emit('onSaveNote', this.note)
                // this.$emit('offEditMode', this.note)
        }
    },

}