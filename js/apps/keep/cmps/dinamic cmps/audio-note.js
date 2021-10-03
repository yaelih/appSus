export default {
    props: ['note', 'edit'],
    template: `
    <div class="note-preview-txt">
            <h3 v-if="!edit">{{note.info.title}}</h3>
        <input class="edit-txt"type="text" v-else v-model="note.info.title" >
        <audio class="audio-note" controls>
        <source :src="note.info.txt" type="audio/ogg">
        </audio>
        <input  v-if="edit" class="edit-txt"type="text" v-model="newUrl" placeholder="add audio url" >
        <button v-if="edit" class="btn-update"  title="save note" @click.stop.prevent="updateTxt()">save</button>
    </div>
    `,
    data(){
        return{
            newUrl:''
        }
    },
     methods:{
        updateTxt(){
            this.note.info.txt=this.newUrl||this.note.info.txt;
            this.$emit('update',this.note);
            this.newUrl=''
        }
    }
};
