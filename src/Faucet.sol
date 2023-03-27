// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Faucet {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    function drip() public {
        (bool success, ) = msg.sender.call{value: 0.05 ether}("");
        require(success, "Transfer failed.");
    }

    receive() external payable {}

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }
}
