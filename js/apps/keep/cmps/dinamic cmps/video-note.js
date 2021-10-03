export default {
    props: ['note', 'edit'],
    template: `
    <div class="note-preview-txt"> 
    <h3 v-if="!edit">{{note.info.title}}</h3>
        <input class="edit-txt"type="text" v-else v-model="note.info.title" >
        <iframe  width="100%" class="note-video" :src="note.info.txt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <input  v-if="edit" class="edit-txt"type="text" v-model="newUrl" placeholder="add video url" >
        <button v-if="edit" class="btn-update"  title="save note" @click.stop.prevent="updateTxt()">save</button>
    </div>
    `,
    data() {
        return {
            newUrl: ''
        }
    },
    methods: {
        updateTxt() {
            this.note.info.txt = this.newUrl || this.note.info.txt;
            if (this.note.info.txt.includes('youtube')) {
                this.note.info.txt = this.note.info.txt.replace('watch?v=', 'embed/');
            }
            this.$emit('update', this.note)
        }
    }
};
