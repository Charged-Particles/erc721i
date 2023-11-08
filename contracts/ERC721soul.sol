// SPDX-License-Identifier: MIT
// Written by: Rob Secord (https://twitter.com/robsecord)
// Co-founder @ Charged Particles - Visit: https://charged.fi
// Co-founder @ Taggr             - Visit: https://taggr.io

pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./lib/ERC721.sol";

/**
 * @dev todo...
 */
contract ERC721soul is Ownable, ERC721 {
  mapping(uint256 => bool) internal _activeTokens;

  constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender) {}

  /**
   * @dev Overrides {IERC721-balanceOf}.
   */
  function balanceOf(address owner) public view override returns (uint256) {
    require(owner != address(0), "ERC721: address zero is not a valid owner");
    return _hasOwnToken(owner) ? 1 : 0;
  }

  /**
   * @dev Overrides {IERC721-ownerOf}.
   */
  function ownerOf(uint256 tokenId) public view override returns (address) {
    require(_isTokenActive(tokenId), "ERC721: invalid token ID");
    return address(uint160(tokenId));
  }

  function mint() public {
    _mint(_msgSender());
  }

  function _mint(address receiver) internal {
    // Token ID == Minter Address
    uint256 tokenId = uint256(uint160(receiver));

    require(receiver != address(0), "ERC721: mint to the zero address");
    require(!_isTokenActive(tokenId), "ERC721: token already minted");

    // Mark Token as Active
    _activeTokens[tokenId] = true;

    // Fire Transfer Event
    emit Transfer(address(0), receiver, tokenId);
  }

  function _transfer(address, address, uint256) internal pure override {
    require(false, "ERC721: soul-bound tokens cannot be transferred");
  }

  function _hasOwnToken(address owner) internal view returns (bool) {
    uint256 ownerTokenId = uint256(uint160(owner));
    address currentOwner = _owners[ownerTokenId];
    return (_isTokenActive(ownerTokenId) && (currentOwner == owner || currentOwner == address(0)));
  }

  function _isTokenActive(uint256 tokenId) internal view returns (bool) {
    // Check if Token is Active and Not Burned
    return (_activeTokens[tokenId] && _owners[tokenId] != _NULL_ADDRESS);
  }
}
