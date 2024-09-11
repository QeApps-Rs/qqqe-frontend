/* eslint-disable react/prop-types */

const GraphCard = ({
  title,
  colSpanClass,
  children,
  isTitle = true,
  description = '' ,
}) => {
  return (
    <div
      className={`${colSpanClass} rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5`}
    >
      {isTitle && (
        <div className="bg-[#3292a9] p-5 rounded-md shadow-md">
          <p className="text-xl font-bold text-black mb-2">{title}</p>

          <p className="text-sm text-black">{description}</p>
        </div>
      )}

      {children}
    </div>
  );
};

const TabCard = ({ products }) => {
  console.log(["data", products]);

  const renderTable = (data) => (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
            Title
          </th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 &&
          data.map((item, key) => (
            <tr key={key}>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">{item.title}</p>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );

  const tabPanelClassName =
    "rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1";
  return (
    <div className={tabPanelClassName}>
      <div className="max-w-full overflow-x-auto">{renderTable(products)}</div>
    </div>
  );
};

export { GraphCard, TabCard };
