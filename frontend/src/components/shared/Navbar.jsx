// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock authentication state
//     const [activePopup, setActivePopup] = useState(null); // To control popup visibility
//     const navigate = useNavigate(); // Hook for navigation

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 50) {
//                 setIsScrolled(true);
//             } else {
//                 setIsScrolled(false);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);

//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//    const handleLoginClick = () => {
//          navigate('/login'); // Programmatically navigate to /login
//     }

//     const handleUserIconClick = () => {
//          navigate('/dashboard'); // Programmatically navigate to /dashboard
//     }

//   // Simulate login
//     const handleLogin = () => {
//       setIsLoggedIn(true);
//   }

//   // Simulate logout
//     const handleLogout = () => {
//       setIsLoggedIn(false);
//     };

//     const popups = {
//         aboutus: {
//             title: 'About Us',
//             content: 'Our crowdfunding platform is designed to connect creators with people who want to support their projects. We aim to provide a secure and easy way for individuals and organizations to raise funds.',
//         },
//         howitworks: {
//             title: 'How It Works',
//             content: 'Creators set up a campaign with a goal, timeframe, and rewards for donors. Users explore campaigns and donate. The platform supports different campaign types and payment options.',
//          },
//         donation: {
//              title: 'Donation Link',
//              content: 'To donate to a particular campaign, click on the donation button in the individual campaign page. If you have any other question you can contact us.',
//        }
//     };

//    const handlePopupClick = (popupType) => {
//      setActivePopup(popupType);
//     };

//     const handleClosePopup = () => {
//         setActivePopup(null);
//     };

//     return (
//         <nav
//             className={`fixed top-0 bg-blue-200 left-0 w-full z-50 transition-all duration-300 ${
//                 isScrolled ? 'bg-blue-200 backdrop-blur-sm shadow-md' : 'bg-transparent'
//             }`}
//         >
//             <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//                 {/* Logo */}
//                 <Link to="/" className="text-2xl font-bold text-blue-600">
//                     Fund
//                 </Link>

//                    {/* Middle Navigation Items */}
//                    <div className="flex space-x-6">
//                         <button onClick={() => handlePopupClick('aboutus')} className="text-gray-700 hover:text-gray-900 focus:outline-none">
//                            About Us
//                         </button>
//                         <button onClick={() => handlePopupClick('howitworks')} className="text-gray-700 hover:text-gray-900 focus:outline-none">
//                            How it Works
//                         </button>
//                         <button onClick={() => handlePopupClick('donation')} className="text-gray-700 hover:text-gray-900 focus:outline-none">
//                            Donation
//                         </button>
//                     </div>

//                 {/* Login/Signup Button or User Icon */}
//                 <div>

//                 </div>
//             </div>

//             {/* Popup Card */}
//             {activePopup && (
//                 <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
//                     <div className="bg-blue-200 rounded-lg p-6 shadow-md relative w-96">
//                     <h3 className="text-2xl font-semibold mb-4 text-gray-800">{popups[activePopup].title}</h3>
//                         <p className="text-gray-700 mb-4">{popups[activePopup].content}</p>
//                         <button
//                             onClick={handleClosePopup}
//                             className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-6 w-6"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M6 18L18 6M6 6l12 12"
//                                 />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             )}

//         </nav>
//     );
// };

// export default Navbar;
//----------------------------
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state set to false
  const [activePopup, setActivePopup] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Check for token in local storage on component mount
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  

  const handleLoginClick = () => {
    localStorage.setItem("token", "your-auth-token"); // Simulate token storage
    setIsLoggedIn(true); // Update state immediately
    navigate("/");
  };
  
  

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update state immediately
    navigate("/login");
  };
  



  const popups = {
    aboutus: {
      title: "About Us",
      content:
        "Our crowdfunding platform is designed to connect creators with people who want to support their projects. We aim to provide a secure and easy way for individuals and organizations to raise funds.",
    },
    howitworks: {
      title: "How It Works",
      content:
        "Creators set up a campaign with a goal, timeframe, and rewards for donors. Users explore campaigns and donate. The platform supports different campaign types and payment options.",
    },
    donation: {
      title: "Donation Link",
      content:
        "To donate to a particular campaign, click on the donation button in the individual campaign page. If you have any other question you can contact us.",
    },
  };

  const handlePopupClick = (popupType) => {
    setActivePopup(popupType);
  };

  const handleClosePopup = () => {
    setActivePopup(null);
  };

  return (
    <nav
      className={`fixed top-0 bg-blue-200 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-blue-200 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Fund
        </Link>

        {/* Middle Navigation Items */}
        <div className="flex space-x-6">
          <button
            onClick={() => handlePopupClick("aboutus")}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            About Us
          </button>
          <button
            onClick={() => handlePopupClick("howitworks")}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            How it Works
          </button>
          <button
            onClick={() => handlePopupClick("donation")}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            Donation
          </button>
        </div>

        {/* Login/Signup Button or User Icon */}
        <div>
        {isLoggedIn ? (
  <div className="flex items-center space-x-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <button
      onClick={handleLogout}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      Logout
    </button>
  </div>
) : (
  <button
    onClick={handleLoginClick}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Login/Signup
  </button>
)}

        </div>
      </div>

      {/* Popup Card */}
      {activePopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-blue-200 rounded-lg p-6 shadow-md relative w-96">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              {popups[activePopup].title}
            </h3>
            <p className="text-gray-700 mb-4">{popups[activePopup].content}</p>
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
