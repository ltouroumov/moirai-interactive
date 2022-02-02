export class ProjectInfo {
  constructor(
    public key: string,
    public name: string,
  ) {
  }
}

export class HomeState {
  public items: { [key: string]: ProjectInfo } = {}
}
