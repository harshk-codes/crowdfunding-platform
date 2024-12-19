/* eslint-disable react/prop-types */
// import React from 'react';

const CampaignCard = ({ title, goal, raised, date }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">Goal: ${goal}</p>
      <p className="text-gray-600">Raised: ${raised}</p>
      <p className="text-gray-500 text-sm">{date}</p>
    </div>
  );
};

export default CampaignCard;