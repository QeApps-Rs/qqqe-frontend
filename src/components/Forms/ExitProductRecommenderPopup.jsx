/* eslint-disable react/prop-types */
import defaultProductImg from "../../images/default_product_1.png";
import { Tooltip } from "react-tippy";

function ExitProductRecommenderPopup({
  productData,
  noOfProducts,
  templateDesign,
}) {
  const DefaultProductDiv = ({ defaultProductImg }) => {
    return (
      <>
        {Array.from({ length: 1 }, (_, index) => (
          // <div
          //   key={index}
          //   className="flex items-center text-center rounded-lg relative"
          //   style={{
          //     padding: combinedPadding,
          //     backgroundColor: templateDesign.templateOverlayColor,
          //   }}
          // >
          //   <div className="block z-10">
          //     <h1 className="text-6xl font-bold mb-4 relative">
          //       {templateDesign.heading || "HI, THANKS FOR STOPPING BY!"}
          //     </h1>
          //     <h4 className="text-2xl font-bold mb-4 relative">
          //       {"You just unlocked a free flavour."}
          //     </h4>
          //     <p
          //       className="text-lg mb-6"
          //       style={getStyle(templateDesign, "templateSubheading")}
          //     >
          //       {templateDesign.subheading ||
          //         "You can shop with us again in the near future."}
          //     </p>
          //     <p className="text-lg font-small mb-2">{`Product ${
          //       index + 1
          //     }`}</p>
          //     <p className="text-xl font-bold mb-4">
          //       ${Math.floor(Math.random() * 1000)}
          //     </p>
          //     <a
          //       className="block w-full bg-[#ed5a29] text-white py-2 rounded hover:bg-gray-800"
          //       href="#"
          //       style={{
          //         backgroundColor: "bg-[#ed5a29]",
          //       }}
          //     >
          //       {templateData.button || "Go To Checkout"}
          //     </a>
          //   </div>
          //   <div className="block ">
          //     <a href="#" className="mb-4">
          //       <img
          //         src={defaultProductImg}
          //         alt={`product- ${index + 1}`}
          //         className="h-[500px] absolute right-[-40px] bottom-0"
          //         style={{ rotate: "330deg" }}
          //       />
          //     </a>
          //   </div>
          // </div>
<>
          <div
            key={index}
            className=" col-span-6"
          
          >
            <div
              className="flex items-center text-center relative shadow-xl "
              style={{
                backgroundColor: templateDesign.templateBgColor ,
                padding: combinedPadding,
                border: templateDesign.formBorderStyle,
                borderRadius: templateDesign.borderRadius ,
                borderWidth: templateDesign.borderWidth,
                borderColor: templateDesign.templateBorderColor,
                borderStyle: templateDesign.formBorderStyle,
              }}
            >
              <div className="w-10/12 block z-10">
                <p className="text-base font-medium max-w-xs mx-auto truncate text-white mt-4">
                  <a href="#">
                    {templateDesign.heading }
                  </a>
                </p>
                <p className="text-xl text-white  font-bold mt-3">$ 220 USD</p>
                <a
                  className="block w-full bg-[#ed5a29] text-white py-2 rounded hover:bg-gray-800 mt-4"
                  href="#"
                  style={{
                    backgroundColor: "bg-[#ed5a29]",
                  }}
                >
                  {templateDesign.button}
                </a>
              </div>
              <div className="w-1/2">
                <a href="#">
                  <img
                    src={defaultProductImg}
                    alt={`product- ${index + 1}`}
                    className="h-[200px] absolute bottom-0"
                    style={{ rotate: "350deg" }}
                  />
                </a>
              </div>
            </div>
          </div>
           <div
           key={index}
           className=" col-span-6"
         
         >
           <div
             className="flex items-center text-center relative shadow-xl "
             style={{
               backgroundColor: templateDesign.templateBgColor || "#959595",
               padding: combinedPadding,
               border: templateDesign.formBorderStyle,
               borderRadius: templateDesign.borderRadius || "16px",
               borderWidth: templateDesign.borderWidth,
               borderColor: templateDesign.templateBorderColor,
               borderStyle: templateDesign.formBorderStyle,
             }}
           >
             <div className="w-10/12 block z-10">
               <p className="text-base font-medium max-w-xs mx-auto truncate text-white mt-4">
                 <a href="#">
                   {templateDesign.heading }
                 </a>
               </p>
               <p className="text-xl text-white  font-bold mt-3">$ 220 USD</p>
               <a
                 className="block w-full bg-[#ed5a29] text-white py-2 rounded hover:bg-gray-800 mt-4"
                 href="#"
                 style={{
                   backgroundColor: "bg-[#ed5a29]",
                 }}
               >
                 {templateDesign.button}
               </a>
             </div>
             <div className="w-1/2">
               <a href="#">
                 <img
                   src={defaultProductImg}
                   alt={`product- ${index + 1}`}
                   className="h-[200px] absolute bottom-0"
                   style={{ rotate: "350deg" }}
                 />
               </a>
             </div>
           </div>
         </div>
         </>
        ))}
      </>
    );
  };

  const combinedPadding = `
  ${templateDesign.templatePaddingTop} 
  ${templateDesign.templatePaddingRight} 
  ${templateDesign.templatePaddingBottom} 
  ${templateDesign.templatePaddingLeft}
  `;


  return (
    <div
      id="product-bundle"
      className="p-8 bg-white"
      style={{ height: "calc(100vh - 300px)" }}
    >
      <div
        className="grid grid-cols-12 sm:grid-cols-12 md:grid-cols-12 gap-20 "
      >
        {productData && productData.length > 0 ? (
          productData.map((product, index) => (
            <div key={index} className=" col-span-6">
              <div
                className="w-full flex items-center text-center relative shadow-xl "
                style={{
                  backgroundColor: templateDesign.templateBgColor ,
                  padding: combinedPadding,
                  border: templateDesign.formBorderStyle,
                  borderRadius: templateDesign.borderRadius,
                  borderWidth: templateDesign.borderWidth,
                  borderColor: templateDesign.templateBorderColor,
                  borderStyle: templateDesign.formBorderStyle,
                }}
              >
                <div className="w-10/12 block z-10">
                  {/* <h1 className="text-6xl font-bold mb-4 relative">
                      {templateDesign.heading || "HI, THANKS FOR STOPPING BY!"}
                    </h1>
                    <h4 className="text-2xl font-bold mb-4 relative">
                      {"You just unlocked a free flavour."}
                    </h4>
                    <p
                      className="text-lg mb-6"
                      style={getStyle(templateDesign, "templateSubheading")}
                    >
                      {templateDesign.subheading ||
                        "You can shop with us again in the near future."}
                    </p>
                    <p className="text-lg font-small mb-2">{`Product ${
                      index + 1
                    }`}</p>
                    <p className="text-xl font-bold mb-4">
                      ${product.price}
                    </p> */}

                  <Tooltip
                    title={product.title}
                    position="bottom"
                    trigger="mouseenter"
                  >
                    <p className="text-base font-medium max-w-xs mx-auto truncate text-white mt-4">
                      <a href="#">{product.title}</a>
                    </p>
                  </Tooltip>
                  <p className="text-xl text-white  font-bold mt-3">
                    ${product.price}
                  </p>
                  <a
                    className="block w-full bg-[#ed5a29] text-white py-2 rounded hover:bg-gray-800 mt-4"
                    href="#"
                    style={{
                      backgroundColor: "bg-[#ed5a29]",
                    }}
                  >
                    {templateDesign.button}
                  </a>
                </div>
                <div className="w-1/2  ">
                  <a href="#">
                    <img
                      src={product.image}
                      alt={product.variantHandle}
                      className="h-[200px] absolute bottom-0"
                      style={{ rotate: "350deg" }}
                    />
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <DefaultProductDiv
            noOfProducts={noOfProducts}
            defaultProductImg={defaultProductImg}
          />
        )}
      </div>
    </div>
  );
}

export default ExitProductRecommenderPopup;
