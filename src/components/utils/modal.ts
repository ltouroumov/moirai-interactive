export enum ModalSize {
  Default = 0,
  Small = "modal-sm",
  Large = "modal-lg",
  ExtraLarge = "modal-xl",
}

export function genModalId(parts: string[]) {
  const prefix = parts.join("_");
  return function (suffix: string, trigger: boolean = false) {
    return `${trigger ? "#" : ""}${prefix}_${suffix}`;
  };
}
