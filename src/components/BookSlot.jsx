import ScrollAnimation from "react-animate-on-scroll";

const BookSlotModal = ({ handlePageClick }) => {
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

  return (
    <ScrollAnimation
      animateIn="animate__fadeInDown"
      animateOut="animate__fadeOut" 
      duration={1}
    >
      <div className="w-full flex justify-center items-center bg-gray-100 ">
        <div className="w-full md:w-10/12 max-w-screen-xl shadow-2xl rounded-lg overflow-hidden relative">
          <label className="h-16 bg-white shadow-lg flex items-center justify-center px-4 border-b border-gray-300 font-bold text-xl sm:text-2xl text-gray-800">
            Let us help you get the most from QQQE
          </label>
          <div className="bg-book_appointment backdrop-brightness-50 overflow-y-auto" style={{height: 'calc(100% - 64px)'}}>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 py-6 px-4 sm:px-8">
              <div className="col-span-12 xl:col-span-5 text-white space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">
                  Book your spot now
                </h1>
                <p className="text-lg sm:text-2xl font-medium mb-3 text-[#aca7ff]">
                  Our Goal: To Improve Store Conversion and Retention Rates
                </p>
                <div>
                  <span className="block text-base sm:text-xl font-normal mb-4 text-[#cecbff]">
                    Let's get you started.
                  </span>
                  {guarantees.map((guarantee) => (
                    <div className="flex items-center mb-2" key={guarantee.id}>
                      <i
                        className="fa fa-check-circle mr-3 text-[#cecbff]"
                        aria-hidden="true"
                      ></i>
                      <span className="text-white text-sm sm:text-lg font-medium">
                        {guarantee.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Display iframe on all devices */}
              <div className="col-span-12 xl:col-span-7">
                <iframe
                  src="https://schedule.calrik.com/m3arie1821"
                  title="Schedule Embed"
                  className="w-full h-64 sm:h-[calc(100vh-310px)] border-none rounded-lg custom-scrollbar overflow-y-auto"
                />
              </div>
            </div>

            {/* Display buttons on all screen sizes */}
            <div className="flex flex-col sm:flex-row justify-end items-center w-full p-4 border-t border-white space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                className="bg-transparent p-3 border border-white text-white rounded-lg hover:bg-white hover:text-blue-700 transition-all w-full sm:w-auto text-base sm:text-lg"
                onClick={handlePageClick}
              >
                Remind me next time
              </button>
              <button
                type="button"
                onClick={handlePageClick}
                className="bg-transparent p-3 border border-white text-white rounded-lg hover:bg-white hover:text-blue-700 transition-all w-full sm:w-auto text-base sm:text-lg"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default BookSlotModal;
