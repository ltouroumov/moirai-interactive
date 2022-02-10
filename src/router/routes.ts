import { RouteRecordRaw } from "vue-router";
import Home from "../components/Home.vue";
import Editor from "../components/Editor.vue";
import EditorSections from "../components/editor/EditorSections.vue";
import EditorPages from "../components/editor/EditorPages.vue";
import EditorSettings from "../components/editor/EditorSettings.vue";
import Viewer from "../components/Viewer.vue";

export const routes = [
  { name: "home", path: "/", component: Home },
  {
    name: "edit",
    path: "/edit/:project",
    component: Editor,
    children: [
      { name: "edit_pages", path: "pages", alias: "", component: EditorPages },
      {
        name: "edit_section",
        path: "pages/:pageId/sections",
        component: EditorSections,
        props: true
      },
      { name: "edit_settings", path: "settings", component: EditorSettings }
    ]
  },
  { name: "view", path: "/view/:project", component: Viewer }
];
