import { ScoreType } from './score';
import { AnyElement } from './element';

export class Project {
  public key: string | undefined = undefined
  public name: string | undefined = undefined

  public scores: { [key: string]: ScoreType; } = {}
  public objects: { [key: string]: AnyElement; } = {}
  public children: { [key: string]: string[]; } = {}
  public parents: { [key: string]: string; } = {}

  public genCounters: { [key: string]: number } = {}
}
