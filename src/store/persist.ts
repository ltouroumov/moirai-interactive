import {State} from "../data/state";
import {Plugin} from "vuex";

export const PersistPlugin: Plugin<State> = (store) => {
  var _changed: boolean = false

  store.subscribe((mutation, state) => {
    _changed = true
  })

  setInterval(() => {
    const _project: string = store.state.project
    if (_project && _changed) {
      console.log("Saving to localStorage")
      const _state: string = JSON.stringify(store.state)

      localStorage.setItem("project", _project)
      localStorage.setItem(`project/${_project}`, _state)
      _changed = false
    }
  }, 1000)
}