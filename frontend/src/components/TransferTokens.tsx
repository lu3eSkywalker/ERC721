import React, { useState } from "react";
import { ethers } from "ethers";
import TransferTokensInfo from "./Walkthrough/TransferTokensInfo";

const TransferTokens = () => {
  const [senderAddress, setSenderAddress] = useState<string>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );
  const [receiverAddress, setReceiverAddress] = useState<string>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );
  const [tokenId, setTokenId] = useState<number>();
  const [contractAddress, setContractAddress] = useState<string>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );

  const [nftTransferResponse, setNFTTransferResponse] = useState<string>("");

  const ABI = ["function transferFrom(address, address, uint256) public"];

  async function transferToken() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress || "",
          ABI,
          signer
        );

        const sendToken = await contract.transferFrom(
          senderAddress,
          receiverAddress,
          tokenId
        );

        const response = await sendToken.wait();
        console.log(response.toString());

        if (response.status == 1) {
          setNFTTransferResponse("NFT Transferred Successfully");
        } else {
          setNFTTransferResponse("Error Transferring the NFT");
        }
      } catch (error: any) {
        console.error("Error Transferring NFT:", error);
        alert(
          "An error occurred while transferring the nft. Check console for details."
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
        <div className="flex justify-center bg-gray-100">
          <TransferTokensInfo />
        </div>u

        <div>
          <div
            className="flex flex-col justify-center items-center bg-gray-100"
            style={{ height: "65vh" }}
          >
            <div className="bg-white shadow-md rounded-lg p-8 w-[450px] mb-6">
              <div>
                <label className="input input-bordered flex items-center gap-2 font-black text-xl my-2">
                  Address:
                  <input
                    className="grow"
                    type="text"
                    placeholder="sender Address"
                    onChange={(e) => setSenderAddress(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 font-black text-xl">
                  Address:
                  <input
                    className="grow"
                    type="text"
                    placeholder="Receiver Address"
                    onChange={(e) => setReceiverAddress(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
                  Address:
                  <input
                    className="grow"
                    type="text"
                    placeholder="contractAddress"
                    onChange={(e) => setContractAddress(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
                  Token_ID:
                  <input
                    className="grow"
                    type="text"
                    placeholder="token Id"
                    onChange={(e) => setTokenId(parseInt(e.target.value))}
                  />
                </label>
              </div>

              <br />

              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
                onClick={() => transferToken()}
              >
                Transfer Token
              </button>

              <br />
              <br />
              {<div className="text-xl">{nftTransferResponse}</div>}
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
                <li className="step step-primary">
                  <a href="./approve">Approve NFTs (optional)</a>
                </li>
                <li className="step step-primary">
                  <a href="./approveallnfts">Approve all NFTs (optional)</a>
                </li>
                <li className="step step-primary">
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

export default TransferTokens;
