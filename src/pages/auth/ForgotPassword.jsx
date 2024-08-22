

import { Link } from 'react-router-dom';
import PersonSvg from "../../images/logo/person.svg";
import SmsSvg from "../../images/logo/SmsSvg.jsx";
import { useState } from 'react';
import FormSubmitHandler from '../../components/FormSubmitHandler.jsx';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loader from '../../common/Loader/index.jsx';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        setLoading(true);
        await FormSubmitHandler({
            method: 'post',
            url: 'forgot-password',
            data: { email }
        }).then(res => {
            setEmail('');
            toast.success(res.message);
        }).catch(err => {
            toast.error(err.message);
        }).finally(() => {
            setLoading(false);
        });
    };

    const emailValiTypes = {
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
    return (
        <>
            {loading && <Loader />}
            <div className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${loading && 'pointer-events-none'}`}>
                <div className="flex flex-wrap items-center">
                    <div className="hidden w-full xl:block xl:w-1/2">
                        <div className="py-17.5 px-26 text-center">
                            <span className="mt-15 inline-block">
                                <img src={PersonSvg} alt="" />
                            </span>
                        </div>
                    </div>

                    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                Forgot Password?
                            </h2>
                            <span className="mb-4 block font-medium">
                                Oops! Forgot your password? Let’s help you set a new one.
                            </span>
                            <form onSubmit={handleSubmit(handleForgotPassword)}>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            {...register('email', emailValiTypes)}
                                            type="email"
                                            id="email"
                                            name="email"
                                            onChange={(e) => { setEmail(e.target.value) }}
                                            value={email}
                                            placeholder="Enter your email"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {errors.email && <span className="text-red-500 text-xs italic">{errors.email.message}</span>}
                                        <span className="absolute right-4 top-4">
                                            <SmsSvg />
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-5 mt-4">
                                    <input
                                        type="submit"
                                        value="Continue"
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

export default ForgotPassword;
