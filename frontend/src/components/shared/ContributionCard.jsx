/* eslint-disable react/prop-types */
// import React from 'react';

const ContributionCard = ({ title, amount, date }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">Amount: ${amount}</p>
      <p className="text-gray-500 text-sm">{date}</p>
    </div>
  );
};

export default ContributionCard;