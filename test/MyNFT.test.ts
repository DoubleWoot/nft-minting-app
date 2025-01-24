import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyNFT", function () {
  it("Should mint and transfer an NFT", async function () {
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy();
    await myNFT.deployed();

    const recipient = " 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Test address
    const metadataURI = "cid/test.png";

    let balance = await myNFT.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedTokenId = await myNFT.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther("0.01"),
    });

    await newlyMintedTokenId.wait();

    balance = await myNFT.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await myNFT.isContentOwned(metadataURI)).to.equal(true);
  });
});
