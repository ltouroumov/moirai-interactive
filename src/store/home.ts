import { createLogger, createStore, Store } from "vuex";
import { ProjectInfo, HomeState } from "../data/state/home";
import VuexPersistence from "vuex-persist";
import { InjectionKey } from "vue";

function randomIdentifier(len: number): string {
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  return Array.from(
    bytes,
    (v: number) => v.toString(32).padStart(2, "0")
  ).join("");
}

const persistence = new VuexPersistence<HomeState>({
  key: 'home',
  storage: window.localStorage
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
    }
  },
  mutations: {
    createProject(state: HomeState) {
      const projectId = randomIdentifier(4);
      state.items[projectId] = new ProjectInfo(projectId, "Untitled Project");
    },
    removeProject(state: HomeState, projectId: string) {
      delete state.items[projectId];
    }
  },
  actions: {
    removeProject({ commit }, projectId: string) {
      commit("removeProject", projectId);
      localStorage.removeItem(`vuex/projects/${projectId}`);
    }
  }
});