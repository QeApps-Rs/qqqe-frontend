/* eslint-disable react/prop-types */
const FooterControllerComponent = ({
  emailTemplateJSON,
  handleFooterIconChange,
  handleEmailTemplateChange,
}) => {
  const inputControllerFieldClass =
    "p-3 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark";
  const socialMediaPlatforms = [
    { label: "Facebook", icon: "facebook", key: "facebook" },
    { label: "Twitter", icon: "twitter", key: "twitter" },
    { label: "Instagram", icon: "instagram", key: "insta" },
    { label: "YouTube", icon: "youtube-play", key: "youtube" },
  ];
  return (
    <div className="p-4 border-t">
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div className="w-full flex flex-col gap-9">
              <form action="#" onSubmit={(e) => e.preventDefault()}>
                <div className={inputControllerFieldClass}>
                  {socialMediaPlatforms.map(({ label, key }) => (
                    <div key={key} className="mb-6">
                      <label className="mb-2.5 block text-black dark:text-white font-semibold">
                        {label} URL
                      </label>
                      <input
                        type="text"
                        value={
                          emailTemplateJSON.footer_banner_style
                            .social_media_icon[key]
                        }
                        onChange={(e) =>
                          handleFooterIconChange(
                            { [key]: e.target.value },
                            "social_media_icon"
                          )
                        }
                        placeholder={`Please enter ${label} URL`}
                        className="w-full p-2 border rounded-md focus:outline-none"
                      />
                    </div>
                  ))}
                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white font-semibold">
                      Email
                    </label>
                    <input
                      type="text"
                      value={emailTemplateJSON?.footer_banner_style?.email}
                      onChange={(e) =>
                        handleEmailTemplateChange(
                          { email: e.target.value },
                          "footer_banner_style"
                        )
                      }
                      name="email"
                      placeholder="Please enter email"
                      className="w-full p-2 border rounded-md focus:outline-none"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white font-semibold">
                      Address
                    </label>
                    <textarea
                      type="text"
                      value={emailTemplateJSON?.footer_banner_style?.address}
                      onChange={(e) =>
                        handleEmailTemplateChange(
                          { address: e.target.value },
                          "footer_banner_style"
                        )
                      }
                      name="address"
                      placeholder="Please enter your address"
                      className="w-full p-2 border rounded-md focus:outline-none"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white font-semibold">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={
                        emailTemplateJSON?.footer_banner_style?.company_name
                      }
                      onChange={(e) =>
                        handleEmailTemplateChange(
                          { company_name: e.target.value },
                          "footer_banner_style"
                        )
                      }
                      name="companyname"
                      placeholder="Please enter your company name"
                      className="w-full p-2 border rounded-md focus:outline-none"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterControllerComponent;
