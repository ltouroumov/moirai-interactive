import {Condition} from "../model";

export enum ElementType {
  Section = 'section',
  Choice = 'choice',
  Option = 'option',
}

export interface IElement<T extends ElementType> {
  type: T
  id: string
}

export type AnyElement = IElement<ElementType>

export class Section implements IElement<ElementType.Section> {
  readonly type = ElementType.Section

  constructor(
    readonly id: string,
    readonly title: string,
    readonly header: string,
    readonly footer?: string,
    readonly condition?: Condition,
  ) {
  }
}

export class Choice implements IElement<ElementType.Choice> {
  readonly type = ElementType.Choice

  constructor(
    readonly id: string,
    readonly title: string,
    readonly text: string,
    readonly condition?: Condition,
  ) {
  }
}

export class Option implements IElement<ElementType.Option> {
  readonly type = ElementType.Option

  constructor(
    readonly id: string,
    readonly title: string,
    readonly text: string,
    readonly condition?: Condition,
  ) {
  }
}
