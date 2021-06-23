export default {

    props: ['note'],
    template: `
      <div class="nore-preview" @click="goToNote">
        <!-- <h2>{{note.info.txt}}</h2> -->
        <p>{{note.info.txt}}</p>
      </div>
    `,
    data() {
        return {

        }
    },
    methods: {
        goToNote() {
            // if (this.$route.path === '/add') return;
            this.$router.push('/note/' + this.note.id)
        }
    },
    computed: {

    },
    created() {

    },
    destroyed() {

    },
    components: {},
}
