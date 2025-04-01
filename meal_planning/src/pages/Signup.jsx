import { useState } from "react";
import signin_validation from "../Validations/signin.validation";
import { AuthService } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = signin_validation({ email, password, confirmPassword });

    if (error && Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await AuthService.createUser(email, password);
      const user = res.user;

      await AuthService.addUserFirestore(user?.uid, email)

      dispatch(setUser({ email: user.email, uid: user.uid })); // Store user in Redux

      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      toast.warn(error.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-200">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg border-2 border-amber-400 w-[30%]">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors?.email && (<p className="text-sm text-red-500 -mt-3">{errors.email}</p>)}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors?.password && (<p className="text-sm text-red-500 -mt-3">{errors.password}</p>)}

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {errors?.confirmPassword && (<p className="text-sm text-red-500 -mt-3">{errors.confirmPassword}</p>)}

          <div className="text-center text-sm">Already have an account? <a href="/signin" className="text-blue-500 underline">Sign In</a></div>

          <div>
            <button type="submit" className="w-full py-2 px-4 mt-4 bg-amber-400 text-white rounded-md hover:bg-amber-500 transition">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
