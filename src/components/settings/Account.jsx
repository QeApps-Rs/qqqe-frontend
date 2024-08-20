import React,{useState} from 'react'

const Account = () => {

    const [isShow, setShow] = useState(false)

    const onToogle = (status) => {
        setShow(status ? false : true)
    }
    
    return (
        <React.Fragment>
            <div className="p-6">
                {/* Domain Section */}
                {/* <div className="mb-4">
                    <label className="block text-gray-700">Domain</label>
                    <input type="text" className="rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" placeholder="Type in a new domain" />
                    <button className="mt-2 bg-blue-500 rounded-md text-white px-4 py-4">Add new domain</button>
                </div> */}
                <div className="mb-4 mt-5 bg-slate-100">
                    {/* <div className="p-4 border-b flex items-center justify-between">
                        <span>amazon.in</span>
                        <div className="flex space-x-4 items-center">
                            <button className='text-2xl'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 1024 1024"><path d="M665.6 153.6h-307.2c-197.939 0-358.4 160.461-358.4 358.4s160.461 358.4 358.4 358.4h307.2c197.939 0 358.4-160.461 358.4-358.4s-160.461-358.4-358.4-358.4zM665.6 768c-141.363 0-256-114.637-256-256s114.637-256 256-256 256 114.637 256 256-114.637 256-256 256z"></path></svg></button>
                            <button className='text-2xl'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 1024 1024"><path d="M663.9 188.4a25.6 25.6 0 0 0-47.8-18.4l-256 665.6a25.6 25.6 0 1 0 47.8 18.4l256-665.6ZM298.2 313.3a25.6 25.6 0 0 1 2.9 36.2L161.7 512l139.3 162.6a25.6 25.6 0 0 1-38.9 33.2l-153.6-179.2a25.6 25.6 0 0 1 0-33.2l153.6-179.2a25.6 25.6 0 0 1 36.1-2.8Zm427.6 423a25.6 25.6 0 0 1-2.9-36.1l139.4-162.6-139.4-162.5a25.6 25.6 0 1 1 39-33.3l153.6 179.2a25.6 25.6 0 0 1 0 33.2l-153.6 179.2a25.6 25.6 0 0 1-36.1 2.9Z"></path></svg></button>
                            <button className='text-2xl'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 1024 1024"><path d="M128 64H64v832a64 64 0 0 0 64 64h832v-64H128Z"></path><path d="M960 288h-224v64h114.9L608 594.9l-137.3-137.6a32 32 0 0 0-45.4 0L192 690.9 237.1 736 448 525.1l137.3 137.6a32 32 0 0 0 45.4 0l265.3-265.6V512h64Z"></path></svg></button>
                            <button className='text-2xl'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 1024 1024"><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32z m-200 0H360v-72h304v72z"></path></svg></button>
                        </div>  
                    </div> */}
                    <div className="flex justify-between items-center border-b border-gray-400 pb-2 mb-2 cursor-pointer" onClick={ () => onToogle(isShow)}>
                        <div className="p-4 flex items-center space-x-2">
                            <p><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 1024 1024"><path d="M663.9 188.4a25.6 25.6 0 0 0-47.8-18.4l-256 665.6a25.6 25.6 0 1 0 47.8 18.4l256-665.6ZM298.2 313.3a25.6 25.6 0 0 1 2.9 36.2L161.7 512l139.3 162.6a25.6 25.6 0 0 1-38.9 33.2l-153.6-179.2a25.6 25.6 0 0 1 0-33.2l153.6-179.2a25.6 25.6 0 0 1 36.1-2.8Zm427.6 423a25.6 25.6 0 0 1-2.9-36.1l139.4-162.6-139.4-162.5a25.6 25.6 0 1 1 39-33.3l153.6 179.2a25.6 25.6 0 0 1 0 33.2l-153.6 179.2a25.6 25.6 0 0 1-36.1 2.9Z"></path></svg></p><span className="text-gray-700">Installation code</span>
                            <span className="text-sm text-gray-500">How to insert the code</span>
                        </div>
                    </div>

                    { isShow &&
                    <div className="flex justify-between items-center">
                        <div className="p-4 flex items-center space-x-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                        </div>
                    </div>}
                    {/* <div className="flex justify-between items-center">
                        <div className="p-4 flex items-center space-x-2">
                        <p><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 1024 1024"><path d="M128 64H64v832a64 64 0 0 0 64 64h832v-64H128Z"></path><path d="M960 288h-224v64h114.9L608 594.9l-137.3-137.6a32 32 0 0 0-45.4 0L192 690.9 237.1 736 448 525.1l137.3 137.6a32 32 0 0 0 45.4 0l265.3-265.6V512h64Z"></path></svg></p><span className="text-gray-700">Analytics integration</span>
                            <span className="text-sm text-gray-500">is active/inactive for the domain</span>
                        </div>
                        <button className='text-2xl'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 1024 1024"><path d="M665.6 153.6h-307.2c-197.939 0-358.4 160.461-358.4 358.4s160.461 358.4 358.4 358.4h307.2c197.939 0 358.4-160.461 358.4-358.4s-160.461-358.4-358.4-358.4zM665.6 768c-141.363 0-256-114.637-256-256s114.637-256 256-256 256 114.637 256 256-114.637 256-256 256z"></path></svg></button>
                    </div> */}
                </div>
                <div className="mb-4 mt-11">
                    <label className="block text-gray-700">User</label>
                    <input type="email" className="rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" placeholder="Invite by email address" />
                    <button className="mt-2 ml-2 rounded-md bg-blue-500 text-white px-4 py-4">Invite</button>
                </div>

                {/* Insert Code Section */}
                <div className="mb-4">
                    <h3 className="text-lg font-bold">Connect your website</h3>
                    <p>Connect your website to make your campaign live</p>
                    <div className="mt-2">
                        <span>amazon.in</span>
                        <button className="ml-4 text-blue-500">Change</button>
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 mb-2">What e-commerce platform do you use?</label>
                        <div className="grid grid-cols-3 gap-4">
                            <button className="border p-2 rounded-md bg-slate-100">Custom Website</button>
                            <button className="border p-2 rounded-md bg-slate-100">Magneto</button>
                            <button className="border p-2 rounded-md bg-slate-100">Big Commerce</button>
                            <button className="border p-2 rounded-md bg-slate-100">WordPress</button>
                            <button className="border p-2 rounded-md bg-slate-100">Shopify</button>
                            <button className="border p-2 rounded-md bg-slate-100">Other platform</button>
                        </div>
                    </div>
                </div>

                {/* API Keys Section */}
                <div className="mb-4">
                    <label className="block text-gray-700">API Keys</label>
                    <div className="flex space-x-4 items-center">
                        <input type="text" className="rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" placeholder="Enter your API" />
                    </div>
                    <div className='mt-5'>
                        <button className="bg-blue-500 rounded-md text-white px-4 py-2">Generate new API key</button>
                        <button className="bg-red-500 rounded-md text-white px-4 py-2 ml-2">Delete API key</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Account;