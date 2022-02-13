import * as P from "ts-pattern";
import { __ as PM } from "ts-pattern/lib/wildcards";
import * as R from "ramda";
import { IGridContainerStyle } from "../../data/model/style";

export const EMPTY = R.always<object>({});

export function computeGridStyle(style: IGridContainerStyle) {
  return R.mergeAll([
    computeGridTemplate(style.gridCols, "grid-template-columns"),
    computeGridTemplate(style.gridRows, "grid-template-rows"),
    computeGridFlow(style.gridFlow),
  ]);
}

export function computeGridTemplate(
  value: string | undefined,
  property: "grid-template-columns" | "grid-template-rows"
) {
  return P.match<string | undefined>(value)
    .with(undefined, EMPTY)
    .with(PM.string, R.test(/^\d+$/), (numCols) => {
      return { [property]: `repeat(${numCols}, minmax(max-content, 1fr))` };
    })
    .with(PM.string, R.test(/^repeat\(.+\)$/), (repeatExpr) => {
      return { [property]: repeatExpr };
    })
    .otherwise(EMPTY);
}

export function computeGridFlow(value: string | undefined) {
  return P.match<string | undefined>(value)
    .with(undefined, EMPTY)
    .with(PM.string, R.match(/^row|column$/), (flow) => {
      return { "grid-auto-flow": flow };
    })
    .otherwise(EMPTY);
}

function computeGridSpan(value: number | string | undefined, property: "colSpan" | "rowSpan") {
  return P.match<number | string | undefined>(value)
    .with(undefined, EMPTY)
    .with(PM.number, (value) => {
      return { [property]: value };
    })
    .with(PM.string, R.match(/^\d+$/), (value: string) => {
      return { [property]: Number.parseInt(value) };
    })
    .otherwise(EMPTY);
}

export function computeDefaultGridSpans(containerStyle: IGridContainerStyle) {
  return R.mergeAll([
    computeGridSpan(containerStyle.gridDefaultColSpan, "colSpan"),
    computeGridSpan(containerStyle.gridDefaultRowSpan, "rowSpan"),
  ]);
}
