import "reflect-metadata";

type EnumValue = number | string | symbol;
type SealedElements<D extends EnumValue, T> = { [key in D]: T };
type Constructor<T> = { new (...args: any[]): T };

export function sealed<T, DT extends EnumValue>(
  type: Constructor<T>,
  extract: (obj: T) => DT,
  components: SealedElements<DT, Constructor<T>>
) {
  Reflect.defineMetadata("persist:sealed", { extract, components }, type);
}

export function persist(props: string[]) {
  return Reflect.metadata("persist:props", props);
}

export type InnerDef = { [key: string]: any };

export function inner(props: InnerDef) {
  return Reflect.metadata("persist:inner", props);
}

export type DefaultsDef = { [key: string]: object };

export function defaults(props: DefaultsDef) {
  return Reflect.metadata("persist:defaults", props);
}
