// import componentName from 'url'

export default {
    props: ['categories'],
    template: `
        <aside>
            <div
            v-if="categories" 
            v-for="category in categories"    
            >
                <span
                @click="filterBy(category)"
                >
                <span class="capitalize">
                    {{category}}
                </span>
                </span>
            </div>


        </aside>
    `,
    data() {
        return {

        }
    },
    methods: {
        filterBy(category) {
            this.$emit('setFilter', category)
        }
    },
    computed: {

    },
    created() {

    },
    destroyed() {

    },
    watch: {
        data: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {

            }
        }
    },
    components: {
        // componentName

    },
}
