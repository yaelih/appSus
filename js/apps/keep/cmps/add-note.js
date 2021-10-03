import { notesService } from "../services/notes-service.js";
import { showMsg } from '../../../services/event-bus-service.js';

export default {
	template: `
	<section class="add-note"> 
	    <div class="add-note-input">
        	<input class="edit-txt" type="text"  v-model="txt" :placeholder="title" /></div>
        <div note-type-btns>
      	<button class="btn-note-type" title="text type" @click="setType('txtNote','Enter note')"><i class="fas fa-font"></i></button>
      	<button class="btn-note-type" title="img type" @click="setType('imgNote','Enter img url')"><i class="far fa-image"></i></button>
      	<button class="btn-note-type" title="video type" @click="setType('videoNote','Enter video url')"><i class="fab fa-youtube"></i></button>
      	<button class="btn-note-type" title="todos type" @click="setType('todosNote','Enter todos with , between them')"><i class="fas fa-list-ul"></i></button>
      	<button class="btn-note-type" title="audio type" @click="setType('audioNote','Enter audio url')"><i class="fas fa-music"></i></i></button>
        <button class="btn-note-type"  title="save note" @click="saveNote()"><i class="far fa-save"></i></button></div>
    </section>
    `,
	data() {
		return {
			txt: '',
			title: 'Enter text',
			type: 'txtNote',
			styleObject: {
				backgroundColor: '#f5f5f5',
			}
		}
	},
	computed: {
		imgSrc() {
			console.log(this.img.src);
			return this.img.src || ''
		},
	},
	methods: {
		setImgSrc(src) {
			this.img.src = src
		},
		setBackColor(color) {
			this.styleObject.backgroundColor = color
		},
		setType(type, title) {
			this.type = type
			this.title = title
		},
		createNote() {
			return {
				id: '',
				isPinned: false,
				type: this.type,
				info: {
					title: this.title === 'enter txt' ? 'new note' : this.title,
					txt: this.txt
				},
				style: {
					backgroundColor: this.styleObject.backgroundColor
				}
			}
		},
		createTodos(txt) {
			var todos = txt.split(',');
			var list = todos.map(todo => {
				return { todo, doneAt: null }
			})
			console.log(list);
			return list;
		},
		createTodosNote() {
			return {
				id: '',
				isPinned: false,
				type: this.type,
				info: {
					title: 'new todos',
					txt: this.createTodos(this.txt)
				},
				style: {
					backgroundColor: this.styleObject.backgroundColor
				}
			}
		},
		saveNote() {
			if (!this.txt) {
				showMsg({ txt: 'cant add an empty note', type: 'error' });
				return
			}
			var note = (this.type === 'todosNote') ? this.createTodosNote() : this.createNote()
			if (this.type === 'videoNote') {
				if (note.info.txt.includes('youtube')) {
					note.info.txt = note.info.txt.replace('watch?v=', 'embed/');
				}
			}
			notesService.save(note).then(res => {
				this.txt = '';
				this.styleObject.backgroundColor = '#fff'
				showMsg({ txt: 'note added', type: 'success' });
				this.$emit('saveNote', true)
			}).catch(err => {
				showMsg({ txt: 'err in note added', type: 'error' })
			})
		}
	},
	watch: {
		'$route': {
			immediate: true,
			handler() {
				const params = this.$route.query;
				if (!params.title) return
				this.title = params.title;
				this.txt = params.txt;
				this.saveNote()
			}
		}
	},
	computed: {
		// backColor() {
		//   return 'background-color:' + this.backColor
		// }
	},
}