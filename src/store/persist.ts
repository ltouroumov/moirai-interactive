import {State} from "../data/state";
import {Plugin} from "vuex";

export const PersistPlugin: Plugin<State> = (store) => {
  store.subscribe(({type, payload}, state) => {
    console.log("Saved to localStorage")
    localStorage.setItem("project", state.project)
    localStorage.setItem(`project/${state.project}`, JSON.stringify(state))
  })
}