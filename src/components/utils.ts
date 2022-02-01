import {Store} from "vuex";
import {RootState} from "../data/state";

export function updatePropFor(store: Store<RootState>, objectIdF: () => (string | undefined)) {
  return function updateProp(prop: string, evt: InputEvent) {
    let objectId = objectIdF();

    if (!evt || !evt.target) return
    if (!objectId) return

    store.commit('database/updateObject', {
      objectId: objectId,
      data: {[prop]: evt.target.value}
    })
  }
}