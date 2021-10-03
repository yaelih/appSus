export default {
    template: `
    <section class="note-filter"> 
        <input class="edit-txt" @input="filter" type="text"  v-model="filterBy" placeholder="Search note..." />
    </section>
    `,
    data() {
        return {
                filterBy: '',
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', this.filterBy);
        }
    }
};
