export default {

    props: ['note'],
    template: `
      <li class="note-preview border">
        <p>{{note.info.txt}} , id: {{note.id}}</p>
      </li>
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
    components: {},
}
