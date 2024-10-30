import React from "react";

const MintingNFTsInfo = () => {
  const handleClick = () => {
    const modal = document.getElementById("my_modal_4") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };
  return (
    <div>
      <div>
        <button
          className="btn text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleClick}
        >
          Show Info About Minting NFTs
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-90 overflow-y-auto">
            <h3 className="font-bold text-lg">Minting NFTs</h3>
            <div className="py-4 text-xl">
              <p>
                In this step, we’ll mint new NFTs to our deployed ERC-721
                contract. Using the contract address and a specific URI, we link
                each NFT to metadata that includes the NFT’s name, symbol,
                image, and description.
              </p>
              <br />
              <p>
                This URI holds all the defining details of the NFT and is stored
                off-chain, allowing easy access and management. By minting, we
                add unique tokens to the collection, making them ready for
                ownership, transfer, and other interactions.
              </p>
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MintingNFTsInfo;
