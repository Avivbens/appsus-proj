// import componentName from 'url'

export default {
    props: ['mail'],
    template: `
        <section class="mail-summery">
            <h3>
                {{mail.subject}}
            </h3>

            <h5>
                {{mail.sender}}
            </h5>

            <p>
                {{mail.body}}
            </p>

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
    watch: {
        data: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {

            }
        }
    },
    components: {
        // componentName

    },
}
