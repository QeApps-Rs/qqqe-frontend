/* eslint-disable react/prop-types */
const MinusSvg = ({ plusMinus }) => (
    <svg
        className={`fill-white duration-200 ease-in-out  ${plusMinus?.minus}`}
        width="15"
        height="3"
        viewBox="0 0 15 3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M13.503 0.447144C13.446 0.447144 13.503 0.447144 13.503 0.447144H1.49482C0.925718 0.447144 0.527344 0.902427 0.527344 1.47153C0.527344 2.04064 0.982629 2.43901 1.55173 2.43901H13.5599C14.129 2.43901 14.5273 1.98373 14.5273 1.41462C14.4704 0.902427 14.0151 0.447144 13.503 0.447144Z"
            fill=""
        ></path>
    </svg>
);

export default MinusSvg;