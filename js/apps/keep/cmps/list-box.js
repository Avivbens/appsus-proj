export default {

    props: [],
    template: `

   

    <section>

       <input v-for="(line,idx) in lines"
        type="text" v-model="val[idx]" 
        @change="reportVal" @input="addNewLine" placeholder="write yor note here"/>
         
          <!-- <div  class="bold" style="font-size:40px">+</div> -->

          {{val}}
    </section>
    `,
    data() {
        return {
            val: [],
            lines: 1
        }
    },
    methods: {
        reportVal() {
            console.log('reporting....');

        },
        addNewLine() {
            if (this.val[this.val.length - 1].length === 1) this.lines++
        }
    }
}