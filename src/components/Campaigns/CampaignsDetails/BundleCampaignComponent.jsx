/* eslint-disable react/prop-types */
const BundleCampaignComponent = ({ productDetailsData }) => {
  const bundleItems = productDetailsData?.json_response?.items;
  const collectionTitles = bundleItems?.selected_collections
    .map((collection) => collection.title.trim())
    .join(", ");
  const targetedCollectionTitles = bundleItems?.targeted_collections
    .map((collection) => collection.title.trim())
    .join(", ");

  const deviceVisitorLocationHtml = (
    title,
    description,
    moreProduct,
    isLast = false
  ) => {
    return (
      <div className="flex items-center border-b-[1.5px] border-customGray mb-4 pb-3 relative">
        <div className="block">
          <h3 className="text-lg font-bold text-black">{title}</h3>
          {description === "" && (
            <span className="text-customGray">Not Found</span>
          )}
          <span className="text-customGray">{description}</span>
        </div>
        {moreProduct && (
          <span className="bg-blue-400 p-1 uppercase rounded-sm text-sm text-white font-bold absolute left-[-60px] top-[50px]">
            {moreProduct}
          </span>
        )}
        {isLast && (
          <div className="absolute left-[-25px] top-[50px] w-8 h-1 bg-customGray rounded-full transform -translate-x-1/2"></div>
        )}
      </div>
    );
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-8">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl text-customGray uppercase	">
          Who should see the popup
        </h2>
      </div>
      <div className="flex ">
        <div className="border-l-[1.5px] border-customGray pl-10 mt-3  w-full">
          {deviceVisitorLocationHtml(
            "No of Products",
            bundleItems?.selected_products?.length,
            "and"
          )}
          <div className="flex items-center border-b-[1.5px] border-customGray mb-4 pb-3 relative">
            <div className="block">
              <h3 className="text-lg font-bold text-black">Select Product</h3>
              {bundleItems?.selected_products?.length === 0 ? (
                <span className="text-customGray">Not found</span>
              ) : (
                <ul className="list-decimal pl-5">
                  {bundleItems?.selected_products.map((product, i) => (
                    <li key={i}>
                      <span className="text-customGray">{product.title}</span>
                      <strong className="text-black font-bold text-md">
                        {product.price}
                      </strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <span className="bg-blue-400 p-1 uppercase rounded-sm text-sm text-white font-bold absolute left-[-60px] top-[50px]">
              And
            </span>
          </div>
          {deviceVisitorLocationHtml(
            "Select Collection",
            collectionTitles,
            "and"
          )}
          <div className="flex items-center border-b-[1.5px] border-customGray mb-4 pb-3 relative">
            <div className="block">
              <h3 className="text-lg font-bold text-black">
                Targeted select Product
              </h3>
              {bundleItems?.targeted_products?.length === 0 ? (
                <span className="text-customGray">Not found</span>
              ) : (
                <ul className="list-decimal pl-5">
                  {bundleItems?.targeted_products.map((product, i) => (
                    <li key={i}>
                      <span className="text-customGray">{product.title}</span>
                      <strong className="text-black font-bold text-md">
                        {product.price}
                      </strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <span className="bg-blue-400 p-1 uppercase rounded-sm text-sm text-white font-bold absolute left-[-60px] top-[50px]">
              And
            </span>
          </div>
          {deviceVisitorLocationHtml(
            "Targeted select collection",
            targetedCollectionTitles,
            "and"
          )}
          {deviceVisitorLocationHtml(
            "Discount For",
            bundleItems?.discount_details.discount_for,
            "and"
          )}
          {deviceVisitorLocationHtml(
            "Discount Type",
            bundleItems?.discount_details.discount_type,
            "and"
          )}
          {deviceVisitorLocationHtml(
            "Discount Amount",
            bundleItems?.discount_details.discount_amount,
            "",
            true
          )}
        </div>
      </div>
    </div>
  );
};

export default BundleCampaignComponent;
