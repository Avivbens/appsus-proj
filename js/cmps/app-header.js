import appNav from './app-nav.js'

export default {
    template: `
        <header class="app-header">
            <div class="container">

                <div class="logo">
                    <img src="" alt="no img">
                </div>
                
                <app-nav />
            </div>
        </header>
    `,
    components: {
        appNav
    },
}
