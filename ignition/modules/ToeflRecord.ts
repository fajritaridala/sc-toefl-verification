import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ToeflRecordModule", (m) => {
  const toeflRecord = m.contract("ToeflRecord");
  return { toeflRecord };
});
