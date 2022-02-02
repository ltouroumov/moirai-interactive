import { createApp } from "vue";
import { homeStore, homeStoreKey } from "./store/home";
import { editorStore, editorStoreKey } from "./store/editor";
import { router } from "./router/main";
import App from "./components/App.vue";

import "@mdi/font/css/materialdesignicons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);
app.use(homeStore, homeStoreKey);
app.use(editorStore, editorStoreKey);
app.use(router);
app.mount("#app");
