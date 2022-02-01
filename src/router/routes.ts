import { RouteRecordRaw } from 'vue-router';
import Home from '../components/Home.vue'
import Editor from '../components/Editor.vue'
import EditorSections from '../components/editor/EditorSections.vue'
import EditorPages from '../components/editor/EditorPages.vue'
import EditorSettings from '../components/editor/EditorSettings.vue'
import Viewer from '../components/Viewer.vue'

export const routes = [
    { name: 'home', path: '/', component: Home },
    {
        name: 'edit', path: '/edit/:project', component: Editor,
        children: [
            { path: '', redirect: { name: 'edit_sections' } },
            { name: 'edit_sections', path: 'sections', component: EditorSections },
            { name: 'edit_pages', path: 'pages', component: EditorPages },
            { name: 'edit_settings', path: 'pages', component: EditorSettings },
        ]
    },
    { name: 'view', path: '/view/:project', component: Viewer },
]
