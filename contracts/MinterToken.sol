// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.28;

import "./extensions/ERC20Ownable.sol";

/// @title Printer Minting Token
/// @notice The token used as currency for minting ERC20PasslistPausable tokens.

contract PrinterToken is ERC20Ownable {
    constructor(
        address printer
    ) ERC20Ownable(printer, "Printer Token", "PRINTER") {}
}
