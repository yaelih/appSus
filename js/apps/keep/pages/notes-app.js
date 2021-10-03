
import noteList from '../cmps/notes-list.js';
import addNote from '../cmps/add-note.js';
import noteFilter from '../cmps/notes-filter.js'
import { notesService } from '../services/notes-service.js';
import { showMsg } from '../../../services/event-bus-service.js';

export default {
    template: `
        <section class="note-app">
            <add-note @saveNote="loadnotes"/>
            <note-filter @filtered="filternotes" />
            <p class="preview-type-p">pinned</p>
            <note-list :notes="pinned" @selected="selectnote" @deleteNote="deleteNote" @change="editNote"/>
            <p class="preview-type-p">others</p>
            <note-list :notes="notPinned" @selected="selectnote" @deleteNote="deleteNote" @change="editNote"/>
        </section>
    `,
    data() {
        return {
            notes: [],
             filterednotes:[],
             filterBy:'',
        };
    },
    created() {
        this.loadnotes();
    },
    methods: {
        loadnotes() {
            notesService.query().then(notes => {
                this.notes = notes;
                this.filterednotes=this.filterBy?this.filternotes(this.filterBy):this.notes;
            })
        },
        filterByPinned(isPinned) {
            return this.filterednotes.filter(note => {
                return note.isPinned === isPinned
            })
            
        },
        filternotes(txt){
            this.filterBy=txt;
            txt=txt.toLowerCase();
            var filterednotes= this.notes.filter(note=>{
                if(note.type==='todosNote'){
                   var todos= note.info.txt.filter(todo=>{
                        return todo.todo.toLowerCase().includes(txt);
                    })
                    if(note.info.title.toLowerCase().includes(txt)) todos.push( note.info.title.toLowerCase().includes(txt));
                    return todos.length?todos:''
                }
                else return note.info.title.toLowerCase().includes(txt) ||note.info.txt.toLowerCase().includes(txt)
            });
            this.filterednotes=filterednotes
        },
        selectnote(noteId) {
            this.$router.push('/note/' + noteId)
        },
        deleteNote(noteId) {
            notesService.removeNote(noteId).then(res => {
                showMsg({txt: 'note deleted', type: 'success'})
                this.loadnotes()
            }).catch(err=>{
                showMsg({txt: 'err in note deleted', type: 'error'})
            })
        },
        editNote(note) {
            notesService.update(note).then(res => {
            })
        }
    },
    computed: {
        pinned() {
            return this.filterByPinned(true);
        },
        notPinned(){
            return this.filterByPinned(false)
        }
    },
    components: {
        noteList,
        addNote,
        noteFilter
    }
};
