// import { useState } from 'react';

// const Contribution = () => {
//     // Mock campaign data (you'd fetch this from an API)
//     const campaign = {
//         id: 1,
//         title: 'Clean Water Initiative',
//         image: 'https://placehold.co/800x400/A3E635/0E7490?text=Water+Project',
//         description: 'Provide clean drinking water to communities in need.',
//         goal: 10000,
//         currentAmount: 6500,
//     };

//     const [donationAmount, setDonationAmount] = useState('');
//     const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
//     const [donors, setDonors] = useState([
//         { id: 1, name: 'John Doe', amount: 25 },
//         { id: 2, name: 'Jane Smith', amount: 50 },
//         { id: 3, name: 'Alice Brown', amount: 10 },
//     ]);

//     const handleDonationAmountChange = (e) => {
//         setDonationAmount(e.target.value);
//     };

//   const handleDonate = (e) => {
//         e.preventDefault();
//         if (donationAmount && parseFloat(donationAmount) > 0) {
//             const newDonor = {
//                 id: Date.now(),
//                 name: 'You', // Assuming logged-in user
//                 amount: parseFloat(donationAmount)
//             };
//             setDonors([...donors, newDonor]);
//             // Simulate payment processing. In a real app, send the data to a payment gateway
//             console.log(`Payment processing: Donation amount: $${donationAmount}`);
//             setIsPaymentSuccessful(true);
//             setTimeout(() => setIsPaymentSuccessful(false), 3000); // Hide after 3 seconds
//             setDonationAmount(''); // reset form
//              // Update the current amount locally
//              campaign.currentAmount += parseFloat(donationAmount);
//         }else{
//              alert('Please enter a valid amount to donate');
//         }
//   };



//     return (
//         <div className="min-h-screen bg-gray-100 py-10">
//             <div className="container mx-auto px-4">
//                 {/* Payment Successful Popup */}
//                 {isPaymentSuccessful && (
//                     <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-md z-50">
//                         Payment Successful!
//                     </div>
//                 )}

//                 <div className="bg-white my-12 rounded-lg shadow-md overflow-hidden">
//                     {/* Campaign Details */}
//                     <img src={campaign.image} alt={campaign.title} className="w-full h-80 object-cover" />
//                     <div className="p-6">
//                         <h2 className="text-2xl font-semibold mb-2 text-gray-800">{campaign.title}</h2>
//                         <p className="text-gray-600 mb-4">{campaign.description}</p>
//                         <div className="bg-gray-200 rounded-full h-2 mb-2">
//                             <div
//                                 className="bg-green-500 h-2 rounded-full"
//                                 style={{ width: `${(campaign.currentAmount / campaign.goal) * 100}%` }}
//                             ></div>
//                         </div>  
//                        <p className="text-sm text-gray-700 mb-4">
//                            {`$${campaign.currentAmount} raised of $${campaign.goal} goal`}
//                         </p>
//                         {/* Donation Form */}
//                         <form onSubmit={handleDonate} className="flex items-center mb-6">
//                             <input
//                                 type="number"
//                                 placeholder="Enter amount to donate"
//                                 value={donationAmount}
//                                 onChange={handleDonationAmountChange}
//                                 className="border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:border-blue-500"
//                                 required
//                             />
//                             <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
//                                 Donate
//                             </button>
//                         </form>
//                     </div>

//                     {/* Horizontal Partition */}
//                     <hr className="border-gray-200" />

//                     {/* List of Donors */}
//                     <div className="p-6">
//                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Generous Donors</h3>
//                         <ul className="divide-y divide-gray-200">
//                             {donors.map((donor) => (
//                                 <li key={donor.id} className="py-4 flex justify-between items-center">
//                                     <span className="text-gray-700">{donor.name}</span>
//                                     <span className="font-medium text-gray-800">${donor.amount}</span>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Contribution;
//-----------------------------------------------
// import { useState, useEffect } from 'react';

// const Contribution = () => {
//     const [campaign, setCampaign] = useState([]); // Campaign data from API
//     const [donationAmount, setDonationAmount] = useState('');
//     const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
//     const [donors, setDonors] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch campaign data from API
//     useEffect(() => {
//         const fetchCampaign = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/campaigns/getcamp');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch campaign data');
//                 }
//                 const data = await response.json();
//                 if (data.success) {
//                     setCampaign(data.campaigns[2]); // Assuming API returns an array of campaigns
//                     setDonors(data.campaigns[0].donors || []); // Assuming donors are part of the campaign
//                 } else {
//                     setError(data.message || 'Unknown error occurred');
//                 }
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchCampaign();
//     }, []);

//     const handleDonationAmountChange = (e) => {
//         setDonationAmount(e.target.value);
//     };

//     const handleDonate = async (e) => {
//         e.preventDefault();
//         if (donationAmount && parseFloat(donationAmount) > 0) {
//             const newDonor = {
//                 id: Date.now(),
//                 name: 'You', // Assuming logged-in user
//                 amount: parseFloat(donationAmount),
//             };

//             // Update backend with the new donation
//             try {
//                 const response = await fetch(`http://localhost:5000/api/campaigns/update`, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({
//                         campaignId: campaign.id,
//                         donationAmount: parseFloat(donationAmount),
//                         donor: newDonor,
//                     }),
//                 });

//                 const data = await response.json();
//                 if (data.success) {
//                     setDonors([...donors, newDonor]);
//                     setCampaign((prev) => ({
//                         ...prev,
//                         currentAmount: prev.currentAmount + parseFloat(donationAmount),
//                     }));
//                     setIsPaymentSuccessful(true);
//                     setTimeout(() => setIsPaymentSuccessful(false), 3000);
//                     setDonationAmount('');
//                 } else {
//                     alert('Failed to process the donation');
//                 }
//             } catch (error) {
//                 console.error('Error processing donation:', error);
//                 alert('Error processing donation');
//             }
//         } else {
//             alert('Please enter a valid amount to donate');
//         }
//     };

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className="min-h-screen bg-gray-100 py-10">
//             <div className="container mx-auto px-4">
//                 {isPaymentSuccessful && (
//                     <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-md z-50">
//                         Payment Successful!
//                     </div>
//                 )}

//                 {campaign && (
//                     <div className="bg-white my-12 rounded-lg shadow-md overflow-hidden">
//                         <img src={campaign.image} alt={campaign.title} className="w-full h-80 object-cover" />
//                         <div className="p-6">
//                             <h2 className="text-2xl font-semibold mb-2 text-gray-800">{campaign.title}</h2>
//                             <p className="text-gray-600 mb-4">{campaign.description}</p>
//                             <div className="bg-gray-200 rounded-full h-2 mb-2">
//                                 <div
//                                     className="bg-green-500 h-2 rounded-full"
//                                     style={{ width: `${(campaign.currentAmount / campaign.goal) * 100}%` }}
//                                 ></div>
//                             </div>
//                             <p className="text-sm text-gray-700 mb-4">
//                                 {`$${campaign.currentAmount} raised of $${campaign.goal} goal`}
//                             </p>
//                             <form onSubmit={handleDonate} className="flex items-center mb-6">
//                                 <input
//                                     type="number"
//                                     placeholder="Enter amount to donate"
//                                     value={donationAmount}
//                                     onChange={handleDonationAmountChange}
//                                     className="border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:border-blue-500"
//                                     required
//                                 />
//                                 <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
//                                     Donate
//                                 </button>
//                             </form>
//                         </div>
//                         <hr className="border-gray-200" />
//                         <div className="p-6">
//                             <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Generous Donors</h3>
//                             <ul className="divide-y divide-gray-200">
//                                 {donors.map((donor) => (
//                                     <li key={donor.id} className="py-4 flex justify-between items-center">
//                                         <span className="text-gray-700">{donor.name}</span>
//                                         <span className="font-medium text-gray-800">${donor.amount}</span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Contribution;
//-----------------------------------------------------------------------

import { useState, useEffect } from 'react';

const Contribution = () => {
    const [campaigns, setCampaigns] = useState([]); // Store all campaigns
    const [donationAmount, setDonationAmount] = useState('');
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    // const [selectedCampaignId, setSelectedCampaignId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch campaign data from API
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/campaigns/getcamp');
                if (!response.ok) {
                    throw new Error('Failed to fetch campaign data');
                }
                const data = await response.json();
                if (data.success) {
                    setCampaigns(data.campaigns || []); // Assuming API returns an array of campaigns
                } else {
                    setError(data.message || 'Unknown error occurred');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    const handleDonationAmountChange = (e) => {
        setDonationAmount(e.target.value);
    };

    const handleDonate = async (e, campaignId) => {
        e.preventDefault();
        if (donationAmount && parseFloat(donationAmount) > 0) {
            const newDonor = {
                id: Date.now(),
                name: 'You', // Assuming logged-in user
                amount: parseFloat(donationAmount),
            };

            // Update backend with the new donation
            try {
                const response = await fetch(`http://localhost:5000/api/campaigns/update`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        campaignId,
                        donationAmount: parseFloat(donationAmount),
                        donor: newDonor,
                    }),
                });

                const data = await response.json();
                if (data.success) {
                    setCampaigns((prevCampaigns) =>
                        prevCampaigns.map((campaign) =>
                            campaign.id === campaignId
                                ? {
                                      ...campaign,
                                      currentAmount: campaign.currentAmount + parseFloat(donationAmount),
                                      donors: [...(campaign.donors || []), newDonor],
                                  }
                                : campaign
                        )
                    );
                    setIsPaymentSuccessful(true);
                    setTimeout(() => setIsPaymentSuccessful(false), 3000);
                    setDonationAmount('');
                } else {
                    alert('Failed to process the donation');
                }
            } catch (error) {
                console.error('Error processing donation:', error);
                alert('Error processing donation');
            }
        } else {
            alert('Please enter a valid amount to donate');
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                {isPaymentSuccessful && (
                    <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-md z-50">
                        Payment Successful!
                    </div>
                )}

                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white my-12 rounded-lg shadow-md overflow-hidden">
                        <img src={campaign.image} alt={campaign.title} className="w-full h-80 object-cover" />
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{campaign.title}</h2>
                            <p className="text-gray-600 mb-4">{campaign.description}</p>
                            <div className="bg-gray-200 rounded-full h-2 mb-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{ width: `${(campaign.currentAmount / campaign.goal) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-700 mb-4">
                                {`$${campaign.currentAmount} raised of $${campaign.goal} goal`}
                            </p>
                            <form onSubmit={(e) => handleDonate(e, campaign.id)} className="flex items-center mb-6">
                                <input
                                    type="number"
                                    placeholder="Enter amount to donate"
                                    value={donationAmount}
                                    onChange={handleDonationAmountChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:border-blue-500"
                                    required
                                />
                                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
                                    Donate
                                </button>
                            </form>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Generous Donors</h3>
                            <ul className="divide-y divide-gray-200">
                                {(campaign.donors || []).map((donor) => (
                                    <li key={donor.id} className="py-4 flex justify-between items-center">
                                        <span className="text-gray-700">{donor.name}</span>
                                        <span className="font-medium text-gray-800">${donor.amount}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Contribution;


