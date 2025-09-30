// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ToeflRecord {
  struct Record {
    address address_peserta;
    string nama_lengkap;
    string email;
    string nomor_induk_mahasiswa;
    string jurusan;
    string sesi_tes;
    uint8 tanggal_tes;
    uint8 nilai_listening;
    uint8 nilai_structure;
    uint8 nilai_reading;
    uint8 tanggal_terbit;
    address address_admin;
  }

  mapping(bytes32 => Record) private records;

  event RecordStored(bytes32 indexed toefl_hash, address indexed address_peserta);

  // fungsi untuk menyimpan data ke blockchain
  function storedRecord(
    bytes32 toefl_hash,
    Record calldata _record) external {
    // cek apakah data sudah ada
    require(records[toefl_hash].address_peserta ==  address(0), "Record already exists");
    
    // simpan data ke mapping
    records[toefl_hash] = _record;

    emit RecordStored(toefl_hash, _record.address_peserta);
  }

  // fungsi untuk mengambil data dari blockchain
  function getRecord(bytes32 toefl_hash) external view returns (
    address address_peserta,
    string memory nama_lengkap,
    string memory email,
    string memory nomor_induk_mahasiswa,
    string memory jurusan,
    string memory sesi_tes,
    uint8 tanggal_tes,
    uint8 nilai_listening,
    uint8 nilai_structure,
    uint8 nilai_reading,
    uint8 tanggal_terbit,
    address address_admin
  ) {
    Record memory v = records[toefl_hash];
    require(v.address_peserta != address(0), "Record not found");
    return (
      v.address_peserta,
      v.nama_lengkap,
      v.email,
      v.nomor_induk_mahasiswa,
      v.jurusan,
      v.sesi_tes,
      v.tanggal_tes,
      v.nilai_listening,
      v.nilai_structure,
      v.nilai_reading,
      v.tanggal_terbit,
      v.address_admin
    );
  }
}