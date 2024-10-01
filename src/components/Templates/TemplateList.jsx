import { useEffect, useState } from "react";
import FilterBar from "./Filters";
import { Link, useParams } from "react-router-dom";
import { BackIcon } from "../custIcon/svgIcon";
import { useNavigate } from "react-router-dom";
import FormSubmitHandler from "../FormSubmitHandler";
import toast from "react-hot-toast";
import Loader from "../../common/Loader";

const TemplateList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [templateList, setTemplateList] = useState([]);

  const getTemplateList = async () => {
    setLoading(true);
    await FormSubmitHandler({
      method: "get",
      url: `master/template/list?id=${id.split("s")[1]}`,
    })
      .then((res) => {
        if (res.data) {
          console.log(['data', res.data]);
          
          setTemplateList(res.data);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
      {loading && <Loader />}
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
        {
          templateList.length == 0 && <div className="text-center text-black font-semibold">
            No Template Found
          </div>
        }
      </div>
    </>
  );
};

export default TemplateList;
