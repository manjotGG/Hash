const hre = require("hardhat");

async function main() {
  const HashID = await hre.ethers.getContractFactory("HashID");
  const contract = await HashID.deploy();

  await contract.deployed();

  console.log("✅ Contract deployed at:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});