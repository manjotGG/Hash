// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HashID {

    mapping(address => string) public identities;

    function registerDID(string memory _did) public {
        identities[msg.sender] = _did;
    }

    function getDID(address _user) public view returns (string memory) {
        return identities[_user];
    }
}