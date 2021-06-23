import mailPreview from './mail-preview.js'

export default {
    props: ['mails'],
    template: `
        <section>
            <mail-preview
            v-for="mail in mails"
            :mail="mail" />
        </section>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {

    },
    created() {

    },
    destroyed() {

    },
    components: {
        mailPreview
    },
}
