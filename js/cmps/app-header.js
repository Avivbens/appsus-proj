import searchBar from './search-bar.js'
import appNav from './app-nav.js'

export default {
    template: `
        <header class="app-header">
            <div class="container">

                <div class="logo">
                    <img src="" alt="no img">
                </div>

                <search-bar />
                
                <app-nav />
            </div>
        </header>
    `,
    components: {
        searchBar,
        appNav,
    },
}
