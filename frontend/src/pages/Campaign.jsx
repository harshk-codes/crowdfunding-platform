// // Campaign.js
// import { useState, useEffect } from 'react';

// const Campaign = () => {
//     const [newCampaign, setNewCampaign] = useState({
//         title: '',
//         description: '',
//         goal: '',
//         currentAmount: '',
//         deadline: '',
//         status: 'Active', // Default status
//     });

//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);
//     const [campaigns, setCampaigns] = useState([]); // For fetched campaigns

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewCampaign((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleCreateCampaign = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:5000/api/campaigns/create', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({
//                     title: newCampaign.title,
//                     description: newCampaign.description,
//                     goal: newCampaign.goal,
//                     deadline: newCampaign.deadline,
//                     status: newCampaign.status,
//                 }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Failed to create campaign.');
//             }

//             setSuccess('Campaign created successfully!');
//             setNewCampaign({
//                 title: '',
//                 description: '',
//                 goal: '',
//                 currentAmount: '',
//                 deadline: '',
//                 status: 'Active',
//             });
//              // Refetch campaigns after a new one is created
//             fetchCampaigns();
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//      const fetchCampaigns = async () => {
//         try {
//           const response = await fetch('http://localhost:5000/api/campaigns', {
//               headers: {
//                    Authorization: `Bearer ${localStorage.getItem('token')}`,
//               }
//           });
//           if (!response.ok) {
//             throw new Error('Failed to fetch campaigns.');
//           }
//           const data = await response.json();
//             setCampaigns(data.campaigns);
//         } catch (error) {
//           setError(error.message);
//         }
//       };


//        useEffect(() => {
//             fetchCampaigns();
//           }, []);



//     return (
//         <div className="min-h-screen bg-gray-100 py-10">
//             <div className="container mx-auto px-4">
//                  {/* Create Campaign Section */}
//                 <section className="mb-8 my-10 bg-white rounded-lg shadow-md p-6">
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create a Campaign</h2>
//                     {error && <p className="text-red-500 mb-4">{error}</p>}
//                     {success && <p className="text-green-500 mb-4">{success}</p>}
//                     <form onSubmit={handleCreateCampaign} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-1">Title</label>
//                             <input
//                                 type="text"
//                                 id="title"
//                                 name="title"
//                                 value={newCampaign.title}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-1">Description</label>
//                             <textarea
//                                 id="description"
//                                 name="description"
//                                 value={newCampaign.description}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//                                 required
//                                 rows="2"
//                             ></textarea>
//                         </div>
//                         <div>
//                             <label htmlFor="goal" className="block text-gray-700 text-sm font-medium mb-1">Goal Amount</label>
//                             <input
//                                 type="number"
//                                 id="goal"
//                                 name="goal"
//                                 value={newCampaign.goal}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//                                 required
//                             />
//                         </div>
                    
//                         <div>
//                             <label htmlFor="deadline" className="block text-gray-700 text-sm font-medium mb-1">Deadline</label>
//                             <input
//                                 type=""
//                                 id="deadline"
//                                 name="deadline"
//                                 value={newCampaign.deadline}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="status" className="block text-gray-700 text-sm font-medium mb-1">Status</label>
//                             <select
//                                 id="status"
//                                 name="status"
//                                 value={newCampaign.status}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//                             >
//                                 <option value="Active">Active</option>
//                                 <option value="Paused">Paused</option>
//                                 <option value="Completed">Completed</option>
//                             </select>
//                         </div>

//                         <div className="md:col-span-2">
//                             <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none">
//                                 Create Campaign
//                             </button>
//                         </div>
//                     </form>
//                 </section>
//                  {/* Explore Campaign Section */}
//                 <section className="bg-white rounded-lg shadow-md p-6">
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-800">Explore Campaigns</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     {campaigns.map((campaign) => (
//                             <div key={campaign.id} className="bg-white shadow-md rounded-lg overflow-hidden">
//                                 <img src="https://placehold.co/300x200/A3E635/0E7490?text=Campaign" alt="Campaign" className="w-full h-48 object-cover"/>
//                                     <div className="p-4">
//                                         <h3 className="text-xl font-semibold text-gray-800 mb-2">{campaign.title}</h3>
//                                         <p className="text-gray-700 text-base mb-3">{campaign.description}</p>
//                                         <div className="flex justify-between items-center mt-4">
//                                             <div>
//                                                 <p className="text-gray-700 font-semibold">Goal: ${campaign.goal}</p>
//                                                 <p className="text-gray-700">Raised: ${campaign.currentAmount}</p>
//                                             </div>
//                                            <p className={`text-xs px-2 py-1 rounded-full font-semibold ${campaign.status === 'Active' ? 'bg-green-200 text-green-800' : campaign.status === 'Paused' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>
//                                                 {campaign.status}
//                                                 </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                         ))}
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default Campaign;
// Campaign.js
//---------------------------------------------------------------------------------------------------------------------------
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Campaign = () => {
    const [newCampaign, setNewCampaign] = useState({
        title: '',
        description: '',
        goal: '',
        currentAmount: '',
        deadline: '',
        status: 'Active', // Default status
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [campaigns, setCampaigns] = useState([]); // For fetched campaigns
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCampaign((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreateCampaign = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/campaigns/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    title: newCampaign.title,
                    description: newCampaign.description,
                    goal: newCampaign.goal,
                    deadline: newCampaign.deadline,
                    status: newCampaign.status,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create campaign.');
            }else{
                setTimeout(() => {
                    navigate('/contribution')
                }, 1000)
            }

            setSuccess('Campaign created successfully!');
            setNewCampaign({
                title: '',
                description: '',
                goal: '',
                currentAmount: '',
                deadline: '',
                status: 'Active',
            });
            //  Refetch campaigns after a new one is created
            fetchCampaigns();
        } catch (error) {
            setError(error.message);
        }
    };

     const fetchCampaigns = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/campaigns', {
              headers: {
                   Authorization: `Bearer ${localStorage.getItem('token')}`,
              }
          });
          if (!response.ok) {
            throw new Error('');
          }
          const data = await response.json();
            setCampaigns(data.campaigns);
        } catch (error) {
          setError(error.message);
        }
      };


       useEffect(() => {
            fetchCampaigns();
          }, []);

      // Helper function to format the date correctly before sending to backend
    const handleDateChange = (e) => {
      const { name, value } = e.target;
      const formattedDate = value ? new Date(value).toISOString() : "";
      setNewCampaign((prev) => ({
        ...prev,
        [name]: formattedDate,
      }));
    };



    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                 {/* Create Campaign Section */}
                <section className="mb-8 my-10 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create a Campaign</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && <p className="text-green-500 mb-4">{success}</p>}
                    <form onSubmit={handleCreateCampaign} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={newCampaign.title}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-1">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={newCampaign.description}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                required
                                rows="2"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="goal" className="block text-gray-700 text-sm font-medium mb-1">Goal Amount</label>
                            <input
                                type="number"
                                id="goal"
                                name="goal"
                                value={newCampaign.goal}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                    
                        <div>
                            <label htmlFor="deadline" className="block text-gray-700 text-sm font-medium mb-1">Deadline</label>
                            {/* Change the type to 'datetime-local' for date time selection */}
                           <input
                            type="datetime-local"
                            id="deadline"
                            name="deadline"
                            value={newCampaign.deadline ? new Date(newCampaign.deadline).toISOString().slice(0, 16) : ''}
                           onChange={handleDateChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            required
                        />
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-gray-700 text-sm font-medium mb-1">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={newCampaign.status}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            >
                                <option value="Active">ACTIVE</option>
                                <option value="Paused">COMPLETED</option>
                                <option value="Completed">EXPIRED</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none">
                                Create Campaign
                            </button>
                        </div>
                    </form>
                </section>
                 {/* Explore Campaign Section */}
                <section className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Explore Campaigns</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {campaigns.map((campaign) => (
                            <div key={campaign.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <img src="https://placehold.co/300x200/A3E635/0E7490?text=Campaign" alt="Campaign" className="w-full h-48 object-cover"/>
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{campaign.title}</h3>
                                        <p className="text-gray-700 text-base mb-3">{campaign.description}</p>
                                        <div className="flex justify-between items-center mt-4">
                                            <div>
                                                <p className="text-gray-700 font-semibold">Goal: ${campaign.goal}</p>
                                                <p className="text-gray-700">Raised: ${campaign.currentAmount}</p>
                                            </div>
                                           <p className={`text-xs px-2 py-1 rounded-full font-semibold ${campaign.status === 'Active' ? 'bg-green-200 text-green-800' : campaign.status === 'Paused' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>
                                                {campaign.status}
                                                </p>
                                        </div>
                                    </div>
                                </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Campaign;