import {Module} from "vuex";
import {Project, ProjectsData, RootState} from "../../data/state";

function randomIdentifier(len: number): string {
  const bytes = new Uint8Array(len)
  crypto.getRandomValues(bytes)
  return Array.from(
    bytes,
    (v: number) => v.toString(32).padStart(2, '0')
  ).join('')
}

export const ProjectsModule: Module<ProjectsData, RootState> = {
  namespaced: true,
  state(): ProjectsData {
    return new ProjectsData()
  },
  getters: {
    findProject: (state: ProjectsData) => (projectId: string) => {
      return state.projects[projectId]
    }
  },
  mutations: {
    createProject(state: ProjectsData) {
      const projectId = randomIdentifier(4)
      state.projects[projectId] = new Project(projectId, "Untitled Project")
    },
    removeProject(state: ProjectsData, projectId: string) {
      delete state.projects[projectId]
    },
  },
  actions: {
    removeProject({ commit }, projectId: string) {
      commit('removeProject', projectId)
      localStorage.removeItem(`vuex/projects/${projectId}`)
    },
  }
}