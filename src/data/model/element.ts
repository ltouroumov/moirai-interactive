import "reflect-metadata";
import { Condition } from "../model";
import { Score } from "./score";
import { defaults, inner, persist } from "../utils/persist";
import {
  ChoiceStyle,
  DefaultChoiceStyle,
  DefaultOptionStyle,
  DefaultPageStyle,
  DefaultSectionStyle,
  IStyle,
  OptionStyle,
  PageStyle,
  SectionStyle,
} from "./style";
import { AnyContent, BaseContent, SimpleContent } from "./content";

export enum ElementType {
  Page = "page",
  Section = "section",
  Choice = "choice",
  Option = "option",
}

export interface IElement<T extends ElementType> {
  type: T;
  id: string;
  name: string;
}

export interface IConditionContainer {
  readonly conditions?: Condition[];
}

export interface IScoreContainer {
  readonly scores?: Score[];
}

export interface IStyleContainer<S extends IStyle> {
  readonly style?: S;
}

export type AnyElement = IElement<ElementType>;

@persist(["id", "name", "headerContent", "footerContent", "conditions", "style"])
@inner({
  style: PageStyle,
  headerContent: BaseContent,
  footerContent: BaseContent,
})
@defaults({ style: DefaultPageStyle })
export class Page implements IElement<ElementType.Page>, IConditionContainer, IStyleContainer<SectionStyle> {
  readonly type = ElementType.Page;

  constructor(
    readonly id: string,
    readonly name: string,
    readonly headerContent?: AnyContent,
    readonly footerContent?: AnyContent,
    readonly conditions: Condition[] = [],
    readonly style: PageStyle = new PageStyle()
  ) {}
}

@persist(["id", "name", "headerContent", "footerContent", "conditions", "style"])
@inner({
  style: SectionStyle,
  headerContent: BaseContent,
  footerContent: BaseContent,
})
@defaults({ style: DefaultSectionStyle })
export class Section implements IElement<ElementType.Section>, IConditionContainer, IStyleContainer<SectionStyle> {
  readonly type = ElementType.Section;

  constructor(
    readonly id: string,
    readonly name: string,
    readonly headerContent?: AnyContent,
    readonly footerContent?: AnyContent,
    readonly conditions: Condition[] = [],
    readonly style: SectionStyle = new SectionStyle()
  ) {}
}

@persist(["id", "name", "content", "scores", "conditions", "style"])
@inner({ style: ChoiceStyle, content: SimpleContent })
@defaults({ style: DefaultChoiceStyle })
export class Choice
  implements IElement<ElementType.Choice>, IConditionContainer, IScoreContainer, IStyleContainer<ChoiceStyle>
{
  readonly type = ElementType.Choice;

  constructor(
    readonly id: string,
    readonly name: string,
    readonly content: SimpleContent,
    readonly scores: Score[] = [],
    readonly conditions: Condition[] = [],
    readonly style: ChoiceStyle = new ChoiceStyle()
  ) {}
}

@persist(["id", "name", "content", "scores", "conditions", "style"])
@inner({ style: OptionStyle, content: SimpleContent })
@defaults({ style: DefaultOptionStyle })
export class Option
  implements IElement<ElementType.Option>, IConditionContainer, IScoreContainer, IStyleContainer<OptionStyle>
{
  readonly type = ElementType.Option;

  constructor(
    readonly id: string,
    readonly name: string,
    readonly content: SimpleContent,
    readonly scores: Score[] = [],
    readonly conditions: Condition[] = [],
    readonly style: OptionStyle = new OptionStyle()
  ) {}
}
