import {Store, useStore} from "vuex";
import {State} from "../data/state";

export function updatePropFor(store: Store<State>, objectIdF: () => (string | undefined)) {
  return function updateProp(prop: string, evt: InputEvent) {
    let objectId = objectIdF();

    if (!evt || !evt.target) return
    if (!objectId) return

    store.commit('updateObject', {
      objectId: objectId,
      data: {[prop]: evt.target.value}
    })
  }
}