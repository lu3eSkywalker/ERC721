import React from "react";

const ApproveInfo = () => {
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
          Show Info About Approving NFTs
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl h-96 overflow-y-auto">
            <h3 className="font-bold text-lg">Enabling NFT Approvals</h3>
            <div className="py-4 text-xl">
              <p>
                In this step, we enable NFT approvals to allow a designated
                spender to transfer the NFT on the owner's behalf.
              </p>
              <br />
              <p>
                With this approval in place, NFT marketplaces gain permission to
                manage the NFT in escrow for sales. This setup adds flexibility,
                enabling approved platforms to securely list and sell the NFT
                without direct owner involvement.
              </p>
              <br />
              <p>
                Overall, approvals make transactions smoother, enhancing the
                buying and selling process on NFT marketplaces.
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

export default ApproveInfo;
