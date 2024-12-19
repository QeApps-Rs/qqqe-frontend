/* eslint-disable react/prop-types */
import ColorPicker from "../higherOrderComponent/ColorPicker/ColorPicker";
import {
  defaultBoxClassName,
  fontFamilyList,
} from "../../pages/forms/masterFormConfig";

const GlobalStyleControllerComponent = ({
  emailTemplateJSON,
  handleEmailTemplateChange,
}) => {
  const renderPaddingMarginField = (
    label,
    value,
    onChange,
    id,
    placeholder,
    index = 1
  ) => (
    <div key={index} className="mt-3 grid justify-end">
      <span className="block font-semibold">{label}:</span>
      <input
        id={id}
        type="number"
        min="0"
        placeholder={placeholder}
        value={value.replace("px", "") || ""}
        onChange={(e) => onChange(e.target.value + "px")}
        className={`${defaultBoxClassName} h-10`}
      />
    </div>
  );

  return (
    <div className="p-4 border-t border-white">
      <div className="p-4 bg-white rounded-lg shadow-lg my-4">
        <div className="flex items-center justify-between items-center">
          <span className="mr-2 font-semibold">Background Color:</span>
          <ColorPicker
            defaultColor={emailTemplateJSON.global_style.background_color}
            onChange={(color) =>
              handleEmailTemplateChange(
                { background_color: color },
                "global_style"
              )
            }
          />
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="mr-2 font-semibold">Font Family:</span>
          <select
            onChange={(e) =>
              handleEmailTemplateChange(
                { font_family: e.target.value },
                "global_style"
              )
            }
            value={emailTemplateJSON.global_style.font_family}
            className={`${defaultBoxClassName} h-12 mr-2`}
          >
            {fontFamilyList.map((item) => (
              <option key={item.label} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3">
          <span className="mr-2 font-semibold">Padding (PX):</span>
          <div className="grid grid-cols-2">
            {["top", "bottom", "left", "right"].map((position, i) =>
              renderPaddingMarginField(
                `${position}`,
                emailTemplateJSON.global_style[`padding_${position}`],
                (value) =>
                  handleEmailTemplateChange(
                    { [`padding_${position}`]: value },
                    "global_style"
                  ),
                `padding_${position}`,
                "px",
                i
              )
            )}
          </div>
        </div>
        <div className="mt-3">
          <span className="mr-2 font-semibold">Margin (PX):</span>
          <div className="grid grid-cols-2">
            {["top", "bottom", "left", "right"].map((position, i) =>
              renderPaddingMarginField(
                `${position}`,
                emailTemplateJSON.global_style[`margin_${position}`],
                (value) =>
                  handleEmailTemplateChange(
                    { [`margin_${position}`]: value },
                    "global_style"
                  ),
                `margin_${position}`,
                "px",
                i
              )
            )}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default GlobalStyleControllerComponent;
