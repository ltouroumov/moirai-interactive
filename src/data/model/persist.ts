import "reflect-metadata";

export function persist(props: string[]) {
  return Reflect.metadata("persist:props", props);
}

export type InnerDef = { [key: string]: any; };

export function inner(props: InnerDef) {
  return Reflect.metadata("persist:inner", props);
}

export type DefaultsDef = { [key: string]: object; };

export function defaults(props: DefaultsDef) {
  return Reflect.metadata("persist:defaults", props);
}

