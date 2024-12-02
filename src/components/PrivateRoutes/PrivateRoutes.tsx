import { Outlet, Navigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { authGuard } from "../../services/authentication.services";
const PrivateRoutes = ({ userRole, multiple }:{userRole:string;multiple:boolean}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log(userRole)
  console.log(multiple)
  // const { isAuthenticated } = useAuth();
  useEffect(() => {
    const userAuth = async () => {
      setLoading(true)
      const response:{data:{message:string},status:number} = await authGuard();
      setLoading(false)
      console.log(response)
      // const response = {status:200,data:{role:'admin'}}
      setLoading(false)
 
         
          if (
            response.data.message == "You are authenticated!" 
          ) {
            setIsAuthenticated(true);
         
        } else {
          // if (response.data.role.toLowerCase() == userRole) {
          //   setIsAuthenticated(true);
          // } 
          // else {
            setIsAuthenticated(false);
          // }
        }
      
    };
    userAuth();
  }, []);
  return loading ? (
    <div className="z-[1000] flex flex-col items-center justify-center h-[100vh] w-full dark:bg-black bg-white ">
      <Loader color={"blue"} />
      <p className="text-center">Redirecting </p>
    </div>
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
  // console.log(isAuthenticated, "isAuthenticated");
  // return <div className="my-40">sdsad</div>;
};
export default PrivateRoutes;
