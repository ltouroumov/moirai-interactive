import {RouteRecordRaw} from "vue-router";
import Home from '../components/Home.vue'
import Editor from '../components/Editor.vue'
import Viewer from '../components/Viewer.vue'

export const routes: RouteRecordRaw[] = [
  {name: 'home', path: '/', component: Home},
  {name: 'edit', path: '/edit/:project', component: Editor},
  {name: 'view', path: '/view/:project', component: Viewer},
]
