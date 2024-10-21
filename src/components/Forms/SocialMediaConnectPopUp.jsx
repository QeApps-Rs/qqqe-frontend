import { Link } from "react-router-dom";

const SocialMediaConnectPopUp = ({
  socialMediaIcon,
  socialMediaTitle,
  socialMediaDesc,
  socialMediaBtnText,
  socialMediaBtnLink,
}) => {
  return (
    <div className="relative bg-white rounded-lg p-8 w-1/3 shadow-lg">
      <button className="absolute top-4 right-4 text-gray-600 text-lg font-semibold">
        &times;
      </button>

      <div className="flex justify-center mb-4">
        {/* <img
          src={socialMediaIconSrc || ""}
          alt="Facebook Icon"
          className="w-8 h-8"
        /> */}
        <i className={`fa ${socialMediaIcon} text-2xl`} aria-hidden="true"></i>

      </div>

      <h2 className="text-center text-gray-900 text-xl font-bold mb-2">
        {socialMediaTitle || ""}
      </h2>

      <p className="text-center text-gray-600 mb-6">{socialMediaDesc || ""}</p>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="First Name"
          className="w-full p-3 border rounded-lg"
        />
        <Link to={socialMediaBtnLink || ""} >
          <button className="w-full bg-purple-800 text-white p-3 mt-3 rounded-lg font-semibold">
            {socialMediaBtnText || ""}
          </button>
        </Link>
      </form>
    </div>
  );
};
export default SocialMediaConnectPopUp;
