export default {

    props: [],
    template: `
        <section>

            <input type="text" v-model="val[0]" @change="reportVal" placeholder="write your note here"/>

        </section>
    `,
    data() {
        return {
            val: [],
            type: 'noteTxt'
        }
    },
    methods: {
        reportVal() {
            this.$emit('setVal', { txt: this.val[0], type: this.type })
            this.val = []
        }
    }
}