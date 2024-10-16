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
  const [keywords, setKeywords] = useState([]);
  const [filterKeyword, setFilterKeyword] = useState("");

  const getTemplateList = async () => {
    setLoading(true);
    await FormSubmitHandler({
      method: "get",
      url: `master/template/list?id=${id.split("s")[1]}`,
    })
      .then((res) => {
        if (res.data) {
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

  const getKeywordList = async () => {
    setLoading(true);
    await FormSubmitHandler({
      method: "get",
      url: `features`,
    })
      .then((res) => {
        if (res.data) {
          setKeywords(res.data);
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
    getKeywordList();
  }, []);

  const RenderTemplates = ({ templateListProp }) => {
    return templateListProp?.map((template) => {
      if (
        template &&
        template.subTemplates &&
        template.subTemplates.length > 0
      ) {
        return template.subTemplates
          ?.filter((subTemplate) =>
            subTemplate?.keywords?.includes(filterKeyword)
          )
          ?.map((subTemplate) => {
            if (subTemplate.is_active == "active") {
              return (
                <div
                  data-keywords={subTemplate.keywords}
                  className={`transition-transform transform hover:scale-105 hover:shadow-lg`}
                  key={subTemplate.id}
                >
                  <Link
                    to={`/master-form/${id}`}
                    state={{
                      subTemplateId: subTemplate.id,
                    }}
                  >
                    <div className="px-10 py-6 h-[400px] bg-[#e6e6e6e6] shadow-md shadow-black/28 rounded-lg">
                      <img
                        className="mb-3  w-full h-full object-contain"
                        src={subTemplate.image_path}
                        alt={subTemplate.description}
                      />
                    </div>
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
      <FilterBar keywords={keywords} setFilterKeyword={setFilterKeyword} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 my-10 w-full">
        <RenderTemplates templateListProp={templateList} />
        {templateList.length == 0 && (
          <div className="text-center text-black font-semibold">
            No Template Found
          </div>
        )}
      </div>
    </>
  );
};

export default TemplateList;
