export default {

    props: [],
    template: `
        <section>

            <input type="text" v-model="val" @change="reportVal" placeholder="write your note here"/>

        </section>
    `,
    data() {
        return {
            val: [],
            lines: 1,
        }
    },
    methods: {
        reportVal() {
            console.log('reporting....')
        }
    }
}
