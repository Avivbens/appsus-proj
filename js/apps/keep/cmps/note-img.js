export default {

    props: [],
    template: `

   

    <section>

         <!-- <input v-model="title" placeholder="Title"> -->
         <!-- <br> -->
        <!-- <div v-for="(line, idx) in val" >  -->
            <input type="text" v-model="val" @change="reportVal"
                 placeholder="write your note here"/>
            <input type="file" ref="file"  @change="onFilePicked"/>
        <!-- </div>  -->
          <!-- <div  class="bold" style="font-size:40px">+</div> -->

          {{val}}
    </section>
    `,
    data() {
        return {
            // title: '',
            isPinned: false,
            val: '',
            type: 'noteImg',
            category: ['imgs', 'media']
        }
    },
    methods: {
        reportVal() {
            this.$emit('setVal', {
                info: {
                    title: this.title,
                    txt: this.val,
                    imgUrl: this.val,
                    videoUrl: ''
                },
                isPinned: this.isPinned,
                type: this.type,
                category: this.category
            })

        },

        onFilePicked() {
            const file = event.target.files[0]
            const fileReader = new FileReader()

            fileReader.onload = () => {
                this.val = fileReader.result
                this.reportVal()
            }

            fileReader.readAsDataURL(file)
        }
    }
}