import { ActionContext, createLogger, createStore, Store, useStore } from 'vuex';
import VuexPersistence, { AsyncStorage } from 'vuex-persist';
import { InjectionKey } from 'vue';
import { EditorData } from '../data/state/editor';
import { ProjectModule } from './modules/project';
import { Project } from '../data/model/project';
import * as R from 'ramda';
import * as localforage from 'localforage';


export type EditorModules = {
  project: Project
}

export type EditorState = EditorData & EditorModules

const PROJECTS_BASE = `projects`;

async function parseOrDefault(storage: AsyncStorage, key: string, defaultF: () => any) {
  const data = await storage.getItem(key);
  if (data) return data;
  else return defaultF();
}

const database = localforage.createInstance({
  name: 'projects',
  storeName: 'data',
  driver: localforage.INDEXEDDB,
  description: 'Projects Storage'
})


async function persistProject(storage: AsyncStorage, key: string, project: Project) {
  if (project.key) {
    await storage.setItem(`${PROJECTS_BASE}/${project.key}`, project);
  }
}

const persistence = new VuexPersistence<EditorData>({
  key: 'projects',
  storage: database as AsyncStorage,
  asyncStorage: true,
  reducer: R.clone,
  async saveState(key: string, state: Partial<EditorState>, storage: AsyncStorage) {
    if (!storage) return;

    if (state.project) {
      await persistProject(storage, key, state.project);
    }

    await storage.setItem(
      key,
      R.omit(['project'], state)
    );
  },
  async restoreState(key: string, storage: AsyncStorage) {
    if (storage) {
      return await parseOrDefault(storage, key, () => new EditorData());
    } else {
      return undefined;
    }
  }
});


export const editorStoreKey: InjectionKey<Store<EditorState>> = Symbol('editor');
export const editorStore = createStore<EditorData>({
  plugins: [createLogger(), persistence.plugin],
  modules: {
    project: ProjectModule(database as AsyncStorage)
  },
  state(): EditorData {
    return new EditorData();
  }
});