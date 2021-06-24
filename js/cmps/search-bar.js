import { eventBus } from "../services/event-bus.js"
import { utilService } from "../services/utils-service.js"

export default {
    props: [],
    template: `
        <div class="search-bar">
            <input type="text" 
            :placeholder="placeHolder"
            ref="input"
            v-model="searchTxt"
            >
        </div>
    `,
    data() {
        return {
            siteName: '',
            searchTxt: ''
        }
    },
    methods: {
        search() {
            const eventName = 'searchIn' + this.siteName
            eventBus.$emit(eventName, this.searchTxt)
        }
    },
    computed: {
        placeHolder() {
            return 'Search ' + this.siteName
        }
    },
    mounted() {
        this.$refs.input.addEventListener(
            'input', utilService.debounce(this.search, 1000))
    },
    watch: {
        '$route': {
            immediate: true,
            deep: true,
            handler() {
                const root = this.$route.path
                if (root.includes('Email')) this.siteName = 'Mail'
                if (root.includes('Keep')) this.siteName = 'Keep'
            }
        }
    },
}
