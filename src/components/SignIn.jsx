import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const SignIn = ({onSignInSuccess}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const navigation = useNavigate();

  const auth = getAuth();

  const handleSignIn = (event) => {
    // Prevent the form from reloading the page on submit
    event.preventDefault();
  
    const predeterminedEmail = "chris@gmail.com";
    const predeterminedPassword = "123456";
  
    signInWithEmailAndPassword(auth, predeterminedEmail, predeterminedPassword)
      .then((userCredential) => {
        // User signed in successfully
        const user = userCredential.user;
        // Do something with the signed-in user
        toast.success("Signed in successfully!");
        console.log("Signed in successfully!");
        // Here, we call the function passed down as a prop
        onSignInSuccess();
        // Navigate to Home
        navigation('/home');
      })
      .catch((error) => {
        // Error occurred during sign-in
        console.error("Sign-in error:", error.code, error.message);
        toast.error("Failed to sign in. Please try again.");
      });
  };
  
  
  

  return (
    <div className="flex-col ">
      <h1>Sign In To use App </h1>
      <form onSubmit={handleSignIn}>
        <input
          className="w-80 p-2 border border-gray-300 mb-4"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <input
          className="w-80 p-2 border border-gray-300 mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
       
        <button
          className="w-80 h-10 bg-blue-500 text-white font-bold rounded border border-blue-500"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
