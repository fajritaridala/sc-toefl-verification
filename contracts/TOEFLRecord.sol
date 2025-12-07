// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract TOEFLRecord {
  mapping(bytes32 => string) private records;

  event RecordStored(address indexed sender, bytes32 indexed hash, string cid);

  function store(bytes32 hash, string memory cid) public {
    require(bytes(records[hash]).length == 0, "Record already exists");
    records[hash] = cid;
    emit RecordStored(msg.sender, hash, cid);
  }

  function getRecord(bytes32 hash) public view returns (string memory) {
    return records[hash];
  }
}
