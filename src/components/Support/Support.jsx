import React from 'react'

const Support = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mt-4 w-full max-w-[1130px] mx-auto">
        <div className="mb-8 bg-white text-center p-5 mt-5 rounded-lg shadow-[0px_5px_10px_rgba(0,0,0,0.25)] border border-[#cccccc6b]">
          <img src="https://www.qetail.com/apps/gift_box_builder/assets/images/community-box2.jpg" className="inline-block" />
          <h3 className="text-[18px] my-4 mb-[10px] text-black font-semibold">Book an onboarding call</h3>
          <p className="text-[14px] font-normal leading-[20px] mb-5">send us a message by chat and we will get back <br /> to you shorthly.</p>
          <a href="skype:live:.cid.d2d51e45d41fa581?chat" className="px-4 py-2 text-sm leading-6 rounded-md inline-block text-white bg-black font-semibold mb-2 ">Live skype chat</a>
        </div>
        <div className="mb-8 bg-white text-center p-5 mt-5 shadow-[0px_5px_10px_rgba(0,0,0,0.25)] border border-[#cccccc6b] rounded-lg">
          <img src="https://www.qetail.com/apps/gift_box_builder/assets/images/community-box3.jpg" className="inline-block"  />
          <h3 className="text-[18px] my-4 mb-[10px] text-black font-semibold">Visit our HelpDesk</h3>
          <p className="text-[14px] font-normal leading-[20px] mb-5">Please check out HelpDesk where you can get all <br /> answers of your question.</p>
          <a href="#" target="_blank" className="px-4 py-2 text-sm leading-6 rounded-md inline-block text-white bg-black  font-semibold mb-2 ">HelpDesk</a>
        </div>
      </div>
  )
}

export default Support