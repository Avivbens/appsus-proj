export default {

    props: [],
    template: `
    <section>
            <input type="text" v-model="info.videoUrl" @change="reportVal"
                 placeholder="write your note here"/>
    </section>
    `,
    data() {
        return {
            note: {
                type: 'noteVideo',
                isPinned: false,
                info: {
                    title: '',
                    txt: '',
                    todos: [],
                    imgUrl: '',
                    videoUrl: ''
                },
                category: ['videos', 'media']
            }
        }
    },
    methods: {
        reportVal() {
            this.info.videoUrl = this.info.videoUrl.split('=')[1].split('&')[0]
            this.$emit('setVal', this._data)
        },
    }
}