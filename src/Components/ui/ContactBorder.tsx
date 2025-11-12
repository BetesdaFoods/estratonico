import Image from "next/image";

import { ReactNode } from "react";
import Button from "./Button";

interface ContactBorderProps {
	className: string;
	children?: ReactNode;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	status: "idle" | "loading" | "success" | "error";
	message: string;
	idioma: string;
}

const ContactBorder = ({ className, handleSubmit, status, message, idioma }: ContactBorderProps) => {
		return (
			<div className="absolute inset-0 z-0 flex justify-center lg:items-center w-full h-full">
				{/* Esquinas decorativas sin eventos */}
				<img
					src="/assets/contact/Frame_633.svg"
					alt="Contact Border Left Up"
					className="absolute top-[-15%] lg:top-0 left-[-8%] lg:left-0 pointer-events-none w-[35%] lg:w-[27%] xl:w-[27%]"
				/>
				<img
					src="/assets/contact/Frame_630.svg"
					alt="Contact Border Right Up"
					className="absolute top-[-15%] lg:top-0 right-[-1%] lg:right-0 pointer-events-none w-[35%] lg:w-[35%] xl:w-[38%]"
				/>
				<img
					src="/assets/contact/Frame_628.svg"
					alt="Contact Border Left Bottom"
					className="absolute bottom-0 lg:bottom-0 left-[-1%] lg:left-0 pointer-events-none w-[35%] lg:w-[35%] xl:w-[38%]"
				/>
				<img
					src="/assets/contact/Frame_629.svg"
					alt="Contact Border Right Bottom"
					className="absolute bottom-0 lg:bottom-0 right-[-5%] lg:right-0 pointer-events-none w-[35%] lg:w-[27%] xl:w-[27%]"
				/>
				{/* Fondo centrado sin eventos */}
				<svg viewBox="0 0 1290 419" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} pointer-events-none hidden lg:block mx-auto`} role="img" aria-label="Decorative border background" preserveAspectRatio="xMidYMid meet">
					<g filter="url(#filter0_d_1619_22162)">
						<path d="M141.109 344.241L134.509 349.744H94.0165L67.8467 324.938V178.618L71.9721 175.866V95.3937L67.8467 91.5415V86.0172L88.791 60.9568H877.355L882.326 66.4599H929.694L957.789 36.7007H1070.72L1081.74 48.2784H1108.46L1120.58 36.1504H1202.94L1243.41 76.9371L1243.96 157.113L1238.19 161.262L1238.46 207.827L1242.86 212.78L1243.41 322.186L1215.32 352.221L1020.05 351.67L1004.33 336.791L849.81 336.24L811.814 371.524H623.125L616.799 365.724H259.286L239.717 337.341H189.599L184.627 343.416L141.109 344.241Z" fill="#4A3385"/>
						<path d="M1258.48 125.641V56.5344L1229.92 28.2356H1197L1179.33 8.36081H1165.18L1160.57 2.0957H1115.68L1109.96 8.91112H955.208L944.609 23.3251H840.417L822.476 4.27579H662.538L631.27 35.0298H387.829L373.422 18.4358H41.0422L8.12368 52.4494V119.122L15.4648 126.191V138.425L29.618 152.585V189.329L1.05762 219.533V358.572L45.6542 404.015H115.024L120.461 409.2" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M19.0402 272.765H11.001V347.819L50.7528 388.457H111.914L143.162 417.942H300.329L331.576 385.346H828.04L853.956 360.772H967.796L990.56 383.547H1075.84L1084.32 393.389H1142.82L1162.9 373.726H1199.52" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M972.26 354.974L992.802 377.748H1079.86L1085.21 382.214H1137L1155.32 363.906" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M1258.46 248.213V338.443L1231.21 365.684H1164.69" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M1262.92 254.457L1271.85 245.081V143.23" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M37.4246 259.897V256.235L44.4907 251.367V182.895L39.6037 176.313V118.805L31.5645 110.021V54.2278L55.1956 30.8184H122.175L125.835 34.9669H344.819L349.918 40.8087" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M934.413 46.184H765.06L758.65 40.9772H451.995L442.581 48.9779H200.579L194.571 41.5698H116.908L112.698 39.1781H62.6641L40.0485 62.2066V96.8551L48.4474 103.459V171.952L52.2554 176.968V256.658L37.6367 272.088V334.971L66.4722 362.614V366.614H133.515L151.328 386.447H294.85L314.482 365.006H616.736L623.146 371.419H812.703L848.943 336.368H1004.27L1019.69 351.798H1215.26L1243.48 321.552V213.416L1238.27 208.399V161.348L1244.47 156.331V77.4249L1202.65 35.1777H1120.97L1107.95 47.5809H1081.34L1070.32 36.5747H957.43L930.012 65.8048H881.565L877.567 61.0001H86.8876V65.0005L68.2704 84.8329V91.6483L72.0573 95.8392V175.952L68.0588 179.169V324.558L93.8902 349.999H134.319L141.724 341.787" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M133.515 366.614L157.738 394.045H175.551V386.045" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M246.825 356.2H144.536L139.522 352.793L141.934 349.787H181.961L186.171 351.798" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M144.537 356.201L137.915 366.001L146.124 374.827H155.94L165.947 360.604H254.23L260.027 366.213H311.478" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M200.177 368.815H216.594L221.185 375.419" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M185.008 394.236H289.116" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M188.646 401.602H191.82" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M198.484 401.602H275.153" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="3.15 3.15"/>
						<path d="M278.495 401.602H281.668" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M318.988 407.528L324.446 402.702H814.691L825.587 391.802" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M980.616 351.037L983.218 343.607H1000.31L1015.95 358.106" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M15.9095 285.465C17.0079 285.465 17.8982 284.574 17.8982 283.475C17.8982 282.376 17.0079 281.485 15.9095 281.485C14.8112 281.485 13.9209 282.376 13.9209 283.475C13.9209 284.574 14.8112 285.465 15.9095 285.465Z" stroke="#4A3385" strokeWidth="0.75" strokeMiterlimit="10"/>
						<path d="M15.9095 293.634C17.0079 293.634 17.8982 292.744 17.8982 291.645C17.8982 290.546 17.0079 289.655 15.9095 289.655C14.8112 289.655 13.9209 290.546 13.9209 291.645C13.9209 292.744 14.8112 293.634 15.9095 293.634Z" stroke="#4A3385" strokeWidth="0.75" strokeMiterlimit="10"/>
						<path d="M15.9095 301.783C17.0079 301.783 17.8982 300.892 17.8982 299.793C17.8982 298.694 17.0079 297.804 15.9095 297.804C14.8112 297.804 13.9209 298.694 13.9209 299.793C13.9209 300.892 14.8112 301.783 15.9095 301.783Z" stroke="#4A3385" strokeWidth="0.75" strokeMiterlimit="10"/>
						<path d="M7.29832 39.5807C10.5465 39.5807 13.1797 36.9463 13.1797 33.6966C13.1797 30.4469 10.5465 27.8125 7.29832 27.8125C4.05015 27.8125 1.41699 30.4469 1.41699 33.6966C1.41699 36.9463 4.05015 39.5807 7.29832 39.5807Z" fill="#4A3385"/>
						<path d="M1252.83 166.279V208.04" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M1257.33 166.279V208.04" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M1272.74 271.071V342.739" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M1276.97 271.071V342.739" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M1268.55 376.944C1271.48 376.944 1273.86 374.565 1273.86 371.631C1273.86 368.697 1271.48 366.318 1268.55 366.318C1265.62 366.318 1263.24 368.697 1263.24 371.631C1263.24 374.565 1265.62 376.944 1268.55 376.944Z" fill="#4A3385"/>
						<path d="M1199.6 377.579C1201.44 377.579 1202.92 376.091 1202.92 374.256C1202.92 372.42 1201.44 370.933 1199.6 370.933C1197.77 370.933 1196.28 372.42 1196.28 374.256C1196.28 376.091 1197.77 377.579 1199.6 377.579Z" fill="#4A3385"/>
						<path d="M1155.32 366.742C1156.89 366.742 1158.16 365.472 1158.16 363.906C1158.16 362.339 1156.89 361.069 1155.32 361.069C1153.76 361.069 1152.49 362.339 1152.49 363.906C1152.49 365.472 1153.76 366.742 1155.32 366.742Z" fill="#4A3385"/>
						<path d="M972.747 359.164C974.394 359.164 975.73 357.828 975.73 356.18C975.73 354.531 974.394 353.195 972.747 353.195C971.099 353.195 969.764 354.531 969.764 356.18C969.764 357.828 971.099 359.164 972.747 359.164Z" fill="#4A3385"/>
						<path d="M1276.04 135.589C1278.82 135.589 1281.07 133.333 1281.07 130.551C1281.07 127.769 1278.82 125.514 1276.04 125.514C1273.26 125.514 1271 127.769 1271 130.551C1271 133.333 1273.26 135.589 1276.04 135.589Z" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M1119.1 10.2012H1158.96" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M464.498 412.206H605.565" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M605.523 23.7489C608.374 23.7489 610.685 21.4367 610.685 18.5844C610.685 15.7321 608.374 13.4199 605.523 13.4199C602.672 13.4199 600.361 15.7321 600.361 18.5844C600.361 21.4367 602.672 23.7489 605.523 23.7489Z" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M890.853 16.0017C894.977 16.0017 898.321 12.6566 898.321 8.53015C898.321 4.40373 894.977 1.05859 890.853 1.05859C886.728 1.05859 883.385 4.40373 883.385 8.53015C883.385 12.6566 886.728 16.0017 890.853 16.0017Z" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M771.025 41.8657C772.451 41.8657 773.606 40.7095 773.606 39.2834C773.606 37.8573 772.451 36.7012 771.025 36.7012C769.6 36.7012 768.444 37.8573 768.444 39.2834C768.444 40.7095 769.6 41.8657 771.025 41.8657Z" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M789.854 41.8657C791.28 41.8657 792.435 40.7095 792.435 39.2834C792.435 37.8573 791.28 36.7012 789.854 36.7012C788.429 36.7012 787.273 37.8573 787.273 39.2834C787.273 40.7095 788.429 41.8657 789.854 41.8657Z" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M758.649 40.9773V32.6802H802.357V29.082" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M802.78 45.8248L808.048 40.1523H858.124L863.54 45.973" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M931.239 46.2477L937.438 39.4746L947.445 39.5381L936.973 50.6502L931.239 46.2477Z" fill="#4A3385"/>
						<path d="M1087.16 39.5371H1103.62" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M63.3613 164.205V113.979" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M210.416 41.9727H222.961" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M229.753 42.3945H269.082" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M274.392 42.3945H295.209" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M435.536 30.119H409.62V24.2983L413.005 20.8906H422.927L426.354 24.3195V28.341" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M398.238 26.9023H393.922V31.2202H398.238V26.9023Z" fill="#4A3385"/>
						<path d="M404.881 26.9023H400.565V31.2202H404.881V26.9023Z" fill="#4A3385"/>
						<path d="M442.961 26.9023H438.646V31.2202H442.961V26.9023Z" fill="#4A3385"/>
						<path d="M1198.27 412.354L1214.54 393.749H1266.86L1288.94 370.488V40.1939L1256.4 4.14844" stroke="#4A3385" strokeMiterlimit="10"/>
					</g>
					<defs>
						<filter id="filter0_d_1619_22162" x="-69.4424" y="-69.4414" width="1428.88" height="557.883" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
							<feFlood floodOpacity="0" result="BackgroundImageFix"/>
							<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
							<feOffset/>
							<feGaussianBlur stdDeviation="35"/>
							<feComposite in2="hardAlpha" operator="out"/>
							<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
							<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1619_22162"/>
							<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1619_22162" result="shape"/>
						</filter>
					</defs>
					{/* WEB */}
					<foreignObject x="70" y="35" width="1170" height="340" className="hidden xl:block">
						<div {...{ xmlns: "http://www.w3.org/1999/xhtml" }} className="w-full h-full pointer-events-auto flex justify-center items-center">
							<form
								className="py-16 w-[85%] lg:w-[62%] xl:w-[90%] px-4 flex flex-col gap-3 mx-auto"
								onSubmit={handleSubmit}
							>
								<img
									src="/assets/contact/Frame_634.svg"
									alt="Contact Close"
									className="z-10 absolute top-[2.5rem] lg:top-14 xl:top-10 right-4 lg:right-2 xl:right-10 w-[10px] lg:w-[15px] xl:w-[20px] h-auto pointer-events-none select-none"
								/>
								<div className="flex flex-row lg:justify-center gap-2 lg:gap-10 lg:w-full lg:px-0">
									<div className="relative w-[10%] lg:w-[9%] xl:w-[12%] flex-shrink-0">
										<svg viewBox="0 0 110 87" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-[-3px] lg:bottom-[1.7rem] xl:bottom-0 left-0 w-[41px] lg:w-[64px] xl:w-[115px] h-auto" role="img" aria-label="Decorative envelope icon" preserveAspectRatio="xMidYMid meet">
											<path d="M100.834 25.5C100.834 20.825 96.7087 17 91.667 17H18.3337C13.292 17 9.16699 20.825 9.16699 25.5M100.834 25.5V76.5C100.834 81.175 96.7087 85 91.667 85H18.3337C13.292 85 9.16699 81.175 9.16699 76.5V25.5M100.834 25.5L55.0003 55.25L9.16699 25.5" stroke="#F3F3F3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									</div>
									<div className="flex flex-col w-[85%] lg:w-full lg:px-0 xl:mt-10">
										<h4 className="text-white font-orbitron text-[1.2rem] lg:text-[1.8rem] xl:text-[2.5rem] font-bold">
											{idioma === 'es' ? 'Únete a la travesía musical' : 'Join the musical journey'}
										</h4>
										<p className="text-white mb-2 text-[0.8rem] lg:text-[1rem] xl:text-[1.3rem] xl:mt-[-8px]">
											{idioma === 'es' ? 'Recibe las últimas novedades directamente en tu inbox.' : 'Receive the latest updates directly in your inbox.'}
										</p>
										<div className="flex flex-row items-center lg:flex-col gap-2 lg:gap-0">
											<input
												type="text"
												placeholder={idioma === 'es' ? 'Email de contacto' : 'Contact email'}
												name="email"
												required
												className="uppercase text-[0.7rem] lg:text-[1rem] xl:text-[20px] notched-shape notched-shape-sm py-2 lg:py-2 xl:py-5 px-3 lg:px-6 xl:px-12 flex-1 h-[80%] lg:h-auto w-full font-roboto font-light overflow-hidden placeholder-white hover:cursor-text focus:bg-white focus:text-black focus:placeholder-black transition-colors duration-300"
											/>
										</div>
									</div>
								</div>
								<div className="w-full flex justify-center items-center">
									<Button
										sm
										submit
										disabled={status === "loading" || status === "success"}
										className={`uppercase lg:mt-2 xl:mt-4 w-24 lg:w-24 xl:w-36 lg:py-1 xl:py-2 h-[80%] lg:h-auto text-center font-roboto text-[0.7rem] lg:text-[0.8rem] xl:text-[1.125rem] mt-0 lg:mt-0 ${status === "loading" ? "hover:cursor-wait" : status === "success" ? "hover:cursor-not-allowed" : ""}`}
									>
										{idioma === 'es' ? (
											status === "loading"
												? "Enviando..."
												: status === "success"
												? "¡Listo!"
												: "Enviar"
										) : (
											status === "loading"
												? "Sending..."
												: status === "success"
												? "Done!"
												: "Send"
										)}
									</Button>
								</div>
								{status === "error" && (
									<p className="text-red-500 flex justify-center">{message}</p>
								)}
								{status === "success" && (
									<p className="text-green-500 flex justify-center">{message}</p>
								)}
							</form>
						</div>
					</foreignObject>
					{/* TABLET */}
					<foreignObject x="70" y="35" width="1170" height="340" className="hidden lg:block xl:hidden">
						<div {...{ xmlns: "http://www.w3.org/1999/xhtml" }} className="w-full h-full pointer-events-auto flex justify-center items-center">
							<form
								className="py-16 w-[85%] lg:w-[95%] xl:w-[90%] px-4 flex flex-col gap-3 mx-auto"
								onSubmit={handleSubmit}
							>
								<img
									src="/assets/contact/Frame_634.svg"
									alt="Contact Close"
									className="z-10 absolute top-[2.5rem] lg:top-10 xl:top-10 right-4 lg:right-8 xl:right-10 w-[10px] lg:w-[20px] xl:w-[20px] h-auto pointer-events-none select-none"
								/>
								<div className="flex flex-row lg:justify-center gap-2 lg:gap-10 lg:w-full lg:px-0">
									<div className="relative w-[10%] lg:w-[10%] xl:w-[12%] flex-shrink-0">
										<svg viewBox="0 0 110 87" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-[-3px] lg:bottom-0 xl:bottom-0 left-0 w-[41px] lg:w-[115px] xl:w-[115px] h-auto" role="img" aria-label="Decorative envelope icon" preserveAspectRatio="xMidYMid meet">
											<path d="M100.834 25.5C100.834 20.825 96.7087 17 91.667 17H18.3337C13.292 17 9.16699 20.825 9.16699 25.5M100.834 25.5V76.5C100.834 81.175 96.7087 85 91.667 85H18.3337C13.292 85 9.16699 81.175 9.16699 76.5V25.5M100.834 25.5L55.0003 55.25L9.16699 25.5" stroke="#F3F3F3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									</div>
									<div className="flex flex-col w-[85%] lg:w-full lg:px-0 xl:mt-10">
										<h4 className="text-white font-orbitron text-[1.2rem] lg:text-[47px] xl:text-[2.5rem] font-bold">
											{idioma === 'es' ? 'Únete a la travesía musical' : 'Join the musical journey'}
										</h4>
										<p className="text-white mb-2 text-[0.8rem] lg:text-[24px] xl:text-[1.3rem] xl:mt-[-8px]">
											{idioma === 'es' ? 'Recibe las últimas novedades directamente en tu inbox.' : 'Receive the latest updates directly in your inbox.'}
										</p>
										<div className="flex flex-row items-center lg:flex-col gap-2 lg:gap-0">
											<input
												type="text"
												placeholder={idioma === 'es' ? 'Email de contacto' : 'Contact email'}
												name="email"
												required
												className="uppercase text-[0.7rem] lg:text-[20px] xl:text-[20px] notched-shape notched-shape-sm py-2 lg:py-5 xl:py-5 px-3 lg:px-10 xl:px-12 flex-1 h-[80%] lg:h-auto w-full font-roboto font-light overflow-hidden placeholder-white hover:cursor-text focus:bg-white focus:text-black focus:placeholder-black transition-colors duration-300"
											/>
										</div>
									</div>
								</div>
								<div className="w-full flex justify-center items-center">
									<Button
										sm
										submit
										disabled={status === "loading" || status === "success"}
										className={`uppercase lg:mt-2 xl:mt-4 w-24 lg:w-[120px] xl:w-36 lg:py-2 xl:py-2 h-[80%] lg:h-auto text-center font-roboto text-[0.7rem] lg:text-[17px] xl:text-[1.125rem] mt-0 lg:mt-0 ${status === "loading" ? "hover:cursor-wait" : status === "success" ? "hover:cursor-not-allowed" : ""}`}
									>
										{idioma === 'es' ? (
											status === "loading"
												? "Enviando..."
												: status === "success"
												? "¡Listo!"
												: "Enviar"
										) : (
											status === "loading"
												? "Sending..."
												: status === "success"
												? "Done!"
												: "Send"
										)}
									</Button>
								</div>
								{status === "error" && (
									<p className="text-red-500 flex justify-center">{message}</p>
								)}
								{status === "success" && (
									<p className="text-green-500 flex justify-center">{message}</p>
								)}
							</form>
						</div>
					</foreignObject>
				</svg>
				<svg width="365" height="159" viewBox="0 0 365 159" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} pointer-events-none lg:hidden translate-y-4`}>
					<g filter="url(#filter0_d_6_74277)">
						<path d="M39.9263 130.631L38.0587 132.719H26.6015L19.1969 123.306V67.7811L20.3642 66.737V36.1996L19.1969 34.7378V32.6415L25.123 23.1317H248.244L249.65 25.22H263.053L271.002 13.9271H302.955L306.074 18.3206H313.634L317.064 13.7183H340.368L351.819 29.1958L351.974 59.6207L350.34 61.195L350.418 78.8652L351.663 80.7447L351.819 122.262L343.869 133.659L288.619 133.45L284.171 127.804L240.45 127.595L229.699 140.984H176.31L174.521 138.783H73.3639L67.8269 128.013H53.6461L52.2394 130.318L39.9263 130.631Z" fill="#4A3385"/>
						<path d="M356.081 47.6778V21.4535L348 10.7148H338.686L333.687 3.17286H329.683L328.378 0.79541H315.676L314.059 3.38169H270.272L267.273 8.85143H237.792L232.716 1.6227H187.462L178.615 13.2931H109.735L105.658 6.99606H11.6127L2.29851 19.9034V45.2039L4.37563 47.8866V52.529L8.38024 57.9024V71.8458L0.299194 83.3074V136.069L12.9176 153.314H32.5456L34.084 155.281" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M5.38734 103.508H3.11267V131.989L14.3603 147.41H31.6657L40.507 158.599H84.9767L93.8179 146.229H234.29L241.623 136.904H273.834L280.275 145.547H304.404L306.804 149.282H323.356L329.036 141.82H339.398" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M275.097 134.704L280.909 143.346H305.541L307.056 145.041H321.709L326.893 138.093" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M356.075 94.1907V128.431L348.365 138.768H329.545" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M357.338 96.5603L359.864 93.0022V54.3525" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M10.5891 98.6243V97.2348L12.5885 95.3875V69.4042L11.2057 66.9063V45.0835L8.93103 41.7503V20.5781L15.6174 11.6948H34.5689L35.6045 13.2691H97.5652L99.0078 15.4859" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M264.388 17.5257H216.47L214.657 15.5499H127.89L125.226 18.5859H56.7529L55.0529 15.7748H33.0784L31.8872 14.8672H17.7304L11.3314 23.6059V36.7542L13.7079 39.2601V65.2514L14.7853 67.155V97.3952L10.649 103.25V127.113L18.8079 137.603V139.121H37.7774L42.8176 146.647H83.4264L88.9813 138.511H174.503L176.317 140.944H229.951L240.205 127.643H284.154L288.517 133.499H343.852L351.837 122.021V80.986L350.364 79.0824V61.2274L352.118 59.3239V29.3808L340.284 13.3491H317.172L313.491 18.0558H305.96L302.842 13.8792H270.901L263.143 24.9713H249.435L248.304 23.1481H24.5844V24.6661L19.3167 32.192V34.7783L20.3882 36.3686V66.7695L19.2569 67.9903V123.162L26.5657 132.816H38.0049L40.1 129.7" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M37.7773 139.121L44.6313 149.53H49.6715V146.494" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M69.8381 135.169H40.896L39.4773 133.876L40.1597 132.736H51.4851L52.6763 133.499" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M40.8961 135.169L39.0225 138.888L41.345 142.238H44.1225L46.9539 136.84H71.9333L73.5734 138.969H88.1313" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M56.6392 139.956H61.2843L62.5832 142.462" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M52.3472 149.603H81.8041" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M53.3767 152.398H54.2746" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M56.1602 152.398H77.8533" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="3.15 3.15"/>
						<path d="M78.7991 152.398H79.697" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M90.2563 154.647L91.8007 152.815H230.513L233.596 148.679" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M277.461 133.21L278.197 130.391H283.034L287.458 135.892" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M4.50152 108.327C4.81228 108.327 5.0642 107.989 5.0642 107.572C5.0642 107.155 4.81228 106.817 4.50152 106.817C4.19076 106.817 3.93884 107.155 3.93884 107.572C3.93884 107.989 4.19076 108.327 4.50152 108.327Z" stroke="#4A3385" strokeWidth="0.75" strokeMiterlimit="10"/>
						<path d="M4.50152 111.427C4.81228 111.427 5.0642 111.089 5.0642 110.672C5.0642 110.255 4.81228 109.917 4.50152 109.917C4.19076 109.917 3.93884 110.255 3.93884 110.672C3.93884 111.089 4.19076 111.427 4.50152 111.427Z" stroke="#4A3385" strokeWidth="0.75" strokeMiterlimit="10"/>
						<path d="M4.50152 114.519C4.81228 114.519 5.0642 114.181 5.0642 113.764C5.0642 113.347 4.81228 113.009 4.50152 113.009C4.19076 113.009 3.93884 113.347 3.93884 113.764C3.93884 114.181 4.19076 114.519 4.50152 114.519Z" stroke="#4A3385" strokeWidth="0.75" strokeMiterlimit="10"/>
						<path d="M2.06498 15.0199C2.98403 15.0199 3.72907 14.0203 3.72907 12.7871C3.72907 11.5539 2.98403 10.5542 2.06498 10.5542C1.14592 10.5542 0.400879 11.5539 0.400879 12.7871C0.400879 14.0203 1.14592 15.0199 2.06498 15.0199Z" fill="#4A3385"/>
						<path d="M354.483 63.0989V78.9459" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M355.758 63.0989V78.9459" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M360.115 102.865V130.061" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M361.312 102.865V130.061" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M358.93 143.041C359.76 143.041 360.433 142.138 360.433 141.025C360.433 139.911 359.76 139.009 358.93 139.009C358.101 139.009 357.428 139.911 357.428 141.025C357.428 142.138 358.101 143.041 358.93 143.041Z" fill="#4A3385"/>
						<path d="M339.422 143.282C339.941 143.282 340.362 142.717 340.362 142.021C340.362 141.324 339.941 140.76 339.422 140.76C338.903 140.76 338.482 141.324 338.482 142.021C338.482 142.717 338.903 143.282 339.422 143.282Z" fill="#4A3385"/>
						<path d="M326.893 139.169C327.336 139.169 327.696 138.688 327.696 138.093C327.696 137.499 327.336 137.017 326.893 137.017C326.45 137.017 326.091 137.499 326.091 138.093C326.091 138.688 326.45 139.169 326.893 139.169Z" fill="#4A3385"/>
						<path d="M275.234 136.294C275.701 136.294 276.078 135.787 276.078 135.161C276.078 134.536 275.701 134.029 275.234 134.029C274.768 134.029 274.39 134.536 274.39 135.161C274.39 135.787 274.768 136.294 275.234 136.294Z" fill="#4A3385"/>
						<path d="M361.049 51.4526C361.836 51.4526 362.474 50.5967 362.474 49.541C362.474 48.4852 361.836 47.6294 361.049 47.6294C360.262 47.6294 359.625 48.4852 359.625 49.541C359.625 50.5967 360.262 51.4526 361.049 51.4526Z" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M316.645 3.87109H327.923" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M131.428 156.422H171.342" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M171.33 9.01211C172.137 9.01211 172.791 8.13468 172.791 7.05232C172.791 5.96996 172.137 5.09253 171.33 5.09253C170.524 5.09253 169.87 5.96996 169.87 7.05232C169.87 8.13468 170.524 9.01211 171.33 9.01211Z" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M252.063 6.07239C253.23 6.07239 254.176 4.803 254.176 3.23713C254.176 1.67125 253.23 0.401855 252.063 0.401855C250.896 0.401855 249.95 1.67125 249.95 3.23713C249.95 4.803 250.896 6.07239 252.063 6.07239Z" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M218.158 15.887C218.562 15.887 218.889 15.4483 218.889 14.9071C218.889 14.366 218.562 13.9272 218.158 13.9272C217.755 13.9272 217.428 14.366 217.428 14.9071C217.428 15.4483 217.755 15.887 218.158 15.887Z" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M223.486 15.887C223.889 15.887 224.216 15.4483 224.216 14.9071C224.216 14.366 223.889 13.9272 223.486 13.9272C223.083 13.9272 222.756 14.366 222.756 14.9071C222.756 15.4483 223.083 15.887 223.486 15.887Z" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M214.656 15.5501V12.4016H227.023V11.0361" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M227.143 17.3894L228.634 15.2368H242.802L244.335 17.4456" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M263.49 17.55L265.244 14.9797L268.075 15.0038L265.112 19.2206L263.49 17.55Z" fill="#4A3385"/>
						<path d="M307.606 15.0034H312.264" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M17.9277 62.312V43.2522" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M59.5363 15.9277H63.0859" stroke="#4A3385" strokeMiterlimit="10" strokeDasharray="1 1"/>
						<path d="M65.0076 16.0879H76.1355" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M77.6379 16.0879H83.5281" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M123.233 11.4294H115.9V9.22063L116.858 7.92749H119.665L120.635 9.22866V10.7547" stroke="#4A3385" strokeMiterlimit="10"/>
						<path d="M112.68 10.209H111.458V11.8475H112.68V10.209Z" fill="#4A3385"/>
						<path d="M114.559 10.209H113.338V11.8475H114.559V10.209Z" fill="#4A3385"/>
						<path d="M125.334 10.209H124.113V11.8475H125.334V10.209Z" fill="#4A3385"/>
						<path d="M339.045 156.478L343.648 149.418H358.451L364.701 140.591V15.2528L355.494 1.57446" stroke="#4A3385" strokeMiterlimit="10"/>
					</g>
					<defs>
						<filter id="filter0_d_6_74277" x="-70.2008" y="-70.0981" width="505.401" height="299.197" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
							<feFlood floodOpacity="0" result="BackgroundImageFix"/>
							<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
							<feOffset/>
							<feGaussianBlur stdDeviation="35"/>
							<feComposite in2="hardAlpha" operator="out"/>
							<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
							<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6_74277"/>
							<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6_74277" result="shape"/>
						</filter>
					</defs>
					<foreignObject x="20" y="13" width="330" height="128">
						<div {...{ xmlns: "http://www.w3.org/1999/xhtml" }} className="w-full h-full pointer-events-auto flex justify-center items-center">
							<form
								className="py-16 w-full lg:w-[62%] xl:w-[90%] px-2 flex flex-col gap-3 mx-auto"
								onSubmit={handleSubmit}
							>
								<img
									src="/assets/contact/Frame_634.svg"
									alt="Contact Close"
									className="z-10 absolute top-[10px] lg:top-14 xl:top-10 right-3 lg:right-2 xl:right-10 w-[10px] lg:w-[15px] xl:w-[20px] h-auto pointer-events-none select-none"
								/>
								<div className="flex flex-row lg:justify-center gap-4 lg:gap-10 lg:w-full lg:px-0">
									<div className="relative w-[10%] lg:w-[9%] xl:w-[12%] flex-shrink-0">
										<svg viewBox="0 0 110 87" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-1 lg:bottom-[1.7rem] xl:bottom-0 left-0 w-[38px] lg:w-[64px] xl:w-[115px] h-auto" role="img" aria-label="Decorative envelope icon" preserveAspectRatio="xMidYMid meet">
											<path d="M100.834 25.5C100.834 20.825 96.7087 17 91.667 17H18.3337C13.292 17 9.16699 20.825 9.16699 25.5M100.834 25.5V76.5C100.834 81.175 96.7087 85 91.667 85H18.3337C13.292 85 9.16699 81.175 9.16699 76.5V25.5M100.834 25.5L55.0003 55.25L9.16699 25.5" stroke="#F3F3F3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									</div>
									<div className="flex flex-col w-[85%] lg:w-full lg:px-0 xl:mt-10">
										<h4 className="text-white font-orbitron text-[15px] lg:text-[1.8rem] xl:text-[2.5rem] font-bold">
											{idioma === 'es' ? 'Únete a la travesía musical' : 'Join the musical journey'}
										</h4>
										<p className="text-white mb-2 text-[9px] lg:text-[1rem] xl:text-[1.3rem] xl:mt-[-8px]">
											{idioma === 'es' ? 'Recibe las últimas novedades directamente en tu inbox.' : 'Receive the latest updates directly in your inbox.'}
										</p>
										<div className="flex flex-row items-center lg:flex-col gap-2 lg:gap-0">
											<input
												type="text"
												placeholder={idioma === 'es' ? 'Email de contacto' : 'Contact email'}
												name="email"
												required
												className="uppercase text-[9px] lg:text-[1rem] xl:text-[20px] notched-shape notched-shape-sm py-2 lg:py-2 xl:py-5 px-4 lg:px-6 xl:px-12 flex-1 h-[80%] lg:h-auto w-full font-roboto font-normal overflow-hidden placeholder-white hover:cursor-text focus:bg-white focus:text-black focus:placeholder-black transition-colors duration-300"
											/>
											<Button
												sm
												submit
												disabled={status === "loading" || status === "success"}
												className={`uppercase lg:mt-2 xl:mt-4 w-16 lg:w-24 xl:w-36 py-2 xl:py-2 h-[80%] lg:h-auto text-center font-roboto text-[9px] lg:text-[0.8rem] xl:text-[1.125rem] mt-0 lg:mt-0 ${status === "loading" ? "hover:cursor-wait" : status === "success" ? "hover:cursor-not-allowed" : ""}`}
											>
												{idioma === 'es' ? (
													status === "loading"
														? "Enviando..."
														: status === "success"
														? "¡Listo!"
														: "Enviar"
												) : (
													status === "loading"
														? "Sending..."
														: status === "success"
														? "Done!"
														: "Send"
												)}
											</Button>
										</div>
									</div>
								</div>
								
								{status === "error" && (
									<p className="text-red-500 flex justify-center">{message}</p>
								)}
								{status === "success" && (
									<p className="text-green-500 flex justify-center">{message}</p>
								)}
							</form>
						</div>
					</foreignObject>
				</svg>
			</div>
	);
};

export default ContactBorder;