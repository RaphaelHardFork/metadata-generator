# NFT Metadata generator

## TODO

1. Test freeze metadata and new attributes!! Freeze doesn't work on test net

### Zygote edition

- Find photo and the artiste associated
- short description / photo

### Biodiv edition

- add specie name
- search for any other relevant information

## Value of cards

0 = ACE PIQUE  
1 = 2 PIQUE  
...  
14 = ACE HEART  
...  
27 = ACE CLUBS  
...  
40 = ACE DIAMOND  
...  
51 = KING DIAMOND  
52 = BLACK JOKER  
53 = RED JOKER

## Number of copies

| Edition:                    | Index | Number of copies |
| --------------------------- | ----- | ---------------- |
| Classic                     | 1     | 50               |
| Old                         | 2     | 50               |
| Ghost                       | 3     | 50               |
| Classic on-chain            | 4     | 7                |
| Old on-chain                | 5     | 7                |
| Ghost on-chain              | 6     | 7                |
| CryptoPunks                 | 7     | 7                |
| CryptoPunks on-chain        | 8     | 3                |
| CryptoPunks gaming          | 9     | 3                |
| CryptoPunks on-chain gaming | 10    | 1                |
| ---                         | ---   | ---              |
| Total                       | 10    | 185              |

## Card Metadata

```js
const metadata = {
  name: "",
  description: "",
  attributes: [],
  background_color: "EEEEEE", // change the background color depends on edition
  image: `ipfs://${imageCID}`,
  external_url: `https://ipfs.io/ipfs/${imageCID}`,
}
```

### Attributes

```js
;[
  {
    trait_type: "Edition",
    value: "...",
  },
  {
    trait_type: "Symbol",
    value: "...", // clubs, diamonds, ...
  },
  {
    trait_type: "Value",
    value: "...", // Queen, three, ...
  },
  {
    trait_type: "Number of copies",
    value: 0,
    max_value: 13, // Number of edition
  },
]
```
