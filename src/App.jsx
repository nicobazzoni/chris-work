import React, { useState } from 'react';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Lighting from './components/Lighting';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const App = () => {
  const [signedIn, setSignedIn] = useState(false);

  const handleSignIn = () => {
    setSignedIn(true);
   
  };

  return (
    <div className='flex flex-col items-center font-mono'>
      {signedIn && <Navbar />}
      <Routes>
        <Route path="/" element={signedIn ? <Home /> : <SignIn onSignInSuccess={handleSignIn} />} />
        <Route path="/home" element={signedIn ? <Home /> : <SignIn onSignInSuccess={handleSignIn} />} />
        <Route path="/lighting" element={signedIn ? <Lighting /> : <SignIn onSignInSuccess={handleSignIn} />} />
      </Routes>
    </div>
  );
};

export default App;
