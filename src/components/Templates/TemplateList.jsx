import { useEffect, useState } from "react";
import FilterBar from "./Filters";
import { Link, useParams } from "react-router-dom";
import { BackIcon } from "../custIcon/svgIcon";
import { useNavigate } from "react-router-dom";
import FormSubmitHandler from "../FormSubmitHandler";
import toast from "react-hot-toast";
import Loader from "../../common/Loader";
import Checkbox from "../higherOrderComponent/Checkboxes/Checkbox";

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
                  className={`transition-transform transform hover:scale-105 hover:shadow-lg md:col-span-1`}
                  key={subTemplate.id}
                >
                  <Link
                    to={`/master-form/${id}`}
                    state={{
                      subTemplateId: subTemplate.id,
                    }}
                  >
                    <div className="px-10 py-6 h-[350px] bg-[url('/src/images/template-background.svg')] bg-no-repeat bg-cover shadow-md shadow-black/28 rounded-lg">
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
  const [templateFilterCheckBox, setTemplateFilterCheckBox] = useState({
    checkedGoals: {},
    checkedMessageTypes: {},
    showMoreGoal: false,
    showMoreMessageType: false,
  });

  const goalCheckboxes = [
    "Collect email addresses",
    "Collect feedback",
    "Collect phone numbers",
    "Increase social engagement",
    "Gamify your messages",
    "Increase cart value",
    "Make announcement",
    "Promote special offers",
    "Guide your visitors",
    "Recommend products",
    "Stop cart abandonment",
  ];
  const messageTypeCheckboxes = [
    "Embedded",
    "Fullscreen",
    "Sticky bar",
    "Popup",
    "Sidemessage",
    "Gamification",
    "Survey",
  ];

  const handleCheckboxChange = (type, label, isChecked) => {
    setTemplateFilterCheckBox((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [label]: isChecked,
      },
    }));
  };

  const toggleShowMore = (key) => {
    setTemplateFilterCheckBox((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const RenderCheckboxes = ({ items, type, showMoreKey }) => (
    <>
      {items
        .slice(0, templateFilterCheckBox[showMoreKey] ? items.length : 7)
        .map((label, index) => (
          <div className="mt-2 pb-2" key={index}>
            <Checkbox
              label={label}
              checked={!!templateFilterCheckBox[type][label]}
              onChange={(e) =>
                handleCheckboxChange(type, label, e.target.checked)
              }
            />
          </div>
        ))}
      {items.length > 7 && (
        <button
          className="text-blue-500 font-bold mt-2"
          onClick={() => toggleShowMore(showMoreKey)}
        >
          <i
            className={`fa ${
              templateFilterCheckBox[showMoreKey]
                ? "fa-chevron-up"
                : "fa-chevron-down"
            } mr-2`}
          />
          {templateFilterCheckBox[showMoreKey] ? "Show less" : "Show more"}
        </button>
      )}
    </>
  );

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
      <div className="flex">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 my-10 w-full">
          {/* Left side content occupying 2/3 of the space */}
          <div className="md:col-span-1 bg-white p-6 rounded-lg sticky top-0 h-[calc(100vh-2.5rem)] overflow-y-auto">
            {" "}
            <h2 className="text-lg font-bold text-graydark my-4">Goal</h2>
            <RenderCheckboxes
              items={goalCheckboxes}
              type="checkedGoals"
              showMoreKey="showMoreGoal"
            />
            <h2 className="text-lg font-bold text-graydark my-4">
              Message type
            </h2>
            <RenderCheckboxes
              items={messageTypeCheckboxes}
              type="checkedMessageTypes"
              showMoreKey="showMoreMessageType"
            />
          </div>{" "}
          <div className="md:col-span-4 w-full ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              <RenderTemplates templateListProp={templateList} />
              {templateList.length == 0 && (
                <div className="text-center text-black font-semibold">
                  No Template Found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateList;
