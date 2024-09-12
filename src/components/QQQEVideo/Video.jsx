import React from 'react'
import Studio from '../Studio';

const QqqeVideo = () => {
    const cardData = [
        {
            id: 1,
            title: "Get started with an intro to QQQE",
            description: "Learn what QQQE Analytics has to offer and how to get started",
            videoUrl: "https://www.youtube.com/embed/KLuTLF3x9sA?si=4tUrZ5KjkZnpcaKe"
        },
        {
            id: 2,
            title: "Advanced QQQE Analytics",
            description: "Deep dive into the advanced features of QQQE Analytics",
            videoUrl: "https://www.youtube.com/embed/KLuTLF3x9sA?si=4tUrZ5KjkZnpcaKe"

        },
        {
            id: 3,
            title: "Get started with an intro to QQQE",
            description: "Learn what QQQE Analytics has to offer and how to get started",
            videoUrl: "https://www.youtube.com/embed/KLuTLF3x9sA?si=4tUrZ5KjkZnpcaKe"
        },
        {
            id: 4,
            title: "Advanced QQQE Analytics",
            description: "Deep dive into the advanced features of QQQE Analytics",
            videoUrl: "https://www.youtube.com/embed/KLuTLF3x9sA?si=4tUrZ5KjkZnpcaKe"

        },
    ];

    return (
        <>
            <Studio />
            <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mt-8">
                {cardData.map((card) => (
                    <div key={card.id} className="col-span-12 xl:col-span-6">
                        <div className="bg-white p-5 rounded-xl">
                            <h1 className="block text-lg font-bold text-black mb-2">{card.title}</h1>
                            <p className="block text-base font-medium mb-3 text-[#999fc8]">{card.description}</p>
                            <iframe
                                className="w-full aspect-video rounded-xl"
                                src={card.videoUrl}
                                title={card.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </>

    )
}
export default QqqeVideo;