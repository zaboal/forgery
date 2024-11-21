const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Forge", function () {
    describe("Tokens acquiring mechanism", function () {
        it("Owner appoints buying manager", async function () {
            const [creator, manager] = await ethers.getSigners();
            const c = await ethers.deployContract("Printer");

            await c.connect(creator).grantRole(
                ethers.encodeBytes32String("manager"), manager.address);
            gotTheRole = await c.hasRole(
                ethers.encodeBytes32String("manager"), manager.address);
            expect(gotTheRole).to.equal(true)
        });
        it("Buyer manager suggest a price of ownership per token contract", async function () {
            const [creator, manager, seller] = await ethers.getSigners();
            const c = await ethers.deployContract("Printer");
            const token = await ethers.deployContract("ERC20PasslistedPausable", [seller.address, "ClassicUSD", "USDC"]);

            await c.connect(creator).grantRole(
                ethers.encodeBytes32String("manager"), manager.address);
            await c.hasRole(
                ethers.encodeBytes32String("manager"), manager.address);

            await c.connect(manager).offer(1, token.address);
            token_offer = await c.getOffer(token.address);

            expect(token_offer).to.equal(1);
        })
    })
})