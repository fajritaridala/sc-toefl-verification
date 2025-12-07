import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const module = (m: any) => {
  const contract = m.contract("TOEFLRecord");
  return { contract };
};

export default buildModule("ToeflRecordModule", module);
