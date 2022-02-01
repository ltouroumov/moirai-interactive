import {createApp} from 'vue'
import store from "./store/data"
import {router} from "./router/main";
import App from './components/App.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);
app.use(store);
app.use(router)
app.mount('#app');
