import homePage from './pages/home-page.js'
import aboutPage from './pages/about-page.js'
import misterEmail from './apps/mail/pages/mail-app.js'
import missKeep from './apps/keep/pages/keep-app.js'
import noteDetails from './apps/keep/pages/note-details.js'
// import noteAdd from './apps/keep/cmps/note-add.js'

const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/misterEmail',
        component: misterEmail
    },
    {
        path: '/missKeep',
        component: missKeep
    },
    {
        path: '/note/:noteId?',
        component: noteDetails
    },
    {
        path: '/about',
        component: aboutPage
    },
    // {
    //     path: '/addNote',
    //     component: noteAdd
    // },
]

export const router = new VueRouter({ routes })