import { LogoDisplayerSVGProps } from "@/Components/typescriptInterfaces/Interfaces";

export const LogoDisplayerSVG = ({
	isInstagram = true,
	isOpen = false,
	isLanguage = false,
	idiomaSelected = "es",
}: LogoDisplayerSVGProps) => {
	if (!isInstagram && !isLanguage) {
		return (
			<div
				id="music-media-btn"
				aria-describedby="music-media-tooltip"
				className="flex items-center gap-2"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 48 47"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
				>
					<circle
						cx="24.2764"
						cy="23.5"
						r="22.5"
						stroke="#F0F0F0"
						strokeWidth="2"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M31.1232 22.1862C27.3923 19.9706 21.2384 19.7671 17.6763 20.8484C17.1044 21.022 16.4996 20.6989 16.3269 20.1269C16.1533 19.5549 16.4755 18.9501 17.0484 18.7765C21.1372 17.5351 27.9334 17.7753 32.2285 20.3246C32.7426 20.6304 32.9114 21.294 32.6066 21.8081C32.3018 22.3222 31.6373 22.492 31.1232 22.1862ZM31.0016 25.4686C30.7393 25.893 30.1847 26.0261 29.7603 25.7657C26.6496 23.8539 21.9069 23.2993 18.2261 24.4162C17.7497 24.5609 17.2452 24.2918 17.1005 23.8153C16.9568 23.3379 17.2259 22.8353 17.7024 22.6897C21.9059 21.4146 27.1318 22.0319 30.7045 24.2282C31.129 24.4886 31.2621 25.0451 31.0016 25.4686ZM29.5847 28.6198C29.3773 28.9612 28.9327 29.0683 28.5931 28.8599C25.875 27.199 22.4538 26.8238 18.4248 27.7439C18.0371 27.8327 17.6503 27.5896 17.5616 27.2019C17.4728 26.8132 17.7149 26.4264 18.1036 26.3376C22.5126 25.3297 26.2946 25.7637 29.3455 27.6282C29.686 27.8356 29.793 28.2802 29.5847 28.6198ZM24.2768 11.9253C17.8847 11.9253 12.7021 17.1078 12.7021 23.4999C12.7021 29.893 17.8847 35.0745 24.2768 35.0745C30.6698 35.0745 35.8514 29.893 35.8514 23.4999C35.8514 17.1078 30.6698 11.9253 24.2768 11.9253Z"
						fill="white"
					/>
				</svg>
				<svg
					width="10"
					height="8"
					viewBox="0 0 10 8"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`w-2 h-2 sm:w-2 sm:h-2 lg:w-3 lg:h-3 ${
						!isOpen ? "rotate-90" : ""
					}`}
				>
					<path
						d="M5.89593 7.26123C5.51103 7.92789 4.54878 7.9279 4.16388 7.26123L1.03585 1.84332C0.65095 1.17665 1.13207 0.343319 1.90187 0.343319L8.15794 0.34332C8.92774 0.34332 9.40886 1.17665 9.02396 1.84332L5.89593 7.26123Z"
						fill="#D9D9D9"
					/>
				</svg>
			</div>
		);
	}  else if (isLanguage) {
		// Bandera de España
		const banderaES = (
			<svg
				width="20"
				height="20"
				viewBox="0 0 48 47"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
			>
				<circle
					cx="24.2764"
					cy="23.5"
					r="22.5"
					stroke="#F0F0F0"
					strokeWidth="2"
				/>
				{/* Bandera España - Franjas roja/amarilla/roja */}
				<rect x="12" y="15" width="24" height="17" fill="#C60B1E"/>
				<rect x="12" y="19" width="24" height="9" fill="#FFC400"/>
			</svg>
		);

		// Bandera de Estados Unidos
		const banderaUS = (
			<svg
				width="20"
				height="20"
				viewBox="0 0 48 47"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
			>
				<circle
					cx="24.2764"
					cy="23.5"
					r="22.5"
					stroke="#F0F0F0"
					strokeWidth="2"
				/>
				{/* Bandera USA - Franjas */}
				<rect x="12" y="15" width="24" height="17" fill="#B22234"/>
				<rect x="12" y="15" width="24" height="1.4" fill="white"/>
				<rect x="12" y="17.8" width="24" height="1.4" fill="white"/>
				<rect x="12" y="20.6" width="24" height="1.4" fill="white"/>
				<rect x="12" y="23.4" width="24" height="1.4" fill="white"/>
				<rect x="12" y="26.2" width="24" height="1.4" fill="white"/>
				<rect x="12" y="29" width="24" height="1.4" fill="white"/>
				{/* Cuadrante azul con estrellas */}
				<rect x="12" y="15" width="9.6" height="9.8" fill="#3C3B6E"/>
			</svg>
		);

		return (
			<div
				id="language-btn"
				aria-describedby="language-tooltip"
				className="flex items-center gap-2"
			>
				{idiomaSelected === "es" ? banderaES : banderaUS}
				<svg
					width="10"
					height="8"
					viewBox="0 0 10 8"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`w-2 h-2 sm:w-2 sm:h-2 lg:w-3 lg:h-3 ${
						!isOpen ? "rotate-90" : ""
					}`}
				>
					<path
						d="M5.89593 7.26123C5.51103 7.92789 4.54878 7.9279 4.16388 7.26123L1.03585 1.84332C0.65095 1.17665 1.13207 0.343319 1.90187 0.343319L8.15794 0.34332C8.92774 0.34332 9.40886 1.17665 9.02396 1.84332L5.89593 7.26123Z"
						fill="#D9D9D9"
					/>
				</svg>
			</div>
		);
	}

	return (
		<div
			id="social-media-btn"
			aria-describedby="social-media-tooltip"
			className="flex items-center gap-2"
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 47 47"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
			>
				<g filter="url(#filter0_d_504_39)">
					<path
						d="M23.3541 33.6458C21.7601 33.6458 20.1662 33.7128 18.5722 33.6309C15.0897 33.4597 12.8536 31.3228 12.7176 27.8829C12.5967 24.7484 12.5967 21.5989 12.7176 18.4569C12.846 15.1809 14.8253 12.9993 18.1265 12.7834C21.6015 12.56 25.1067 12.5898 28.5892 12.7834C31.6714 12.9621 33.6733 14.8607 33.8621 17.8985C34.0888 21.4947 34.051 25.1281 33.8017 28.7243C33.6053 31.5685 31.271 33.4671 28.355 33.6086C26.6931 33.683 25.016 33.6235 23.3465 33.6235C23.3465 33.6235 23.3465 33.6235 23.3465 33.6309L23.3541 33.6458ZM14.6666 23.155H14.5911C14.5911 24.2272 14.5835 25.2993 14.5911 26.3715C14.5911 26.8704 14.6364 27.3692 14.6666 27.8681C14.8026 30.0868 16.0566 31.5685 18.2851 31.6578C21.6166 31.7993 24.9632 31.8142 28.2946 31.6727C30.6289 31.5759 31.8905 30.2655 31.9811 27.9797C32.102 24.793 32.102 21.5915 31.9811 18.4048C31.898 16.0371 30.44 14.6746 28.0302 14.615C24.8952 14.5331 21.7526 14.5405 18.6175 14.615C16.2304 14.6746 14.7724 16.1488 14.6742 18.509C14.6062 20.0502 14.6591 21.5989 14.6591 23.1476L14.6666 23.155Z"
						fill="white"
					/>
					<path
						d="M23.3162 28.5977C20.2265 28.553 17.7865 26.096 17.8393 23.0805C17.8922 20.1172 20.4229 17.7197 23.4522 17.7644C26.4664 17.8091 28.8762 20.281 28.8384 23.289C28.8007 26.23 26.2926 28.6498 23.3162 28.6051V28.5977ZM19.7884 23.1624C19.7884 25.128 21.337 26.6842 23.3313 26.6916C25.2955 26.7065 26.9272 25.1132 26.9196 23.1922C26.9196 21.234 25.3408 19.6705 23.3616 19.6705C21.3597 19.6705 19.7884 21.1968 19.7884 23.1624Z"
						fill="white"
					/>
					<path
						d="M29.0348 16.2754C29.6996 16.2605 30.2888 16.8115 30.3266 17.4816C30.3644 18.1889 29.7978 18.792 29.0877 18.7994C28.4078 18.8143 27.8261 18.2782 27.7884 17.6007C27.7506 16.9083 28.3323 16.2903 29.0348 16.2679V16.2754Z"
						fill="white"
					/>
				</g>
				<circle
					cx="23.5"
					cy="23.5"
					r="22.5"
					stroke="#F0F0F0"
					strokeWidth="2"
				/>
				<defs>
					<filter
						id="filter0_d_504_39"
						x="10.627"
						y="10.6268"
						width="25.3854"
						height="25.0448"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
					>
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset />
						<feGaussianBlur stdDeviation="1" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_504_39"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_504_39"
							result="shape"
						/>
					</filter>
				</defs>
			</svg>
			<svg
				width="10"
				height="8"
				viewBox="0 0 10 8"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={`w-2 h-2 sm:w-2 sm:h-2 lg:w-3 lg:h-3 ${
					!isOpen ? "rotate-90" : ""
				}`}
			>
				<path
					d="M5.89593 7.26123C5.51103 7.92789 4.54878 7.9279 4.16388 7.26123L1.03585 1.84332C0.65095 1.17665 1.13207 0.343319 1.90187 0.343319L8.15794 0.34332C8.92774 0.34332 9.40886 1.17665 9.02396 1.84332L5.89593 7.26123Z"
					fill="#D9D9D9"
				/>
			</svg>
		</div>
	);
};
