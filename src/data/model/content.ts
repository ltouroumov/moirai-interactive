import "reflect-metadata";
import { defaults, inner, persist, sealed } from "../utils/persist";
import { DefaultSimpleContentStyle, SimpleContentStyle } from "./style";

export enum ContentType {
  Empty = "empty",
  Simple = "simple",
}

export class BaseContent<T extends ContentType> {
  constructor(readonly type: T) {}
}

export type AnyContent = BaseContent<ContentType>;

export class EmptyContent extends BaseContent<ContentType.Empty> {
  constructor() {
    super(ContentType.Empty);
  }
}

@persist(["title", "body", "image", "style"])
@inner({ style: SimpleContentStyle })
@defaults({ style: DefaultSimpleContentStyle })
export class SimpleContent extends BaseContent<ContentType.Simple> {
  constructor(
    readonly title?: string,
    readonly body?: string,
    readonly image?: string,
    readonly style?: SimpleContentStyle
  ) {
    super(ContentType.Simple);
  }
}

sealed<AnyContent, ContentType>(BaseContent, (content: AnyContent) => content.type, {
  [ContentType.Empty]: EmptyContent,
  [ContentType.Simple]: SimpleContent,
});
