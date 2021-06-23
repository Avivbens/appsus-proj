import mailPreview from './mail-preview.js'

export default {
    props: ['mails'],
    template: `
        <section
        class="mail-list">

            <mail-preview
            v-for="mail in mails"
            :mail="mail" 
            />


        </section>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    components: {
        mailPreview,
    },
}
