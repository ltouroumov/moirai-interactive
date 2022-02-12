import { createApp } from "vue";
import { homeStore, homeStoreKey } from "./store/home";
import { editorStore, editorStoreKey } from "./store/editor";
import { router } from "./router/main";
import App from "./components/App.vue";

import "./styles/common.scss";
import "./styles/colors.scss";

import "@mdi/font/scss/materialdesignicons.scss";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap";

const app = createApp(App);
app.use(homeStore, homeStoreKey);
app.use(editorStore, editorStoreKey);
app.use(router);
app.mount("#app");
