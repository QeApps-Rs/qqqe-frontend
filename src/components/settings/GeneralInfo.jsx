import React from 'react'
import { useForm } from 'react-hook-form';

const GeneralInfo = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmitPersonalInfo = (data) => {
    console.log('Personal Info:', data);
  };

  const onSubmitPassword = (data) => {
    console.log('Password:', data);
  };

  const onSubmitEmail = (data) => {
    console.log('Email:', data);
  };

    return (
        <React.Fragment>
            <div className='mt-8'>
            <form onSubmit={handleSubmit(onSubmitPersonalInfo)}>
                <h2 className="text-xl mb-2">Personal Information</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                        Full name
                    </label>
                    <input
                        {...register('fullName', { required: true })}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        id="fullName"
                        type="text"
                        placeholder="Enter full name"
                    />
                    {errors.fullName && <span className="text-red-500 text-xs italic">Full name is required.</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                        Last name
                    </label>
                    <input
                        {...register('lastName', { required: true })}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        id="lastName"
                        type="text"
                        placeholder="Enter last name"
                    />
                    {errors.lastName && <span className="text-red-500 text-xs italic">Last name is required.</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePicture">
                        Profile Picture
                    </label>
                    <input
                        {...register('profilePicture')}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        id="profilePicture"
                        type="file"
                    />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Save
                </button>
            </form>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmitPassword)} className="mt-6">
                    <h2 className="text-xl mb-2">Password</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                            Current Password
                        </label>
                        <input
                            {...register('currentPassword', { required: true })}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            id="currentPassword"
                            type="password"
                            placeholder="Enter current password"
                        />
                        {errors.currentPassword && <span className="text-red-500 text-xs italic">Current password is required.</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                            New Password
                        </label>
                        <input
                            {...register('newPassword', { required: true })}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            id="newPassword"
                            type="password"
                            placeholder="Enter new password"
                        />
                        {errors.newPassword && <span className="text-red-500 text-xs italic">New password is required.</span>}
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Save
                    </button>
                </form>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmitEmail)} className="mt-6">
                    <h2 className="text-xl mb-2">Change email</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentEmail">
                            Current email
                        </label>
                        <input
                            {...register('currentEmail')}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            id="currentEmail"
                            type="email"
                            value="acarion4evr@gmail.com"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newEmail">
                            Your new email
                        </label>
                        <input
                            {...register('newEmail', { required: true })}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            id="newEmail"
                            type="email"
                            placeholder="Enter your new email"
                        />
                        {errors.newEmail && <span className="text-red-500 text-xs italic">New email is required.</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmEmail">
                            Confirm new email
                        </label>
                        <input
                            {...register('confirmEmail', { required: true })}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            id="confirmEmail"
                            type="email"
                            placeholder="Confirm new email"
                        />
                        {errors.confirmEmail && <span className="text-red-500 text-xs italic">Confirmation email is required.</span>}
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Save
                    </button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default GeneralInfo