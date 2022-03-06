const fs = require("fs/promises")

const COLOR_WHITE = "#ffffff"

const main = async () => {
  // create the editions
  for (let i = 7; i <= 10; i++) {
    const config = editionConfig(i)
    await fs.mkdir(`svgs/${config.name}`)

    // create svg files for the deck
    for (let j = 0; j <= 53; j++) {
      // Header of the SVG
      await fs.writeFile(`svgs/${config.name}/${j}.svg`, svgHeader)
      await fs.appendFile(`svgs/${config.name}/${j}.svg`, cardWhiteBackground)

      // Theme layer
      if (config.theme !== 0) {
        switch (config.theme) {
          case 1:
            const layer = createPunkLayer(j, config.colorBlack, config.colorRed)
            await fs.appendFile(`svgs/${config.name}/${j}.svg`, layer)
            break

          default:
            throw new Error(`wrong value for the theme ${theme}`)
        }
      }

      // Information layer
      if (config.info) {
        let numbers
        if (config.theme !== 0 && (j === 52 || j === 53)) {
          numbers = createInfoLayer(j, COLOR_WHITE, COLOR_WHITE)
        } else {
          numbers = createInfoLayer(j, config.colorBlack, config.colorRed)
        }
        await fs.appendFile(`svgs/${config.name}/${j}.svg`, numbers)
      }

      // Count layer
      if (config.number) {
        let info
        if (config.theme !== 0) {
          info = createNbLayer(j, COLOR_WHITE, COLOR_WHITE)
        } else {
          info = createNbLayer(j, config.colorBlack, config.colorRed)
        }
        await fs.appendFile(`svgs/${config.name}/${j}.svg`, info)
      }

      // SVG footer
      await fs.appendFile(`svgs/${config.name}/${j}.svg`, svgFooter)

      // TODO: save svg on IPFS

      // create metadata
      const metadataObj = createMetadata(
        j,
        "imageHash",
        config.name,
        config.description
      )

      // TODO: calculate the metadata index
      const metadataCounter = j + 1 + (54 * i - 54)

      // save metadata locally
      await fs.writeFile(
        `jsonFolder/${metadataCounter}.json`,
        JSON.stringify(metadataObj)
      )
    }
  }
}

main()
