export default {
    template: `
    <section class="email-filter">
        <!-- <i class="fas fa-search"></i> -->
        <input v-model="filterBy.text" type="search" placeholder="Search mail" @input="filter" />
        <select v-model="filterBy.isRead" name="read" @change="filter">
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
        </select>
        <i v-if="subjectAsc" class="fas fa-sort-alpha-down" @click="toggleSubject"></i> 
        <i v-else class="fas fa-sort-alpha-up-alt" @click="toggleSubject"></i>
        <i v-if="dateAsc" class="fas fa-sort-numeric-up" @click="toggleDate"></i>
        <i v-else class="fas fa-sort-numeric-down-alt" @click="toggleDate"></i>
    </section>
    `,
    data() {
        return {
            filterBy: {
                text: '',
                isRead: 'all'
            },
            sortBy: {
                key: 'date',
                isAsc: false
            },
            dateAsc: false,
            subjectAsc: true

        };
    },
    computed: {
        toggleSortDate(){
            this.sortBy.key = 'date';
            this.sortBy.isAsc = !this.sortBy.isAsc;
        }
    },
    methods: {
        filter() {
            console.log(this.filterBy);
            this.$emit('filtered', {...this.filterBy});
        },
        toggleDate(){
            this.dateAsc = !this.dateAsc;
            this.sortBy = { key: 'date', isAsc: this.dateAsc}
            this.$emit('sorted', {...this.sortBy})
        },
        toggleSubject(){
            this.subjectAsc = !this.subjectAsc;
            this.sortBy = { key: 'subject', isAsc: this.subjectAsc}
            this.$emit('sorted', {...this.sortBy})
        }
    },
};
