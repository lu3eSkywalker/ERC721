import React from "react";

const GetContractsByUser = () => {
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
          Show Info About Getting Contracts By Users
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-90 overflow-y-auto">
            <h3 className="font-bold text-lg">Retrieve NFT Contract Address</h3>
            <div className="py-4 text-xl">
              <p>
                To retrieve an ERC-721 contract address, we use the user's
                public key to identify any associated NFT contracts.
              </p>
              <br />
              <p>
                By querying the blockchain with this address, we can locate any
                deployed ERC-721 contracts that are linked to the user's wallet.
                This approach helps us discover and interact with the user’s
                unique NFT collections.
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

export default GetContractsByUser;
