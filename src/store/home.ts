import { createLogger, createStore, Store } from "vuex";
import { ProjectInfo, HomeState } from "../data/state/home";
import VuexPersistence, { AsyncStorage } from "vuex-persist";
import { InjectionKey } from "vue";
import * as R from "ramda";
import * as localforage from "localforage";
import Hashids from "hashids";

const HID = new Hashids("projects", 8);

function randomIdentifier(): string {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return HID.encode(bytes[0]);
}

const database = localforage.createInstance({
  name: "home",
  storeName: "data",
  driver: localforage.INDEXEDDB,
  description: "Projects Storage",
});

const persistence = new VuexPersistence<HomeState>({
  key: "home",
  storage: database as AsyncStorage,
  asyncStorage: true,
  reducer: R.clone,
});

export const homeStoreKey: InjectionKey<Store<HomeState>> = Symbol("home");
export const homeStore = createStore({
  plugins: [createLogger(), persistence.plugin],
  state(): HomeState {
    return new HomeState();
  },
  getters: {
    findProject: (state: HomeState) => (projectId: string) => {
      return state.items[projectId];
    },
  },
  mutations: {
    createProject(state: HomeState) {
      const projectId = randomIdentifier();
      state.items[projectId] = new ProjectInfo(projectId, "Untitled Project");
    },
    removeProject(state: HomeState, projectId: string) {
      delete state.items[projectId];
    },
  },
  actions: {
    removeProject({ commit }, projectId: string) {
      commit("removeProject", projectId);
      localStorage.removeItem(`vuex/projects/${projectId}`);
    },
  },
});
