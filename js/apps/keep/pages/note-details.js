// import { keepService } from '../services/keep-service.js'

// export default {
//     template: `

//     <section v-if="note" class="border">
//     <h2>{{note.info.title}}</h2>
//     <p>{{note.info.txt}}</p>
//     </section>
//     `,
//     data() {
//         return {
//             note: null
//         }
//     },
//     methods: {

//     },
//     computed: {

//     },
//     created() {

//         const { noteId } = this.$route.params;
//         keepService.getById(noteId)
//             .then(note => this.note = note)

//     },
//     destroyed() {

//     }
// }
