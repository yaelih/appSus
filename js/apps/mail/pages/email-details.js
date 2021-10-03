import { emailService } from "../services/email-service.js";
import { showMsg } from '../../../services/event-bus-service.js';

export default {
    template: `
    <section>
        <div v-if="email" class="email-details">
                <p class="to"><span class="color">To:</span> {{this.email.to}}</p>
                <p class="from"><span class="color">From:</span> {{this.email.from}}</p>
                <p class="subject"><span class="subject color">Subject:</span> {{this.email.subject}}</p>
                <div class="actions">
                    <span>{{sentTimeDisplay}}</span>
                    <i class="fas fa-star" v-if="email.isStarred" @click="toggleStar"></i>
                    <i class="far fa-star" v-else @click="toggleStar"></i>
                    <i class="fas fa-reply" title="Reply" @click="reply"></i>
                    <i class="far fa-trash-alt" @click="deleteEmail" title="Delete"></i>
                    <router-link :to="{ path: '/note', query: { title: email.subject, txt: email.body }}">
                        <i class="far fa-sticky-note" title="Save as Note"></i>
                    </router-link>
                </div>
                <p class="body">
                    {{this.email.body}}
                </p>
            </form>
        </div>
    </section>`,
    data() {
        return {
            email: null
        }
    },
    computed: {
        sentTimeDisplay() {
            return new Date(this.email.sentAt).toLocaleString();
        }
    },
    watch: {
        '$route.params.emailId': {
            immediate: true,
            handler() {
                const { emailId } = this.$route.params;
                emailService.getEmailById(emailId)
                    .then(email => {
                        this.email = email
                    })
            }
        }
    },
    methods: {
        remove() {
            this.$emit('deleteEmail', this.email.id)
        },
        toggleStar() {
            this.email.isStarred = !this.email.isStarred;
            this.$emit("toggleRead", this.email.id)
        },
        deleteEmail(emailId) {
            console.log(emailId)
            emailService.deleteEmail(emailId)
                .then(res => {
                    showMsg({ txt: 'Message Deleted', type: 'success' })
                    const path = this.$route.path
                    this.$router.push(path.substring(0,path.length-6))
                })
                .catch(() => {
                    showMsg({ txt: 'Error, please try again', type: 'error' })
                })
        },
        reply(){
            this.$router.push({ 
                path: '/mail/compose', 
                query: { 
                    to: this.email.from, 
                    from: this.email.to, 
                    subject: 'Re: '+this.email.subject, 
                    body: '\n\nOn ' + this.sentTimeDisplay + ' ' + this.email.from + ' wrote:\n\n' + this.email.body
                }
            })
        }
    }
}
