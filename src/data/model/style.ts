import "reflect-metadata";
import { persist } from "./persist";

export interface IStyle {
  readonly name: string;
}

@persist(["name", "gridCols", "gridRows"])
export class SectionStyle implements IStyle {
  constructor(
    readonly name: string = "default",
    readonly gridCols: string = "4",
    readonly gridRows: string = "auto"
  ) {
  }
}

@persist(["name"])
export class ChoiceStyle implements IStyle {
  constructor(
    readonly name: string = "default"
  ) {
  }
}

@persist(["name"])
export class OptionStyle implements IStyle {
  constructor(
    readonly name: string = "default"
  ) {
  }
}