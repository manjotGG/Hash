// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HashID {

    struct Identity {
        address user;
        string did;
        uint256 createdAt;
    }

    mapping(address => Identity) public identities;

    event DIDRegistered(address indexed user, string did);

    function registerDID(string memory _did) public {
        require(bytes(_did).length > 0, "DID cannot be empty");

        identities[msg.sender] = Identity({
            user: msg.sender,
            did: _did,
            createdAt: block.timestamp
        });

        emit DIDRegistered(msg.sender, _did);
    }

    function getDID(address _user) public view returns (string memory) {
        return identities[_user].did;
    }
}