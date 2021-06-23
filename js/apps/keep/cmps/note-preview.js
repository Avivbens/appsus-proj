export default {

    props: ['note'],
    template: `
      <li class="note-preview border">
        <p>{{note.info.title}} , txt: {{note.info.txt}}</p>
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