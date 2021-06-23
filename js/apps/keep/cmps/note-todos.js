export default {

    props: [],
    template: `

   

    <section>

       <div v-for="(line, idx) in val">  <input 
        type="text" v-model="val[idx]" 
        @change="reportVal" @input="addNewLine(idx)" placeholder="write your note here"/>
        </div>
          <!-- <div  class="bold" style="font-size:40px">+</div> -->

          {{val}}
    </section>
    `,
    data() {
        return {
            val: [''],
            type: 'noteTodos'

        }
    },
    methods: {
        reportVal() {
            console.log('reporting....')
            this.$emit('setVal', { txt: this.val, type: this.type })
                // this.val = []

        },
        addNewLine(idx) {
            if (idx === this.val.length - 1) this.val.push('')
        }
    }
}