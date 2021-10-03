import { emailService } from '../services/email-service.js';
import { showMsg } from '../../../services/event-bus-service.js';

export default {
    template: `
    <section class="email-compose">
        <div class="email-header">
            New Message
        </div>
        <div class="email-content">
            <form @submit.prevent="sendEmail">
                <div class="subject-container">
                    <input type="text" id="subject" v-model="email.subject" autocomplete="off" placeholder="Subject" />
                </div>
                <div class="body-container">
                    <textarea name="" id="body" rows="13" v-model="email.body" placeholder="Enter message here..."></textarea>
                </div>
                <div class="email-footer">
                    <button class="send-btn">Send</button>
                    <i class="far fa-trash-alt delete-btn" @click="remove"></i>
                </div>
            </form>
        </div>
    </section>`,
    data() {
        return {
            email: {
                subject: '',
                body: ''
            }
        }
    },
    methods: {
        sendEmail(email) {
            if (!this.email.subject || !this.email.body) {
                return showMsg({txt: 'Please enter subject and message', type: 'error'})
            }
            this.email.to = this.email.from = 'me';
            emailService.addEmail(this.email)
                .then(res => {
                    showMsg({txt: 'Message Sent', type: 'success'})
                    this.$router.push('/mail/inbox/')
                })
                .catch(() => {
                    showMsg({ txt: 'Error, please try again', type: 'error' })
                })
        },
        remove() {
            this.$router.push('/mail/inbox/')
        }
    },
    watch: {
        '$route': {
            immediate: true,
            handler() {
                const params = this.$route.query;
                this.email.subject = params.subject;
                this.email.body = params.body;
                if (params.to) {
                    this.email.to = params.to;
                    this.email.from = params.from;
                }
            }
        }
    },
}
