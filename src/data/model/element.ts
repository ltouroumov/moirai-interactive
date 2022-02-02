import "reflect-metadata";
import { Condition } from "../model";
import { Score } from "./score";
import { inner, persist } from "./persist";
import { ChoiceStyle, IStyle, OptionStyle, SectionStyle } from "./style";


export enum ElementType {
  Section = "section",
  Choice = "choice",
  Option = "option",
}

export interface IElement<T extends ElementType> {
  type: T;
  id: string;
  title: string;
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

export type AnyElement = IElement<ElementType>

@persist(["id", "title", "headerText", "footerText", "conditions", "style"])
@inner({ "style": SectionStyle })
export class Section implements IElement<ElementType.Section>, IConditionContainer, IStyleContainer<SectionStyle> {
  readonly type = ElementType.Section;

  constructor(
    readonly id: string,
    readonly title: string,
    readonly headerText: string = "",
    readonly footerText: string = "",
    readonly conditions: Condition[] = [],
    readonly style?: SectionStyle
  ) {
  }
}

@persist(["id", "title", "text", "scores", "conditions", "style"])
@inner({ "style": ChoiceStyle })
export class Choice implements IElement<ElementType.Choice>, IConditionContainer, IScoreContainer, IStyleContainer<ChoiceStyle> {
  readonly type = ElementType.Choice;

  constructor(
    readonly id: string,
    readonly title: string,
    readonly text: string,
    readonly scores: Score[] = [],
    readonly conditions: Condition[] = [],
    readonly style?: ChoiceStyle
  ) {
  }
}

@persist(["id", "title", "text", "scores", "conditions", "style"])
@inner({ "style": OptionStyle })
export class Option implements IElement<ElementType.Option>, IConditionContainer, IScoreContainer, IStyleContainer<OptionStyle> {
  readonly type = ElementType.Option;

  constructor(
    readonly id: string,
    readonly title: string,
    readonly text: string,
    readonly scores: Score[] = [],
    readonly conditions: Condition[] = [],
    readonly style?: OptionStyle
  ) {
  }
}
