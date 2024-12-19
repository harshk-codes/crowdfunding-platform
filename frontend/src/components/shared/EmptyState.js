/* eslint-disable react/prop-types */
// import React from 'react';

const EmptyState = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
      <img
        src="https://placekitten.com/200/200"
        alt="Empty State Illustration"
        className="w-32 h-32 mb-4 rounded-full"
      />
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default EmptyState;