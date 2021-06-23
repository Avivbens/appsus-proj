// import componentName from 'url'
import textBox from './text-box.js';
import listBox from './list-box.js';
export default {
    components: {
        textBox,
        listBox

    },
    props: [],
    template: `

        <section class="border">
                  <div  class="bold" style="font-size:40px" @click="cmp = 'textBox'">text</div>
                  <div  class="bold" style="font-size:40px" @click="cmp = 'listBox'">list</div>

            <form @submit.prevent="save">
            <input v-model="note.info.title" placeholder="Title">

                <component  :is="cmp"/>

                <button>Save</button>
            </form>
            {{note}}
        </section>



        <!-- <section class="border">
            <form @submit.prevent="save">
                <input v-model="note.info.title" placeholder="Title">
                <br>
                <br>
                <span style="padding:10px" @click="test">N</span><span style="padding:10px">I</span><span style="padding:10px">L</span>
                <textarea v-model="note.info.txt" placeholder="Write your note..."></textarea>
                <button>Save</button>
            </form>
            {{note}}
        </section> -->

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
            cmp: 'listBox'
        }
    },
    methods: {
        save() {
            this.$emit('save', this.note);
        },
        test() {
            console.log('test!');

        }

    },
    computed: {

    },
    created() {

    },
    destroyed() {

    }
}