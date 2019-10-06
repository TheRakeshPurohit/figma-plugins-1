/* global figma */
import { checkCommonParent } from './check-common-parent'

export function commandFactory ({ sortLayers, successMessage }) {
  return function () {
    const selectedLayers = figma.currentPage.selection
    if (selectedLayers.length < 2) {
      figma.closePlugin('✘ \u00a0 Select two or more layers')
      return
    }
    if (checkCommonParent(selectedLayers) === false) {
      figma.closePlugin('✘ \u00a0 Select layers in the same list')
      return
    }
    sortLayers(selectedLayers)
    figma.closePlugin(`✔ \u00a0 ${successMessage}`)
  }
}
