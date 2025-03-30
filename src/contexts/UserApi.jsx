import { httpClient } from "@utils/httpClient";
import { UserStore, headerWithToken } from "@contexts/index";


export const UserApi = () => {
  const { setUser, setIsAuthenticated } = UserStore();



  // Toast API
  const loginUser = async (data) => {
    try {
      const response = await httpClient.post("login", data);
      localStorage.setItem("jwtToken", response.data.token);
      return response;
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };
  const getUserData = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        console.log("JWT Token Not Found");
        setUser(null);
        setIsAuthenticated(false);
        return null;
      }
      console.log("JWT Token Found");
      const response = await httpClient.get(
        "user",
        headerWithToken(),
      );
      const responseData = response.data.user;
      return responseData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  
  return {
  
    loginUser,
    getUserData,
    
  };
};

