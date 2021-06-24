export default {

    props: [],
    template: `
    <section>
            <input type="text" v-model="val" @change="reportVal"
                 placeholder="write your note here"/>
    </section>
    `,
    data() {
        return {
            isPinned: false,
            val: '',
            type: 'noteVideo',
            category: ['videos', 'media']
        }
    },
    methods: {
        reportVal() {
            this.$emit('setVal', {
                isPinned: this.isPinned,
                info: {
                    title: '',
                    txt: '',
                    imgUrl: this.val,
                    videoUrl: this.val.split('=')[1].split('&')[0],
                },
                type: this.type,
                category: this.category
            })
        },
    }
}