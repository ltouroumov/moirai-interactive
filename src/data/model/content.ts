import "reflect-metadata";
import { persist, sealed } from "../utils/persist";

export enum ContentType {
  Empty = "empty",
  Simple = "simple",
}

enum ImagePosition {
  Top = "top",
  Right = "right",
  Bottom = "bottom",
  Left = "left",
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

@persist(["title", "body", "image", "imagePosition"])
export class SimpleContent extends BaseContent<ContentType.Simple> {
  constructor(
    readonly title?: string,
    readonly body?: string,
    readonly image?: string,
    readonly imagePosition: ImagePosition = ImagePosition.Top
  ) {
    super(ContentType.Simple);
  }
}

sealed<AnyContent, ContentType>(BaseContent, (content: AnyContent) => content.type, {
  [ContentType.Empty]: EmptyContent,
  [ContentType.Simple]: SimpleContent,
});
