import studioImg from "../assets/studio-1.png"

const Studio = () => {

    const reports = [
        {
            id: 1,
            studioTitle: "Seamless Integration, Superior Insights",
            studioSubTitle: "Integrate your Facebook Ads with Polar effortlessly for deeper insights. Unlock a world of data-driven strategies with our intuitive platform.",
            checkItems: [
                { title: "One-Click Integration", subtitle: "Easily connect your Facebook Ads account" },
                { title: "Intelligent Grouping", subtitle: "Organize ads for more meaningful analysis" },
                { title: "Automated Insight Reports", subtitle: "Get comprehensive reports without the manual hassle" },
            ],
        },
        {
            id: 2,
            studioTitle: "Seamless Integration, Superior Insights",
            studioSubTitle: "Integrate your Facebook Ads with Polar effortlessly for deeper insights. Unlock a world of data-driven strategies with our intuitive platform.",
            checkItems: [
                { title: "One-Click Integration", subtitle: "Easily connect your Facebook Ads account" },
                { title: "Intelligent Grouping", subtitle: "Organize ads for more meaningful analysis" },
                { title: "Automated Insight Reports", subtitle: "Get comprehensive reports without the manual hassle" },
            ],
        },

    ];

    return (
        <div className="bg-white rounded-xl overflow-hidden">
            <div className="bg-[url('/src/assets/bg-img.png')] bg-cover h-[40vw] bg-center bg-no-repeat	justify-center items-center flex text-center flex-col">
                <h1 className="text-white font-bold text-4xl leading-[3.5rem]">Maximize Your Ads Impact with<br />Creative Studio</h1>
                <p className="text-[#fffc] mt-8">Elevate Your ROAS Through Detailed Creative Analysis</p>
                <button type="button" class=" h-8 mt-4 text-[#5a50fe] bg-white  font-medium rounded-lg px-5 me-2 mb-2 text-base">Connect Facebook Ads</button>
            </div>
            <div className="grid grid-cols-12 items-center mt-15 p-8">
                {reports.map((report, index) => (
                    <div className={`col-span-12 xl:col-span-12 gap-8 md:gap-8 2xl:gap-12 mb-15 items-center flex ${index % 2 === 0 ? 'flex-row-reverse' : ''}`} key={report.id}>
                        <div className="flex-1">
                            <h3 className="text-lg text-[#4b4b7e] font-bold mb-6">{report.studioTitle}</h3>
                            <p className="text-[#6c6c9c] text-sm font-normal mb-3">
                                {report.studioSubTitle}
                            </p>
                            {report.checkItems.map((item, i) => (
                                <div className="flex items-baseline mb-4" key={i}>
                                    <i className="fa fa-check-circle mr-3 text-[#5a50fe]" aria-hidden="true"></i>
                                    <div className="block">
                                        <span className="text-[#4b4b7e] text-lg font-medium">{item.title}</span>
                                        <p className="text-[#6c6c9c]">{item.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="w-full justify-center flex">
                                <button
                                    type="button"
                                    className="items-center flex h-8 mt-4 text-[#5a50fe] bg-[#efedff] hover:bg-white font-medium rounded-lg px-5 me-2 mb-2 text-base"
                                >
                                    Connect Facebook Ads
                                </button>
                            </div>
                        </div>
                        <div className="flex-1">
                            <img src={studioImg} alt="" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Studio;