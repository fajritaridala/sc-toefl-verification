import { expect } from "chai";
import hre from "hardhat";

const { ethers } = await hre.network.connect();

const hash =
  "0xd66018ae72db46f1ecccffa5b4f92a37eaee8c67d2e0f5e82226b290cb117275";
const dummyCid = "QmYwAPJzv5CZsnA33nhuqRUmzF7s4HnXUeZsKbKgWcEaXU";
const failedHash =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

describe("TOEFL", () => {
  it("should successfully store record", async () => {
    const factory = await ethers.getContractFactory("TOEFLRecord");
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    const tx = await contract.store(hash, dummyCid);
    await tx.wait();

    expect(tx).to.be.ok;
  });

  it("should successfully get a record", async () => {
    const factory = await ethers.getContractFactory("TOEFLRecord");
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    const tx = await contract.store(hash, dummyCid);
    await tx.wait();

    const record = await contract.getRecord(hash);
    expect(record).to.equal(dummyCid);
  });

  it("should failed to get record", async () => {
    const factory = await ethers.getContractFactory("TOEFLRecord");
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    const tx = await contract.store(hash, dummyCid);
    await tx.wait();

    const record = await contract.getRecord(failedHash);
    expect(record).to.be.equal("");
  });
});
