export interface IDefaultOption {
  fn: string,
  colors: Record<string, string>,
  groups: Record<string, string[]>,
  useCustomProperties: boolean,
  themeSelector: string[],
  nestingPlugin: object | null
}
