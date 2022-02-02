import { Store } from 'vuex';
import { EditorState } from "../store/editor";

export function updatePropFor(store: Store<EditorState>, objectIdF: () => (string | undefined)) {
  return function updateProp(prop: string, evt: InputEvent) {
    let objectId = objectIdF();

    if (!evt || !evt.target) return
    if (!objectId) return

    store.commit('project/updateObject', {
      objectId: objectId,
      data: { [prop]: evt.target.value }
    })
  }
}