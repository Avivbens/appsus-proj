export default {
    components: {

    },
    props: ['note'],
    template: `
        <li class="note-preview">
             <iframe width="560" height="315" :src="'https://www.youtube.com/embed/'+note.info.videoUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <!-- <video :src="note.info.videoUrl" alt="no video" controls></video>  -->
        </li> 
    `
}