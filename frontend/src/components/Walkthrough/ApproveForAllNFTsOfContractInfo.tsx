import React from "react";

const ApproveForAllNFTsOfContractInfo = () => {
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
          Show Info About Approving All NFTs
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-90 overflow-y-auto">
            <h3 className="font-bold text-lg">Authorizing NFTs for Approval</h3>
            <div className="py-4 text-xl">
              <p>
                In this step, we authorize all NFTs within a specific smart
                contract for approval. This allows designated platforms to
                manage the NFTs collectively, simplifying bulk transactions.
              </p>
              <br />
              <p>
                This approach is ideal for marketplaces or escrow services, as
                it enables bulk purchases, transfers, or listings of multiple
                NFTs. By authorizing in bulk, we streamline asset management,
                especially for large collections.
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

export default ApproveForAllNFTsOfContractInfo;
