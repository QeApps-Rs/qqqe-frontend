/* eslint-disable react/prop-types */
import ScrollAnimation from "react-animate-on-scroll";

const BookSlotModal = ({
  handlePageClick,
  showModal,
  handleClosePageClick,
}) => {
  const guarantees = [
    {
      id: 1,
      text: "Map the Customer Journey - Understand each touchpoint from discovery to post-purchase",
    },
    {
      id: 2,
      text: "Identify Conversion Opportunities - Find areas where users drop off and optimize them",
    },
    {
      id: 3,
      text: "Enhance User Experience - Improve navigation, design, and overall ease of shopping",
    },
    {
      id: 4,
      text: "Boost Retention Strategies - Use loyalty programs, follow-up emails, and exclusive offers to keep customers engaged",
    },
    {
      id: 5,
      text: "Track and Analyze Data - Use analytics to monitor customer behavior and improve strategies",
    },
  ];

  const ModalContent = () => (
    <div className="w-full flex justify-center items-center bg-gray-100 px-4 sm:px-6 md:px-8">
      <div className="w-full md:w-11/12 lg:w-10/12 max-w-screen-xl shadow-2xl rounded-lg h-auto">
        <label className="h-16 bg-white shadow-lg flex items-center justify-center px-4 border-b border-gray-300 font-bold text-lg md:text-xl lg:text-2xl text-gray-800">
          Let us help you get the most from QQQE
        </label>

        <div className="bg-book_appointment backdrop-brightness-50">
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-6 px-4 sm:px-6"
            style={{ maxHeight: "calc(100vh - 300px)", overflow: "auto" }}
          >
            <div className="col-span-12 lg:col-span-5 text-white space-y-4 md:space-y-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                Book your spot now
              </h1>
              <p className="text-base sm:text-lg md:text-2xl font-medium mb-3 text-[#aca7ff]">
                Our Goal: To Improve Store Conversion and Retention Rates
              </p>
              <div>
                <span className="block text-sm sm:text-base md:text-lg font-normal mb-4 text-[#cecbff]">
                  Let's get you started.
                </span>
                {guarantees.map((guarantee) => (
                  <div className="flex items-center mb-2" key={guarantee.id}>
                    <i
                      className="fa fa-check-circle mr-3 text-[#cecbff]"
                      aria-hidden="true"
                    ></i>
                    <span className="text-white text-sm sm:text-base md:text-lg font-medium">
                      {guarantee.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <iframe
                src="https://schedule.calrik.com/m3arie1821"
                title="Schedule Embed"
                className="w-full h-52 sm:h-64 md:h-[calc(100vh-350px)] border-none rounded-lg custom-scrollbar overflow-y-auto"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end items-center w-full p-4 border-t border-white space-y-2 sm:space-y-0 sm:space-x-4">
            {!showModal ? (
              <>
                <button
                  className="w-full sm:w-auto bg-transparent p-3 border border-white text-white rounded-lg hover:bg-white hover:text-blue-700 transition-all text-sm md:text-base"
                  onClick={handlePageClick}
                >
                  Remind me next time
                </button>
                <button
                  type="button"
                  onClick={handlePageClick}
                  className="w-full sm:w-auto bg-transparent p-3 border border-white text-white rounded-lg hover:bg-white hover:text-blue-700 transition-all text-sm md:text-base"
                >
                  Continue
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleClosePageClick}
                className="w-full sm:w-auto px-6 py-2 text-white rounded-lg hover:bg-red-700 bg-red-500 hover:text-white transition-all text-sm md:text-base"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={
        showModal
          ? "flex items-center justify-center  fixed inset-0 z-50 backdrop-blur-sm backdrop-brightness-50"
          : ""
      }
    >
      {showModal ? (
        <ModalContent />
      ) : (
        <ScrollAnimation
          animateIn="animate__fadeInDown"
          animateOut="animate__fadeOut"
          duration={1}
        >
          <ModalContent />
        </ScrollAnimation>
      )}
    </div>
  );
};

export default BookSlotModal;
