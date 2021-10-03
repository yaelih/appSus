import appHeader from "./cmps/app-header.js"
import { router } from './routes.js';
import userMsg from './cmps/user-msg.js';
import appFotter from './cmps/app-fotter.js'

const options = {
    el: '#app',
    router,
    template: `
        <section>
            <user-msg />
            <app-header />
            <router-view />
          
        </section>
    `,
    components: {
        appHeader,
        userMsg,
        appFotter
    }
};

const app = new Vue(options);
