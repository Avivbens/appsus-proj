export default {
    props: ['mail'],
    template: `
        <article v-if="mail">
            <span>{{mail.subject}}</span>
            <span>{{mail.body}}</span>
            <span>{{mail.sentAt}}</span>
        </article>
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

    },
}
