export default {

    props: [],
    template: `
        <section>
            <div>
                <input
                    v-model="title" 
                    placeholder="Title">
            </div>

            <div>
                <input type="text" v-model="val[0]" @change="reportVal" placeholder="write your note here"/>
            </div>
        </section>
    `,
    data() {
        return {
            title: '',
            val: [],
            type: 'noteTxt',
            category: ['notes']
        }
    },
    methods: {
        reportVal() {
            this.$emit('setVal', {
                info: {
                    title: this.title,
                    txt: this.val[0],
                    imgUrl: '',
                    videoUrl: ''
                },
                type: this.type,
                category: this.category
            })

            this.val = []
        }
    }
}