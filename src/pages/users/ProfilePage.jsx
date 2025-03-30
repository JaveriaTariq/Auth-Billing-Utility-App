import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaymentChecker } from "@core/index";
import { UserApi } from "@contexts/index";

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { getUserData } = UserApi();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await getUserData();
        
        if (!userData) {
          setError("User not found or session expired.");
          setTimeout(() => navigate("/"), 2000);
        } else {
          setUser(userData);
        }
      } catch (err) {
        setError("An error occurred while fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);
  

  console.log("user", user)
  console.log("company", user?.Company)

  if (loading) return <div className="absolute inset-0 flex items-center justify-center">
  <p className="text-info text-lg font-semibold">Loading User Data ...</p>
</div>

  if (error) return <div className="absolute inset-0 flex items-center justify-center">
  <p className="text-danger text-lg font-semibold">{error}</p>
</div>

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
    
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-3xl">
 
        <div className="mb-6 border-b pb-4">
          <h2 className="text-xl font-bold text-info mb-3">My Profile</h2>
          <p className="text-gray-700"><strong>Name:</strong> {user?.full_name}</p>
          <p className="text-gray-700"><strong>Email:</strong> {user?.email}</p>
          <p className="text-gray-700"><strong>Business Name:</strong> {user?.Company?.name}</p>
          <p className="text-gray-700"><strong>Company Expected Activity:</strong> {user?.Company?.expected_activity}</p>
        </div>
  
        <PaymentChecker />
        
      </div>
    </div>
  );
}  