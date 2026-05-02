const hre = require("hardhat");

async function main() {
  const HashID = await hre.ethers.getContractFactory("HashID");
  const contract = await HashID.deploy();

  await contract.waitForDeployment();

  console.log("✅ Contract deployed at:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});