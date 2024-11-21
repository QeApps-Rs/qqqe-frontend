import { useState } from "react";
import Checkbox from "../components/higherOrderComponent/Checkboxes/Checkbox";
import changeLogImg from "../images/change-log-img.jpg";

const ChangeLog = () => {
  const stepsData = [
    {
      date: "November 19",
      title: "Increased limits for automatic app-based discounts",
      description:
        "You can now configure up to a total of 25 automatic discounts per shop using discount apps.",
      change_log_type: "Improvement",
    },
    {
      date: "November 18",
      title: "Validate shipping addresses in Admin",
      description:
        "The Companies, Customers, Draft Orders, and Shipping Labels pages now validate addresses to help merchants avoid delayed or failed deliveries.",
      change_log_type: "Feature",
    },
    {
      date: "November 15",
      title:
        "Shopify Tax now supports automated filing for U.S. sales tax returns",
      description:
        "We're excited to announce that Shopify Tax now offers automated filing for sales tax management. Merchants can streamline compliance, ensuring accuracy and flexibility for U.S. tax returns. 🚀",
      change_log_type: "New",
    },
    {
      date: "November 14",
      title: "Increased limits for automatic app-based discounts",
      description:
        "You can now configure up to a total of 25 automatic discounts per shop using discount apps.",
      change_log_type: "Improvement",
    },
    {
      date: "November 10",
      title: "Validate shipping addresses in Admin",
      description:
        "The Companies, Customers, Draft Orders, and Shipping Labels pages now validate addresses to help merchants avoid delayed or failed deliveries.",
      change_log_type: "Feature",
    },
    {
      date: "November 5",
      title:
        "Shopify Tax now supports automated filing for U.S. sales tax returns",
      description:
        "We're excited to announce that Shopify Tax now offers automated filing for sales tax management. Merchants can streamline compliance, ensuring accuracy and flexibility for U.S. tax returns. 🚀",
      change_log_type: "New",
    },
    {
      date: "November 4",
      title: "Increased limits for automatic app-based discounts",
      description:
        "You can now configure up to a total of 25 automatic discounts per shop using discount apps.",
      change_log_type: "Improvement",
    },
    {
      date: "November 3",
      title: "Validate shipping addresses in Admin",
      description:
        "The Companies, Customers, Draft Orders, and Shipping Labels pages now validate addresses to help merchants avoid delayed or failed deliveries.",
      change_log_type: "Feature",
    },
    {
      date: "November 1",
      title:
        "Shopify Tax now supports automated filing for U.S. sales tax returns",
      description:
        "We're excited to announce that Shopify Tax now offers automated filing for sales tax management. Merchants can streamline compliance, ensuring accuracy and flexibility for U.S. tax returns. 🚀",
      change_log_type: "New",
    },
    {
      date: "October 30",
      title: "Bug Fix Example",
      description: "We resolved a critical issue affecting performance.",
      change_log_type: "Bug Fix",
    },
    {
      date: "October 29",
      title: "UI Update Example",
      description: "The interface for the settings page has been revamped.",
      change_log_type: "UI Update",
    },
    {
      date: "November 19",
      title: "Increased limits for automatic app-based discounts",
      description:
        "You can now configure up to a total of 25 automatic discounts per shop using discount apps.",
      change_log_type: "Improvement",
    },
    {
      date: "November 18",
      title: "Validate shipping addresses in Admin",
      description:
        "The Companies, Customers, Draft Orders, and Shipping Labels pages now validate addresses to help merchants avoid delayed or failed deliveries.",
      change_log_type: "Feature",
    },
    {
      date: "November 15",
      title:
        "Shopify Tax now supports automated filing for U.S. sales tax returns",
      description:
        "We're excited to announce that Shopify Tax now offers automated filing for sales tax management. Merchants can streamline compliance, ensuring accuracy and flexibility for U.S. tax returns. 🚀",
      change_log_type: "New",
    },
    {
      date: "November 14",
      title: "Increased limits for automatic app-based discounts",
      description:
        "You can now configure up to a total of 25 automatic discounts per shop using discount apps.",
      change_log_type: "Improvement",
    },
    {
      date: "November 10",
      title: "Validate shipping addresses in Admin",
      description:
        "The Companies, Customers, Draft Orders, and Shipping Labels pages now validate addresses to help merchants avoid delayed or failed deliveries.",
      change_log_type: "Feature",
    },
    {
      date: "November 5",
      title:
        "Shopify Tax now supports automated filing for U.S. sales tax returns",
      description:
        "We're excited to announce that Shopify Tax now offers automated filing for sales tax management. Merchants can streamline compliance, ensuring accuracy and flexibility for U.S. tax returns. 🚀",
      change_log_type: "New",
    },
    {
      date: "November 4",
      title: "Increased limits for automatic app-based discounts",
      description:
        "You can now configure up to a total of 25 automatic discounts per shop using discount apps.",
      change_log_type: "Improvement",
    },
    {
      date: "November 3",
      title: "Validate shipping addresses in Admin",
      description:
        "The Companies, Customers, Draft Orders, and Shipping Labels pages now validate addresses to help merchants avoid delayed or failed deliveries.",
      change_log_type: "Feature",
    },
    {
      date: "November 1",
      title:
        "Shopify Tax now supports automated filing for U.S. sales tax returns",
      description:
        "We're excited to announce that Shopify Tax now offers automated filing for sales tax management. Merchants can streamline compliance, ensuring accuracy and flexibility for U.S. tax returns. 🚀",
      change_log_type: "New",
    },
    {
      date: "October 30",
      title: "Bug Fix Example",
      description: "We resolved a critical issue affecting performance.",
      change_log_type: "Bug Fix",
    },
    {
      date: "October 29",
      title: "UI Update Example",
      description: "The interface for the settings page has been revamped.",
      change_log_type: "UI Update",
    },
    // Add more dummy data if needed
  ];

  const [filterCheckBox, setFilterCheckBox] = useState([
    { id: 1, label: "Improvement", checked: false },
    { id: 2, label: "Feature", checked: false },
    { id: 3, label: "New", checked: false },
    { id: 4, label: "Bug Fix", checked: false },
    { id: 5, label: "UI Update", checked: false },
    { id: 6, label: "Performance", checked: false },
    { id: 7, label: "Other", checked: false },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleCheckboxChange = (id) => {
    setFilterCheckBox((prev) =>
      prev.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const handleClearFilter = () => {
    setFilterCheckBox((prev) =>
      prev.map((checkbox) => ({
        ...checkbox,
        checked: false,
      }))
    );
  };

  const filteredData = stepsData.filter((step) => {
    const activeFilters = filterCheckBox
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.label);

    return (
      activeFilters.length === 0 || activeFilters.includes(step.change_log_type)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="block ">
      <div className="w-full bg-change_log_bg_gradient flex justify-between items-center shadow-[0_0_11px_#ccc]">
        <div className="block sm:pl-10 sm:p-0 p-4">
          <span className="text-lg font-medium text-whiter">Changelog</span>
          <h1 className="text-3xl font-bold text-whiter">
            What’s New at QQQE?{" "}
          </h1>
        </div>
        <img src={changeLogImg} alt="" className="w-60 sm:block hidden" />
      </div>
      <div className="grid grid-cols-1  sm:grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mt-10 ">
        <div className="lg:col-span-9 md:col-span-8 sm:col-span-7 col-span-12 p-6 rounded-lg">
          {paginatedData.map((step, index) => (
            <div key={index} className="flex w-full mb-6">
              <div className="w-1/6 ">
                <span className="text-gray-600 text-md font-semibold uppercase break-words">
                  {step.date}
                </span>
              </div>
              <div className="relative flex flex-col items-center">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-custom_gradient shadow-md">
                  <div className="w-3 h-3 rounded-full border-2 border-white bg-white"></div>
                </div>
                {index !== paginatedData.length - 1 && (
                  <div className="absolute top-6 w-px h-full bg-cyan-950"></div>
                )}
              </div>
              <div className="w-3/4 pl-4">
                <h3 className="font-semibold text-lg inline-block">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-md mt-2">{step.description}</p>
                <span
                  className={`py-1 px-4 rounded-full font-bold text-sm text-white ${
                    step.change_log_type === "Improvement"
                      ? "bg-green-600 "
                      : step.change_log_type === "Feature"
                      ? "bg-yellow-700 "
                      : "bg-teal-600"
                  } mt-2 inline-block`}
                >
                  {step.change_log_type}
                </span>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-4 mb-20 ">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`py-1 px-3 mx-1 rounded font-semibold ${
                  currentPage === i + 1
                    ? "bg-custom_gradient text-white"
                    : "bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 md:col-span-4 sm:col-span-5 col-span-12 border-r-0 md:border-r-2 border-dashed border-white sm:block hidden">
          <div className="bg-[#212940e6] p-4 rounded-lg text-whiter">
            <h4 className="text-lg font-extrabold mb-4">Filter</h4>
            {filterCheckBox.map(({ id, label, checked }) => (
              <div
                className="flex items-center mb-4 transition-transform duration-200 hover:scale-105"
                key={id}
              >
                <Checkbox
                  id={`filter-${id}`}
                  label={label}
                  checked={checked}
                  onChange={() => handleCheckboxChange(id)}
                />
              </div>
            ))}
            <button
              type="button"
              className="py-2 px-4 font-medium bg-transparent border border-white hover:bg-white hover:text-black w-full text-gray-800 rounded"
              onClick={handleClearFilter}
            >
              Clear Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeLog;
