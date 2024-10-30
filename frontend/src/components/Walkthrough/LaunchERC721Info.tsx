import React from "react";

const LaunchERC721Info = () => {
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
          Show Info About Launching ERC721
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-96 overflow-y-auto">
            <h3 className="font-bold text-lg">NFT Collection Deployment</h3>
            <div className="py-4 text-xl">
              <p>
                In this process, we will deploy an ERC-721 contract to create a
                unique NFT collection.
              </p>
              <br />
              <p>
                During deployment, we specify the contract’s name and symbol,
                which serve as identifiers for the collection. Once the contract
                is deployed successfully, NFTs can be minted and assigned to
                individual addresses.
              </p>
              <br />
              <p>
                Each token minted in this collection will carry unique metadata,
                giving each NFT its distinct identity within the collection.
                With this setup, you can add more NFTs to the collection at any
                time.
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

export default LaunchERC721Info;
