import { eventBus } from '../services/event-bus.js'

export default {
    template: `
        <div v-if="msg" class="user-msg" :class="msg.type">
                <button class="fas fa-times"  @click="close"></button> 
                <div class="logo">
                    <img src="/img/logo.gif" alt="no img">
                </div>   
                <p>{{msg.txt}}</p>
            <!-- <router-link v-if="msg.action === 'add review'" :to="msg.link"  >watch <span @click="close">book</span></router-link> -->
        </div>
    `,
    data() {
        return {
            msg: null
        }
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            setTimeout(() => {
                this.msg = null;
            }, 1500);
        },
        close() {
            this.msg = null;
        }

    },
    computed: {

    },
    created() {
        eventBus.$on('show-msg', this.showMsg);

    },
    destroyed() {
        eventBus.$off('show-msg', this.showMsg);

    }
}