import { createApp } from "vue";
import { homeStore, homeStoreKey } from "./store/home";
import { editorStore, editorStoreKey } from "./store/editor";
import { router } from "./router/main";
import App from "./components/App.vue";


import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, far);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "@mdi/font/css/materialdesignicons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(homeStore, homeStoreKey);
app.use(editorStore, editorStoreKey);
app.use(router);
app.mount("#app");
