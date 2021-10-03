import app from './pages/app.js'
import appMail from './apps/mail/pages/mail-app.js'
import appNotes from './apps/keep/pages/notes-app.js'
import emailList from './apps/mail/cmps/email-list.js'
import emailDetails from './apps/mail/pages/email-details.js'
import emailCompose from './apps/mail/cmps/email-compose.js'

const routes = [
    {
        path: '/',
        component: app
    },
    {
        path: '/mail',
        component: appMail,
        children: [
            {
                path: '/mail/compose',
                component: emailCompose
            },
            {
                path: '/mail/inbox',
                component: emailList
            },
            {
                path: '/mail/inbox/:emailId',
                component: emailDetails
            },
            {
                path: '/mail/starred',
                component: emailList
            },
            {
                path: '/mail/starred/:emailId',
                component: emailDetails
            },
            {
                path: '/mail/sent',
                component: emailList
            },
            {
                path: '/mail/sent/:emailId',
                component: emailDetails
            }
        ]
    },
    {
        path: '/note',
        component: appNotes,
        children:[
         
        ]
    },
];

export const router = new VueRouter({ routes });
