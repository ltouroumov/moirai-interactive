import {createApp} from 'vue'
import store from "./store/data"
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);
app.use(store);
app.mount('#app');
