export default {

    props: [],
    template: `

   

    <section>

       <input v-for="(line, idx) in val"
        type="text" v-model="val[idx]" 
        @change="reportVal" @input="addNewLine(idx)" placeholder="write yor note here"/>
         
          <!-- <div  class="bold" style="font-size:40px">+</div> -->

          {{val}}
    </section>
    `,
    data() {
        return {
            val: [''],
        }
    },
    methods: {
        reportVal() {
            console.log('reporting....')

        },
        addNewLine(idx) {
            if (idx === this.val.length - 1) this.val.push('')
        }
    }
}
