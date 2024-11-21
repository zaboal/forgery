// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @author  zaboal <me+crypto.erc20ownable@zba.su>
 * @title   Extension of ERC20 by Ownable
 * @dev     Extended by Open Zeppelin's ERC-173 abstract utility,
 *          and minting is modified by {onlyOwner}.
 */
abstract contract ERC20Ownable is ERC20, Ownable {
    constructor(
        address _owner,
        string memory _name,
        string memory _symbol
    ) Ownable(_owner) ERC20(_name, _symbol) {}

    function mint(address account, uint256 value) public onlyOwner {
        _mint(account, value);
    }
}
