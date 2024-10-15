import React, { useState } from "react";
import { ethers } from "ethers";

const GetContractByUser = () => {
  const [userAddress, setUserAddress] = useState<string>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );
  const [nftContractAddress, setNFTContractAddress] = useState<string>("");

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const ABI = [
    "function getUserContracts(address) public view returns (address[] memory)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(CONTRACT_ADDRESS || "", ABI, provider);

  async function getContractByUser() {
    const getContracts = await contract.getUserContracts(userAddress);
    const response = getContracts.toString();
    setNFTContractAddress(response);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">
        <div>
          <input
            type="text"
            placeholder="user address"
            onChange={(e) => setUserAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <br />

        <div className="min-h-8">
          {nftContractAddress.split(",").map((data) => (
            <div className="text-lg font-semibold text-center break-words">
              {data}
              <br />
              <br />

            </div>
          ))}
        </div>

        <div>
          <button onClick={() => getContractByUser()}>Get Contracts</button>
        </div>
      </div>
    </div>
  );
};

export default GetContractByUser;
