import { Link } from "react-router-dom";
import PhoneIcon from "../../images/svg-icons/phone.svg";
import SmsSvg from "../../images/logo/SmsSvg.jsx";
import { useState } from "react";
import FormSubmitHandler from "../../components/FormSubmitHandler.jsx";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Loader from "../../common/Loader/index.jsx";
import Logo from "../../images/favicon.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    setLoading(true);
    await FormSubmitHandler({
      method: "post",
      url: "forgot-password",
      data: { email },
    })
      .then((res) => {
        setEmail("");
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const emailValiTypes = {
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
  return (
    <>
      {loading && <Loader />}
      <div className="h-screen bg-[url('/src/images/purple-bg.jpg')] bg-no-repeat bg-cover">
        <div className="w-full absolute inset-0 backdrop-brightness-50 opacity-90 z-0 p-4 sm:p-12.5 xl:p-8 flex justify-center text-center">
          {/* <div className="hidden w-full xl:block xl:w-1/2">
                        <div className="py-17.5 px-26 text-center">
                            <Link className="mb-5.5 inline-block" to="/">
                                <img className="hidden dark:block" src={Logo} alt="Logo" />
                                <img
                                    className="dark:hidden"
                                    style={{
                                        backgroundColor: "#3a56dbdb",
                                    }}
                                    src={Logo}
                                    alt="Logo"
                                />
                            </Link>
                            <span className="mt-15 inline-block">
                                <img src={PhoneIcon} alt="" />
                            </span>
                        </div>
                    </div> */}

          <div className="lg:w-1/3 mt-15 ">
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-title-xl2">
              Forgot Password?
            </h2>
            <span className="block font-medium text-white">
              Oops! Forgot your password? Let’s help you set a new one.
            </span>
            <form onSubmit={handleSubmit(handleForgotPassword)}>
              <div className="my-4">
                {/* <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label> */}
                <div className="relative">
                  <input
                    {...register("email", emailValiTypes)}
                    type="email"
                    id="email"
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none "
                  />
                  {errors.email && (
                    <span className="text-red-300 font-blod text-md mt-2 block italic text-justify">
                      {errors.email.message}
                    </span>
                  )}
                  <span className="absolute right-4 top-4">
                    <SmsSvg />
                  </span>
                </div>
              </div>

              <div className="mb-5 mt-4">
                <input
                  type="submit"
                  value="Send Password Reset Link"
                  className="w-full block text-center no-underline font-extrabold text-white uppercase rounded-lg  py-4 px-12 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 
                  bg-[length:200%_auto] shadow-lg shadow-blue-300/20 
                  transition-all duration-500 ease-in-out 
                  hover:bg-[position:right_center]"
                />
              </div>

              <div className="mt-6 text-center text-white">
                Back to{" "}
                <Link to="/" className="text-md font-bold text-blue-500">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
