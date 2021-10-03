export default {
    props: ['note', 'edit'],
    template: `
    <div class="note-preview-txt" v-if="currNote">
        <h3 v-if="!edit">{{currNote.info.title}}</h3>
        <input class="edit-txt"type="text" v-else v-model="currNote.info.title" />
        <p v-if="!edit">{{currNote.info.txt}}</p>
        <textarea class="edit-txt"type="text" v-else v-model="currNote.info.txt" rows="10" cols="30" ></textarea>
        <button v-if="edit" class="btn-update"  title="save note" @click.stop.prevent="updateTxt()">save</button>    </div>
    `,
    data() {
        return {
            currNote: this.note,
        }
    },
    methods: {
        updateTxt() {
            this.$emit('update', this.currNote)
        }
    }
};
