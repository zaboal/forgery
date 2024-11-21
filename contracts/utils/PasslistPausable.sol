// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @author  zaboal <me+crypto.passlistpausable@zba.su>
 * @title   Extension of Pausable by a Passlist and Ownable
 * @notice  The owner is able to passlist with {pass()} addresses
 *          who will be able to bypass the {whenNotPaused} modifier.
 */
abstract contract PasslistPausable is Pausable, Ownable {
    mapping(address => bool) public passlist;

    event Passlisted(address indexed account, bool isListed);

    /**
     * @notice  (Dis-)allow an address to bypass the pause.
     * @param   _account    address to toggle
     * @param   _listed     true or false (unlisted)
     */
    function pass(address _account, bool _listed) public onlyOwner {
        passlist[_account] = _listed;
        emit Passlisted(_account, _listed);
    }

    /**
     * @dev     Passlisted addresses bypass this requirement.
     */
    function _requireNotPaused() internal view override {
        if (passlist[_msgSender()]) {} else if (paused()) {
            revert EnforcedPause();
        }
    }

    function pause() public onlyOwner {
        super._pause();
    }

    function unpause() public onlyOwner {
        super._unpause();
    }
}
