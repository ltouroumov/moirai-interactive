export class Section {
  constructor(
    readonly title: String,
    readonly header: String,
    readonly choices: Array<Choice>,
    readonly footer?: String,
  ) {
  }
}

export class Choice {
  constructor(
    readonly title: String,
    readonly text: String
  ) {
  }
}