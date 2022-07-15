[![Docs][docs-shield]][docs-url]
[![Language][lang-shield]][lang-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

#### made with ❤️ by [Rob Secord](https://twitter.com/robsecord) ([Charged Particles](https://charged.fi) & [Taggr](https://taggr.io))


---
## About Infinite (ERC721i) NFT Pre-Mint Contracts v0.1.4

Gas-efficient contracts for Pre-Minting 1,000,000,000 NFTs!

It's like handing out Candy!

Our goal is to Eliminate Minting Fees for all NFT projects by providing a new method of Pre-Minting an entire collection up-front for half the cost of minting a single, standard NFT.  Everything afterwards remains standard.

We have created Infinite (ERC721i) by utilizing and only slightly adapting the popular [Open Zeppelin ERC721 contracts](https://www.openzeppelin.com/contracts) in order to maintain the highest level of open standards. However, the approach we have taken is so simple, that it can be easily adapted to any ERC721 framework.

By eliminating the heavy-lifting of Minting, we can help to alleviate some of the network congestion caused when there is huge demand for a new token release. Miners are simply able to process more "transfers" than "mints" in a single block.

![Gas Savings](https://gateway.pinata.cloud/ipfs/Qmb7KFXTunaAomQDZQ5rHvnniozgDQTtLjQ8DGPS6sWHK9?c=369)

For more information on how Infinite (ERC721i) works under the hood, please visit our [blog](https://medium.com/charged-particles/...).

**These contracts, while simple, have not been audited. Charged Particles, and its affiliates, are not liable for any outcome as a result of using Infinite (ERC721i).**


---
## Blog Article

[Pre-Minting 1 Million NFTs for $3](https://medium.com/charged-particles/...)


---
## Live Demo

[Peppermint Rorschach](https://taggr-nft.web.app/rorschach/)


---
## Installation

```sh

npm install --save-dev @charged-particles/erc721i

OR

yarn add -D @charged-particles/erc721i

```


---
## Usage

After installation, just import and inherit ERC721i.sol

```solidity
pragma solidity ^0.8.4;

import "@charged-particles/erc721i/contracts/ERC721i.sol";

contract MyNFT is ERC721i {
  constructor(string memory name, string memory symbol, uint256 maxSupply)
    ERC721i(name, symbol, _msgSender(), maxSupply) {}

  function preMint() external {
    _preMint();
  }
}

```


---
## Deployment & Verification

```sh

npm run deploy <network_name>
npm run verify <network_name>

OR

yarn deploy <network_name>
yarn verify <network_name>

```
Where _<network_name>_ is any valid network name configured in hardhat.config.js (ie. hardhat, mainnet, goerli, rinkeby, mumbai, etc..)


---
## ConsecutiveTransfer Event

We use the ConsecutiveTransfer event of [EIP-2309](https://eips.ethereum.org/EIPS/eip-2309) during the Mint Phase.

Known marketplaces that support the EIP-2309 Standard:
- Opensea
- LooksRare



---
## Roadmap

- [ ] Implement Pre-Mint for ERC1155
- [ ] Add support for Upgradeable Contracts
- [ ] Add version using Solmate's ERC721 contracts
- [ ] Eliminate the Max-Supply and bring back the “allTokens” array.

See the [open issues](https://github.com/Charged-Particles/erc721i/issues) for a full list of proposed features (and known issues).


---
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/MyFeature`)
3. Commit your Changes (`git commit -m 'Adding MyFeature'`)
4. Push to the Branch (`git push origin feature/MyFeature`)
5. Open a Pull Request


---
## Running tests locally

```sh

npm run test

OR

yarn test

```


---
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


---
## Contact

- Rob Secord (owner) - [@RobSecord](https://twitter.com/robsecord)

Project Links:
- [https://github.com/Charged-Particles/erc721i](https://github.com/Charged-Particles/erc721i)
- [https://www.npmjs.com/package/@charged-particles/erc721i](https://www.npmjs.com/package/@charged-particles/erc721i)


---
## Brought to you with Love

At Charged Particles & Taggr we strive to provide the greatest and most advanced tools for your NFT projects.
We're always thrilled to innovate and share our developments with the crypto-community!

Don't forget to give the project a star! Thank You!

---

<table style="border:none">
<tr>
<td align="center">
<img src="https://gateway.pinata.cloud/ipfs/QmWzW87dQaRieqGxT3mtAV8xp6JNVxby678gu54aa81Kcz" data-canonical-src="https://gateway.pinata.cloud/ipfs/QmWzW87dQaRieqGxT3mtAV8xp6JNVxby678gu54aa81Kcz" width="100" />

[Charged Particles](https://charged.fi)
</td>
<td>&nbsp;</td>
<td align="center">
<img src="https://gateway.pinata.cloud/ipfs/QmUMA21gu5tVGbADZvd8EAJoAGWvi68mygNUcQ41TYk7LT" data-canonical-src="https://gateway.pinata.cloud/ipfs/QmUMA21gu5tVGbADZvd8EAJoAGWvi68mygNUcQ41TYk7LT" width="100" />

[Taggr](https://taggr.io)
</td>
</tr>
</table>


<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[docs-shield]: https://img.shields.io/badge/docs-%F0%9F%93%84-blue?style=for-the-badge
[docs-url]: https://docs.charged.fi/erc721i
[lang-shield]: https://img.shields.io/github/languages/top/Charged-Particles/erc721i?style=for-the-badge
[lang-url]: https://github.com/Charged-Particles/erc721i
[issues-shield]: https://img.shields.io/github/issues-raw/Charged-Particles/erc721i?style=for-the-badge
[issues-url]: https://github.com/Charged-Particles/erc721i/issues
[license-shield]: https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge
[license-url]: https://github.com/Charged-Particles/erc721i/blob/main/LICENSE.txt
