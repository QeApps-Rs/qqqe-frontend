import { Link, useLocation, useNavigate } from "react-router-dom";
import PhoneIcon from "../../images/svg-icons/phone.svg";
import { useState } from "react";
import FormSubmitHandler from "../../components/FormSubmitHandler.jsx";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Loader from "../../common/Loader/index.jsx";
import LockSvg from "../../images/logo/lockSvg.jsx";
import Logo from "../../images/favicon.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    setLoading(true);
    await FormSubmitHandler({
      method: "post",
      url: "reset-password",
      data: { newPassword: password, token },
    })
      .then((res) => {
        toast.success(res.message);
        navigate("/signin");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
        setPassword("");
        setConfirmPassword("");
      });
  };

  const passwordValiTypes = {
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

  const cpasswordValiTypes = {
    required: "Confirm password is required.",
    validate: (value) => value === password || "The passwords do not match",
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex h-screen">
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

        <div className="w-full flex justify-center h-full items-center">
          <div className="xl:w-[45%] w-full justify-center p-4 sm:p-12.5 xl:p-0">
            <h2 className="flex mb-9 text-2xl font-semibold text-white">
              Reset Password?
            </h2>
            <form onSubmit={handleSubmit(handleResetPassword)}>
              <div className="mb-4">
                {/* <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label> */}
                <div className="relative">
                  <input
                    {...register("password", passwordValiTypes)}
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Enter your password"
                    className="w-full rounded-md border bg-white border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.password && (
                    <span className="text-red-300 font-blod text-md mt-2 block italic">
                      {errors.password.message}
                    </span>
                  )}
                  <span className="absolute right-4 top-4">
                    <LockSvg />
                  </span>
                </div>
              </div>

              <div className="mb-6">
                {/* <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Confirm Password
                </label> */}
                <div className="relative">
                  <input
                    {...register("confirm_password", cpasswordValiTypes)}
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirm_password}
                    placeholder="Enter confirm password"
                    className="w-full rounded-md border bg-white border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.confirm_password && (
                    <span className="text-red-300 font-blod text-md mt-2 block italic">
                      {errors.confirm_password.message}
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
                  value="Reset Password"
                  className="w-full block text-center no-underline font-extrabold text-white uppercase rounded-lg  py-4 px-12 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 
                  bg-[length:200%_auto] shadow-lg shadow-blue-300/20 
                  transition-all duration-500 ease-in-out 
                  hover:bg-[position:right_center]"
                />
              </div>

              <div className="mt-6 text-center text-white flex items-center justify-center gap-2 ">
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

export default ResetPassword;
