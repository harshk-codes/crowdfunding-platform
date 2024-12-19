/* eslint-disable react/prop-types */
// import React from 'react';

const Error = ({ errorCode, message}) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
         <img
             src="../assets/images/Error.jpg"
             alt="Error Illustration"
             className="max-w-sm mb-6 rounded-md"
        />
      <h2 className="text-4xl font-bold text-red-600 mb-4">Oops! An Error Occurred</h2>
      <p className="text-lg text-gray-700 mb-2">
          {message || "Something went wrong. Please try again later."}
      </p>
      {errorCode && (
      <p className="text-gray-500 text-sm">Error Code: {errorCode}</p>
      )}
    </div>
  );
};

export default Error;