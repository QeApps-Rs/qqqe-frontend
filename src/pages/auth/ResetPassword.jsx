

import { Link, useLocation, useNavigate } from 'react-router-dom';
import PhoneIcon from "../../images/svg-icons/phone.svg";
import { useState } from 'react';
import FormSubmitHandler from '../../components/FormSubmitHandler.jsx';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loader from '../../common/Loader/index.jsx';
import LockSvg from '../../images/logo/lockSvg.jsx';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        setLoading(true);
        await FormSubmitHandler({
            method: 'post',
            url: 'reset-password',
            data: { newPassword: password, token }
        }).then(res => {
            toast.success(res.message);
            navigate("/signin");
        }).catch(err => {
            toast.error(err.message);
        }).finally(() => {
            setLoading(false);
            setPassword('');
            setConfirmPassword('');
        });
    };

    const passwordValiTypes = {
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

    const cpasswordValiTypes = {
        required: "Confirm password is required.",
        validate: value => value === password || "The passwords do not match"
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
                                Reset Password?
                            </h2>
                            <form onSubmit={handleSubmit(handleResetPassword)}>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            {...register('password', passwordValiTypes)}
                                            type="password"
                                            id="password"
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            placeholder="Enter your password"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {errors.password && <span className="text-red-500 text-xs italic">{errors.password.message}</span>}
                                        <span className="absolute right-4 top-4">
                                            <LockSvg />
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            {...register('confirm_password', cpasswordValiTypes)}
                                            type="password"
                                            id="confirm_password"
                                            name="confirm_password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            value={confirm_password}
                                            placeholder="Enter confirm password"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {errors.confirm_password && <span className="text-red-500 text-xs italic">{errors.confirm_password.message}</span>}
                                        <span className="absolute right-4 top-4">
                                            <LockSvg />
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-5 mt-4">
                                    <input
                                        type="submit"
                                        value="Reset Password"
                                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                    />
                                </div>

                                <div className="mt-6 text-center">
                                    <p>
                                        Back to{' '}
                                        <Link to="/" className="text-primary">
                                            Sign in
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

export default ResetPassword;
