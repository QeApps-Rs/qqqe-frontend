import React, { useState } from "react";
import SwitcherThree from "../Switchers/SwitcherThree";
import Checkbox from "../higherOrderComponent/Checkboxes/Checkbox";
import {
  discountForDropdown,
  discountTypeDropdown,
} from "../../pages/forms/masterFormConfig";
import DropDown from "../higherOrderComponent/Dropdown/Dropdown";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import toast from "react-hot-toast";
const ProductBundleTab = ({
  productListState,
  productList,
  collectionListState,
  collectionList,
  setSelectedProducts,
  selectedProducts,
  setProductListForPopUp,
  noOfProducts,
  setNoOfProducts,
  productListForPopUp,
  collectionListForPopUp,
  setCollectionListForPopUp,
  setProductDiscountForDetails,
  productDiscountForDetails,
  setProductDiscountTypeDetails,
  productDiscountTypeDetails,
  setProductDiscountAmountDetails,
  productDiscountAmountDetails,
  switchStates,
  setSwitchStates,
  targetedProducts,
  setTargetedProducts,
  targetedCollections,
  setTargetedCollections,
}) => {
  const [selectedCollections, setSelectedCollections] = useState({});
  // const [targetedProducts, setTargetedProducts] = useState([]);
  // const [targetedCollections, setTargetedCollections] = useState([]);

  const handleToggle = (key) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };
  const onNoOfProductsSelect = (e) => {
    setNoOfProducts(e.target.value);
  };

  const handleProductCheckboxChange = (
    id,
    variantHandle = "",
    title = "",
    image = "",
    price = 0
  ) => {
    setSelectedProducts((prevCheckedItems) => {
      const isChecked = !prevCheckedItems[id];
      if (isChecked && productListForPopUp.length >= noOfProducts) {
        toast.error("You can only add " + noOfProducts + " products");
        return prevCheckedItems;
      }
      setProductListForPopUp((prevItems) => {
        const itemExists = prevItems.some((item) => item.id === id);
        return itemExists
          ? prevItems.filter((item) => item.id !== id)
          : [
              ...prevItems,
              {
                id,
                title,
                image,
                price,
                variantHandle,
              },
            ];
      });
      return {
        ...prevCheckedItems,
        [id]: isChecked,
      };
    });
  };

  const handleTargetedProductCheckboxChange = (id) => {
    setTargetedProducts((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };

  const handleCollectionCheckboxChange = (id, title = "", handle = "") => {
    setSelectedCollections((prevCheckedItems) => {
      const isChecked = !prevCheckedItems[id];
      setCollectionListForPopUp((prevItems) => {
        const itemExists = prevItems.some((item) => item.id === id);
        return itemExists
          ? prevItems.filter((item) => item.id !== id)
          : [...prevItems, { id, title, handle }];
      });
      return {
        ...prevCheckedItems,
        [id]: isChecked,
      };
    });
  };

  const handleTargetedCollectionCheckboxChange = (id) => {
    setTargetedCollections((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };
  const ProductListComponent = ({
    productList,
    selectedProducts,
    handleProductCheckboxChange,
  }) => {
    return (
      <>
        {productList && productList.length > 0 ? (
          productList.map((product) =>
            product.variants && product.variants.length > 0
              ? product.variants.map((item) => {
                  let variantId = item.id;
                  let variantPrice = item.price;
                  let imageId = item.image_id;
                  const image = product.images.find(
                    (img) => img.id === imageId
                  );

                  const imageSrc = image ? image.src : product?.image?.src;

                  let variantTitle =
                    item.title !== "Default Title"
                      ? `${product.title} - ${item.title}`
                      : `${product.title}                       `;

                  let variantHandle = product?.handle;

                  return (
                    <div
                      key={variantId}
                      className="product-item flex items-center space-x-2"
                    >
                      <Checkbox
                        id={variantId}
                        label={variantTitle}
                        checked={selectedProducts[variantId] || false}
                        onChange={() =>
                          handleProductCheckboxChange(
                            variantId,
                            variantHandle,
                            variantTitle,
                            imageSrc,
                            variantPrice
                          )
                        }
                      />
                      <span className="text-gray-500">{variantPrice}</span>
                    </div>
                  );
                })
              : null
          )
        ) : (
          <span>No products found</span>
        )}
      </>
    );
  };

  const TargetedProductListComponent = ({
    productList,
    targetedProducts,
    handleTargetedProductCheckboxChange,
  }) => {
    return (
      <>
        {productList && productList && productList.length > 0 ? (
          productList.map(
            (product) =>
              product.variants && product.variants.length > 0
                ? product.variants.map((item, index) => (
                    <div
                      key={index}
                      className="product-item flex items-center space-x-2"
                    >
                      <Checkbox
                        id={index}
                        label={
                          item.title !== "Default Title"
                            ? product.title + " - " + item.title
                            : product.title
                        }
                        checked={targetedProducts[item.id] || false}
                        onChange={() =>
                          handleTargetedProductCheckboxChange(item.id)
                        }
                      />
                      <span className="text-gray-500">{item.price}</span>
                    </div>
                  ))
                : null // Skip products without variants
          )
        ) : (
          <span>No products found</span>
        )}
      </>
    );
  };

  const CollectionListComponent = ({
    collectionList,
    selectedCollections,
    handleCollectionCheckboxChange,
  }) => {
    const hasValidCollection =
      Array.isArray(collectionList) &&
      collectionList.length > 0 &&
      collectionList.some((collection) => collection?.title);

    return (
      <>
        {hasValidCollection ? (
          collectionList.map((collection) =>
            collection?.title ? (
              <div
                key={collection.id}
                className="collection-item flex items-center space-x-2"
              >
                <Checkbox
                  id={collection.id}
                  label={collection.title}
                  checked={selectedCollections[collection.id] || false}
                  onChange={() =>
                    handleCollectionCheckboxChange(
                      collection.id,
                      collection.title,
                      collection.handle
                    )
                  }
                />
              </div>
            ) : null
          )
        ) : (
          <span>No Collection found</span>
        )}
      </>
    );
  };

  const TargetedCollectionListComponent = ({
    collectionList,
    targetedCollections,
    handleTargetedCollectionCheckboxChange,
  }) => {
    const hasValidCollection =
      Array.isArray(collectionList) &&
      collectionList.length > 0 &&
      collectionList.some((collection) => collection?.title);

    return (
      <>
        {hasValidCollection ? (
          collectionList.map((collection, index) =>
            collection?.title ? (
              <div
                key={index}
                className="collection-item flex items-center space-x-2"
              >
                <Checkbox
                  id={index}
                  label={collection.title}
                  checked={targetedCollections[collection.id] || false}
                  onChange={() =>
                    handleTargetedCollectionCheckboxChange(collection.id)
                  }
                />
              </div>
            ) : null
          )
        ) : (
          <span>No Collection found</span>
        )}
      </>
    );
  };
  return (
    <>
      <div className="p-4 border-t">
        <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
          <div className="col-span-12 xl:col-span-12">
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <div className="w-full flex flex-col gap-9">
                <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <form action="#">
                    <div className="p-3">
                      {/* <div className="mb-4.5 border-b border-black pb-4">
                        <label className="mb-2.5 block text-black dark:text-white font-semibold">
                          Bundle Details
                        </label>
                        <div className="mt-3 flex justify-between flex-row items-center">
                          <span>Title:</span>
                          <input
                            id="bundle-title"
                            type="text"
                            className=" w-32 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="mt-3 flex justify-between flex-row items-center">
                          <span>Description:</span>
                          <textarea
                            id="bundle-description"
                            type="text"
                            className=" w-32 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div> */}
                      <div className="mb-4.5 border-b border-black pb-4">
                        <label className="mb-2.5 block text-black dark:text-white font-semibold">
                          Bundle Settings
                        </label>
                        <div className="mt-3 flex justify-between flex-row items-center">
                          <span>No of Products:</span>
                          <select
                            onChange={(e) => onNoOfProductsSelect(e)}
                            value={noOfProducts}
                            className="w-32 h-12 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          >
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-4.5 border-b border-black pb-4">
                        <label className="mb-2.5 block text-black dark:text-white font-semibold">
                          Selected Preference
                        </label>
                        <Tabs>
                          <TabList>
                            <Tab>Select Product</Tab>
                            <Tab>Select Collection</Tab>
                          </TabList>

                          <TabPanel className={"max-h-60 overflow-y-auto"}>
                            {" "}
                            {productListState && (
                              <ProductListComponent
                                productList={productList}
                                selectedProducts={selectedProducts}
                                handleProductCheckboxChange={
                                  handleProductCheckboxChange
                                }
                              />
                            )}
                          </TabPanel>
                          <TabPanel className={"max-h-60 overflow-y-auto"}>
                            {" "}
                            {collectionListState && (
                              <CollectionListComponent
                                collectionList={collectionList}
                                selectedCollections={selectedCollections}
                                handleCollectionCheckboxChange={
                                  handleCollectionCheckboxChange
                                }
                              />
                            )}
                          </TabPanel>
                        </Tabs>
                      </div>

                      <div className="mb-4.5 border-b border-black pb-4">
                        <label className="mb-2.5 block text-black dark:text-white font-semibold">
                          Targeted Preference
                        </label>
                        <Tabs key={"targeted-preference-tabs-1"}>
                          <TabList key={"targeted-preference-tablist-1"}>
                            <Tab key={"targeted-preference-tab-1"}>
                              Select Product
                            </Tab>
                            <Tab key={"targeted-preference-tab-2"}>
                              Select Collection
                            </Tab>
                          </TabList>

                          <TabPanel
                            className={"max-h-60 overflow-y-auto"}
                            key={"targeted-preference-tabpanel-1"}
                          >
                            {" "}
                            {productListState && (
                              <TargetedProductListComponent
                                productList={productList}
                                targetedProducts={targetedProducts}
                                handleTargetedProductCheckboxChange={
                                  handleTargetedProductCheckboxChange
                                }
                              />
                            )}
                          </TabPanel>
                          <TabPanel
                            className={"max-h-60 overflow-y-auto"}
                            key={"targeted-preference-tabpanel-2"}
                          >
                            {" "}
                            {collectionListState && (
                              <TargetedCollectionListComponent
                                collectionList={collectionList}
                                targetedCollections={targetedCollections}
                                handleTargetedCollectionCheckboxChange={
                                  handleTargetedCollectionCheckboxChange
                                }
                              />
                            )}
                          </TabPanel>
                        </Tabs>
                      </div>

                      <div className="mb-4.5 border-b border-black pb-4">
                        <label className="mb-2.5 block text-black dark:text-white font-semibold">
                          Discount Configuration
                        </label>
                        <div className="mb-6">
                          <label className="mb-2.5 block text-black dark:text-white font-medium">
                            Discount For
                          </label>
                          <label className="mb-2.5 block">
                            <div className="mb-6">
                              <DropDown
                                jsonData={discountForDropdown}
                                selectedValue={productDiscountForDetails} // Pass the value to child
                                setSelectedValue={setProductDiscountForDetails} // Pass the setter to child
                              />
                            </div>
                          </label>
                        </div>

                        <div className="mb-6">
                          <label className="mb-2.5 block text-black dark:text-white font-medium">
                            Discount Type
                          </label>
                          <label className="mb-2.5 block">
                            <div className="mb-6">
                              <DropDown
                                jsonData={discountTypeDropdown}
                                selectedValue={productDiscountTypeDetails} // Pass the value to child
                                setSelectedValue={setProductDiscountTypeDetails} // Pass the setter to child
                              />
                            </div>
                          </label>
                        </div>
                        <div className="mb-6">
                          <label className="mb-2.5 block text-black dark:text-white font-medium">
                            Discount Amount
                          </label>
                          <label className="mb-2.5 block">
                            <div className="mb-6 ">
                              <input
                                className="border-[1.5px] border-stroke"
                                type="number"
                                name="dis_amount"
                                id="dis_amount"
                                value={productDiscountAmountDetails}
                                onChange={(e) =>
                                  setProductDiscountAmountDetails(
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </label>
                        </div>
                      </div>

                      <SwitcherThree
                        label="Open in new tab"
                        enabled={switchStates.openInNewTab}
                        onToggle={() => handleToggle("openInNewTab")}
                      />
                      <SwitcherThree
                        label="Image"
                        enabled={switchStates.image}
                        onToggle={() => handleToggle("image")}
                      />
                      <SwitcherThree
                        label="Name"
                        enabled={switchStates.name}
                        onToggle={() => handleToggle("name")}
                      />
                      <SwitcherThree
                        label="Sku"
                        enabled={switchStates.sku}
                        onToggle={() => handleToggle("sku")}
                      />
                      <SwitcherThree
                        label="Price"
                        enabled={switchStates.price}
                        onToggle={() => handleToggle("price")}
                      />
                      <SwitcherThree
                        label="Variant Swatch"
                        enabled={switchStates.variantSwatch}
                        onToggle={() => handleToggle("variantSwatch")}
                      />
                      <SwitcherThree
                        label="ATC Button"
                        enabled={switchStates.atcButton}
                        onToggle={() => handleToggle("atcButton")}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBundleTab;
