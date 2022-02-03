import "reflect-metadata";
import { persist } from "./persist";

export interface IStyle {
  readonly name?: string;
}

export interface IStyleParent {
  readonly children?: string;
}

@persist(["name", "children", "gridCols", "gridRows", "gridFlow", "gridDefaultColSpan", "gridDefaultRowSpan"])
export class SectionStyle implements IStyle, IStyleParent {
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
  gridDefaultRowSpan: 1
};

@persist(["name", "children", "colSpan", "rowSpan"])
export class ChoiceStyle implements IStyle, IStyleParent {
  readonly name?: string;
  readonly children?: string;
  readonly colSpan?: number;
  readonly rowSpan?: number;
}

export const DefaultChoiceStyle: ChoiceStyle = {
  name: "default",
  children: "default",
  colSpan: 1,
  rowSpan: 1
};

@persist(["name"])
export class OptionStyle implements IStyle {
  readonly name?: string;
}

export const DefaultOptionStyle: OptionStyle = {
  name: "default"
};
