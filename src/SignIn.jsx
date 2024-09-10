import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneIcon from './images/svg-icons/phone.svg';
import SmsSvg from "./images/logo/SmsSvg.jsx";
import LockSvg from "./images/logo/lockSvg.jsx";
import { useForm } from "react-hook-form";
import FormSubmitHandler from "./components/FormSubmitHandler.jsx";
import toast from 'react-hot-toast';
import Loader from "./common/Loader/index.jsx";

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({});
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        setLoading(true);
        await FormSubmitHandler({
            method: 'post',
            url: 'login',
            data: data
        }).then(res => {
            const { token, ...user } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success(res.message);
            reset()
            const route = localStorage.getItem("setup-preference") ? "/analytics" : "/preference-survey";
            navigate(route);
        }).catch(err => {
            toast.error(err.message);
        }).finally(() => {
            setLoading(false);
        });
    };

    const emailValidationType = {
        required: "Email is required",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
        },
        maxLength: {
            value: 100,
            message: "Email should not exceed 100 characters"
        }
    }

    const passwordValidationType = {
        required: "Password is required",
        minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
        },
        maxLength: {
            value: 15,
            message: "Password should not exceed 15 characters"
        },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message: "Minimum length of this field must be equal or greater than 8 symbols. One uppercase and one lowercase letter and one symbol, Leading and trailing spaces will be ignored."
        },
    }

    return (
        <>
            {loading && <Loader />}
            <div className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${loading && 'pointer-events-none'}`}>
                <div className="flex flex-wrap items-center">
                    <div className="hidden w-full xl:block xl:w-1/2">
                        <div className="py-17.5 px-26 text-center">
                            <span className="mt-15 inline-block">
                                <img src={PhoneIcon} alt="" />
                            </span>
                        </div>
                    </div>

                    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                Sign In
                            </h2>
                            <span className="mb-4 block font-medium">
                                Good to see you again! Please log in.
                            </span>
                            <form onSubmit={handleSubmit(handleLogin)}>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            {...register('email', emailValidationType)}
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {errors.email && <span className="text-red-500 text-xs italic">{errors.email.message}</span>}
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
                                            {...register('password', passwordValidationType)}
                                            type="password"
                                            name="password"
                                            placeholder="6+ Characters, 1 Capital letter"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {errors.password && <span className="text-red-500 text-xs italic">{errors.password.message}</span>}
                                        <span className="absolute right-4 top-4">
                                            <LockSvg />
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between space-x-2">
                                    <label className="inline-flex items-center space-x-2">
                                        <input
                                            className="form-checkbox is-basic h-5 w-5 rounded border-slate-400/70 checked:border-primary checked:bg-primary hover:border-primary focus:border-primary dark:border-navy-400 dark:checked:border-accent dark:checked:bg-accent dark:hover:border-accent dark:focus:border-accent"
                                            type="checkbox"
                                        />
                                        <span className="line-clamp-1">Remember me</span>
                                    </label>
                                    <Link
                                        to="/auth/forgot-password"
                                        className="text-xs text-slate-400 transition-colors line-clamp-1 hover:text-slate-800 focus:text-slate-800 dark:text-navy-300 dark:hover:text-navy-100 dark:focus:text-navy-100"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                <div className="mb-5 mt-4">
                                    <input
                                        type="submit"
                                        value="Sign In"
                                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                    />
                                </div>

                                <div className="mt-6 text-center">
                                    <p>
                                        Don’t have any account?{" "}
                                        <Link to="/auth/signup" className="text-primary">
                                            Sign Up
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
