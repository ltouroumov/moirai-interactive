import {ScoreType} from "./model/score";
import {AnyElement} from "./model/element";

export class Database {
  public key: string | undefined = undefined
  public name: string | undefined = undefined

  public scores: { [key: string]: ScoreType; } = {}
  public objects: { [key: string]: AnyElement; } = {}
  public children: { [key: string]: string[]; } = {}
  public parents: { [key: string]: string; } = {}

  public genCounters: { [key: string]: number } = {}
}

export class Project {
  constructor(
    public key: string,
    public name: string,
  ) {
  }
}

export class ProjectsData {
  public projects: { [key: string]: Project } = {}
}

export interface StateModules {
  projects: ProjectsData
  database: Database
}

export interface RootState {
  selected: string | undefined
}