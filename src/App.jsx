import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import { UserApi} from "@contexts/index";
// import { jwtDecode } from "jwt-decode";
//import "react-toastify/dist/ReactToastify.css";

// Lazy-loaded components
const NotFoundPage = lazy(() =>
  import("@system/index").then((module) => ({ default: module.NotFoundPage })),
);


const LoginPage = lazy(() =>
  import("@users/index").then((module) => ({ default: module.LoginPage })),
);


const ProfilePage = lazy(() =>
  import("@users/index").then((module) => ({ default: module.ProfilePage })),
);


export default function App() {
 

 

  // useEffect(
  //   () => async () => {
  //     const storedUser = JSON.parse(sessionStorage.getItem("userStorage"));
  //     const jwtToken = localStorage.getItem("jwtToken");
  //     const rememberMe = localStorage.getItem("rememberMe");

  //     const isTokenInvalid = (token) => {
  //       if (token === null) return true;
  //       const decoded = jwtDecode(token);
  //       const currentTime = Date.now() / 1000;
  //       return decoded.exp < currentTime;
  //     };

  //     if (isTokenInvalid(jwtToken)) {
  //       console.log("Token is invalid. Regular login required.");
  //       UserStore.setState({ user: null, isAuthenticated: false });
  //       return;
  //     } else if (storedUser.state.user === null && rememberMe === "true") {
  //       console.log("User data is null, remember me is true. Getting data.");
  //       const data = await getUserData();
  //       if (data === null) {
  //         console.log("User data is null.");
  //         UserStore.setState({ user: null, isAuthenticated: false });
  //         return;
  //       } else {
  //         console.log("User data was fetched.");
  //         UserStore.setState({ user: data, isAuthenticated: true });
  //       }
  //     } else if (storedUser.state.user !== null && rememberMe !== "true") {
  //       console.log(
  //         "User data exists, remember me is false. Setting existing data.",
  //       );
  //       UserStore.setState({
  //         user: storedUser.state.user,
  //         isAuthenticated: true,
  //       });
  //     } else if (storedUser.state.user !== null && rememberMe === "true") {
  //       console.log(
  //         "User data exists, remember me is true. Setting existing data.",
  //       );
  //       UserStore.setState({
  //         user: storedUser.state.user,
  //         isAuthenticated: true,
  //       });
  //     } else if (storedUser.state.user === null && rememberMe === "false") {
  //       console.log(
  //         "User data is null, remember me is false. Regular login required.",
  //       );
  //     } else {
  //       console.log("Unhandled case. Regular login required.");
  //       console.log("storedUser: ", storedUser, "\nrememberMe: ", rememberMe);
  //     }
  //   },
  //   [],
  // );
  // const { user } = UserStore((state) => ({
  //   user: state.user,
  //   isAuthenticated: state.isAuthenticated,
  // }));

  return (
   
    
    <BrowserRouter>
   
        <ToastContainer />
   
        
          <Routes>
  <Route path="/" element={<LoginPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>


     
  
    </BrowserRouter>
  );
}

// export const AuthRequired = () => {
//   const { isAuthenticated, user } = UserStore((state) => ({
//     isAuthenticated: state.isAuthenticated,
//     user: state.user,
//   }));
//   useEffect(() => {}, [isAuthenticated]);

//   if (!isAuthenticated) {
//     console.log("Not Authenticated:");
//     return <Navigate to="/login" />;
//   }

//   return <Outlet />;
// };

// export const AuthNotRequired = () => {
//   const { isAuthenticated, user } = UserStore((state) => ({
//     isAuthenticated: state.isAuthenticated,
//     user: state.user,
//   }));
//   useEffect(() => {}, [isAuthenticated]);

//   if (isAuthenticated) {
//     if (!user?.subscription_expired) {
//       console.log("Authenticated, Subscription Active:");
//       return <Navigate to="/home" />;
//     } else {
//       console.log("Authenticated, Subscription Expired:");
//       return <Navigate to="/settings" />;
//     }
//   }

//   return <Outlet />;
// };

