import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `<transition  name="user-msg-transition" >
        <div v-if="msg" class="user-msg" :class="msg.type">

            <p class="type">{{msg.type}}</p>
            <p>{{msg.txt}}</p>
        </div></transition>`,
    data() {
        return {
            msg: null
        }
    },
    created() {
        eventBus.$on('show-msg', this.showMsg)
    },
    destoryed() {
        eventBus.$off('show-msg', this.showMsg)
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            this.timeoutId = setTimeout(() => {
                this.msg = null;
            }, 2000);
        },
        close(){
            this.msg = null;
        }
    },
}
