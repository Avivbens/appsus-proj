import mailPreview from './mail-preview.js'

export default {
    props: ['mails'],
    template: `
        <section
        class="mail-list">

            <mail-preview
            class="clickable"
            v-for="mail in mails"
            :mail="mail" 
            :key="mail.id"
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
