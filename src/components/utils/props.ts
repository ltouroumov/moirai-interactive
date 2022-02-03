import "reflect-metadata";
import { Store } from "vuex";
import { EditorState } from "../store/editor";
import { computed, ComputedRef } from "vue";
import { AnyElement } from "../data/model/element";
import { InnerDef } from "../data/model/persist";
import * as R from "ramda";

type Args<T extends AnyElement> = { type: any, prop: ComputedRef<T>, objectId: () => string | undefined };

export function updatePropsFor<T extends AnyElement>(store: Store<EditorState>, { type, prop, objectId }: Args<T>) {
  function computedPropFor(key: string, path: string[] = []) {
    return [`M_${key}`, computed({
      get: () => R.view(R.lensPath([...path, key]), prop.value),
      set: (value) => {
        let _objectId = objectId();
        if (!_objectId) return;

        store.commit("project/updateObject", {
          objectId: _objectId,
          path: path,
          data: { [key]: value }
        });
      }
    })];
  }

  function computedProps(type: any, path: string[] = []): any {
    const propsToPersist = Reflect.getMetadata("persist:props", type) as string[];
    const innerProps = Reflect.getMetadata("persist:inner", type) as InnerDef;

    return Object.fromEntries(
      propsToPersist.map((key: string) => {
        if (innerProps && key in innerProps) {
          return [key, computedProps(innerProps[key], [...path, key])];
        } else {
          return computedPropFor(key, path);
        }
      })
    );
  }

  return computedProps(type, []);
}