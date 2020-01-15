import {
  addEventListener,
  formatSuccessMessage,
  mapNumberToWord,
  pluralize,
  showUI,
  updateLayersSortOrder
} from '@create-figma-plugin/utilities'
import { createImageLayer } from './utilities/create-image-layer'

export default async function () {
  const center = figma.viewport.center
  let x = Math.round(center.x)
  const y = Math.round(center.y)
  const result = []
  addEventListener('INSERT_BIG_IMAGE', async function ({
    name,
    images,
    width,
    isDone
  }) {
    const imageLayers = []
    for (const image of images) {
      imageLayers.push(createImageLayer(image, x, y))
    }
    x += width
    if (imageLayers.length === 1) {
      imageLayers[0].name = name
      result.push(imageLayers[0])
    } else {
      const group = figma.group(imageLayers, figma.currentPage)
      group.name = name
      result.push(group)
    }
    updateLayersSortOrder(result)
    if (isDone === false) {
      return
    }
    figma.currentPage.selection = result
    figma.viewport.scrollAndZoomIntoView(result)
    figma.closePlugin(
      formatSuccessMessage(
        `Inserted ${mapNumberToWord(result.length)} ${pluralize(
          result.length,
          'image'
        )}`
      )
    )
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({ width: 240, height: 240 })
}
