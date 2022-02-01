import {Condition} from "../model";

export class ScoreType {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly initial: number = 0,
    readonly prefix?: string,
    readonly suffix?: string,
  ) {
  }
}

export enum ScoreMode {
  Gain = 'GAIN',
  Cost = 'COST',
  Mult = 'MULT',
}

export class Score {
  constructor(
    readonly scoreId: string,
    readonly amount: number,
    readonly mode: ScoreMode,
    readonly condition?: Condition,
  ) {
  }
}