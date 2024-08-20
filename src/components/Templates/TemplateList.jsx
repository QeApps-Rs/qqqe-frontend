import React from 'react'
import TemplateCard from './TemplateCard'
import FilterBar from './Filters'
import { Link } from 'react-router-dom'

const TemplateList = () => {
    return (
        <><div className="mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__">
            <h2 className="text-lg text-title-md2 font-semibold text-black dark:text-white">
                Level 3: Action Prompts (People)
            </h2>
        </div>

            {/* <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-black dark:text-white">

                </h2>
            </div> */}
            <div className="flex mt-5 space-y-1 p-0">
                <h2 className="text-lg text-title-md2  font-medium text-gray-900 leading-relaxed">
                    Choose Template
                </h2>
            </div>

            <FilterBar />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                <Link to='/master-form'>
                    <TemplateCard
                        image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fabstract-boy-avtar-character-fiction-person-2168819879&psig=AOvVaw1N9kh_K_jyeO3S39GtyJg1&ust=1723198692177000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMjbgO-V5YcDFQAAAAAdAAAAABAE"
                        title="Flat 20 % discount on first order"
                        desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                        buttonTitle="Subscribe"
                    /></Link>

                <TemplateCard
                    image="https://zerozone.com/ams/qqqe/images/object/object-2.jpg"
                    title="Flat 20% off on order above 2999"
                    desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                    buttonTitle="Subscribe"
                />
                <TemplateCard
                    image="https://zerozone.com/ams/qqqe/images/object/object-1.jpg"
                    title="Limited time 20% deal"
                    desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                    buttonTitle="Subscribe"
                />
            </div></>
    )
}

export default TemplateList