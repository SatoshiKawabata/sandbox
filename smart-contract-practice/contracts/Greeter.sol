pragma solidity >=0.4.22 <0.9.0;

import "openzeppelin-solidity/contracts/access/Ownable.sol";

contract Greeter is Ownable {
    string private _greetingMessage = "Hello World!";
    address private _owner;

    constructor() {
        _owner = msg.sender;
    }

    function greet() external view returns (string memory) {
        return _greetingMessage;
    }

    function setGreeting(string calldata message) external onlyOwner {
        _greetingMessage = message;
    }
}
