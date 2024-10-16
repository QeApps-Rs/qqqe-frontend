const TemplateHeader = ({
  isView,
  success,
  setSuccess,
  templateHeaderState,
  onPublish
}) => {
  return (
    <div className="flex mb-4 justify-between p-4 pl-10 pr-10 border-l border-[#eaedef] items-center flex-wrap w-full bg-white shadow-[6px_0px_7px_#ccc]">
      <div className="w-[70%] flex justify-center">
        {templateHeaderState?.teaser && (
          <div
            className={`border border-[#323359] ${
              !success ? "bg-[#d0d5d9]" : "bg-white"
            }  inline-block p-2 px-3 mr-5 text-black text-sm font-semibold rounded relative cursor-pointer`}
            onClick={() => setSuccess(false)}
          >
            Teaser
          </div>
        )}
        {templateHeaderState?.success && (
          <div
            className={`border border-[#323359] ${
              success ? "bg-[#d0d5d9]" : "bg-white"
            } inline-block p-2 px-3 mr-5 text-black text-sm font-semibold rounded relative cursor-pointer`}
            onClick={() => setSuccess(true)}
          >
            Success
          </div>
        )}
      </div>

      <div className="flex">
        {templateHeaderState?.publish && (
          <button
            type="submit"
            onClick={() => onPublish()}
            className="inline-block p-2 px-3 mr-5 text-white text-sm font-semibold rounded relative bg-black"
          >
            Publish
          </button>
        )}
        {templateHeaderState?.desktop && (
          <a
            className={`rounded-l-md  ${
              isView === "Desktop" ? "bg-[#d0d5d9]" : ""
            }  p-1.5 px-2.5 text-base border border-[#ccc] -ml-px text-black leading-[22px]`}
            href="#"
            onClick={() => setView("Desktop")}
          >
            <i className="fa fa-desktop" aria-hidden="true"></i>
          </a>
        )}
        {templateHeaderState?.mobile && (
          <a
            className={`rounded-r-md text-lg border border-[#ccc] -ml-px text-black leading-[22px]  ${
              isView === "Mobile" ? "bg-[#eaedef]" : ""
            } p-1.5 px-2.5`}
            href="#"
            onClick={() => setView("Mobile")}
          >
            <i className="fa fa-mobile" aria-hidden="true"></i>
          </a>
        )}
      </div>
    </div>
  );
};
export default TemplateHeader;
