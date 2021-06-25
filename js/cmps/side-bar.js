export default {
    props: ['categories', 'mainCounter', 'mainCounterIdx', 'isHovered'],
    template: `
        <aside
        @mouseover="toggleHover(true)"   
        @mouseleave="toggleHover(false)"   
        >
        
            <div
            v-if="categories" 
            v-for="(category,idx) in categories" 
            @click="filterBy(category)"
            >
                <span >
                    <span class="main-counter"
                    v-if="mainCounter && idx===mainCounterIdx"
                    >
                        {{mainCounter}}
                    </span>
                    
                    <i class="capitalize"> {{category.icon}}</i>
                    <span class="capitalize" v-if="hover"> {{category.text}}</span>
                </span>
            </div>
        </aside>
    `,
    data() {
        return {
            hover: false
        }
    },
    methods: {
        filterBy(category) {
            this.$emit('setFilter', category)
        },
        toggleHover(hovering) {
            if (!this.isHovered) {
                this.hover = true
                return
            }
            this.hover = hovering
        }
    },
    created() {
        this.toggleHover()
    },
    watch: {
        data: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {

            }
        }
    },
}
