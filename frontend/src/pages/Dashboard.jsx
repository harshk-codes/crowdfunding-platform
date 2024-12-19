import { useState } from 'react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('contributions');

  // Mock Database
  const mockDatabase = {
    contributions: [
      { id: 1, title: 'Project A Support', date: '2024-01-15', amount: '$25' },
      { id: 2, title: 'Community Fund Donation', date: '2024-02-20', amount: '$10' },
    ],
    campaigns: [
      { id: 1, title: 'Save the Trees', date: '2023-11-01', goal: '$1000', status: 'Ongoing' },
    ],
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderEmptyState = (type) => (
    <div className="flex flex-col items-center justify-center p-8 text-center">
        <img
        src="https://placehold.co/400x300/E0E7FF/818CF8?text=Empty+Illustration"
        alt="Empty Illustration"
        className="max-w-xs mb-6 rounded-md"
      />
      <p className="text-gray-500">No {type} yet.</p>
    </div>
  );

    const renderContributionList = () => (
      <ul className="divide-y divide-gray-200">
      {mockDatabase.contributions.map(item => (
      <li key={item.id} className="py-4 px-6 flex items-center hover:bg-gray-50">
        <div className="flex-1">
          <h4 className="text-lg font-medium text-gray-800">{item.title}</h4>
          <p className="text-sm text-gray-500">Date: {item.date}</p>
        </div>
        <span className="ml-4 font-semibold text-gray-700">{item.amount}</span>
      </li>
      ))}
      </ul>
    );

    const renderCampaignList = () => (
        <ul className="divide-y divide-gray-200">
      {mockDatabase.campaigns.map(item => (
      <li key={item.id} className="py-4 px-6 flex items-center hover:bg-gray-50">
        <div className="flex-1">
          <h4 className="text-lg font-medium text-gray-800">{item.title}</h4>
          <p className="text-sm text-gray-500">Date: {item.date}, Goal: {item.goal}</p>
        </div>
        <span className="ml-4 font-semibold text-gray-700">{item.status}</span>
      </li>
      ))}
      </ul>
    );



  return (
    <div className="min-h-screen my-12 bg-gray-100 flex justify-center items-start">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-10 w-full max-w-3xl">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => handleTabChange('contributions')}
              className={`px-6 py-3 text-sm font-medium focus:outline-none  ${
                activeTab === 'contributions'
                  ? 'bg-gray-100 border-b-2 border-blue-500 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Contributions
            </button>
            <button
              onClick={() => handleTabChange('campaigns')}
              className={`px-6 py-3 text-sm font-medium focus:outline-none  ${
                activeTab === 'campaigns'
                  ? 'bg-gray-100 border-b-2 border-blue-500 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Campaigns
            </button>
          </nav>
        </div>

        {/* Tab Content */}
          <div className="p-6">
              {activeTab === 'contributions' &&
                (mockDatabase.contributions.length > 0
                  ? renderContributionList()
                  : renderEmptyState('contributions'))}

            {activeTab === 'campaigns' &&
                (mockDatabase.campaigns.length > 0
                  ? renderCampaignList()
                  : renderEmptyState('campaigns'))}
          </div>
      </div>
    </div>
  );
};

export default Dashboard;