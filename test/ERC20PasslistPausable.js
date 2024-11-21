const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Pausable ERC20 Token with Passlist", function () {
  it("Grants ownability to its creator", async function () {
    const [creator] = await ethers.getSigners();
    const c = await ethers.deployContract("ERC20PasslistPausable", [creator.address, "ClassicUSD", "USDC"]);

    const owner = await c.owner();

    expect(owner).to.equal(creator.address);
  });
  it("Mintable for the owner", async function () {
    const [creator] = await ethers.getSigners();
    const c = await ethers.deployContract("ERC20PasslistPausable", [creator.address, "ClassicUSD", "USDC"]);

    await c.connect(creator).mint(creator.address, 1)
    const ownerBalance = await c.balanceOf(creator.address);

    expect(ownerBalance).to.equal(1);
  });
  it("Not transferable for unlisted addresses", async function () {
    const [creator, victim, receiver] = await ethers.getSigners();
    const c = await ethers.deployContract("ERC20PasslistPausable", [creator.address, "ClassicUSD", "USDC"]);

    await c.connect(creator).pause();
    await c.connect(creator).pass(creator.address, true)
    await c.connect(creator).mint(creator.address, 1);
    await c.connect(creator).transfer(victim.address, 1);

    await expect(c.connect(victim).transfer(receiver.address, 1)).to.be.revertedWithCustomError(c, "EnforcedPause")
  });
  it("Transferable for the owner", async function () {
    const [creator, receiver] = await ethers.getSigners();
    const c = await ethers.deployContract("ERC20PasslistPausable", [creator.address, "ClassicUSD", "USDC"]);

    await c.connect(creator).pause();
    await c.connect(creator).pass(creator.address, true)
    await c.connect(creator).mint(creator.address, 1);
    await c.connect(creator).transfer(receiver.address, 1);

    expect(await c.balanceOf(receiver.address)).to.equal(BigInt(1));
  });
  it("Transferable for listed addresses", async function () {
    const [creator, whitelistee, receiver] = await ethers.getSigners();
    const c = await ethers.deployContract("ERC20PasslistPausable", [creator.address, "ClassicUSD", "USDC"]);

    await c.connect(creator).pause();
    await c.connect(creator).pass(creator.address, true)
    await c.connect(creator).pass(whitelistee.address, true);
    await c.connect(creator).mint(creator.address, 1);
    await c.connect(creator).transfer(whitelistee.address, 1);
    await c.connect(whitelistee).transfer(receiver.address, 1);

    expect(await c.balanceOf(receiver.address)).to.equal(BigInt(1));
  });
});
