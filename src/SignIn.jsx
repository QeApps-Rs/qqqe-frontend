import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneIcon from "./images/svg-icons/phone.svg";
import SmsSvg from "./images/logo/SmsSvg.jsx";
import LockSvg from "./images/logo/lockSvg.jsx";
import { useForm } from "react-hook-form";
import FormSubmitHandler from "./components/FormSubmitHandler.jsx";
import toast from "react-hot-toast";
import Loader from "./common/Loader/index.jsx";
import Logo from "./images/favicon.png";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setLoading(true);
    await FormSubmitHandler({
      method: "post",
      url: "login",
      data: data,
    })
      .then((res) => {
        const { token, ...user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success(res.message);
        reset();
        // const route = localStorage.getItem("setup-preference") ? "/analytics" : "/preference-survey";
        const route = "/preference-survey";
        navigate(route);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const emailValidationType = {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
    maxLength: {
      value: 100,
      message: "Email should not exceed 100 characters",
    },
  };

  const passwordValidationType = {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
    maxLength: {
      value: 15,
      message: "Password should not exceed 15 characters",
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "Minimum length of this field must be equal or greater than 8 symbols. One uppercase and one lowercase letter and one symbol, Leading and trailing spaces will be ignored.",
    },
  };

  return (
    <>
      {loading && <Loader />}

      <div
        className={`
                 bg-white h-screen bg-[url('src/images/purple_bg.jpg')] bg-no-repeat bg-cover ${
                   loading && "pointer-events-none"
                 }`}
      >
          <div className="absolute inset-0 bg-black opacity-90 z-0">
        <div className="flex h-screen  relative z-10 ">
          <div className="w-full lg:block hidden xl:w-[35%] ">
            <div className="h-full justify-center items-center flex text-center flex-col	border-r-2 border-white">
              <h3 className="text-white text-xl font-bold mb-8">
                The future of CRO is here
              </h3>
              <Link className="block" to="/">
                {/* <img className="hidden dark:block" src={Logo} alt="Logo" /> */}
                <img className="dark:hidden" src={Logo} alt="Logo" />
              </Link>
              <button
                type="button"
                className="  text-white font-medium rounded-md px-5 py-4 border-2 mt-8"
              >
                Load more
              </button>
              {/* <span className="mt-15 inline-block">
                                <img src={PhoneIcon} alt="" />
                            </span> */}
            </div>
          </div>

          <div className="w-full p-4 sm:p-12.5 xl:p-8">
            <p className="text-white text-end font-bold">
              Don’t have any account?{" "}
              <Link to="/auth/signup" className="text-blue-500 ml-1">
                Sign Up
              </Link>
            </p>
            <div className="w-full flex justify-center h-full items-center">
              <div className="xl:w-[45%] w-full justify-center">
                <h2 className="flex mb-9 text-2xl font-semibold text-white">
                  Log in using your{" "}
                  <span className="block text-[#4680ff] mx-2 font-bold">
                    QQQE
                  </span>
                  account:{" "}
                </h2>
                {/* <span className="mb-4 block font-medium">
                  Good to see you again! Please log in.
                </span> */}
                <form onSubmit={handleSubmit(handleLogin)}>
                  <div className="mb-4">
                    {/* <label className="mb-2.5 block font-medium text-black">
                      Email
                    </label> */}
                    <div className="relative">
                      <input
                        {...register("email", emailValidationType)}
                        type="email"
                        name="email"
                        placeholder="Email address"
                        className="w-full rounded-md border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.email && (
                        <span className="text-red-500 text-xs italic">
                          {errors.email.message}
                        </span>
                      )}
                      <span className="absolute right-4 top-4">
                        <SmsSvg />
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        {...register("password", passwordValidationType)}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full rounded-md border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.password && (
                        <span className="text-red-500 text-xs italic">
                          {errors.password.message}
                        </span>
                      )}
                      <span className="absolute right-4 top-4">
                        <LockSvg />
                      </span>
                    </div>
                  </div>
                  <div className="mb-5 mt-4">
                    <input
                      type="submit"
                      value="Log in"
                      className="w-full block text-center no-underline font-extrabold text-white uppercase rounded-lg  py-4 px-12 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 
    bg-[length:200%_auto] shadow-lg shadow-blue-300/20 
    transition-all duration-500 ease-in-out 
    hover:bg-[position:right_center]"
                    />
                  </div>

                  <div className="flex items-center justify-between ">
                    <div className="mt-4 flex items-center justify-between ">
                      <Link
                        to="/auth/forgot-password"
                        className="text-sm font-medium text-white transition-colors line-clamp-1 hover:text-blue-300 focus:text-blue-300 "
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="flex items-center">
                      <Link
                        to="/"
                        className="text-sm font-medium text-white transition-colors line-clamp-1 mr-4  hover:text-blue-300 focus:text-blue-300"
                      >
                        Privacy
                      </Link>
                      <Link
                        to="/"
                        className="text-sm font-medium text-white transition-colors line-clamp-1  hover:text-blue-300 focus:text-blue-300  "
                      >
                        Terms{" "}
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
