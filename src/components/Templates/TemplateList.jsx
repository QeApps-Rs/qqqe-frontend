import React, { useEffect, useState } from "react";
import FilterBar from "./Filters";
import { Link, useParams } from "react-router-dom";
import { BackIcon } from "../custIcon/svgIcon";
import { useNavigate } from "react-router-dom";
import FormSubmitHandler from "../FormSubmitHandler";

const TemplateList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [templateList, setTemplateList] = useState([]);

  const getTemplateList = async () => {
    const response = await FormSubmitHandler({
      method: "get",
      url: `master/template/list`,
    });
    if (response.data) {
      setTemplateList(response.data);
    }
  };

  useEffect(() => {
    getTemplateList();
  }, []);

  const RenderTemplates = ({ templateListProp }) => {
    return templateListProp.map((template) => {
      if (
        template &&
        template.subTemplates &&
        template.subTemplates.length > 0
      ) {
        return template.subTemplates.map((subTemplate) => {
          if (subTemplate.is_active == "active") {
            return (
              <div className={subTemplate.keywords} key={subTemplate.id}>
                <Link
                  to={`/master-form/${id}`}
                  state={{
                    keywords: subTemplate.keywords,
                    subTemplateId: subTemplate.id,
                  }}
                >
                  <img
                    className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                    src={subTemplate.image_path}
                    alt={subTemplate.description}
                  />
                </Link>
              </div>
            );
          }
          return null;
        });
      }
      return null;
    });
  };

  return (
    <>
      <div className="flex mt-5  justify-between space-y-1 p-0">
        <h2 className="text-lg text-title-md2  font-medium text-gray-900 leading-relaxed">
          Take Action Now
        </h2>
        <span
          onClick={() => navigate(-1)}
          className="flex items-center gap-x-1 cursor-pointer bg-white border border-gray-300 px-1.5 text-[15px] rounded-md"
        >
          <BackIcon />
          Back
        </span>
      </div>
      <span className="p-2 text-sm text-black mb-3">
        Apply solutions to improve your store and derive results
      </span>
      <FilterBar />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4 w-full">
        <RenderTemplates templateListProp={templateList} />
      </div>
    </>
  );
};

export default TemplateList;
