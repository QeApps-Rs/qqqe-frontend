import { useEffect, useState } from "react";
import Checkbox from "../../components/higherOrderComponent/Checkboxes/Checkbox";
import Radio from "../../components/higherOrderComponent/Radios/Radio";
import ColorPicker from "../../components/higherOrderComponent/ColorPicker/ColorPicker";
import DropDown from "../../components/higherOrderComponent/Dropdown/Dropdown";
import popup_img from "../../../src/images/newsletter_left_img.png";
import { useNavigate, useParams } from "react-router-dom";
import sucessImg from "../../../src/images/success_fn.png";
import FormSubmitHandler from "../../components/FormSubmitHandler";
import ArrowMasterFormSvg from "../../images/svg-icons/ArrowMasterFormSvg";
import toast from 'react-hot-toast';
import Loader from "../../common/Loader";

const MasterForm = () => {
	console.log(['test']);

	const [loading, setLoading] = useState(false);
	const templateFieldCss = {
		bgColor: 'rgb(255, 255, 255)',
		borderColor: 'rgb(209, 213, 219)',
		focusBorderColor: 'rgb(0, 123, 255)',
		placeholderTextColor: 'rgb(107 114 128)',
		formHeadingColor: 'rgb(0, 0, 0)',
		textColor: 'rgb(0, 0, 0)',
		letterSpacing: '1px',
		inputFontSize: '14px',
		templateBgColor: 'rgb(0, 0, 0)',
		templateOverlayColor: 'rgb(255, 255, 255)',
		fontWeight: 'normal',
		fontFamily: 'Arial',
		borderRadius: '',
		borderWidth: '2px',
		templateBorderColor: 'rgb(255, 255, 255)',
		templatePaddingTop: '4px',
		templatePaddingBottom: '4px',
		templatePaddingLeft: '4px',
		templatePaddingRight: '4px',
		formBorderStyle: "Solid",
		formType: "full page",
		formWidth: "large",
		templateMinHeight: "500px"
	};

	const [templateDesign, setTemplateDesign] = useState(templateFieldCss);
	const [templateContent, setTemplateContent] = useState(null);

	useEffect(() => {
		console.log(['check 1']);

		const getSubTemplate = async () => {
			setLoading(true);
			await FormSubmitHandler({
				method: "get",
				url: "sub/template/1",
			}).then(res => {
				const data = res.data;
				console.log(['data', data.body_html]);
				setTemplateContent(data.body_html);
				toast.success(res.message);
			}).catch(err => {
				toast.error(err.message);
			}).finally(() => {
				setLoading(false);
			});
		}
		getSubTemplate();
	}, []);

	const handleTemplateChange = (colorType) => (templateDesign) => {
		setTemplateDesign((prev) => ({ ...prev, [colorType]: templateDesign }));
	};

	const combinedPadding = `
    ${templateDesign.templatePaddingTop} 
    ${templateDesign.templatePaddingRight} 
    ${templateDesign.templatePaddingBottom} 
    ${templateDesign.templatePaddingLeft}
  `;

	const inputColorFields = [
		{ label: 'Background Color', colorType: 'bgColor' },
		{ label: 'Border Color', colorType: 'borderColor' },
		{ label: 'Focus Border Color', colorType: 'focusBorderColor' },
	];

	const inputTextColorFields = [
		{ label: 'Label Color', colorType: 'formHeadingColor' },
		{ label: 'Text Color', colorType: 'textColor' },
		{ label: 'Placeholder Color', colorType: 'placeholderTextColor' },
	];

	const templateBgField = [
		{ label: 'Background color', colorType: 'templateBgColor' },
		{ label: 'Overlay color:', colorType: 'templateOverlayColor' },
	];
	const fontFamilyList = [
		{ label: 'Arial', },
		{ label: 'Arial Black' },
		{ label: 'Century Gothic' },
		{ label: 'Comic Sans MS' },
		{ label: 'Courier' },
		{ label: 'Geneva' },
	];


	const borderStyles = [
		{ value: 'none', label: 'None' },
		{ value: 'solid', label: 'Solid' },
		{ value: 'dashed', label: 'Dashed' },
		{ value: 'dotted', label: 'Dotted' },
	];

	const defaultBoxClassName = "w-32 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary";


	const navigate = useNavigate();
	const { id } = useParams();
	const [checkedItems, setCheckedItems] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [frequency, setFrequency] = useState(5);
	const [checkDesktop, setDesktop] = useState(false);
	const [checkMobile, setMobile] = useState(false);
	const [showUrl, setURL] = useState(false);
	const [notShowUrl, setNotShow] = useState(false);
	const [showLocation, setLocation] = useState(false);
	const [notShowlocation, setNotShowLocation] = useState(false);
	const [sucess, setSucess] = useState(false);
	const [isView, setView] = useState("Desktop");
	const [activeTab, setActiveTab] = useState("Desktop");
	const [selectedTiming, setTiming] = useState("");
	const [checkedrules, setRules] = useState({
		type: "",
		settings: {
			existing_page: {
				is_selected: "",
			},
			after_delay_time: {
				is_selected: false,
				key: "seconds",
				value: "",
			},
			after_scroll_distance: {
				is_selected: false,
				key: "percentage",
				value: "",
			},
			after_pages_visit: {
				is_selected: false,
				key: "pages",
				value: "",
			},
		},
	});

	const toggleAccordion = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	const visitorsDropdown = {
		label: "Visitors",
		placeholder: "Select your visitior",
		options: [
			{
				value: "Don’t show to existing Klaviyo profiles",
				label: "Don’t show to existing Klaviyo profiles",
			},
			{ value: "Show to all visitors", label: "Show to all visitors" },
			{
				value: "Show to any existing profile",
				label: "Show to any existing profile",
			},
			{
				value: "Show to email subscribers only",
				label: "Show to email subscribers only",
			},
			{
				value: "Show to SMS subscribers only",
				label: "Show to SMS subscribers only",
			},
			{
				value: "Show to specific profiles in a list or segment",
				label: "Show to specific profiles in a list or segment",
			},
		],
	};

	const formTypeDropdown = {
		label: "Form Type",
		placeholder: "Select form type",
		options: [
			{ value: "full page", label: "Full page" },
			{ value: "embed", label: "Embed" },
		],
	};

	const widthDropdown = {
		label: "Form width",
		placeholder: "Select form width",
		options: [
			{ value: "small", label: "Small" },
			// { value: "medium", label: "Medium" },
			{ value: "large", label: "Large" },
		],
	};

	const timingOptions = [
		{ value: "Immediately", label: "Immediately" },
		{ value: "Based on rules", label: "Based on rules" },
		{ value: "Only on a custom trigger", label: "Only on a custom trigger" },
	];

	const deviceOptions = [
		{ value: "Both desktop and mobile", label: "Both desktop and mobile" },
		{ value: "Desktop only", label: "Desktop only" },
		{ value: "Mobile only", label: "Mobile only" },
	];

	const tabs = [
		{ name: "All Devices", icon: "fa-solid fa-desktop" },
		{ name: "Desktop", icon: "fa-solid fa-desktop" },
		{ name: "Mobile", icon: "fa-solid fa-mobile-alt" },
	];

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		// if (tab === "Mobile") {
		//   setView("Mobile");
		// } else {
		//   setView("Desktop");
		// }
	};

	const onTimingChange = (value) => {
		console.log(value, "hlojoloj");
		setTiming(value);
	};

	const onPublish = async () => {
		const pid = id.split('s')[0];
		const sid = id.split('s')[1];
		const response = await FormSubmitHandler({
			method: "get",
			url: `suggestion/${sid}/publish`,
		});
		if (response.success) {
			navigate(`/suggestion/list/${pid}`);
		}
	};

	const templateEditorCollapesOptions = [
		{
			title: "Style",
			content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
			tag: "style",
		},
		{
			title: "Targeting & behavior",
			content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
			tag: "target",
		},
		{
			title: "Add blocks",
			subtitle: "Coming Soon",
			content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
			tag: "block",
		},
	];

	const getFormWidthClass = () => {
		console.log('Current form width:', templateDesign.formWidth);
		console.log('Current form type:', templateDesign.formType);
		let sss = '';
		if (templateDesign.formType === "embed" || templateDesign.formWidth === "large") {
			sss = "h-auto ";
		}
		if (templateDesign.formWidth === "small") {
			sss += "w-10/12 h-auto ";
		}

		if (templateDesign.formType === "full page" || templateDesign.formWidth === "large") {
			sss += "max-w-full h-full transition-all duration-300";
		} else {
			sss += "w-1/2";
		}
		return sss;
	};

	const getViewClass = () => {
		let bbb = '';
		if (isView === "Desktop") {
			// return "grid grid-cols-12 items-center bg-white shadow-lg";
			bbb = "grid grid-cols-12 items-center bg-white shadow-lg ";
		} else {
			bbb = "max-h-[586px] overflow-y-auto w-[375px] ";
		}
		if (isView === "Mobile") {
			if (templateDesign.formType === "full page" && templateDesign.formWidth === "small") {
				// return "overflow-y-auto w-min"
				bbb += " overflow-y-auto w-min ";
			}
			if (templateDesign.formType === "embed" && templateDesign.formWidth === "small") {
				// return "overflow-y-auto w-min";
				bbb += " overflow-y-auto w-min ";
			}
		}
		return bbb;
	};

	const mainFormStyle = () => {
		return {
			borderRadius: templateDesign.borderRadius,
			borderWidth: templateDesign.borderWidth,
			borderColor: templateDesign.templateBorderColor,
			padding: combinedPadding,
			borderStyle: templateDesign.formBorderStyle,
			minHeight: templateDesign.templateMinHeight
		}
	}

	const inputStyle = {
		backgroundColor: templateDesign.bgColor,
		borderColor: templateDesign.borderColor,
		borderWidth: "1px",
		"--placeholder-color": templateDesign.placeholderTextColor,
		color: templateDesign.textColor,
		letterSpacing: templateDesign.letterSpacing,
		fontSize: templateDesign.inputFontSize,
		fontWeight: templateDesign.fontWeight,
		fontFamily: templateDesign.fontFamily,
	};

	const coverPageClassName = () => {
		let coverPageClass = "";
		if (templateDesign.formType == 'full page') {
			coverPageClass = "h-full ";
		}
		if (isView == 'Desktop') {
			coverPageClass += "xl:col-span-5 ";
		} else {
			coverPageClass += "sm:col-span-12 bg-white shadow-lg flex flex-wrap";
		}
		return coverPageClass;
	}

	return (
		<>
			{loading && <Loader />}
			<aside className="w-1/4  fixed left-[4.7rem] p-4 shadow-lg h-screen overflow-auto top-20" >
				<div className="flex justify-between items-center border-b pb-3 mb-4">
					<p className="font-semibold text-lg">Template Editor</p>
				</div>
				<ul className="space-y-4">
					{
						templateEditorCollapesOptions.map((item, index) => (
							<li key={index} className={`border rounded-lg ${activeIndex === index ? "border-blue-500" : "border-gray-300"}`}>
								<h3 className="p-4 flex justify-between items-center cursor-pointer font-semibold text-lg" onClick={() => toggleAccordion(index)}>
									<span> {item.title} </span>
									<span className="text-sm font-normal">{item.subtitle}</span>
									<ArrowMasterFormSvg isActive={activeIndex === index} isHidden={item.tag === "block"} />
								</h3>
								{activeIndex === index && item.tag === "style" && (
									<div className="p-4 border-t">
										<div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
											<div className="col-span-12 xl:col-span-12">
												<div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
													<div className="w-full flex flex-col gap-9">
														<div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
															<form action="#">
																<div className="p-3">
																	<div className="mb-6">
																		<label className="mb-2.5 block">
																			<div className="mb-6">
																				<DropDown jsonData={{
																					...formTypeDropdown,
																					onChange: handleTemplateChange('formType'),
																					defaultValue: templateDesign.formType
																				}}
																				/>
																			</div>
																		</label>
																	</div>
																	<div className="mb-6">
																		<label className="mb-2.5 block">
																			<div className="mb-6">
																				<DropDown jsonData={{
																					...widthDropdown,
																					onChange: handleTemplateChange('formWidth'),
																					defaultValue: templateDesign.formWidth

																				}} />
																			</div>
																		</label>
																	</div>
																	<div className="mt-3 flex justify-between flex-row ">
																		<span>Minimum Height(px):</span>
																		<input
																			id="minumum-height"
																			type="number"
																			value={templateDesign.templateMinHeight.replace("px", "") || ""}
																			onChange={(e) => handleTemplateChange("templateMinHeight")(e.target.value + "px")}
																			className={`${defaultBoxClassName} h-10`}
																		/>
																	</div>
																	<div className="mt-3 fonr font-semibold text-black">
																		Show On
																	</div>
																	<div className="flex items-center space-x-2 bg-slate-100 p-2 rounded-md">
																		{tabs.map((tab) => (
																			<button
																				key={tab.name}
																				onClick={() => handleTabClick(tab.name)}
																				className={`flex items-center space-x-1 px-4 py-2 rounded-md ${activeTab === tab.name
																					? "bg-white shadow-sm text-gray-900"
																					: "text-gray-500 hover:text-gray-700"
																					}`}
																			>
																				<span>{tab.name}</span>
																			</button>
																		))}
																	</div>
																	<div className="mb-4.5 mt-3  border-b border-black pb-4">
																		<label className="mb-2.5 block text-black dark:text-white font-semibold">
																			Form Background
																		</label>
																		{templateBgField.map(({ label, colorType }) =>
																			<div className="mt-3 flex justify-between flex-row items-center" key={colorType}>
																				<span>{label}:</span>
																				<ColorPicker defaultColor={templateDesign[colorType]} onChange={handleTemplateChange(colorType)} />
																			</div>
																		)}
																	</div>
																	<div className="mb-4.5 border-b border-black pb-4">
																		<label className="mb-2.5 block text-black dark:text-white font-semibold">
																			Form Styles
																		</label>
																		<div className="mt-3 flex justify-between flex-row items-center">
																			<span>Corner Radius(px):</span>
																			<input
																				id="border-radius"
																				type="number"
																				placeholder="px"
																				value={templateDesign.borderRadius.replace("px", "") || ""}
																				onChange={(e) => handleTemplateChange('borderRadius')(e.target.value + 'px')}
																				className={`${defaultBoxClassName} h-10`}
																			/>
																		</div>
																		<div className="mt-3 flex justify-between flex-row items-center">
																			<span>Border style:</span>
																			<select
																				onChange={(e) => handleTemplateChange("formBorderStyle")(e.target.value)}
																				value={templateDesign.formBorderStyle}
																				className={`${defaultBoxClassName} h-12`}
																			>
																				{borderStyles.map((style) => (
																					<option key={style.value} value={style.value}>
																						{style.label}
																					</option>
																				))}
																			</select>
																		</div>
																		{templateDesign.formBorderStyle != "none" && (
																			<>
																				<div className="mt-3 flex justify-between flex-row ">
																					<span>Border color:</span>
																					<ColorPicker defaultColor={templateDesign.templateBorderColor} onChange={(color) => handleTemplateChange("templateBorderColor")(color)} />
																				</div>
																				<div className="mt-3 flex justify-between flex-row ">
																					<span>Border Thickness:</span>
																					<input
																						id="border-thickness"
																						type="number"
																						placeholder="px"
																						className={`${defaultBoxClassName} h-10`}
																						value={templateDesign.borderWidth.replace("px", "") || ""}
																						onChange={(e) => handleTemplateChange('borderWidth')(e.target.value + 'px')}
																					/>
																				</div>
																			</>
																		)}
																		<div className="flex flex-col">
																			<label className="mb-2">Padding(px):</label>
																			<div className="flex gap-4 justify-end">
																				<div className="flex flex-col">
																					<label className="mb-1">Top</label>
																					<div className="flex items-center">
																						<input
																							type="number"
																							className={`${defaultBoxClassName} h-10`}
																							placeholder="px"
																							value={templateDesign.templatePaddingTop.replace("px", "") || ""}
																							onChange={(e) => handleTemplateChange("templatePaddingTop")(e.target.value + "px")}
																						/>
																					</div>
																				</div>
																				<div className="flex flex-col">
																					<label className="mb-1">Bottom</label>
																					<div className="flex items-center">
																						<input
																							type="number"
																							className={`${defaultBoxClassName} h-10`}
																							placeholder="px"
																							value={templateDesign.templatePaddingBottom.replace("px", "") || ""}
																							onChange={(e) => handleTemplateChange("templatePaddingBottom")(e.target.value + "px")}
																						/>
																					</div>
																				</div>
																			</div>
																			<div className="flex gap-4 mt-4 justify-end">
																				<div className="flex flex-col">
																					<label className="mb-1">Left</label>
																					<div className="flex items-center">
																						<input
																							type="number"
																							className={`${defaultBoxClassName} h-10`}
																							placeholder="px"
																							value={templateDesign.templatePaddingLeft.replace("px", "") || ""}
																							onChange={(e) => handleTemplateChange("templatePaddingLeft")(e.target.value + "px")}
																						/>
																					</div>
																				</div>
																				<div className="flex flex-col">
																					<label className="mb-1">Right</label>
																					<div className="flex items-center">
																						<input
																							type="number"
																							className={`${defaultBoxClassName} h-10`}
																							placeholder="px"
																							value={templateDesign.templatePaddingRight.replace("px", "") || ""}
																							onChange={(e) => handleTemplateChange("templatePaddingRight")(e.target.value + "px")}
																						/>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>

																	<div className="mb-4.5 border-b border-black pb-4">
																		<label className="mb-2.5 block text-black dark:text-white font-semibold">
																			Input Field Text Styles
																		</label>
																		<div className="mt-3 flex justify-between flex-row items-center">
																			<span>Font:</span>
																			<select
																				onChange={(e) => handleTemplateChange("fontFamily")(e.target.value)}
																				value={templateDesign.fontFamily}
																				className={`${defaultBoxClassName} h-12`}
																			>
																				{fontFamilyList.map((item) => (
																					<option key={item.label} value={item.label}>
																						{item.label}
																					</option>
																				))}
																			</select>
																			<input
																				id="border-thickness"
																				type="number"
																				className={`${defaultBoxClassName} h-10`}
																				placeholder="px"
																				value={templateDesign.inputFontSize.replace("px", "") || ""}
																				onChange={(e) => handleTemplateChange("inputFontSize")(e.target.value + "px")} />
																		</div>
																		<div className="mt-3 flex justify-between flex-row items-center">
																			<span>Font weight:</span>
																			<select
																				onChange={(e) => handleTemplateChange('fontWeight')(e.target.value)}
																				value={templateDesign.fontWeight}
																				className={`${defaultBoxClassName} h-12`}
																			>
																				<option value="700">Bold</option>
																				<option value="400">Normal</option>
																				<option value="800">Extra Bold</option>

																			</select>
																		</div>
																		<div className="mt-3 flex justify-between flex-row items-center">
																			<span>Letter Spacing(px):</span>
																			<input
																				id="letter-spacing"
																				type="number"
																				className={`${defaultBoxClassName} h-10`}
																				placeholder="px"
																				value={templateDesign.letterSpacing.replace("px", "") || ""}
																				onChange={(e) => handleTemplateChange('letterSpacing')(e.target.value + 'px')}
																			/>
																		</div>
																		{inputTextColorFields.map(({ label, colorType }) => (
																			<div className="mt-3 flex justify-between items-center" key={colorType}>
																				<span>{label}:</span>
																				<ColorPicker defaultColor={templateDesign[colorType]} onChange={handleTemplateChange(colorType)} />
																			</div>
																		))}
																	</div>
																	<div className="mb-4.5 border-b border-black pb-4">
																		<label className="mb-2.5 block text-black dark:text-white font-semibold">
																			Input Field Styles
																		</label>
																		{inputColorFields.map(({ label, colorType }) => (
																			<div className="mt-3 flex justify-between items-center" key={colorType}>
																				<span>{label}:</span>
																				<ColorPicker defaultColor={templateDesign[colorType]} onChange={handleTemplateChange(colorType)} />
																			</div>
																		))}
																	</div>
																	<button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
																		Save
																	</button>
																</div>
															</form>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								)}
								{activeIndex === index && item.tag === "target" && (
									<div className="col-span-12 xl:col-span-12">
										<div className="p-4 border-t">
											<div className=" bg-white">
												<div className="mb-4 border-b border-black border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-lg">
													<div className="mb-8 p-3">
														<div className="mb-4 border-b border-black pb-5">
															<label className="mb-2.5 block text-lg font-semibold">
																Timing
															</label>
															<Radio
																jsonData={timingOptions}
																onChange={onTimingChange}
															/>
															{selectedTiming == "Based on rules" && (
																<div className="mb-4 mt-3">
																	<div className="text-sm font-semibold">
																		Select the rules
																	</div>
																	<div className="mb-4.5 mt-3">
																		<Checkbox
																			key={1}
																			label="When visitor is exiting the page"
																			checked={
																				checkedrules?.settings?.existing_page
																					?.is_selected
																			}
																			onChange={() =>
																				setRules((prevState) => ({
																					...prevState,
																					settings: {
																						...prevState.settings,
																						existing_page: {
																							...prevState.settings.existing_page
																								.is_selected,
																							is_selected:
																								!checkedrules?.settings
																									?.existing_page?.is_selected,
																						},
																					},
																				}))
																			}
																		/>
																	</div>
																	<div className="mb-4.5">
																		<Checkbox
																			key={2}
																			label="After time delay"
																			checked={
																				checkedrules?.settings?.after_delay_time
																					.is_selected
																			}
																			onChange={() =>
																				setRules((prevState) => ({
																					...prevState,
																					settings: {
																						...prevState.settings,
																						after_delay_time: {
																							...prevState.settings
																								.after_delay_time.is_selected,
																							is_selected:
																								!checkedrules?.settings
																									?.after_delay_time.is_selected,
																							key: "seconds",
																							value: "",
																						},
																					},
																				}))
																			}
																		/>
																		{checkedrules?.settings?.after_delay_time
																			.is_selected && (
																				<div className="ml-9">
																					<div>Show again after</div>
																					<input
																						type="number"
																						value={
																							checkedrules?.settings
																								?.after_delay_time?.value
																								? checkedrules?.settings
																									?.after_delay_time?.value
																								: 0
																						}
																						onChange={(event) =>
																							setRules((prevState) => ({
																								...prevState,
																								settings: {
																									...prevState.settings,
																									after_delay_time: {
																										...prevState.settings
																											.after_delay_time.value,
																										is_selected:
																											checkedrules?.settings
																												?.after_delay_time
																												.is_selected,
																										key: "seconds",
																										value: event.target.value,
																									},
																								},
																							}))
																						}
																						className="mt-2 w-25 border border-gray-300 rounded p-1 text-center"
																						placeholder="seconds"
																					/>
																				</div>
																			)}
																	</div>
																	<div className="mb-4.5">
																		<Checkbox
																			key={3}
																			label="After visitor has scrolled a certain amount"
																			checked={
																				checkedrules?.settings
																					?.after_scroll_distance.is_selected
																			}
																			onChange={() =>
																				setRules((prevState) => ({
																					...prevState,
																					settings: {
																						...prevState.settings,
																						after_scroll_distance: {
																							...prevState.settings
																								.after_scroll_distance,
																							is_selected:
																								!checkedrules?.settings
																									?.after_scroll_distance
																									.is_selected,
																						},
																					},
																				}))
																			}
																		/>
																		{checkedrules?.settings?.after_scroll_distance
																			.is_selected && (
																				<div className="ml-9">
																					<div>Scroll distance</div>
																					<input
																						type="number"
																						value={
																							checkedrules?.settings
																								?.after_scroll_distance?.value
																						}
																						onChange={(event) =>
																							setRules((prevState) => ({
																								...prevState,
																								settings: {
																									...prevState.settings,
																									after_scroll_distance: {
																										...prevState.settings
																											.after_scroll_distance,
																										is_selected:
																											checkedrules?.settings
																												?.after_scroll_distance
																												.is_selected,
																										key: "seconds",
																										value: event.target.value,
																									},
																								},
																							}))
																						}
																						className="mt-2 w-25 border border-gray-300 rounded p-1 text-center"
																						placeholder="%"
																					/>
																				</div>
																			)}
																	</div>
																	<div className="mb-4.5">
																		<Checkbox
																			key={4}
																			label="After visitor sees a certain number of pages"
																			checked={
																				checkedrules?.settings?.after_pages_visit
																					.is_selected
																			}
																			onChange={() =>
																				setRules((prevState) => ({
																					...prevState,
																					settings: {
																						...prevState.settings,
																						after_pages_visit: {
																							...prevState.settings
																								.after_pages_visit,
																							is_selected:
																								!checkedrules?.settings
																									?.after_pages_visit.is_selected,
																						},
																					},
																				}))
																			}
																		/>
																		{checkedrules?.settings?.after_pages_visit
																			.is_selected && (
																				<div className="ml-9">
																					<div>After</div>
																					<input
																						type="number"
																						value={
																							checkedrules?.settings
																								?.after_pages_visit?.value
																						}
																						onChange={(event) =>
																							setRules((prevState) => ({
																								...prevState,
																								settings: {
																									...prevState.settings,
																									after_pages_visit: {
																										...prevState.settings
																											.after_pages_visit,
																										is_selected:
																											checkedrules?.settings
																												?.after_pages_visit
																												.is_selected,
																										key: "pages",
																										value: event.target.value,
																									},
																								},
																							}))
																						}
																						className="mt-2 w-25 border border-gray-300 rounded p-1 text-center"
																						placeholder="pages"
																					/>
																				</div>
																			)}
																	</div>
																</div>
															)}
														</div>

														<div className="mb-4 border-b border-black">
															<h3 className="text-lg font-semibold">Frequency</h3>
															<div className="flex items-center mt-3">
																<div className="text-black">
																	After a visitor closes this form, show again
																	after{" "}
																</div>
															</div>
															<input
																type="number"
																value={frequency}
																onChange={(e) => setFrequency(e.target.value)}
																className="mt-2 w-25 border border-gray-300 rounded p-1 text-center"
																placeholder="5 days"
															/>
															<span className="ml-2">days</span>
															<div className="mb-4.5 mt-6">
																<Checkbox
																	key={"abc"}
																	label="Don’t show again if form was submitted or if go to URL button was clicked"
																	checked={checkedItems}
																	onChange={() => setCheckedItems(!checkedItems)}
																/>
															</div>
														</div>

														<div className="mb-4 border-b border-black pb-5">
															<label className="mb-2.5 block text-lg font-semibold">
																Devices
															</label>
															<Radio
																jsonData={deviceOptions}
																onChange={() => { }}
															/>
														</div>
														<div className="mb-4 border-b border-black">
															<div className="text-lg font-semibold">
																Click outside form to close
															</div>
															<span className="text-sm font-medium">
																Select all that apply.
															</span>
															<div className="mb-4.5 mt-6">
																<Checkbox
																	key={2}
																	label="On desktop"
																	checked={checkDesktop}
																	onChange={() => setDesktop(!checkDesktop)}
																/>
															</div>
															<div className="mb-4.5">
																<Checkbox
																	key={3}
																	label="On mobile"
																	checked={checkMobile}
																	onChange={() => setMobile(!checkMobile)}
																/>
															</div>
														</div>

														<div className="mb-4 border-b border-black">
															<label className="mb-2.5 block text-lg ">
																<div className="mb-6">
																	<DropDown jsonData={visitorsDropdown} />
																</div>
															</label>
														</div>

														<div className="mb-4 border-b border-black">
															<h3 className="text-lg font-semibold">URLS</h3>
															<div className="mb-4.5 mt-6">
																<Checkbox
																	key={2}
																	label="Only show on certain URLs"
																	checked={showUrl}
																	onChange={() => setURL(!showUrl)}
																/>
															</div>
															<div className="mb-4.5">
																<Checkbox
																	key={3}
																	label="Don’t show on certain URLs"
																	checked={notShowUrl}
																	onChange={() => setNotShow(!notShowUrl)}
																/>
															</div>
														</div>

														<div className="mb-4 border-b border-black">
															<h3 className="text-lg font-semibold">Location</h3>
															<div className="flex items-center mt-3">
																<div className="text-black font-medium">
																	Based on visitors IP address
																</div>
															</div>
															<div className="mb-4.5 mt-6">
																<Checkbox
																	key={2}
																	label="Show to visitors in certain locations"
																	checked={showLocation}
																	onChange={() => setLocation(!showLocation)}
																/>
															</div>
															<div className="mb-4.5">
																<Checkbox
																	key={3}
																	label="Don’t show to visitors in certain locations"
																	checked={notShowlocation}
																	onChange={() =>
																		setNotShowLocation(!notShowlocation)
																	}
																/>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								)}
							</li>
						))}
				</ul>
			</aside>

			<div className="w-3/4 float-right p-0 h-[83.90vh]">
				<div className="flex justify-between p-4 pl-10 pr-10 border-l border-[#eaedef] items-center flex-wrap w-full bg-white shadow-[6px_0px_7px_#ccc]">
					<div className="w-[70%] flex justify-center">
						<div
							className={`border border-[#323359] ${!sucess ? "bg-[#d0d5d9]" : "bg-white"
								}  inline-block p-2 px-3 mr-5 text-black text-sm font-semibold rounded relative cursor-pointer`}
							onClick={() => setSucess(false)}
						>
							Teaser
						</div>
						<div
							className={`border border-[#323359] ${sucess ? "bg-[#d0d5d9]" : "bg-white"
								} inline-block p-2 px-3 mr-5 text-black text-sm font-semibold rounded relative cursor-pointer`}
							onClick={() => setSucess(true)}
						>
							Success
						</div>
					</div>

					<div className="flex">
						<button
							type="submit"
							onClick={() => onPublish()}
							className="inline-block p-2 px-3 mr-5 text-white text-sm font-semibold rounded relative bg-black"
						>
							Publish
						</button>
						<a
							className={`rounded-l-md  ${isView === "Desktop" ? "bg-[#d0d5d9]" : ""
								}  p-1.5 px-2.5 text-base border border-[#ccc] -ml-px text-black leading-[22px]`}
							href="#"
							onClick={() => setView("Desktop")}
						>
							<i className="fa fa-desktop" aria-hidden="true"></i>
						</a>
						<a
							className={`rounded-r-md text-lg border border-[#ccc] -ml-px text-black leading-[22px]  ${isView === "Mobile" ? "bg-[#eaedef]" : ""
								} p-1.5 px-2.5`}
							href="#"
							onClick={() => setView("Mobile")}
						>
							<i className="fa fa-mobile" aria-hidden="true"></i>
						</a>
					</div>
				</div>
				<div
					className={`h-full flex items-center justify-center ${isView !== "Desktop" ? "min-h-[785px] bg-no-repeat bg-top bg-center" : "gap-8"}`}
					style={{
						backgroundColor: templateDesign.templateBgColor,
						backgroundImage: isView !== "Desktop" ? "url('https://apps.qeapps.com/ecom_apps_n/production/qqqe-frontend/src/images/mobile_bg.png')" : ""
					}}>

					<div className={`${getFormWidthClass()} ${getViewClass()}`} style={mainFormStyle()}>
						<div className={`${coverPageClassName()}`}>
							<img src={popup_img} alt="Promo" className="h-full w-full object-cover" />
						</div>

						<div className={`${isView === "Desktop" ? "xl:col-span-7" : "sm:col-span-12"} p-8 flex flex-col justify-center h-full `}
							style={{
								backgroundColor: templateDesign.templateOverlayColor
							}}>
							{sucess ? (
								<div className="flex flex-col justify-center text-center items-center">
									<img src={sucessImg} alt="Success" className="inline-block max-w-[130px]" />
									<p className="text-lg mt-10">
										Thanks for sharing. Please check your email for confirmation message.
									</p>
								</div>
							) : (
								<>
									<h2 className="text-4xl font-bold mb-4">
										Limited Time<br />10% off
									</h2>
									<p className="text-lg mb-6">
										Save on your first order and get email-only offers when you join.
									</p>
									<form className="flex flex-col space-y-4">
										<input
											type="email"
											placeholder="Email"
											className="p-3 rounded-md focus:outline-none"
											style={inputStyle}
											onFocus={(e) => (e.target.style.borderColor = templateDesign.focusBorderColor)}
											onBlur={(e) => (e.target.style.borderColor = templateDesign.borderColor)}
										/>
										<button className="bg-black text-white py-3 rounded-md text-lg">Continue</button>
									</form>
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="clear-both"></div>
			<style>
				{
					`input::placeholder {
								color: var(--placeholder-color); /* Dynamic placeholder color */
						}`
				}
			</style>
		</>
	);
}

export default MasterForm;