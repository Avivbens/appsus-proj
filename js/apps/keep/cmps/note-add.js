import noteTxt from './note-txt.js'
import noteImg from './note-img.js'
import noteVideo from './note-video.js'
import noteTodos from './note-todos.js'
export default {
    components: {
        noteTxt,
        noteTodos,
        noteImg,
        noteVideo
    },
    props: [],
    template: `

        <section class="border">
                  <span  class="bold" style="font-size:40px" @click="changeToTxt">text | </span> 
                  <span  class="bold" style="font-size:40px" @click="changeToTodos">list | </span>
                  <span  class="bold" style="font-size:40px" @click="changeToImg">img |</span>
                  <span  class="bold" style="font-size:40px" @click="changeToVideo">video</span>

            <form @submit.prevent="save" class="border">

                <component  :is="cmp" @setVal="setAns"/>

                <button>Save</button>

            </form>
            <!-- {{note}} -->
        </section>

    `,
    data() {
        return {
            note: {
                type: 'noteTxt',
                isPinned: false,
                info: {
                    title: '',
                    txt: ''
                },
                category: ['notes']
            },
            cmp: 'noteTxt'
        }
    },
    methods: {
        save() {
            if (this.note.type === 'noteTodos') this.note.info.txt.pop() //remove last empty line
            this.$emit('save', this.note)
        },
        changeToTxt() {
            this.note = {
                type: 'noteTxt',
                isPinned: false,
                info: {
                    title: '',
                    txt: ''
                },
                category: ['notes']
            }
            this.cmp = 'noteTxt'
        },
        changeToTodos() {

            this.note = {
                type: 'noteTodos',
                isPinned: false,
                info: {
                    title: '',
                    todos: []
                },
                category: ['notes', 'todos']

            }
            this.cmp = 'noteTodos'
        },
        changeToImg() {

            this.note = {
                type: 'noteImg',
                isPinned: false,
                info: {
                    // title: '',
                    imgUrl: ''
                },
                category: ['imgs', 'media']

            }
            this.cmp = 'noteImg'
        },
        changeToVideo() {
            this.note = {
                type: 'noteVideo',
                isPinned: false,
                info: {
                    // title: '',
                    videoUrl: ''
                },
                category: ['videos', 'media']
            }
            this.cmp = 'noteVideo'
        },
        setAns(val) { // later merge it to smaller if statment

            console.log('this.note1 :>> ', this.note);
            // this.note = {
            //         type: val.type,
            //         isPinned: val.isPinned,
            //         info: {
            //             title: val.title,
            //             txt: val.txt,
            //             imgUrl: val.imgUrl,
            //             videoUrl: val.videoUrl
            //         },
            //         category: val.category
            //     }
            this.note = JSON.parse(JSON.stringify(val))
            console.log('this.note :>> ', this.note);



            // if (val.type === 'noteTxt') {

            //     this.note = {
            //         type: 'noteTxt',
            //         isPinned: val.isPinned,
            //         info: {
            //             title: val.title,
            //             txt: val.txt
            //         },
            //         category: ['notes']
            //     }
            // }
            // if (val.type === 'noteTodos') {

            //     const valTxt = val.txt.slice()
            //     valTxt.pop()
            //     this.note = {
            //         type: 'noteTodos',
            //         isPinned: val.isPinned,
            //         info: {
            //             title: val.title,
            //             txt: valTxt
            //         },
            //         category: ['notes', 'todos']
            //     }
            // }

            // if (val.type === 'noteImg') {

            //     this.note = {
            //         type: 'noteImg',
            //         isPinned: val.isPinned,
            //         info: {
            //             // title: val.title,
            //             imgUrl: val.imgUrl,
            //         },
            //         category: ['imgs', 'media']
            //     }
            // }
            // if (val.type === 'noteVideo') {

            //     this.note = {
            //         type: 'noteVideo',
            //         isPinned: val.isPinned,
            //         info: {
            //             // title: val.title,
            //             videoUrl: val.videoUrl,
            //         },
            //         category: ['videos', 'media']
            //     }
            // }

        },
    }
}