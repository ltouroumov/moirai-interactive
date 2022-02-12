import "reflect-metadata";
import { Store } from "vuex";
import { EditorState } from "../../store/editor";
import { computed, ComputedRef } from "vue";
import { AnyElement } from "../../data/model/element";
import { DefaultsDef, InnerDef } from "../../data/utils/persist";
import * as R from "ramda";
import { AnyContent } from "../../data/model/content";

type Args<T extends AnyElement | AnyContent> = {
  type: any;
  prop?: ComputedRef<T>;
  provider?: () => T;
  objectId: () => string | undefined;
  path?: string[];
};
type DefaultsObj = { [key: string]: any };

export function updatePropsFor<T extends AnyElement | AnyContent>(
  store: Store<EditorState>,
  { type, prop, provider, objectId, path }: Args<T>
) {
  const _provider = provider || (() => prop?.value);

  function computedPropFor(key: string, path: string[] = [], defaultValue: any = undefined) {
    return [
      `M_${key}`,
      computed({
        get: () => {
          let obj = _provider();
          const cur = R.view(R.lensPath([...path, key]), obj);
          return cur !== undefined ? cur : defaultValue;
        },
        set: (value) => {
          let _objectId = objectId();
          if (!_objectId) return;

          store.commit("project/updateObject", {
            objectId: _objectId,
            path: path,
            data: { [key]: value },
          });
        },
      }),
    ];
  }

  function computedProps(type: any, path: string[] = [], defaultValues: DefaultsObj = {}): any {
    const sealed = Reflect.getOwnMetadata("persist:sealed", type) as string[];
    if (sealed) {
      return {};
    } else {
      const propsToPersist = Reflect.getMetadata("persist:props", type) as string[];
      const innerProps = Reflect.getMetadata("persist:inner", type) as InnerDef;
      const defaults = Reflect.getMetadata("persist:defaults", type) as DefaultsDef;

      return Object.fromEntries(
        propsToPersist.map((key: string) => {
          if (innerProps && key in innerProps) {
            return [key, computedProps(innerProps[key], [...path, key], R.clone(defaults[key]))];
          } else {
            return computedPropFor(key, path, defaultValues[key]);
          }
        })
      );
    }
  }

  return computedProps(type, path || []);
}
