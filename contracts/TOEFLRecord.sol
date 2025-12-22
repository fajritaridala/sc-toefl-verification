// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract TOEFLRecord {
  // mapping untuk menyimpan data relasi antara hash dan cid pinata
  mapping(bytes32 => string) private records;

  event RecordStored(address indexed sender, bytes32 indexed hash, string cid);

  // fungsi untuk menulis/menyimpan data ke blockchain
  function store(bytes32 hash, string memory cid) public {
    require(bytes(records[hash]).length == 0, "Record already exists"); // memastikan bahwa hash yang dikirim belum pernah ada sebelumnya.

    // menyimpan cid ke dalam mapping, berdasarkan hash yang diberikan.
    records[hash] = cid;

    // memberitahu DApp/frontend bahwa penyimpanan data berhasil.
    emit RecordStored(msg.sender, hash, cid);
  }

  // fungsi untuk membaca data dari blockchain
  function getRecord(bytes32 hash) public view returns (string memory) {
    // mengembalikan/memberi string cid berdasarkan hash yang diberikan.
    return records[hash];
  }
}
