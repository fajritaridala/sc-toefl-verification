import { network } from "hardhat";
import { expect } from "chai";

const { ethers } = await network.connect();

describe("ToeflRecord", function () {
  let contract: any;
  let owner: any, peserta: any;

  beforeEach(async () => {
    [owner, peserta] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("ToeflRecord");
    contract = await Factory.deploy();
    await contract.waitForDeployment();
  });

  it("should store a new record", async () => {
    const toeflHash = ethers.keccak256(ethers.toUtf8Bytes("tes123"));

    const record = {
      address_peserta: peserta.address,
      nama_lengkap: "Muh. Fadjriano Aprilindo T.",
      email: "fajri@example.com",
      nomor_induk_mahasiswa: "F1G121005",
      jurusan: "Ilmu Komputer",
      sesi_tes: "Pagi",
      tanggal_tes: 21,
      nilai_listening: 25,
      nilai_structure: 30,
      nilai_reading: 28,
      tanggal_terbit: 22,
      address_admin: owner.address,
    };

    await expect(contract.storedRecord(toeflHash, record))
      .to.emit(contract, "RecordStored")
      .withArgs(toeflHash, peserta.address);

    const stored = await contract.getRecord(toeflHash);

    expect(stored.nama_lengkap).to.equal("Muh. Fadjriano Aprilindo T.");
    expect(stored.email).to.equal("fajri@example.com");
    expect(stored.nilai_reading).to.equal(28);
  });

  it("should not allow duplicate record", async () => {
    const toeflHash = ethers.keccak256(ethers.toUtf8Bytes("tes123"));

    const record = {
      address_peserta: peserta.address,
      nama_lengkap: "Muh. Fadjriano Aprilindo T.",
      email: "fajri@example.com",
      nomor_induk_mahasiswa: "F1G121005",
      jurusan: "Ilmu Komputer",
      sesi_tes: "Pagi",
      tanggal_tes: 21,
      nilai_listening: 25,
      nilai_structure: 30,
      nilai_reading: 28,
      tanggal_terbit: 22,
      address_admin: owner.address,
    };

    await contract.storedRecord(toeflHash, record);

    await expect(contract.storedRecord(toeflHash, record)).to.be.revertedWith(
      "Record already exists",
    );
  });

  it("should revert if record not found", async () => {
    const randomHash = ethers.keccak256(ethers.toUtf8Bytes("tidak_ada"));

    await expect(contract.getRecord(randomHash)).to.be.revertedWith(
      "Record not found",
    );
  });

  it("should get data peserta", async () => {
    const toeflHash = ethers.keccak256(ethers.toUtf8Bytes("tes123"));

    const record = {
      address_peserta: peserta.address,
      nama_lengkap: "Muh. Fadjriano Aprilindo T.",
      email: "fajri@example.com",
      nomor_induk_mahasiswa: "F1G121005",
      jurusan: "Ilmu Komputer",
      sesi_tes: "Pagi",
      tanggal_tes: 21,
      nilai_listening: 25,
      nilai_structure: 30,
      nilai_reading: 28,
      tanggal_terbit: 22,
      address_admin: owner.address,
    };

    await contract.storedRecord(toeflHash, record);
    const view = await contract.getRecord(toeflHash);

    expect(view.address_peserta).to.equal(peserta.address);
  });
});
