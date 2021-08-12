export interface NumberHeadingsPluginSettings {
  skipTopLevel: boolean,
  maxLevel: number,
  styleLevel1: string,
  styleLevelOther: string,
  auto: boolean
}

export const DEFAULT_SETTINGS: NumberHeadingsPluginSettings = {
  skipTopLevel: false,
  maxLevel: 6,
  styleLevel1: '1',
  styleLevelOther: '1',
  auto: false
}
