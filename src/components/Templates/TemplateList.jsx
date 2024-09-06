import React from 'react'
import TemplateCard from './TemplateCard'
import FilterBar from './Filters'
import { Link } from 'react-router-dom'
import popup1 from '../../images/default.png'
import popup2 from '../../images/02.png'
import popup3 from '../../images/03.png'
import popup4 from '../../images/04.png'
import popup5 from '../../images/05.png'
import popup6 from '../../images/06.png'
import popup7 from '../../images/07.png'
import popup8 from '../../images/08.png'
import popup9 from '../../images/09.png'
import popup10 from '../../images/10.png'
import popup11 from '../../images/11.png'
import popup12 from '../../images/12.png'
import popup13 from '../../images/13.png'
import popup14 from '../../images/14.png'
import popup15 from '../../images/15.png'
import popup16 from '../../images/16.png'
import popup17 from '../../images/17.png'
import popup18 from '../../images/18.png'
import popup19 from '../../images/19.png'
import popup20 from '../../images/20.png'
import popup21 from '../../images/21.png'
import { BackIcon } from '../custIcon/svgIcon'
import { useNavigate } from "react-router-dom";


const TemplateList = () => {
    const navigate = useNavigate()

    return (
        <>
            {/* <div className="mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__">
            <h2 className="text-lg text-title-md2 font-semibold text-black dark:text-white">
                Action Prompts (People)
            </h2>
        </div> */}

            {/* <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-black dark:text-white">

                </h2>
            </div> */}
            <div className="flex mt-5  justify-between space-y-1 p-0">
                <h2 className="text-lg text-title-md2  font-medium text-gray-900 leading-relaxed">
                    Take Action Now 
                </h2>
                <span onClick={() => navigate(-1)} className="flex items-center gap-x-1 cursor-pointer bg-white border border-gray-300 px-1.5 text-[15px] rounded-md"><BackIcon />Back</span>
            </div>
            <span className="p-2 text-sm text-black mb-3">Apply solutions to improve your store and derive results</span>
            <FilterBar />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4 w-full">

                {/* <TemplateCard
                        image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fabstract-boy-avtar-character-fiction-person-2168819879&psig=AOvVaw1N9kh_K_jyeO3S39GtyJg1&ust=1723198692177000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMjbgO-V5YcDFQAAAAAdAAAAABAE"
                        title="Flat 20 % discount on first order"
                        desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                        buttonTitle="Subscribe"
                    /> */}
                {/* <div className='grid-cols-3'> */}
                <div>
                    <Link to='/master-form'>
                        <img
                            className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                            src={popup1}
                            alt="Bonnie image"
                        // width={100}
                        // height={100}
                        // style={{ borderRadius: "50%" }}
                        />

                    </Link>
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup2}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup3}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup4}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup5}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup6}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup7}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup8}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup9}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup10}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup11}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup12}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup13}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup14}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup15}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup16}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup17}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup18}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup19}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup20}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                <div>
                    <img
                        className="mb-3 shadow-lg border border-slate-300 rounded-md w-full"
                        src={popup21}
                        alt="Bonnie image"
                    // width={100}
                    // height={100}
                    // style={{ borderRadius: "50%" }}
                    />
                </div>
                {/* </div> */}
                {/* </Link> */}

                {/* <TemplateCard
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
                /> */}
            </div></>
    )
}

export default TemplateList