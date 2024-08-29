import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import Logo from "../../images/favicon.png";
import { useForm } from "react-hook-form";
import PhoneIcon from '../../images/svg-icons/phone.svg';
import DropDown from "../../components/higherOrderComponent/Dropdown/Dropdown";
import FormSubmitHandler from "../../components/FormSubmitHandler";
import LockSvg from "../../images/logo/lockSvg";
import SmsSvg from "../../images/logo/SmsSvg";
import UserSvg from "../../images/logo/userSvg";
import DomainSvg from "../../images/logo/domainSvg";

const SignUp = () => {
  const defaultFields = { name: '', email: '', platform: '', domain: '', password: '', confirm_password: '' };
  const [registerField, setRegisterField] = useState(defaultFields);
  const [isDomainEnabled, setIsDomainEnabled] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const handlePlatformChange = (selectedPlatform) => {
    setRegisterField({
      ...registerField,
      platform: selectedPlatform,
      domain: ''
    });
    setIsDomainEnabled(true);
  };

  const dropdownData = {
    label: "Select a platform",
    placeholder: "Select your platform",
    defaultValue: '',
    name: 'platform',
    id: 'platform',
    shouldValidate: true,
    validation: register,
    onChange: handlePlatformChange,
    validationLogic: (data) => data.shouldValidate
      ? data.validation('platform', {
        required: `Platform is required`,
      })
      : {},
    errors: errors,
    options: [
      { value: "shopify", label: "SHOPIFY" },
      { value: "big_commerce", label: "BIG COMMERCE" },
    ],
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegisterField({
      ...registerField,
      [name]: value
    });
  }

  const nameValidationType = {
    required: "Name is required",
    maxLength: {
      value: 50,
      message: "Email should not exceed 50 characters"
    }
  }

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

  const domainValidationType = {
    required: "Domain is required",
    pattern: {
      value: /^[a-zA-Z0-9-]+\.myshopify\.com$/,
      message: "Invalid domain"
    },
    minLength: {
      value: 1,
      message: "Domain must be at least 1 characters"
    },
    maxLength: {
      value: 50,
      message: "Domain should not exceed 15 characters"
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
  const confirmPasswordValidationType = {
    required: "Please confirm your password",
    validate: value => value === password.current || "The passwords do not match"
  }

  const submitRegister = async () => {
    try {
      await FormSubmitHandler({
        method: "post",
        url: "register",
        data: registerField,
      });
      window.open(`https://apps.qeapps.com/ecom_apps_n/production/qqqe/?shop=${registerField.domain}`, '_blank');
      setRegisterField(defaultFields);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  return (
    <>
      <Breadcrumb pageName="Sign Up" breadcrumb={false} />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
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
                <img src={PhoneIcon} alt="Logo" />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up
              </h2>

              <form onSubmit={handleSubmit(submitRegister)}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      {...register('name', nameValidationType)}
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleInput}
                      value={registerField.name}
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.name && <span className="text-red-500 text-xs italic">{errors.name.message}</span>}
                    <span className="absolute right-4 top-4">
                      <UserSvg />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      {...register('email', emailValidationType)}
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleInput}
                      value={registerField.email}
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
                  <DropDown jsonData={dropdownData} />
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Enter Domain <span style={{ color: "red" }}>NOTE: YOU NEED TO ENTER FULL DOMAIN NAME</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register('domain', domainValidationType)}
                      type="text"
                      disabled={!isDomainEnabled}
                      id="domain"
                      name="domain"
                      onChange={handleInput}
                      value={registerField.domain}
                      placeholder="Enter your domain"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.domain && <span className="text-red-500 text-xs italic">{errors.domain.message}</span>}
                    <span className="absolute right-4 top-4">
                      <DomainSvg />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register('password', passwordValidationType)}
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleInput}
                      value={registerField.password}
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
                    Re-type Password
                  </label>
                  <div className="relative">
                    <input
                      {...register('confirm_password', confirmPasswordValidationType)}
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                      onChange={handleInput}
                      value={registerField.confirm_password}
                      placeholder="Re-enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.confirm_password && <span className="text-red-500 text-xs italic">{errors.confirm_password.message}</span>}
                    <span className="absolute right-4 top-4">
                      <LockSvg />
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Create account"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{" "}
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

export default SignUp;
