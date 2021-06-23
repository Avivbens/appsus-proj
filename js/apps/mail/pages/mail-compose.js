export default {
    template: `
        <main
        class="mail-compose">

        <h4>New Message</h4>

            <form>
                <input type="text" placeholder="To:">
                <input type="text" placeholder="Cc:">
                <input type="text" placeholder="Bcc:">
                <input type="text" placeholder="Subject:">
            
                <textarea name="mailBody" cols="30" rows="10" placeholder="Your Message"></textarea>

                <div class="compose-buttons-area">
                    <button>Send</button>
                    <button>✖</button>
                </div>
            </form>
        </main> 
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
}
