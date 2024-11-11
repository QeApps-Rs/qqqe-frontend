/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailTemplateEditorCollapseOptions } from "../../pages/forms/masterFormConfig";
import Loader from "../../common/Loader";
import { BackIcon } from "../custIcon/svgIcon";
import TemplateHeader from "../Forms/TemplateHeader";
import EmailTemplateDefault from "./EmailTemplateDefault";
import EmailTemplateControllerComponent from "./EmailTemplateControllerComponent";

const EmailTemplateEditorComponent = () => {
  //  shiv code start
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [templateHeaderState, setTemplateHeaderState] = useState({
    teaser: true,
    success: false,
    publish: true,
    desktop: true,
    mobile: true,
  });

  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isView, setView] = useState("Desktop");
  const [navButtons, setNavButtons] = useState([
    {
      navName: "Shop",
      navUrl: "#",
    },
    {
      navName: "Sale",
      navUrl: "#",
    },
    {
      navName: "New",
      navUrl: "#",
    },
  ]);
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      {loading && <Loader />}
      <aside className="w-1/4  fixed left-[4.7rem] px-6 pt-6 pb-20 shadow-2xl h-full overflow-auto top-0 bg-white">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <p className="font-semibold text-lg">Email Template Editor</p>
        </div>
        <ul className="space-y-4">
          {emailTemplateEditorCollapseOptions.map((item, index) => (
            <li
              key={index}
              className="rounded-lg bg-custom_gradient"
            >
              <h3
                className="p-4 flex justify-between items-center cursor-pointer font-semibold text-lg"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-white"> {item.title} </span>
                <span className="text-sm font-normal">{item.subtitle}</span>
                <svg
                  className={`fill-white ${
                    item.tag === "block" ? "hidden" : ""
                  } stroke-white duration-200 ease-in-out  w-6 h-6 transform ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 18 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.28882 8.43257L8.28874 8.43265L8.29692 8.43985C8.62771 8.73124 9.02659 8.86001 9.41667 8.86001C9.83287 8.86001 10.2257 8.69083 10.5364 8.41713L10.5365 8.41721L10.5438 8.41052L16.765 2.70784L16.771 2.70231L16.7769 2.69659C17.1001 2.38028 17.2005 1.80579 16.8001 1.41393C16.4822 1.1028 15.9186 1.00854 15.5268 1.38489L9.41667 7.00806L3.3019 1.38063L3.29346 1.37286L3.28467 1.36548C2.93287 1.07036 2.38665 1.06804 2.03324 1.41393L2.0195 1.42738L2.00683 1.44184C1.69882 1.79355 1.69773 2.34549 2.05646 2.69659L2.06195 2.70196L2.0676 2.70717L8.28882 8.43257Z" />
                </svg>
              </h3>

              {activeIndex === index && item.tag === "header_style_controller" && (
                <EmailTemplateControllerComponent
                  navButtons={navButtons}
                  setNavButtons={setNavButtons}
                />
              )}
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex justify-end mb-4">
        <span
          onClick={() => navigate(-1)}
          className="flex items-center gap-x-1 cursor-pointer bg-white border border-gray-300 pt-1.5 pb-1.5 pl-2.5 pr-2.5 text-[15px] rounded-md mr-4 hover:bg-black hover:text-white transition-colors duration-300"
        >
          <BackIcon /> Back
        </span>
        <span
          onClick={() => navigate(-3)}
          className="flex items-center gap-x-1 cursor-pointer bg-black border border-gray-300 pt-1.5 pb-1.5 px-3 text-[15px] rounded-md text-white"
        >
          Discard
        </span>
      </div>

      <div className="w-3/4 float-right p-0">
        <TemplateHeader
          isView={isView}
          setView={setView}
          success={success}
          setSuccess={setSuccess}
          templateHeaderState={templateHeaderState}
        />
        <EmailTemplateDefault navButtons={navButtons} />
      </div>

      <div className="clear-both"></div>
      <style jsx="true">{`
        input::placeholder {
          color: var(--placeholder-color); /* Dynamic placeholder color */
        }
      `}</style>
    </>
  );
};

export default EmailTemplateEditorComponent;
