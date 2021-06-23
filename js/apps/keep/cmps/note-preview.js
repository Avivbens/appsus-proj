export default {

    props: ['note'],
    template: `
      <div class="nore-preview border" @click="goToNote">
        <!-- <h2>{{note.info.txt}}</h2> -->
        <p>{{note.info.txt}} , id: {{note.id}}</p>
      </div>
    `,
    data() {
        return {

        }
    },
    methods: {
        goToNote() {
            // if (this.$route.path === '/add') return;
            console.log('going to');

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