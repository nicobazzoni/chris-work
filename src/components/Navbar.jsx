import React from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';
import { getAuth,signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const signOutUser = () => {
        const auth = getAuth();
      
        signOut(auth).then(() => {
          // Sign-out successful.
          console.log("User signed out.");
            toast.success("Signed out successfully!");
            navigation('/home');
        }).catch((error) => {
          // An error happened.
          console.error("Error signing out:", error);
        });
      }
        
  return (
    <div className='flex items-center space-x-4 m-2 font-mono '>
      <nav>
        <ul className='flex space-between items-center space-x-2'>
          <li className='bg-red-200 p-2'>
            <Link to="/home" element={<Home />}>Home</Link>
          </li>
          <li className='bg-green-200 p-2'>
            <Link to="/lighting">Lighting</Link>
          </li>
        </ul>
      </nav>
        <button className='border rounded-full bg-blue-100 p-2' onClick={signOutUser}>Sign Out</button>
    </div>
  )
}

export default Navbar;
