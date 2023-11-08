// SPDX-License-Identifier: MIT
// Written by: Rob Secord (https://twitter.com/robsecord)
// Co-founder @ Charged Particles - Visit: https://charged.fi
// Co-founder @ Taggr             - Visit: https://taggr.io

pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./lib/ERC721.sol";

/**
 * @dev This implements a Pre-Mint version of {ERC721} that adds the ability to Pre-Mint
 * all the token ids in the contract as assign an initial owner for each token id.
 *
 * On-chain state for Pre-Mint does not need to be initially stored if Max-Supply is known.
 * Minting is a simple matter of assigning a balance to the pre-mint receiver,
 * and modifying the "read" methods to account for the pre-mint receiver as owner.
 * We use the Consecutive Transfer Method as defined in EIP-2309 to signal inital ownership.
 * Almost everything else remains standard.
 * We also default to the contract "owner" as the pre-mint receiver, but this can be changed.
 */
contract ERC721all is
  Ownable,
  ERC721
{
  mapping(uint256 => bool) internal _isTokenActive;

  constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

  /**
   * @dev Overrides {IERC721-balanceOf}.
   */
  function balanceOf(address owner) public view override returns (uint256) {
    require(owner != address(0), "ERC721: address zero is not a valid owner");
    uint256 ownerTokenId = uint256(owner);
    if (_balances[owner] == 0 && _hasOwnToken(owner)) {
      return 1;
    }
    return _balances[owner];
  }

  /**
   * @dev Overrides {IERC721-ownerOf}.
   */
  function ownerOf(uint256 tokenId) public view override returns (address) {
    require(_isTokenActive[tokenId], "ERC721: invalid token ID");

    // If token has been transfered then _owners will be populated,
    // otherwise the token ID represents the initial owner
    address owner = _owners[tokenId];
    if (owner == address(0)) {
      owner = address(tokenId);
    }
    return owner;
  }

  function mint() public {
    _mint(_msgSender());
  }

  function _mint(address receiver) internal {
    // Token ID == Minter Address
    uint256 tokenId = uint256(receiver);

    require(receiver != address(0), "ERC721: mint to the zero address");
    require(!_isTokenActive[tokenId], "ERC721: token already minted");

    // Mark Token as Active
    _isTokenActive[tokenId] = true;

    // Fire Transfer Event
    emit Transfer(address(0), receiver, tokenId);
  }


  function _transfer(
    address from,
    address to,
    uint256 tokenId
  ) internal {
    require(ownerOf(tokenId) == from, "ERC721: transfer from incorrect owner");
    require(to != address(0), "ERC721: transfer to the zero address");

    _beforeTokenTransfer(from, to, tokenId);

    // Clear approvals from the previous owner
    _approve(address(0), tokenId);

    // Only if token has previously been transfered after mint
    if (_owners[tokenId] != address(0)) {
      _balances[from] -= 1;
    }
    _balances[to] += 1;
    _owners[tokenId] = to;

    emit Transfer(from, to, tokenId);

    _afterTokenTransfer(from, to, tokenId);
  }

  function _hasOwnToken(address owner) internal returns (bool) {
    uint256 ownerTokenId = uint256(owner);
    address currentOwner = _owners[ownerTokenId];
    return (_isTokenActive[ownerTokenId] && (currentOwner == owner || currentOwner == address(0)));
  }
}
