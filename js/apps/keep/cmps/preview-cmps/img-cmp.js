export default {
    components: {

    },
    props: ['note'],
    template: `
    <section>
        <li class="note-preview">
            <img :src="note.info.imgUrl" alt="no img">
        </li>
    </section>

    `
}