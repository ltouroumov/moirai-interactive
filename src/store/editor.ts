import { createLogger, createStore, Store } from "vuex";
import VuexPersistence from "vuex-persist";
import { InjectionKey } from "vue";
import { EditorData } from "../data/state/editor";
import { ProjectModule } from "./modules/project";
import { Project } from "../data/model/project";
import * as R from "ramda";


export type EditorModules = {
  project: Project
}

export type EditorState = EditorData & EditorModules

function parseOrDefault(storage: Storage, key: string, defaultF: () => any) {
  const data = storage.getItem(key);
  if (data) return JSON.parse(data);
  else return defaultF();
}


const persistence = new VuexPersistence<EditorData>({
  key: "projects",
  storage: window.localStorage,
  saveState(key, state: EditorState, storage) {
    if (state.project.key && storage) {
      const projectKey = state.project.key;
      const projectJson = JSON.stringify(state.project);
      storage.setItem(`projects/${projectKey}`, projectJson);

      const editorData = R.omit(["project"], state);
      storage.setItem(key, JSON.stringify(editorData));
    }
  },
  restoreState(key, storage) {
    if (storage) {
      return parseOrDefault(storage, key, () => new EditorData());
    } else {
      return undefined;
    }
  }
});


export const editorStoreKey: InjectionKey<Store<EditorState>> = Symbol("editor");
export const editorStore = createStore<EditorData>({
  plugins: [createLogger(), persistence.plugin],
  modules: {
    project: ProjectModule
  },
  state(): EditorData {
    return new EditorData();
  }
});