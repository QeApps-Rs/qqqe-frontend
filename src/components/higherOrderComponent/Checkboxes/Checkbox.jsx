/* eslint-disable react/prop-types */
import CheckIcon from '../../../images/svg-icons/check.svg';

const Checkbox = ({ id, label, checked, onChange }) => {
    return (
        <>
            <label
                htmlFor={id + '' + label}
                className="flex cursor-pointer select-none items-center font-medium text-md"
            >
                <div className="relative">
                    <input
                        type="checkbox"
                        id={id + label}
                        className="sr-only"
                        checked={checked}
                        onChange={onChange}
                    />
                    <div
                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${checked && "border-primary bg-gray dark:bg-transparent"}`}
                    >
                        <span className={`opacity-0 ${checked && "!opacity-100"}`}>
                            <img src={CheckIcon} alt="" />
                        </span>
                    </div>
                </div>
                {label}
            </label>
        </>
    );
};

export default Checkbox;
