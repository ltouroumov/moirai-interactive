import Home from "../components/Home.vue";
import Editor from "../components/Editor.vue";
import HomeTab from "../components/editor/HomeTab.vue";
import PagesTab from "../components/editor/PagesTab.vue";
import PagesTools from "../components/editor/PagesTools.vue";
import SectionsTab from "../components/editor/SectionsTab.vue";
import SectionsTools from "../components/editor/SectionsTools.vue";
import SettingsTab from "../components/editor/SettingsTab.vue";
import Viewer from "../components/Viewer.vue";

export const routes = [
  { name: "home", path: "/", component: Home },
  {
    name: "edit",
    path: "/edit/:projectId",
    component: Editor,
    props: true,
    children: [
      { name: "edit_home", path: "", components: { default: HomeTab } },
      {
        name: "edit_pages",
        path: "pages",
        components: { default: PagesTab, tools: PagesTools },
        props: true,
      },
      {
        name: "edit_section",
        path: "pages/:pageId/sections",
        components: { default: SectionsTab, tools: SectionsTools },
        props: true,
      },
      {
        name: "edit_settings",
        path: "settings",
        component: SettingsTab,
        props: true,
      },
    ],
  },
  { name: "view", path: "/view/:projectId", component: Viewer },
];
