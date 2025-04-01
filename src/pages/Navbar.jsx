import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/userSlice";
import { AuthService } from "../firebase";
import { toast } from "react-toastify";

function Navbar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await AuthService.signOutUser();
      dispatch(clearUser()); // Clear user from Redux state
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold">Meal Planning</Link>

        <div className="flex space-x-4">
          <Link to="/" className="hover:text-amber-400 transition">Home</Link>
          <Link to="/about" className="hover:text-amber-400 transition">About</Link>
          <Link to="/services" className="hover:text-amber-400 transition">Services</Link>
          {user && <Link to="/profile" className="hover:text-amber-400 transition">Profile</Link>}
        </div>

        <div className="flex space-x-2">
          {user ? (
            <>
              <span className="text-amber-400 text-center align-middle">{user.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-amber-500 rounded hover:bg-amber-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition">Sign In</Link>
              <Link to="/signup" className="px-4 py-2 bg-amber-500 rounded hover:bg-amber-400 transition">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
