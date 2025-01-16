/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import FilterBar from "./Filters";
import { Link, useLocation, useParams } from "react-router-dom";
import { BackIcon } from "../custIcon/svgIcon";
import { useNavigate } from "react-router-dom";
import FormSubmitHandler from "../FormSubmitHandler";
import toast from "react-hot-toast";
import Loader from "../../common/Loader";
import Checkbox from "../higherOrderComponent/Checkboxes/Checkbox";
import emailTemplateImg1 from "../../images/email-template-1.png";
import emailTemplateImg2 from "../../images/email-template-2.jpg";
const TemplateList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get("category");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [templateList, setTemplateList] = useState([]);
  const [templateListCopy, setTemplateListCopy] = useState([]);
  const [tags, setTags] = useState([]);
  const [goals, setGoals] = useState([]);
  const emailTemplateList = [
    { id: 1, name: "Template 1", imageUrl: emailTemplateImg1 },
    { id: 2, name: "Template 2", imageUrl: emailTemplateImg2 },
  ];
  const [keywords, setKeywords] = useState([]);
  const [filterKeyword, setFilterKeyword] = useState("");

  const [templateFilterCheckBox, setTemplateFilterCheckBox] = useState({
    tags: {},
    showMoreTags: false,
    goals: {},
    showMoreGoal: false,
  });
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const getTemplateList = async () => {
    setLoading(true);
    await FormSubmitHandler({
      method: "get",
      url: `master/template/list?id=${id.split("s")[1]}`,
    })
      .then((res) => {
        if (res.data) {
          let tagItems = [];
          let goalItems = [];
          setTemplateList(res.data);
          setTemplateListCopy(res.data);
          res.data.map((item) => {
            if (item?.subTemplates?.length > 0) {
              item?.subTemplates?.map((subTemplate) => {
                if (subTemplate.is_active == "active") {
                  if (subTemplate?.tags) {
                    tagItems = [...tagItems, ...subTemplate?.tags?.split(",")];
                  }
                  if (subTemplate?.goals) {
                    goalItems = [
                      ...goalItems,
                      ...subTemplate?.goals?.split(","),
                    ];
                  }
                }
              });
            }
          });
          setTags(tagItems);
          setGoals(goalItems);
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
                    to={`/master-form/${id}?category=${categoryParam}`}
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

  const handleCheckboxChange = (type, label, isChecked) => {
    setTemplateFilterCheckBox((prev) => {
      const updatedType = { ...prev[type] };
      if (isChecked) {
        updatedType[label] = isChecked;
        if (type == "goals") {
          setSelectedGoals([...selectedGoals, label]);
        } else if (type == "tags") {
          setSelectedTags([...selectedTags, label]);
        }
      } else {
        delete updatedType[label];
        if (type == "goals") {
          setSelectedGoals(selectedGoals.filter((goal) => goal !== label));
        } else if (type == "tags") {
          setSelectedTags(selectedTags.filter((tag) => tag !== label));
        }
      }

      return {
        ...prev,
        [type]: updatedType,
      };
    });
  };

  const formatTag = (tag) => tag.toLowerCase().replace(/ /g, "_");

  const toggleShowMore = (key) => {
    setTemplateFilterCheckBox((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    setTemplateFilterData();
  }, [templateFilterCheckBox.tags, templateFilterCheckBox.goals]);

  // const setTemplateFilterData = () => {
  //   const hasTagsFilter = Object.keys(templateFilterCheckBox?.tags).length > 0;
  //   const hasGoalsFilter =
  //     Object.keys(templateFilterCheckBox?.goals).length > 0;
  //   console.log(["chekcing", hasTagsFilter, hasGoalsFilter]);
  //   if (Object.keys(templateFilterCheckBox.tags).length > 0) {
  //     const res = templateListCopy.filter((template) => {
  //       return template?.subTemplates?.some((subTemplate) => {
  //         return subTemplate?.tags?.split(",").some((tag) => {
  //           return templateFilterCheckBox.tags[formatTag(tag)];
  //         });
  //       });
  //     });
  //     setTemplateList(res);
  //   } else {
  //     setTemplateList(templateListCopy);
  //   }
  // };

  const setTemplateFilterData = () => {
    const hasTagsFilter = Object.keys(templateFilterCheckBox?.tags).length > 0;
    const hasGoalsFilter =
      Object.keys(templateFilterCheckBox?.goals).length > 0;

    const res = templateListCopy.filter((template) => {
      return template?.subTemplates?.some((subTemplate) => {
        const tagMatch = hasTagsFilter
          ? subTemplate?.tags
              ?.split(",")
              .some((tag) => templateFilterCheckBox.tags[formatTag(tag)])
          : true; // If no tag filter, match all

        const goalMatch = hasGoalsFilter
          ? subTemplate?.goals
              ?.split(",")
              .some((goal) => templateFilterCheckBox.goals[formatTag(goal)])
          : true; // If no goal filter, match all

        return tagMatch && goalMatch; // Both filters must pass
      });
    });

    setTemplateList(res.length > 0 ? res : templateListCopy); // Set filtered or full list
  };

  const RenderCheckboxes = ({ items, type, showMoreKey }) => (
    <>
      {items
        .slice(0, templateFilterCheckBox[showMoreKey] ? items.length : 7)
        .map((label, index) => (
          <div className="mt-2 pb-2" key={index}>
            <Checkbox
              label={label}
              checked={!!templateFilterCheckBox[type][formatTag(label)]}
              onChange={(e) => {
                handleCheckboxChange(type, formatTag(label), e.target.checked);
              }}
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
          className="flex items-center gap-x-1 cursor-pointer bg-white border border-gray-300 px-1.5 text-[15px] rounded-md hover:bg-black hover:text-white transition-colors duration-300"
        >
          <BackIcon />
          Back
        </span>
      </div>
      <span className="p-2 text-sm text-black mb-3">
        Apply solutions to improve your store and derive results
      </span>
      <FilterBar
        selectedGoals={selectedGoals}
        setSelectedGoals={setSelectedGoals}
        goals={goals}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        tags={tags}
        formatTag={formatTag}
        handleCheckboxChange={handleCheckboxChange}
        keywords={keywords}
        setFilterKeyword={setFilterKeyword}
      />
      <div className="flex">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 my-10 w-full">
          {/* Left side content occupying 2/3 of the space */}
          <div className="md:col-span-1 bg-white p-6 rounded-lg sticky top-0 h-[calc(100vh-2.5rem)] overflow-y-auto">
            {" "}
            <h2 className="text-lg font-bold text-graydark my-4">Tags</h2>
            <RenderCheckboxes
              items={tags}
              type="tags"
              showMoreKey="showMoreTags"
            />
            <h2 className="text-lg font-bold text-graydark my-4">Goal</h2>
            <RenderCheckboxes
              items={goals}
              type="goals"
              showMoreKey="showMoreGoal"
            />
          </div>{" "}
          <div className="md:col-span-4 w-full ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              <RenderTemplates templateListProp={templateList} />
              {templateList.length == 0 && categoryParam != "promotion" && (
                <div className="text-center text-black font-semibold">
                  No Template Found
                </div>
              )}
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-bold text-graydark mb-6">
                Edit email template
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              {emailTemplateList.length > 0 ? (
                emailTemplateList.map((template, index) => (
                  <div
                    key={index}
                    className="transition-transform transform hover:scale-105 hover:shadow-lg md:col-span-1"
                  >
                    <Link
                      to={`email-template/${template.id}?category=${categoryParam}`}
                    >
                      <div className="px-10 py-6 h-[350px] bg-[url('/src/images/template-background.svg')] bg-no-repeat bg-cover shadow-md shadow-black/28 rounded-lg">
                        <img
                          src={template.imageUrl} // Dynamically assign the image URL
                          alt={`Template ${template.id}`}
                          className="mb-3 w-full h-full object-contain"
                        />
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
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
