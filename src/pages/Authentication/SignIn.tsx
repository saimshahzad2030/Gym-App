import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { LOGO } from '../../../constants/constants';
import { SignInScreenImage } from '../../../constants/icons';
import { adminLogin } from '../../services/signin.services';
import SnackbarComp from '../../components/SnackBar/Snackbar';
import Cookies from 'js-cookie'
import Loader from '../../common/Loader';
import LoaderComp from '../../components/Loader/Loader';
const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [message, setMessage] = React.useState<string>('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [signInLoading, setSignInLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{ username?: string; password?: string }>({});

  const validateFields = () => {
    const newErrors: { username?: string; password?: string } = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };
  const routeToAdmin = async(event:React.FormEvent)=>{
    event.preventDefault();
    if (!validateFields()) return;
    setSignInLoading(true)
    const login = await adminLogin({username,password}) 
    setSignInLoading(false)

    if(login?.access){
      Cookies.set('token',login.access)
      setMessage('Login Successful')
      navigate('/dashboard/view')
    }
    else{
      setMessage(login?.error?login?.error:'Unexpected Error Occurred')
      setOpenSnackBar(true)
      

    }
    
  }
  return (
    <div className='flex flex-col items-center w-full px-8'>
       

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className=" mb-4 flex flex-col items-center" to="/"> 
                <img className="w-20 h-auto dark:hidden" src={LOGO.src} alt="Logo" />
                <h1 className='font-bold text-4xl mt-2 mb-0'>
                  Fitness First Gym
                </h1>
              </Link>

              <p className="2xl:px-20">
                Here, you will gett all things require to make your fitness next level
              </p>

              <span className="mt-15 inline-block">
                <SignInScreenImage/>
              </span>
            </div>
          </div>

          <div className="mt-12 sm:mt-0 w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5"> 
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to FFG
              </h2>

              <form onSubmit={routeToAdmin}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                     {errors.username && (
                      <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="6+ Characters, 1 Capital letter"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                     {errors.password && (
                      <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>
                </div>

                <div className="mb-5">
                  <button
                    type="submit"
                    disabled={signInLoading}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  >{signInLoading?<LoaderComp color='white' />:'Sign in'}</button>
                </div>

                
 
              </form>

            </div>
          </div>
        </div>
      </div>
      <SnackbarComp open={openSnackBar} setOpen={setOpenSnackBar} message={message}/>

    </div>
  );
};

export default SignIn;
