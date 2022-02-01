import {ScoreType} from "./model/score";
import {AnyElement} from "./model/element";

export class Database {
  public scores: { [key: string]: ScoreType; } = {}
  public objects: { [key: string]: AnyElement; } = {}
  public children: { [key: string]: string[]; } = {}
  public parents: { [key: string]: string; } = {}
}

export interface State {
  project: string
  genCounters: { [key: string]: number }
  database: Database
}