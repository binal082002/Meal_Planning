import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/userSlice";
import { AuthService } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  console.log(user);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    dietaryPreferences: [],
    allergens: [],
    dislikedIngredients: "",
    favoriteCuisines: [],
    calorieGoal: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({ ...formData, ...user });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await AuthService.updateUser(user.uid, formData)
    dispatch(updateProfile(formData));
    toast.success("profile updated successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Complete Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <input name="name" value={formData.name} onChange={handleChange} className="p-2 border rounded" placeholder="Name" required />
          <input name="age" type="number" value={formData.age} onChange={handleChange} className="p-2 border rounded" placeholder="Age" required />
          <select name="gender" value={formData.gender} onChange={handleChange} className="p-2 border rounded">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-lg">Dietary Preferences</label>
            {["Vegan", "Vegetarian", "Keto", "Paleo", "Gluten-Free", "Dairy-Free"].map((diet) => (
              <label key={diet} className="flex items-center">
                <input type="checkbox" name="dietaryPreferences" value={diet} onChange={handleChange} className="mr-2" />
                {diet}
              </label>
            ))}
          </div>

          <div>
            <label className="block font-semibold text-lg">Allergens</label>
            {["Peanuts", "Dairy", "Gluten", "Shellfish", "Eggs", "Soy", "Tree Nuts"].map((allergen) => (
              <label key={allergen} className="flex items-center">
                <input type="checkbox" name="allergens" value={allergen} onChange={handleChange} className="mr-2" />
                {allergen}
              </label>
            ))}
          </div>

          <div>
            <input name="dislikedIngredients" value={formData.dislikedIngredients} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Disliked Ingredients" />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-lg">Favorite Cuisines</label>
          <div className="grid grid-cols-3 gap-4">
            {["Italian", "Mexican", "Indian", "Chinese", "Thai", "Mediterranean"].map((cuisine) => (
              <label key={cuisine} className="flex items-center">
                <input type="checkbox" name="favoriteCuisines" value={cuisine} onChange={handleChange} className="mr-2" />
                {cuisine}
              </label>
            ))}
          </div>
        </div>

        <div>
          <input name="calorieGoal" type="number" value={formData.calorieGoal} onChange={handleChange} className="w-80 p-2 border rounded" placeholder="Daily Calorie Goal (Optional)" />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-1/3 mt-4 cursor-pointer">Save & Continue</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
