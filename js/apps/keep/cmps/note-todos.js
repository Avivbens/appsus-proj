export default {

    props: [],
    template: `

   

    <section>

         <input v-model="title" placeholder="Title">
         <br>
        <div v-for="(line, idx) in val" > 
            <input type="text" v-model="val[idx].txt" @change="reportVal"
                @input="addNewLine(idx)" placeholder="write your note here"/>
        </div> 
          <!-- <div  class="bold" style="font-size:40px">+</div> -->

          {{val}}
    </section>
    `,
    data() {
        return {
            title: '',
            isPinned: false,
            val: [{ txt: '', isDone: false }],
            type: 'noteTodos'

        }
    },
    methods: {
        reportVal() {
            console.log('reporting....')
            this.$emit('setVal', {
                title: this.title,
                isPinned: this.isPinned,
                txt: this.val,
                type: this.type
            })

        },
        addNewLine(idx) {
            if (idx === this.val.length - 1) this.val.push({ txt: '', isDone: false })
        }
    }
}