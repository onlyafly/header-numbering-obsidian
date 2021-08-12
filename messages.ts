import { App, Modal } from 'obsidian'

export interface NumberingDoneConfig {
  message: string
  preformattedMessage: string
  saveSettingsCallback: () => void
}

class NumberingDoneModal extends Modal {
  config: NumberingDoneConfig

  constructor (app: App, config: NumberingDoneConfig) {
    super(app)
    this.config = config
  }

  onOpen () {
    const { contentEl, titleEl } = this
    titleEl.setText('Number Headings - Successfully Completed')

    contentEl.createEl('div', { text: this.config.message })
    contentEl.createEl('pre', { text: this.config.preformattedMessage })

    contentEl.createEl('div', { text: "Do you want to save these settings in the document's front matter?", cls: 'number-headings-question' })

    const containerForButtons = contentEl.createEl('div', { cls: 'number-headings-button-container' })

    const noButton = containerForButtons.createEl('button', { })
    noButton.setText('No')
    noButton.onClickEvent((ev: MouseEvent) => {
      this.close()
      return ev
    })

    const yesButton = containerForButtons.createEl('button', { })
    yesButton.setText('Yes, save settings in document')
    yesButton.onClickEvent((ev: MouseEvent) => {
      this.config.saveSettingsCallback()
      this.close()
      return ev
    })
  }

  onClose () {
    const { contentEl, titleEl } = this
    contentEl.empty()
    titleEl.empty()
  }
}

export function showNumberingDoneMessage (app: App, config: NumberingDoneConfig) {
  const leaf = app.workspace.activeLeaf
  if (leaf) {
    new NumberingDoneModal(app, config).open()
  }
}
