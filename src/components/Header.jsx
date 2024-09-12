"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
//import { account } from "../app/appwrite"; // Import account from Appwrite
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  console.log(pathName);

  // Function to check if user is already logged in
  const checkUserSession = async () => {
    try {
      const user = await account.get(); // Get the current user
      setLoggedInUser(user); // If user exists, set the loggedInUser state
      setIsLogoutVisible(true); // Show logout button if user is logged in
      sessionStorage.setItem("userId", JSON.stringify(user));
      router.push("/vCardTable"); // Redirect to vCardTable page if already logged in
    } catch (error) {
      setLoggedInUser(null); // If no user is logged in, set loggedInUser to null
      setIsLogoutVisible(false); // Hide logout button if no user is logged in
      if (pathName !== "/login") {
        router.push("/login"); // Redirect to login page if not logged in
      }
    }
  };

  useEffect(() => {
    checkUserSession(); // Check if user is already logged in on component mount
  }, []);

  const handleLogout = async () => {
    setShowConfirmModal(false); // Close the modal
    await account.deleteSession("current"); // Delete the current session
    setLoggedInUser(null); // Set loggedInUser to null
    setIsLogoutVisible(false); // Hide the logout button
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <>
      <header className='bg-gray-900 shadow-md'>
        <nav className='container mx-auto px-6 py-3'>
          <div className='flex justify-between items-center'>
            <Link href='/vCardTable' className='text-2xl font-bold text-white'>
              vCard Generator by Powermap
            </Link>
            <div>
              <Link
                href='/about'
                className='text-gray-300 hover:text-lime-400 mx-3'>
                About
              </Link>
              <Link
                href='/contact'
                className='text-gray-300 hover:text-lime-400 mx-3'>
                Contact
              </Link>
              {isLogoutVisible && (
                <button
                  className='text-gray-300 hover:text-lime-400 mx-3'
                  onClick={() => setShowConfirmModal(true)}>
                  Log out
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      {showConfirmModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-indextop'>
          <div className='bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-sm'>
            <h2 className='text-xl font-semibold mb-4'>Confirm Logout</h2>
            <p className='mb-6'>Are you sure you want to log out?</p>
            <div className='flex justify-end'>
              <button
                className='bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400'
                onClick={() => setShowConfirmModal(false)}>
                Cancel
              </button>
              <button
                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                onClick={handleLogout}>
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
