import "reflect-metadata";
import { Store } from "vuex";
import { EditorState } from "../../store/editor";
import { computed, ComputedRef } from "vue";
import { AnyElement } from "../../data/model/element";
import { DefaultsDef, InnerDef } from "../../data/model/persist";
import * as R from "ramda";

type Args<T extends AnyElement> = { type: any, prop: ComputedRef<T>, objectId: () => string | undefined };
type DefaultsObj = { [key: string]: any }

export function updatePropsFor<T extends AnyElement>(store: Store<EditorState>, { type, prop, objectId }: Args<T>) {
  function computedPropFor(key: string, path: string[] = [], defaultValue: any = undefined) {
    return [`M_${key}`, computed({
      get: () => {
        const cur = R.view(R.lensPath([...path, key]), prop.value);
        return (cur !== undefined) ? cur : defaultValue;
      },
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

  function computedProps(type: any, path: string[] = [], defaultValues: DefaultsObj = {}): any {
    const propsToPersist = Reflect.getMetadata("persist:props", type) as string[];
    const innerProps = Reflect.getMetadata("persist:inner", type) as InnerDef;
    const defaults = Reflect.getMetadata("persist:defaults", type) as DefaultsDef;

    return Object.fromEntries(
      propsToPersist.map((key: string) => {
        if (innerProps && key in innerProps) {
          return [key, computedProps(
            innerProps[key],
            [...path, key],
            R.clone(defaults[key])
          )];
        } else {
          return computedPropFor(key, path, defaultValues[key]);
        }
      })
    );
  }

  return computedProps(type, []);
}