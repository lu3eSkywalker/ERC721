import React, { useState } from "react";
import { ethers } from "ethers";

const MintingNFTs = () => {
  const [nftAddress, setNFTAddress] = useState<string>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );

  const [addressToMintNFTto, setAddressToMintNFTto] = useState<string>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );

  const [nftURI, setNFTURI] = useState<string>("");
  const [nftMintResponse, setNFTMintResponse] = useState<string>("");

  const ABI = ["function mintTo(address, string) public"];

  async function mintNFTs() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(nftAddress || "", ABI, signer);

        const createContract = await contract.mintTo(
          addressToMintNFTto,
          nftURI
        );

        const response = await createContract.wait();
        console.log(response);

        if (response.status === 1) {
          setNFTMintResponse("NFT minted Successfully");
        } else {
          setNFTMintResponse("Error Minting NFTs");
        }
      } catch (error: any) {
        console.error("Error Minting NFTs:", error);
        alert(
          "An error occurred while Minting the NFTs. Check console for details."
        );
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <div>
      <div className="bg-gray-100">
        <br />
        <br />
        <br />

        <div>
          <div
            className="flex flex-col justify-center items-center bg-gray-100"
            style={{ height: "85vh" }}
          >
            <div className="bg-white shadow-md rounded-lg p-8 w-[550px] mb-6">
              <div>
                <label className="input input-bordered flex items-center gap-2 font-black text-xl">
                  Contract_Address:
                  <input
                    className="grow"
                    type="text"
                    placeholder="address to mint the NFT to"
                    onChange={(e) => setAddressToMintNFTto(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
                  NFT_URI:
                  <input
                    className="grow"
                    type="text"
                    placeholder="http://nfturi.json"
                    onChange={(e) => setNFTURI(e.target.value)}
                  />
                </label>
              </div>
              <br />

              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
                onClick={() => mintNFTs()}
              >
                Mint NFT
              </button>
              <br />
              <br />
              {<div className="text-xl">{nftMintResponse}</div>}
            </div>

            <br />
            <br />
            <br />
            <br />

            <div className="text-center text-gray-700 font-medium">
              <ul className="steps text-xl">
                <li className="step step-primary">
                  <a href="./launcherc721">Deploy ERC721 Contract</a>
                </li>
                <li className="step step-primary">
                  <a href="./getcontractsbyuser">
                    Get the ERC721 contract Address
                  </a>
                </li>
                <li className="step step-primary">
                  <a href="./mintnft">Mint the NFTs</a>
                </li>
                <li className="step">
                  <a href="./approve">Approve NFTs (optional)</a>
                </li>
                <li className="step">
                  <a href="./approveallnfts">Approve all NFTs (optional)</a>
                </li>
                <li className="step">
                  <a href="./transfertoken">Transfer NFTs</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintingNFTs;
