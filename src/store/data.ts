import {createLogger, createStore} from 'vuex'
import {Database, ProjectsData, RootState} from "../data/state";
import {ProjectsModule} from "./modules/projects";
import {DatabaseModule} from "./modules/database";
import VuexPersistence from "vuex-persist";

const persistence = new VuexPersistence<RootState>({
  storage: window.localStorage,
  modules: ['projects', 'database'],
  saveState: (key, state: any, storage) => {
    console.log(`Persisting ${key}`, state)
    // Persist projects list
    storage?.setItem(`${key}/projects`, JSON.stringify(state.projects))

    // Persist currently loaded project
    if (state.database.key) {
      console.log(`Persisting project ${state.database.key}`)
      storage?.setItem(
        `${key}/projects/${state.database.key}`,
        JSON.stringify(state.database)
      )
    }
  },
  restoreState: (key, storage) => {
    console.log(`Restoring ${key}`)

    function parseOrDefault(key: string, defaultF: () => any) {
      const data = storage?.getItem(key)
      if (data) return JSON.parse(data)
      else return defaultF()
    }

    return {
      projects: parseOrDefault(`${key}/projects`, () => new ProjectsData()),
      database: new Database()
    }
  }
})

export default createStore({
  plugins: [createLogger(), persistence.plugin],
  modules: {
    projects: ProjectsModule,
    database: DatabaseModule
  },
})