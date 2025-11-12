import Estratonico from "../Navbar/Estratonico";
import FooterGroup from "./FooterGroup";

export default function Footer({
	navigation,
}: {
	navigation: Record<string, { titleEN: string; name: string; nameEN: string; href: string; logo: string }[]>;
}) {
	return (
	<footer className="bg-black h-auto lg:h-[400px] w-full px-20 lg:px-16 xl:px-32 pt-12 lg:pt-20 xl:pt-16 pb-20 lg:pb-32 relative overflow-hidden z-0 isolate">
		<div className="absolute top-[25%] left-[-80px] lg:top-[-90px] lg:left-[25%] xl:top-[-130px] xl:left-[25%] select-none opacity-100 z-0 pointer-events-none">
			<img
				src="/assets/Frame_627.svg"
				alt="circle right"
				className="block opacity-30 lg:w-[180px] xl:w-[250px] w-[160px] lg:scale-x-[-1]"
				style={{color: 'transparent'}}
			/>
		</div>
		<div className="md:hidden absolute bottom-[-80px] right-[13%] lg:top-[-90px] lg:left-[25%] xl:top-[-150px] xl:left-[25%] select-none opacity-100 z-0 pointer-events-none">
			<img
				src="/assets/Frame_627.svg"
				alt="circle right"
				className="block opacity-30 lg:w-[180px] xl:w-[320px] w-[140px] lg:scale-x-[-1]"
				style={{color: 'transparent'}}
			/>
		</div>
		<div className="hidden lg:block absolute lg:top-6 xl:top-0 lg:right-[-150px] xl:right-0 opacity-100 z-0 pointer-events-none">
			<svg className="block lg:h-[300px] xl:h-[320px] w-auto" viewBox="0 0 1098 406" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Decorative background graphic" preserveAspectRatio="xMidYMid meet">
				<g opacity="0.2">
					<path d="M111.921 37.665L459.761 37.665L539.861 113.925L729.141 113.925L762.601 147.395H843.251L888.241 102.405L1019.92 102.405L1040.22 82.105" stroke="#F8F8F5" strokeWidth="2" strokeMiterlimit="10"/>
					<path d="M1051.19 74.9756L877.269 74.9756L822.959 132.036H780.709L741.209 88.6957L576.619 88.6957" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M1071.49 135.875H1019.37L984.8 170.985L886.6 170.985L877.27 158.365H752.18L742.31 150.135" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M1023.76 186.345L877.82 186.345L863.01 168.245H726.94L685.25 125.995L535.47 125.995L469.63 62.3552H447.69L425.19 83.7552L366.49 83.7552L341.25 56.8752L153.07 56.8752L142.65 68.3952H70.2298" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M77.3604 60.7153L6.03027 60.7153" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M79.5498 50.8354L-0.00012207 50.8354" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M80.6504 39.3149L49.3805 39.3149" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M198.61 77.7152H331.92L360.45 106.245L476.77 106.245L525.59 153.435H663.85L707.74 194.575L922.81 194.575L949.14 220.915L988.09 220.915L1018.27 253.285V297.175L1044.06 322.415H1064.9L1096.18 350.395V381.665H1076.43V434.885" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M1114.83 393.735V353.685L1083.56 319.665V280.715H1070.39L1053.38 263.705" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M794.89 94.3755L884.77 0.345459" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M1018.34 383.156V346.886L987.59 315.336V282.216L972.6 266.446H898.47L890.59 283.006" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M1050.68 399.715V351.615L1000.99 299.565V259.345L982.85 238.055H937.9L929.23 230.165H889.8L879.54 220.705L378.77 220.705L330.66 177.325H305.43L276.25 148.145" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M459.21 133.165H390.6L380.35 140.265L339.34 140.265L307.79 106.355H230.51" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M1028.42 181.885C1025.99 181.885 1024.02 183.855 1024.02 186.285C1024.02 188.715 1025.99 190.685 1028.42 190.685C1030.85 190.685 1032.82 188.715 1032.82 186.285C1032.82 183.855 1030.85 181.885 1028.42 181.885Z" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M1044.72 254.335C1042.65 254.335 1040.98 256.009 1040.98 258.075C1040.98 260.14 1042.65 261.815 1044.72 261.815C1046.79 261.815 1048.46 260.14 1048.46 258.075C1048.46 256.009 1046.79 254.335 1044.72 254.335Z" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M889.481 282.296C887.78 282.296 886.401 283.675 886.401 285.376C886.401 287.077 887.78 288.456 889.481 288.456C891.182 288.456 892.561 287.077 892.561 285.376C892.561 283.675 891.182 282.296 889.481 282.296Z" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M876.71 258.735C874.887 258.735 873.41 260.213 873.41 262.035C873.41 263.858 874.887 265.335 876.71 265.335C878.532 265.335 880.01 263.858 880.01 262.035C880.01 260.213 878.532 258.735 876.71 258.735Z" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M977.561 252.565H892.561L879.351 260.055" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M570.43 82.4951C566.984 82.4951 564.19 85.2889 564.19 88.7351C564.19 92.1814 566.984 94.9751 570.43 94.9751C573.876 94.9751 576.67 92.1814 576.67 88.7351C576.67 85.2889 573.876 82.4951 570.43 82.4951Z" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M462.18 130.115C460.617 130.115 459.35 131.382 459.35 132.945C459.35 134.508 460.617 135.775 462.18 135.775C463.743 135.775 465.01 134.508 465.01 132.945C465.01 131.382 463.743 130.115 462.18 130.115Z" stroke="#F8F8F5" strokeMiterlimit="10"/>
				</g>
			</svg>
		</div>
		<div className="flex flex-col items-stretch lg:flex-row lg:items-start lg:justify-between lg:gap-10 xl:gap-16">
			<div className="flex justify-center">
				<Estratonico className="w-full lg:w-[20rem]" />
			</div>
			<div className="flex flex-col items-stretch md:flex-row md:w-full md:items-start md:justify-evenly w-full xl:w-1/2">
				{Object.entries(navigation).map(([title, links]) => {
					if (title === "Idioma") {
						return null;
					}
					return (
						<FooterGroup key={title} title={title} links={links} />
					);
				})}
			</div>
		</div>
		<div className="hidden lg:block absolute bottom-0 lg:left-[-50px] xl:left-0 opacity-100 z-0 pointer-events-none">
			<svg className="block lg:h-[250px] xl:h-[320px]  w-auto" viewBox="0 0 1115 333" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Decorative background graphic" preserveAspectRatio="xMidYMid meet">
				<g opacity="0.2">
					<path d="M1002.91 397.22H655.069L574.969 320.96H385.689L352.229 287.49H271.579L226.589 332.48H94.9094L74.6094 352.78" stroke="#F8F8F5" strokeWidth="2" strokeMiterlimit="10"/>
					<path d="M63.6406 359.91H237.561L291.871 302.85H334.121L373.621 346.19H538.211" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M43.3398 299.01H95.4598L130.03 263.9H228.23L237.56 276.52H362.65L372.52 284.75" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M91.0703 248.54H237.01L251.82 266.64H387.89L429.58 308.89H579.36L645.2 372.53H667.14L689.64 351.13H748.34L773.58 378.01H961.76L972.18 366.49H1044.6" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M916.22 357.17H782.91L754.38 328.64H638.06L589.24 281.45H450.98L407.09 240.31H192.02L165.69 213.97H126.74L96.5604 181.6V137.71L70.7704 112.47H49.9304L18.6504 84.49V53.22H38.4004V0" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M0 41.1504L0 81.2004L31.27 115.22V154.17H44.44L61.45 171.18" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M96.4902 51.7295V87.9995L127.24 119.549V152.669L142.23 168.44H216.36L224.24 151.88" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M64.1504 35.1699V83.2699L113.84 135.32V175.54L131.98 196.83H176.93L185.6 204.72H225.03L235.29 214.18H736.06L784.17 257.56H809.4L838.58 286.74" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M655.62 301.72H724.23L734.48 294.62H775.49L807.04 328.53H884.32" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M86.4098 253C88.8398 253 90.8098 251.03 90.8098 248.6C90.8098 246.17 88.8398 244.2 86.4098 244.2C83.9797 244.2 82.0098 246.17 82.0098 248.6C82.0098 251.03 83.9797 253 86.4098 253Z" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M70.1101 180.55C72.1757 180.55 73.8501 178.876 73.8501 176.81C73.8501 174.745 72.1757 173.07 70.1101 173.07C68.0446 173.07 66.3701 174.745 66.3701 176.81C66.3701 178.876 68.0446 180.55 70.1101 180.55Z" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M225.35 152.59C227.051 152.59 228.43 151.211 228.43 149.51C228.43 147.809 227.051 146.43 225.35 146.43C223.648 146.43 222.27 147.809 222.27 149.51C222.27 151.211 223.648 152.59 225.35 152.59Z" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M238.12 176.15C239.943 176.15 241.42 174.672 241.42 172.85C241.42 171.027 239.943 169.55 238.12 169.55C236.298 169.55 234.82 171.027 234.82 172.85C234.82 174.672 236.298 176.15 238.12 176.15Z" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M137.27 182.32H222.27L235.48 174.83" stroke="#F8F8F5" strokeMiterlimit="10"/>
					<path d="M652.65 304.77C654.213 304.77 655.48 303.503 655.48 301.94C655.48 300.377 654.213 299.11 652.65 299.11C651.087 299.11 649.82 300.377 649.82 301.94C649.82 303.503 651.087 304.77 652.65 304.77Z" stroke="#F8F8F5" strokeMiterlimit="10"/>
				</g>
			</svg>
		</div>
		<div className="hidden xl:block absolute xl:bottom-[-200px] xl:right-[7%] select-none opacity-100 z-0 pointer-events-none">
			<img
				src="/assets/Frame_626.svg"
				alt="circle left"
				className="block opacity-30 md:w-[160px] lg:w-[200px] xl:w-[370px] w-[180px]"
				style={{color: 'transparent'}}
			/>
		</div>
		<div className="md:hidden absolute top-[-70px] right-[-80px] xl:bottom-[-180px] xl:right-[10%] select-none opacity-100 z-0 pointer-events-none">
			<img
				src="/assets/Frame_626.svg"
				alt="circle left"
				className="block opacity-30 md:w-[160px] lg:w-[200px] xl:w-[320px] w-[180px]"
				style={{color: 'transparent'}}
			/>
		</div>
		<div className="md:hidden absolute top-[45%] right-[-90px] xl:bottom-[-180px] xl:right-[10%] select-none opacity-100 z-0 pointer-events-none">
			<img
				src="/assets/Frame_626.svg"
				alt="circle left"
				className="block opacity-30 md:w-[160px] lg:w-[200px] xl:w-[320px] w-[220px]"
				style={{color: 'transparent'}}
			/>
		</div>
		<div className="md:hidden absolute bottom-[13%] left-[-120px] xl:bottom-[-180px] xl:right-[10%] select-none opacity-100 z-0 pointer-events-none">
			<img
				src="/assets/Frame_626.svg"
				alt="circle left"
				className="block opacity-30 md:w-[160px] lg:w-[200px] xl:w-[320px] w-[200px]"
				style={{color: 'transparent'}}
			/>
		</div>
	</footer>
	);
}
