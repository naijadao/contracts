// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract KobboToken is ERC20Votes {
  uint256 public s_maxSupply = 10000000000 * 10 ** 18;
  //    mapping (address => uint256) public balanceOf;

  constructor() ERC20("Kobbo Token", "Kobbo") ERC20Permit("KobboToken") {
    _mint(msg.sender, s_maxSupply);
  }

  function airdrop(IERC20 _token, address[] memory _to, uint256[] memory _values) public
  {
    require(_to.length == _values.length, 'addresses and values length must match');
    for (uint256 i = 0; i < _to.length; i++) {
      require(_token.transferFrom(msg.sender, _to[i], _values[i]), 'transfer failed');
    }
  }

  // The functions below are overrides required by Solidity.

  function _afterTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal override(ERC20Votes) {
    super._afterTokenTransfer(from, to, amount);
  }

  function _mint(address to, uint256 amount) internal override(ERC20Votes) {
    super._mint(to, amount);
  }

  function _burn(address account, uint256 amount) internal override(ERC20Votes) {
    super._burn(account, amount);
  }
}