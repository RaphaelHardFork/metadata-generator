const fs = require("fs")
const { PINATA_KEY, PINATA_SECRET_KEY } = require("../apiKeys")
const pinataSDK = require("@pinata/sdk")
const pinata = pinataSDK(PINATA_KEY, PINATA_SECRET_KEY)

// SourcePath = "assets/balbla.svg"
// Add token ID and Attributes
const sendFileToIPFS = async (sourcePath) => {
  console.log("Pinning to IPFS")
  let result = await pinata.pinFromFS(sourcePath, {
    pinataMetadata: {
      name: "Model 4",
      keyvalues: {
        value: "4 of Heart",
        edition: "classic",
      },
    },
    pinataOptions: {
      cidVersion: 1,
    },
  })
  console.log(`Size of the file: ${result.PinSize / 1000}kb`)
  return result.IpfsHash
}

// Add token ID and Attributes
// Only Create a Folder maybe
// add background
const sendJsObjToIPFS = async (name, description, attributes, imageCID) => {
  console.log("Pinning JSON metadata")
  const obj = {
    name,
    description,
    attributes,
    background_color: "AAAAAA",
    image: `ipfs://${imageCID}`,
    external_url: `https://ipfs.io/ipfs/${imageCID}`,
  }

  let result = await pinata.pinJSONToIPFS(obj, {
    pinataMetadata: {
      name: "Metadata of ID",
    },
    pinataOptions: {
      cidVersion: 1,
    },
  })
  console.log(`Size of the file: ${result.PinSize / 1000}kb`)

  return result.IpfsHash
}

// MAIN TEST

const main = async () => {
  const hash = await sendFileToIPFS("assets/model1_10.svg")
  console.log(hash)
  let hash2 = await sendJsObjToIPFS(
    "9 of spades",
    "Money cards are...",
    [
      { trait_type: "Value", value: "9" },
      { trait_type: "Sign", value: "Spade" },
    ],
    hash
  )
  console.log(hash2)
}

main()
