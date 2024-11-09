import React from "react";

const JustRandomDesignPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Card Title 1</h2>
        <p className="text-gray-600 mb-4">Short description goes here.</p>
        <button className="bg-purple-500 text-white py-2 px-4 rounded">
          Read More
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Card Title 2</h2>
        <p className="text-gray-600 mb-4">Short description goes here.</p>
        <button className="bg-purple-500 text-white py-2 px-4 rounded">
          Read More
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Card Title 3</h2>
        <p className="text-gray-600 mb-4">Short description goes here.</p>
        <button className="bg-purple-500 text-white py-2 px-4 rounded">
          Read More
        </button>
      </div>
    </div>
  );
};

export default JustRandomDesignPage;
