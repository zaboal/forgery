// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.28;

import "../utils/PasslistPausable.sol";
import "./ERC20Ownable.sol";

/**
 * @author  zaboal <me+crypto.erc20passlistpausable@zba.su>
 * @title   Extension of ERC20Pausable by a Passlist and Ownable
 */
abstract contract ERC20PasslistPausable is ERC20Ownable, PasslistPausable {
    constructor(
        address _owner,
        string memory _name,
        string memory _symbol
    ) ERC20Ownable(_owner, _name, _symbol) {}

    function _update(address from, address to, uint256 value) internal virtual override whenNotPaused {
        super._update(from, to, value);
    }
}
