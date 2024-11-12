import { CameraIcon } from "../custIcon/svgIcon";

/* eslint-disable react/prop-types */
const EmailTemplateCartControllerComponent = ({
  emailTemplateJSON,
  handleEmailTemplateChange,
  setEmailTemplateJSON,
}) => {
  const inputControllerFieldClass =
    "p-3 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark";

  return (
    <div className="p-4 border-t">
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div className="w-full flex flex-col gap-9">
              <form action="#" onSubmit={(e) => e.preventDefault()}>
                <div className={inputControllerFieldClass}>
                  <div className="mb-6">
                    <label className="block text-black dark:text-white font-semibold">
                      Logo Upload
                    </label>

                    <label
                      htmlFor="cover"
                      className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-500 py-3 px-2 text-sm font-medium text-white hover:bg-blue-600 xsm:px-4"
                    >
                      <input
                        type="file"
                        name="cover"
                        id="cover"
                        className="sr-only"
                        onChange={(e) => {
                          
                          const file = e.target.files[0];
                          
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setEmailTemplateJSON((prev) => ({
                                ...prev,
                                cart_banner_style: {
                                  ...prev.cart_banner_style,
                                  imageIcon: reader.result,
                                },
                              }));
                            };
                            reader.readAsDataURL(file);
                            
                          }
                        }}
                      />
                      <span>
                        <CameraIcon />
                      </span>
                      <span>Upload</span>
                    </label>
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white font-semibold">
                      Heading
                    </label>
                    <input
                      type="text"
                      value={emailTemplateJSON?.cart_banner_style?.heading}
                      onChange={(e) =>
                        handleEmailTemplateChange(
                          { heading: e.target.value },
                          "cart_banner_style"
                        )
                      }
                      name="fieldName"
                      placeholder="Please enter heading"
                      className="w-full p-2 border rounded-md focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2.5 block text-black dark:text-white font-semibold">
                      Sub-Heading
                    </label>
                    <input
                      type="text"
                      value={emailTemplateJSON?.cart_banner_style?.sub_heading}
                      onChange={(e) =>
                        handleEmailTemplateChange(
                          { sub_heading: e.target.value },
                          "cart_banner_style"
                        )
                      }
                      name="fieldName"
                      placeholder="Please enter sub-heading"
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

export default EmailTemplateCartControllerComponent;
