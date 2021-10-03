export default {
    props: ['status'],
    template: `
    <section class="email-status">
        <div class="read" :style="percentageToDisplay">
            {{this.percentage}}
        </div>
    </section>`,
    data(){
        return {
            percentage: null
        }
    },
    computed: {
        percentageToDisplay(){
            this.percentage = (Math.floor(this.status.read/this.status.total * 100))+ '%';
            return { width: this.percentage}
        }
    }
}
