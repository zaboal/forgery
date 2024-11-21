// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CounterfeitModule", (m) => {
  const owner = m.getParameter("_owner", "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199")
  // Its private key is 0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e

  const token = m.contract("ERC20PasslistedPausable", [owner]);

  return { token };
});
