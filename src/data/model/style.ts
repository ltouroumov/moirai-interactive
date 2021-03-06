import "reflect-metadata";
import { persist } from "../utils/persist";

export interface IStyle {
  readonly name?: string;
}

export interface IStyleParent {
  readonly children?: string;
}

export interface IGridContainerStyle {
  readonly gridCols?: string;
  readonly gridRows?: string;
  readonly gridFlow?: string;
  readonly gridDefaultColSpan?: number;
  readonly gridDefaultRowSpan?: number;
}

export interface IGridChildStyle {
  readonly colSpan?: number;
  readonly rowSpan?: number;
}

@persist(["name", "children"])
export class PageStyle implements IStyle, IStyleParent {
  readonly name?: string;
  readonly children?: string;
}

export const DefaultPageStyle: PageStyle = {
  name: "default",
  children: "default",
};

@persist(["name", "children", "gridCols", "gridRows", "gridFlow", "gridDefaultColSpan", "gridDefaultRowSpan"])
export class SectionStyle implements IStyle, IStyleParent, IGridContainerStyle {
  readonly name?: string;
  readonly children?: string;
  readonly gridCols?: string;
  readonly gridRows?: string;
  readonly gridFlow?: string;
  readonly gridDefaultColSpan?: number;
  readonly gridDefaultRowSpan?: number;
}

export const DefaultSectionStyle: SectionStyle = {
  name: "default",
  children: "default",
  gridCols: "4",
  gridRows: "auto",
  gridFlow: "row",
  gridDefaultColSpan: 1,
  gridDefaultRowSpan: 1,
};

@persist(["name", "children", "colSpan", "rowSpan"])
export class ChoiceStyle implements IStyle, IStyleParent, IGridChildStyle {
  readonly name?: string;
  readonly children?: string;
  readonly colSpan?: number;
  readonly rowSpan?: number;
}

export const DefaultChoiceStyle: ChoiceStyle = {
  name: "default",
  children: "default",
  colSpan: 1,
  rowSpan: 1,
};

@persist(["name"])
export class OptionStyle implements IStyle {
  readonly name?: string;
}

export const DefaultOptionStyle: OptionStyle = {
  name: "default",
};

@persist(["name"])
export class SimpleContentStyle implements IStyle {
  readonly name?: string;
}

export const DefaultSimpleContentStyle: SimpleContentStyle = {
  name: "default",
};
