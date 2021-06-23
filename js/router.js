import homePage from './pages/home-page.js'
import aboutPage from './pages/about-page.js'
// 
import misterEmail from './apps/mail/pages/mail-app.js'
import mailDetails from './apps/mail/pages/mail-details.js'
// 
import missKeep from './apps/keep/pages/keep-app.js'
import noteDetails from './apps/keep/pages/note-details.js'

const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/misterEmail',
        component: misterEmail
    },
    {
        path: '/misterEmail/:id',
        component: mailDetails
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
]

export const router = new VueRouter({ routes })