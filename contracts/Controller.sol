// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.28;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @author  zaboal <me+crypto.printer@zba.su>
 * @title   The Controller of the Printer dApp
 */
contract Printer is AccessControl {
    bytes32 public constant BUYING_MANAGER = keccak256("manager");

    mapping(address token => uint256 bid) public offers;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    /// Buying manager ensures that the token is applicable and its
    /// ownership mechanism is fine, and suggests a price for it.
    function offer(uint256 bid, address token) public onlyRole(BUYING_MANAGER) {}
}
