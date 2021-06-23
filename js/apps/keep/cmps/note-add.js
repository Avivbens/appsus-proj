// import componentName from 'url'
import { keepService } from '../services/keep-service.js';
export default {
    components: {
        // componentName

    },
    props: [],
    template: `

        <section class="border">
            <form @submit.prevent="save">
                <input v-model="note.info.title" placeholder="Title">
                <br>
                <br>
                <textarea v-model="note.info.txt" placeholder="Write your note..."></textarea>
                <button>Save</button>
            </form>
            {{note}}
        </section>

    `,
    data() {
        return {
            note: {
                type: 'note',
                isPinned: false,
                info: {
                    title: '',
                    txt: ''
                }
            },
        }
    },
    methods: {
        save() {
            this.$emit('save', this.note);
        }

    },
    computed: {

    },
    created() {

    },
    destroyed() {

    }
}