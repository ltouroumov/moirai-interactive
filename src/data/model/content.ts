import "reflect-metadata";
import { persist, sealed, sealedComponents } from "./persist";

enum ContentType {
  Simple = "simple",
}

enum ImagePosition {
  Top = "top",
  Right = "right",
  Bottom = "bottom",
  Left = "left",
}

@sealed()
export class BaseContent<T extends ContentType> {
  constructor(readonly type: T) {}
}

export type AnyContent = BaseContent<ContentType>;

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

sealedComponents(BaseContent, [SimpleContent]);
