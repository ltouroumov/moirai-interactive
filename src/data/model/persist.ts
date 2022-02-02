import "reflect-metadata";

export function persist(props: string[]) {
  return Reflect.metadata("persist:props", props);
}

export type InnerDef = { [key: string]: any; };

export function inner(props: InnerDef) {
  return Reflect.metadata("persist:inner", props);
}

