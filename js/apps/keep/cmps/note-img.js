export default {

    props: [],
    template: `

   

    <section>

         <!-- <input v-model="title" placeholder="Title"> -->
         <!-- <br> -->
        <!-- <div v-for="(line, idx) in val" >  -->
            <input type="text" v-model="info.imgUrl" @change="reportVal"
                 placeholder="write your note here"/>
            <input type="file" ref="file"  @change="onFilePicked"/>
        <!-- </div>  -->
          <!-- <div  class="bold" style="font-size:40px">+</div> -->
    </section>
    `,
    data() {
        return {
            note: {
                type: 'noteImg',
                isPinned: false,
                info: {
                    title: '',
                    txt: '',
                    todos: [],
                    imgUrl: '',
                    videoUrl: '',
                },
                category: ['imgs', 'media']
            },
        }
    },
    methods: {
        reportVal() {
            this.$emit('setVal', this._data)

        },

        onFilePicked() {
            const file = event.target.files[0]
            const fileReader = new FileReader()

            fileReader.onload = () => {
                this.info.imgUrl = fileReader.result
                this.reportVal()
            }

            fileReader.readAsDataURL(file)
        }
    }
}