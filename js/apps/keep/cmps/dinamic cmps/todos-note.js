import { notesService } from "../../services/notes-service.js";

export default {
    props: ['note', 'edit'],
    template: `
    <div class="note-preview-todos">
       <ul> 
           <h3 v-if="!edit">{{todos.info.title}}</h3>
            <input class="edit-txt"type="text" v-else v-model="todos.info.title" >
           <li class="todo"  v-for=" (item ,idx) in todos.info.txt">
             <p @click="changeTodo(idx)" :class="isDone(item)"> {{item.todo}}</p>  
        </li>
        <form @submit="addTodo()" v-if="edit">
        <input class="edit-txt"type="text"  v-model="newTodo" placeholder="add todo">
    </form>
        <button v-if="edit" class="btn-update"  title="save note" @click.stop.prevent="updateTxt()">save</button>
       </ul>
    </div>
    `, data() {
        return {
            todos: this.note,
            newTodo: '',
        }
    },
    methods: {
        isDone(todo) {
            if (todo.doneAt) return 'styleTodo';
        },
        changeTodo(idx) {
            if (this.todos.info.txt[idx].doneAt) this.todos.info.txt[idx].doneAt = null
            else this.todos.info.txt[idx].doneAt = Date.now();
            notesService.saveTodos(this.todos).then(updateTodos => {
                this.$emit('update', this.todos)
            })
        },
        addTodo() {
            this.todos.info.txt.push({ todo: this.newTodo, doneAt: null });
            notesService.saveTodos(this.todos).then(updateTodos => {
                this.todos = updateTodos;
                this.newTodo = ''
            })
        },
        updateTxt() {
            this.$emit('update', this.todos)
        }
    }
};
