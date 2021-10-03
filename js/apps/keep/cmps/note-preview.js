import imgNote from "./dinamic cmps/img-note.js";
import txtNote from "./dinamic cmps/txt-note.js";
import todosNote from "./dinamic cmps/todos-note.js";
import videoNote from "./dinamic cmps/video-note.js";
import audioNote from "./dinamic cmps/audio-note.js";
import { notesService } from "../services/notes-service.js";
import { showMsg } from '../../../services/event-bus-service.js';

export default {
    props: ['currNote'],
    template: `
    <div class="note-preview":style="currNote.style" >
        <div @mouseover="togglehover(true)"  @mouseleave="togglehover(false)">
            <component  
            class="dinamic-preview"
                :is="currNote.type"
                :edit="isEdit"
                :note="currNote"
                @update="update"
                @click.native="editNode(false)"
            > 
            </component> 
            <div  class="note-container">
                <button class="  type-icon-preview" ><i :class="typeIcon"></i></button>
                <div class="action-note-container" v-if="isHover">
                    <button class="btn-note-type" >
                        <router-link :to="{ path: '/mail/compose', query: { subject: currNote.info.title, body: this.txtToSend }}">
                            <i class="far fa-envelope" title="Save as Note"></i>
                        </router-link>
                    </button>
                    <button class="btn-note-type" @click="deleteNote()"><i class="far fa-trash-alt"></i></button>
                    <button class="btn-note-type" @click="changePin" :class="isPinned"><i class="fas fa-thumbtack" ></i></button> 
                    <div class="color-container"> 
                        <div class="color-palete"><i class="fas fa-palette"></i>
                        </div> 
                        <input class="color-input" type="color" @input="setBackColor()" v-model="currNote.style.backgroundColor"/>
                    </div>
                    <button class="btn-note-type"   @click="editNode(isEdit)"><i class="far fa-edit"></i></button>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            isEdit: false,
            isHover: false,
            txtToSend: ''
        }
    }, created() {
        if (this.currNote.type !== 'todosNote') this.txtToSend = this.currNote.info.txt;
        else this.currNote.info.txt.forEach(todo => {
            var date = (todo.doneAt) ? new Date(todo.doneAt) : '';
            this.txtToSend += todo.todo;
            if (date) this.txtToSend += ', done at: ' + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
            this.txtToSend += ' ,\n';
        });
    },
    methods: {
        deleteNote() {
            this.$emit('deleteNote', this.currNote.id)
        },
        setBackColor() {
            this.$emit('change', this.currNote)
        },
        update(Note) {
            notesService.update(Note).then(res => {
                showMsg({ txt: 'note update', type: 'success' })
                this.currNote = res;
                this.isEdit = false
            }).catch(err => {
                showMsg({ txt: 'err in note update', type: 'error' })
            })
        },
        editNode(isTrue) {
            this.isEdit = !isTrue
        },
        changePin() {
            this.currNote.isPinned = !this.currNote.isPinned;
            this.$emit('change', this.currNote)
        },
        togglehover(isTrue) {
            this.isHover = isTrue
        }
    },
    computed: {
        isPinned() {
            return this.currNote.isPinned ? 'pinned' : ''
        },
        typeIcon() {
            switch (this.currNote.type) {
                case 'txtNote': {
                    return 'fas fa-font'
                }
                case 'imgNote': {
                    return 'far fa-image'
                }
                case 'videoNote': {
                    return 'fab fa-youtube'
                }
                case 'todosNote': {
                    return 'fas fa-list-ul'
                }
                case 'audioNote': {
                    return 'fas fa-music'
                }
            }
        }
    },
    components: {
        imgNote,
        txtNote,
        todosNote,
        videoNote,
        audioNote
    }
};
