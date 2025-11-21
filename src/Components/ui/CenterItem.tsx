import VectorLines from "./VectorLines";

function CenterItem({ titles, descriptions, className, vectorTitle, vectorTitleBold, vectorDescription, idioma }: { titles: string[]; descriptions: string[]; className: string; vectorTitle?: string; vectorTitleBold?: string; vectorDescription?: string; idioma: string }) {
    return (
        <div className="flex items-center justify-center w-full h-full">
            {/* WEB */}
            <svg viewBox="0 0 1629 1064" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Center Item Graphic" preserveAspectRatio="xMidYMid meet" className="w-[85%] h-auto hidden xl:block">
                <path fillRule="evenodd" clipRule="evenodd" d="M1629 422.234C1629 426 1626.12 429.041 1622.55 429.041C1619.28 429.041 1616.62 426.5 1616.19 423.187V423.232H1231.19L1210.07 400.949H1108V400.041H1210.42L1231.53 422.324H1616.1C1616.1 422.294 1616.1 422.264 1616.1 422.234C1616.1 418.467 1618.98 415.426 1622.55 415.426C1626.12 415.426 1629 418.467 1629 422.234ZM1628.14 422.234C1628.14 418.966 1625.65 416.334 1622.55 416.334C1619.45 416.334 1616.96 418.966 1616.96 422.234C1616.96 425.501 1619.45 428.133 1622.55 428.133C1625.65 428.133 1628.14 425.501 1628.14 422.234Z" fill="white"/>
                <foreignObject x="30" y={idioma === 'es' ? "170" : "195"} width="400" height="600"> <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any} style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span className={`w-1/3 h-[300px] lg:w-full lg:h-auto xl:w-full xl:h-[410px] flex flex-col items-center relative `}>
                            <div className={`flex flex-col w-full lg:w-[100%] xl:w-full`}>
                                <h3 dangerouslySetInnerHTML={{ __html: titles[0] }} className={`${className} text-left leading-5 lg:leading-5 xl:leading-7 uppercase font-orbitron font-bold text-[#3BF3FF] lg:text-[17px] xl:text-[24px] tracking-[4px] mb-8 lg:mb-8 xl:mb-8`}></h3>
                                <h4 dangerouslySetInnerHTML={{ __html: descriptions[0] }} className={`text-left leading-5 lg:leading-5 xl:leading-6 text-white text-[14px] lg:text-[13px] xl:text-[22px]`}></h4>
                            </div>
                        </span>
                    </div>
                </foreignObject>
                <path fillRule="evenodd" clipRule="evenodd" d="M-0.000305176 337.082C-0.000305176 333.347 3.01471 330.332 6.74969 330.332C10.1697 330.332 12.9597 332.852 13.4097 336.137V336.092H416.34L438.435 358.187H545.265V359.087H438.075L415.98 336.992H13.4997C13.4997 337.022 13.4997 337.052 13.4997 337.082C13.4997 340.817 10.4847 343.832 6.74969 343.832C3.01471 343.832 -0.000305176 340.817 -0.000305176 337.082ZM0.899658 337.082C0.899658 340.322 3.5097 342.932 6.74969 342.932C9.98969 342.932 12.5997 340.322 12.5997 337.082C12.5997 333.842 9.98969 331.232 6.74969 331.232C3.5097 331.232 0.899658 333.842 0.899658 337.082Z" fill="white"/>
                <foreignObject x="1230" y="220" width="400" height="600">
                    <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any} style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span className={`w-1/3 h-[300px] lg:w-full lg:h-auto xl:w-full xl:h-[410px] lg:pt-0 xl:pt-9 px-4 pb-5 flex flex-col items-center relative `}>
                            <div className={`flex flex-col text-center w-full lg:w-[100%] xl:w-full`}>
                                <h3 dangerouslySetInnerHTML={{ __html: titles[1] }} className={` text-left leading-5 lg:leading-5 xl:leading-7 uppercase font-orbitron font-bold text-[#3BF3FF] lg:text-[17px] xl:text-[24px] tracking-[4px] mb-[-85px] lg:mb-1 xl:mb-8`}></h3>
                                <h4 dangerouslySetInnerHTML={{ __html: descriptions[1] }} className={`text-left leading-5 lg:leading-5 xl:leading-6 text-white text-[14px] lg:text-[13px] xl:text-[22px]`}></h4>
                            </div>
                        </span>
                    </div>
                </foreignObject>
                <path fillRule="evenodd" clipRule="evenodd" d="M-0.000305176 651.082C-0.000305176 647.347 3.01471 644.332 6.74969 644.332C10.1697 644.332 12.9597 646.852 13.4097 650.137V650.092H416.34L438.435 672.187H545.265V673.087H438.075L415.98 650.992H13.4997C13.4997 651.022 13.4997 651.052 13.4997 651.082C13.4997 654.817 10.4847 657.832 6.74969 657.832C3.01471 657.832 -0.000305176 654.817 -0.000305176 651.082ZM0.899658 651.082C0.899658 654.322 3.5097 656.932 6.74969 656.932C9.98969 656.932 12.5997 654.322 12.5997 651.082C12.5997 647.842 9.98969 645.232 6.74969 645.232C3.5097 645.232 0.899658 647.842 0.899658 651.082Z" fill="white"/>
                <foreignObject x="10" y="445" width="400" height="600">
                    <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any} style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span className={`w-1/3 h-[300px] lg:w-full lg:h-auto xl:w-full xl:h-[410px] lg:pt-0 xl:pt-9 px-4 pb-5 flex flex-col items-center relative `}>
                            <div className={`flex flex-col text-center w-full lg:w-[100%] xl:w-full`}>
                                <h3 dangerouslySetInnerHTML={{ __html: titles[2] }} className={` text-left leading-5 lg:leading-5 xl:leading-7 uppercase font-orbitron font-bold text-[#3BF3FF] lg:text-[17px] xl:text-[24px] tracking-[4px] mb-[-85px] lg:mb-1 xl:mb-8`}></h3>
                                <h4 dangerouslySetInnerHTML={{ __html: descriptions[2] }} className={` text-left leading-5 lg:leading-5 xl:leading-6 text-white text-[14px] lg:text-[13px] xl:text-[22px]`}></h4>
                            </div>
                        </span>
                    </div>
                </foreignObject>
                <ellipse cx="767.499" cy="533.329" rx="324.5" ry="324" fill="url(#paint0_linear_1804_22158)"/>
                <ellipse cx="767.499" cy="533.329" rx="324.5" ry="324" fill="url(#paint1_radial_1804_22158)"/>
                <path d="M1079.72 432.601L1115.04 420.319C1115 420.197 1114.96 420.074 1114.87 419.829C1109.42 404.154 1102.91 388.986 1095.71 374.606L1137.9 359.936C1105.66 293.725 1057.2 239.337 999.145 200.086L979.611 240.372C955.795 223.671 930.084 209.824 903.141 199.152L927.479 148.96L915.849 144.768C824.026 110.397 722.189 109.294 629.307 141.454L618.637 145.164L636.947 197.822C451.913 268.202 355.271 473.39 420.635 661.366C420.677 661.489 420.72 661.611 420.805 661.856L456.126 649.574C490.016 746.643 564.806 817.822 654.635 850.415L638.223 884.262C714.001 912.819 799.651 916.393 882.413 889.125L870.149 853.856C872.111 853.174 874.116 852.614 876.079 851.932C1048.02 792.143 1139.22 604.498 1079.72 432.601ZM633.011 152.108C727.243 119.479 825.251 123.011 911.956 155.318L892.502 195.439C816.12 167.915 730.278 165.369 647.574 193.99L633.011 152.108ZM874.082 846.586C704.836 905.437 520.115 816.203 461.352 647.208C402.589 478.213 492.219 293.582 661.343 234.774C830.59 175.924 1015.31 265.157 1074.07 434.153C1132.84 603.148 1043.33 787.736 874.082 846.586Z" fill="white" fillOpacity="0.2"/>
                <path d="M592.776 198.493L584.856 175.716C528.382 203.863 480.885 243.989 444.116 291.64L466.256 302.335C499.765 259.936 542.43 224.099 592.776 198.493Z" fill="white" fillOpacity="0.2"/>
                <path d="M892.728 315.881C883.441 335.033 874.074 354.351 864.787 373.503C903.495 395.87 934.61 431.584 950.45 477.139C966.333 522.817 964.009 570.296 947.326 612.061L1004.99 639.917C1028.68 583.5 1032.63 518.57 1010.96 456.238C989.281 393.905 946.141 345.352 892.728 315.881Z" fill="white" fillOpacity="0.2"/>
                <path d="M765.893 810.218L759.762 792.584C722.795 791.437 686.836 782.115 654.197 765.737L679.976 712.573C637.045 690.713 602.088 653.041 585.012 603.934C569.129 558.256 571.453 510.777 588.137 469.012L534.935 443.312C550.245 406.691 574.222 373.646 605.062 347.686L598.93 330.051C512.259 399.447 474.239 518.225 512.776 629.052C551.312 739.879 654.743 809.609 765.893 810.218Z" fill="white" fillOpacity="0.2"/>
                <path d="M448.032 708.531C445.567 701.838 438.052 698.411 431.269 701.045C424.567 703.512 421.252 710.979 423.716 717.672C426.181 724.365 433.696 727.791 440.479 725.158C447.182 722.69 450.619 715.181 448.032 708.531Z" fill="white" fillOpacity="0.2"/>
                <path d="M468.941 745.735C466.477 739.042 458.961 735.615 452.179 738.249C445.476 740.716 442.038 748.226 444.668 754.999C447.133 761.691 454.648 765.118 461.431 762.485C468.011 760.059 471.448 752.55 468.941 745.735Z" fill="white" fillOpacity="0.2"/>
                <path d="M492.332 780.978C489.867 774.285 482.352 770.859 475.569 773.492C468.867 775.96 465.429 783.469 468.059 790.242C470.524 796.934 478.039 800.361 484.821 797.728C491.482 795.137 494.919 787.628 492.332 780.978Z" fill="white" fillOpacity="0.2"/>
                <path d="M521.945 811.586C519.481 804.893 511.965 801.467 505.183 804.1C498.48 806.568 495.042 814.077 497.672 820.85C500.137 827.542 507.652 830.969 514.435 828.336C521.095 825.745 524.532 818.236 521.945 811.586Z" fill="white" fillOpacity="0.2"/>
                <path d="M536.756 830.458C530.053 832.925 526.616 840.435 529.245 847.208C531.71 853.9 539.225 857.327 546.008 854.694C552.711 852.226 556.148 844.716 553.518 837.944C550.931 831.294 543.416 827.867 536.756 830.458Z" fill="white" fillOpacity="0.2"/>
                <path d="M571.79 854.514C565.087 856.982 561.65 864.492 564.28 871.264C566.744 877.957 574.259 881.383 581.042 878.75C587.745 876.282 591.182 868.773 588.553 862C585.965 855.35 578.45 851.924 571.79 854.514Z" fill="white" fillOpacity="0.2"/>
                <path d="M494.587 635.651C494.332 634.917 494.119 634.304 493.906 633.692L475.51 640.089C475.723 640.701 475.978 641.436 476.191 642.048C530.696 798.797 699.1 883.409 856.825 835.703L850.438 817.334C702.892 861.501 545.558 782.236 494.587 635.651Z" fill="white" fillOpacity="0.2"/>
                <path d="M666.452 249.47C594.829 274.374 538.2 323.029 502.33 383.545L520.009 392.085C553.595 336.069 606.41 291.075 672.882 267.961C823.732 215.508 988.461 295.083 1040.84 445.709C1063.96 512.205 1061.33 581.341 1038.15 642.385L1055.83 650.926C1081.13 585.301 1084.22 510.787 1059.36 439.27C1003.4 278.357 827.605 193.434 666.452 249.47Z" fill="white" fillOpacity="0.2"/>
                <path d="M1162.13 419.732C1174.92 461.268 1180.62 503.35 1180.07 544.859C1165.41 545.013 1150.83 545.003 1136.17 544.747C1136.54 517.717 1133.94 490.481 1128.06 463.288L1107.58 470.41C1139.07 622.257 1064.75 777.403 926.903 848.261L934.014 868.711C964.208 853.545 991.397 834.482 1015.55 812.63C1025.7 823.239 1035.65 834.056 1045.48 844.916C1027.61 861.148 1008.34 876.086 987.438 889.119L993.74 907.243C1158.36 806.215 1238.65 603.828 1179.91 413.549L1162.13 419.732ZM1058.11 831.05C1051.45 823.757 1044.79 816.464 1037.8 809.012C1103.01 743.511 1142.48 655.799 1148.23 563.615C1159.16 563.797 1169.05 563.788 1178.37 563.705C1172.48 664.175 1129.45 759.849 1058.11 831.05Z" fill="white" fillOpacity="0.2"/>
                <path d="M859.05 285.45C802.838 265.326 739.669 263.544 678.839 284.696C673.442 286.572 668.254 288.651 662.985 290.895C664.2 292.806 665.334 294.882 666.549 296.793C671.369 294.843 676.19 292.892 681.095 291.186C740.332 270.588 801.736 272.435 856.461 291.841C857.257 289.78 858.175 287.676 859.05 285.45Z" fill="white" fillOpacity="0.2"/>
                <defs>
                    <linearGradient id="paint0_linear_1804_22158" x1="767.499" y1="209.329" x2="767.499" y2="857.329" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#222325"/>
                        <stop offset="0.298077" stopColor="#264346"/>
                        <stop offset="0.567308" stopColor="#295C60"/>
                        <stop offset="0.975962" stopColor="#3BF3FF"/>
                    </linearGradient>
                    <radialGradient id="paint1_radial_1804_22158" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(767.499 533.329) rotate(90) scale(324 324.5)">
                        <stop stopColor="#717171" stopOpacity="0.04"/>
                        <stop offset="1" stopColor="#0B0B0B"/>
                    </radialGradient>
                </defs>
                <foreignObject x="50%" y="50%" width="2800" height="600" transform="translate(-1428, -285)">
                    <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any} className="flex flex-col items-center justify-center gap-6" style={{width: '100%', height: '100%'}}>
                        <VectorLines only_circles className="w-[56%] md:w-[400px] lg:w-[312px] xl:w-[13%]" />
                        <div className="py-10 w-[30%] sm:py-5 lg:py-10 xl:py-12 px-0 sm:px-16 md:px-20 lg:px-30 pointer-events-auto z-10 text-center">
                        <h1 className="text-center font-orbitron text-[2.35rem] sm:text-3xl md:text-2xl lg:text-[24px] xl:text-[48px] leading-[2.5rem] lg:leading-[2.2rem] xl:leading-[3rem]  text-white">
                            {vectorTitle}
                            <br />
                            <span className="font-black">
                                {vectorTitleBold}
                            </span>
                        </h1>
                        <h2 className="text-center font-light text-[1.1rem] sm:text-2xl md:text-xl lg:text-[12px] xl:text-[17px] lg:leading-[1rem] xl:leading-[1.3rem] text-white mt-3 lg:mt-8 xl:mt-8 w-[82%] mx-auto"
                            dangerouslySetInnerHTML={vectorDescription ? { __html: vectorDescription } : undefined}
                        />
                    </div>
                        <VectorLines flip only_circles className="w-[56%] md:w-[400px] lg:w-[312px] xl:w-[13%]" />
                    </div>
                </foreignObject>
            </svg>

            {/* TABLET */}
            <svg viewBox="0 0 1178 880" fill="none" xmlns="http://www.w3.org/2000/svg"  role="img" aria-label="Center Item Graphic" preserveAspectRatio="xMidYMid meet" className="w-[94%] h-auto hidden lg:block xl:hidden">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.000183105 246.753C0.000183105 243.018 3.0152 240.003 6.75018 240.003C10.1702 240.003 12.9602 242.523 13.4102 245.808V245.763H416.34L438.435 267.858H545.265V268.758H438.075L415.98 246.663H13.5002C13.5002 246.693 13.5002 246.723 13.5002 246.753C13.5002 250.488 10.4852 253.503 6.75018 253.503C3.0152 253.503 0.000183105 250.488 0.000183105 246.753ZM0.900146 246.753C0.900146 249.993 3.51019 252.603 6.75018 252.603C9.99017 252.603 12.6002 249.993 12.6002 246.753C12.6002 243.513 9.99017 240.903 6.75018 240.903C3.51019 240.903 0.900146 243.513 0.900146 246.753Z" fill="white"/>
                <foreignObject x="30" y={idioma === 'es' ? "-55" : "-55"} width="300" height="600">
                    <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any} style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span className={`w-1/3 h-[300px] lg:w-full lg:h-auto xl:w-full xl:h-[410px] flex flex-col items-center relative `}>
                            <div className={`flex flex-col w-full lg:w-[100%] xl:w-full`}>
                                <h3 dangerouslySetInnerHTML={{ __html: titles[0] }} className={`${className} text-left leading-5 lg:leading-5 xl:leading-7 uppercase font-orbitron font-bold text-[#3BF3FF] lg:text-[18px] xl:text-[24px] tracking-[4px] mb-8 lg:mb-8 xl:mb-8`}></h3>
                                <h4 dangerouslySetInnerHTML={{ __html: descriptions[0] }} className={`text-left leading-5 lg:leading-5 xl:leading-6 text-white text-[14px] lg:text-[17px] xl:text-[22px]`}></h4>
                            </div>
                        </span>
                    </div>
                </foreignObject>
                <path fillRule="evenodd" clipRule="evenodd" d="M0.000183105 560.753C0.000183105 557.018 3.0152 554.003 6.75018 554.003C10.1702 554.003 12.9602 556.523 13.4102 559.808V559.763H416.34L438.435 581.858H545.265V582.758H438.075L415.98 560.663H13.5002C13.5002 560.693 13.5002 560.723 13.5002 560.753C13.5002 564.488 10.4852 567.503 6.75018 567.503C3.0152 567.503 0.000183105 564.488 0.000183105 560.753ZM0.900146 560.753C0.900146 563.993 3.51019 566.603 6.75018 566.603C9.99017 566.603 12.6002 563.993 12.6002 560.753C12.6002 557.513 9.99017 554.903 6.75018 554.903C3.51019 554.903 0.900146 557.513 0.900146 560.753Z" fill="white"/>
                <foreignObject x="925" y={idioma === 'es' ? "185" : "180"} width="260" height="600">
                    <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any} style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span className={`w-full h-[300px] lg:w-full lg:h-auto xl:w-full xl:h-[410px] lg:pt-0 xl:pt-9 px-4 pb-5 flex flex-col items-center relative `}>
                            <div className={`flex flex-col text-center w-full lg:w-[100%] xl:w-full`}>
                                <h3 dangerouslySetInnerHTML={{ __html: titles[1] }} className={` text-left leading-5 lg:leading-5 xl:leading-7 uppercase font-orbitron font-bold text-[#3BF3FF] lg:text-[18px] xl:text-[24px] tracking-[4px] mb-[-85px] lg:mb-8 xl:mb-8`}></h3>
                                <h4 dangerouslySetInnerHTML={{ __html: descriptions[1] }} className={`text-left leading-5 lg:leading-5 xl:leading-6 text-white text-[14px] lg:text-[17px] xl:text-[22px]`}></h4>
                            </div>
                        </span>
                    </div>
                </foreignObject>
                <path fillRule="evenodd" clipRule="evenodd" d="M1178 369.808C1178 366.041 1174.98 363 1171.23 363C1167.8 363 1165 365.542 1164.55 368.855V368.809H760.335L738.17 391.092H631V392H738.531L760.696 369.717H1164.46C1164.46 369.747 1164.46 369.777 1164.46 369.808C1164.46 373.574 1167.48 376.615 1171.23 376.615C1174.98 376.615 1178 373.574 1178 369.808ZM1177.1 369.808C1177.1 373.075 1174.48 375.707 1171.23 375.707C1167.98 375.707 1165.36 373.075 1165.36 369.808C1165.36 366.54 1167.98 363.908 1171.23 363.908C1174.48 363.908 1177.1 366.54 1177.1 369.808Z" fill="white"/>
                <foreignObject x="10" y="280" width="350" height="600">
                    <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any} style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span className={`w-1/3 h-[300px] lg:w-full lg:h-auto xl:w-full xl:h-[410px] lg:pt-0 xl:pt-9 px-4 pb-5 flex flex-col items-center relative `}>
                            <div className={`flex flex-col text-center w-full`}>
                                <h3 dangerouslySetInnerHTML={{ __html: titles[2] }} className={` text-left leading-5 lg:leading-5 xl:leading-7 uppercase font-orbitron font-bold text-[#3BF3FF] lg:text-[18px] xl:text-[24px] tracking-[4px] mb-[-85px] lg:mb-8 xl:mb-8`}></h3>
                                <h4 dangerouslySetInnerHTML={{ __html: descriptions[2] }} className={` text-left leading-5 lg:leading-5 xl:leading-6 text-white text-[14px] lg:text-[17px] xl:text-[22px]`}></h4>
                            </div>
                        </span>
                    </div>
                </foreignObject>
                <ellipse cx="578.262" cy="440.764" rx="268.201" ry="267.788" fill="url(#paint0_linear_0_1)"/>
                <ellipse cx="578.262" cy="440.764" rx="268.201" ry="267.788" fill="url(#paint1_radial_0_1)"/>
                <g opacity="0.4" clipPath="url(#clip0_0_1)">
                    <path d="M836.312 357.512L865.505 347.361C865.47 347.259 865.435 347.158 865.365 346.956C860.86 334 855.478 321.463 849.527 309.578L884.396 297.453C857.756 242.73 817.696 197.778 769.717 165.337L753.571 198.633C733.887 184.83 712.637 173.385 690.368 164.565L710.484 123.081L700.871 119.616C624.98 91.2081 540.811 90.297 464.043 116.877L455.224 119.944L470.358 163.466C317.427 221.635 237.552 391.224 291.575 546.587C291.61 546.688 291.645 546.79 291.715 546.992L320.908 536.841C348.919 617.069 410.733 675.899 484.977 702.837L471.412 730.812C534.044 754.414 604.834 757.368 673.236 734.831L663.101 705.681C664.722 705.117 666.379 704.655 668.001 704.091C810.114 654.675 885.487 499.586 836.312 357.512ZM467.105 125.683C544.988 98.7149 625.992 101.634 697.654 128.336L681.575 161.496C618.445 138.748 547.496 136.643 479.141 160.298L467.105 125.683ZM666.351 699.673C526.468 748.313 373.796 674.561 325.228 534.885C276.66 395.21 350.74 242.612 490.522 194.007C630.405 145.367 783.077 219.119 831.645 358.794C880.213 498.47 806.235 651.032 666.351 699.673Z" fill="white" fillOpacity="0.2"/>
                    <path d="M433.851 164.021L427.305 145.195C380.629 168.459 341.373 201.623 310.982 241.007L329.281 249.847C356.977 214.803 392.239 185.183 433.851 164.021Z" fill="white" fillOpacity="0.2"/>
                    <path d="M681.762 261.042C674.086 276.871 666.344 292.837 658.668 308.666C690.661 327.153 716.378 356.671 729.47 394.322C742.597 432.075 740.676 471.317 726.887 505.836L774.546 528.859C794.123 482.23 797.391 428.565 779.478 377.047C761.564 325.529 725.908 285.399 681.762 261.042Z" fill="white" fillOpacity="0.2"/>
                    <path d="M576.933 669.615L571.865 655.04C541.313 654.092 511.592 646.387 484.615 632.85L505.922 588.91C470.44 570.843 441.547 539.706 427.434 499.12C414.307 461.367 416.228 422.125 430.017 387.606L386.045 366.365C398.699 336.097 418.516 308.785 444.005 287.329L438.937 272.754C367.303 330.11 335.88 428.281 367.73 519.88C399.581 611.478 485.067 669.111 576.933 669.615Z" fill="white" fillOpacity="0.2"/>
                    <path d="M314.219 585.57C312.182 580.038 305.97 577.206 300.364 579.382C294.824 581.422 292.085 587.593 294.122 593.125C296.159 598.656 302.37 601.489 307.976 599.312C313.516 597.273 316.357 591.066 314.219 585.57Z" fill="white" fillOpacity="0.2"/>
                    <path d="M331.501 616.318C329.464 610.786 323.253 607.954 317.647 610.13C312.107 612.17 309.266 618.377 311.439 623.974C313.476 629.506 319.687 632.338 325.294 630.162C330.732 628.157 333.573 621.951 331.501 616.318Z" fill="white" fillOpacity="0.2"/>
                    <path d="M350.832 645.447C348.795 639.915 342.584 637.083 336.978 639.259C331.438 641.299 328.597 647.506 330.771 653.103C332.808 658.635 339.019 661.467 344.625 659.291C350.13 657.15 352.971 650.943 350.832 645.447Z" fill="white" fillOpacity="0.2"/>
                    <path d="M375.309 670.744C373.272 665.212 367.061 662.38 361.455 664.556C355.915 666.596 353.074 672.803 355.247 678.4C357.284 683.932 363.496 686.764 369.102 684.588C374.606 682.447 377.447 676.24 375.309 670.744Z" fill="white" fillOpacity="0.2"/>
                    <path d="M387.55 686.341C382.01 688.381 379.169 694.588 381.342 700.185C383.379 705.717 389.591 708.549 395.197 706.373C400.737 704.333 403.578 698.126 401.404 692.529C399.266 687.033 393.054 684.2 387.55 686.341Z" fill="white" fillOpacity="0.2"/>
                    <path d="M416.506 706.224C410.966 708.264 408.125 714.471 410.298 720.068C412.336 725.6 418.547 728.432 424.153 726.256C429.693 724.216 432.534 718.009 430.36 712.412C428.222 706.915 422.011 704.083 416.506 706.224Z" fill="white" fillOpacity="0.2"/>
                    <path d="M352.697 525.333C352.486 524.725 352.31 524.219 352.134 523.713L336.93 529C337.106 529.506 337.317 530.113 337.493 530.62C382.541 660.174 521.728 730.106 652.089 690.676L646.81 675.494C524.863 711.998 394.825 646.486 352.697 525.333Z" fill="white" fillOpacity="0.2"/>
                    <path d="M494.745 206.153C435.548 226.737 388.743 266.95 359.096 316.967L373.708 324.025C401.467 277.728 445.119 240.54 500.059 221.436C624.737 178.083 760.886 243.853 804.175 368.346C823.286 423.305 821.112 480.446 801.956 530.9L816.568 537.958C837.475 483.719 840.035 422.133 819.481 363.024C773.236 230.028 627.938 159.839 494.745 206.153Z" fill="white" fillOpacity="0.2"/>
                    <path d="M904.422 346.876C914.996 381.206 919.704 415.986 919.249 450.294C907.136 450.421 895.089 450.413 882.972 450.201C883.271 427.861 881.124 405.35 876.263 382.875L859.335 388.761C885.364 514.264 823.944 642.492 710.008 701.057L715.886 717.959C740.841 705.424 763.313 689.669 783.279 671.608C791.669 680.376 799.89 689.317 808.01 698.292C793.246 711.708 777.315 724.054 760.041 734.826L765.249 749.806C901.305 666.305 967.669 499.032 919.12 341.765L904.422 346.876ZM818.455 686.832C812.951 680.804 807.446 674.777 801.669 668.617C855.561 614.481 888.186 541.986 892.939 465.795C901.968 465.946 910.146 465.939 917.848 465.87C912.977 548.909 877.414 627.984 818.455 686.832Z" fill="white" fillOpacity="0.2"/>
                    <path d="M653.928 235.89C607.468 219.257 555.259 217.784 504.982 235.267C500.522 236.817 496.234 238.536 491.879 240.39C492.883 241.97 493.82 243.686 494.824 245.265C498.808 243.653 502.793 242.041 506.847 240.631C555.806 223.607 606.557 225.133 651.788 241.172C652.445 239.469 653.204 237.73 653.928 235.89Z" fill="white" fillOpacity="0.2"/>
                </g>
                <defs>
                    <linearGradient id="paint0_linear_0_1" x1="578.262" y1="172.977" x2="578.262" y2="708.552" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#222325"/>
                        <stop offset="0.298077" stopColor="#264346"/>
                        <stop offset="0.567308" stopColor="#295C60"/>
                        <stop offset="0.975962" stopColor="#3BF3FF"/>
                    </linearGradient>
                    <radialGradient id="paint1_radial_0_1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(578.262 440.764) rotate(90) scale(267.788 268.201)">
                        <stop stopColor="#717171" stopOpacity="0.04"/>
                        <stop offset="1" stopColor="#0B0B0B"/>
                    </radialGradient>
                    <clipPath id="clip0_0_1">
                        <rect width="672.775" height="696.744" fill="white" transform="translate(164.713 220.96) rotate(-19.1736)"/>
                    </clipPath>
                </defs>
                <foreignObject x="50%" y="50%" width="2800" height="600" transform="translate(-1390, -285)">
                    <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any} className="flex flex-col items-center justify-center gap-4" style={{width: '100%', height: '100%'}}>
                        <VectorLines only_circles className="w-[56%] md:w-[400px] lg:w-[308px] xl:w-[13%]" />
                        <div className="py-10 w-[30%] sm:py-5 lg:py-8 xl:py-12 px-0 sm:px-16 md:px-20 lg:px-30 pointer-events-auto z-10 text-center">
                            <h1 className="text-center font-orbitron text-[2.35rem] sm:text-3xl md:text-2xl lg:text-[39px] xl:text-[48px] leading-[2.5rem] lg:leading-[2.2rem] xl:leading-[3rem]  text-white">
                                {vectorTitle}
                                <br />
                                <span className="font-black">
                                    {vectorTitleBold}
                                </span>
                            </h1>
                            <h2 className="text-center font-light text-[1.1rem] sm:text-2xl md:text-xl lg:text-[15px] xl:text-[17px] lg:leading-[1rem] xl:leading-[1.3rem] text-white mt-3 lg:mt-8 xl:mt-8 w-[70%] mx-auto"
                                dangerouslySetInnerHTML={vectorDescription ? { __html: vectorDescription } : undefined}
                            />
                        </div>
                        <VectorLines flip only_circles className="w-[56%] md:w-[400px] lg:w-[308px] xl:w-[13%]" />
                    </div>
                </foreignObject>
            </svg>

            {/* MOBILE */}
            <svg viewBox="0 0 412 689" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Center Item Graphic" preserveAspectRatio="xMidYMid meet" className="w-full h-[1200px] block lg:hidden">
                <path d="M205.5 495L205.5 570L205.5 645" stroke="white"/>
                <foreignObject x="-43" y={idioma === 'es' ? "360" : "375"} width="300" height="600">
                    <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any} style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span className={`w-[40%] h-[300px] lg:w-full lg:h-auto xl:w-full xl:h-[410px] flex flex-col items-center relative `}>
                            <div className={`flex flex-col w-full lg:w-[100%] xl:w-full`}>
                                <h3 dangerouslySetInnerHTML={{ __html: titles[0] }} className={`${className} text-left leading-[15px] lg:leading-5 xl:leading-7 uppercase font-orbitron font-bold text-[#3BF3FF] text-[13px] xl:text-[24px] tracking-[3px] mb-4 lg:mb-8 xl:mb-8`}></h3>
                                <h4 dangerouslySetInnerHTML={{ __html: descriptions[0] }} className={`text-left leading-[18px] lg:leading-5 xl:leading-6 text-white text-[11px] lg:text-[17px] xl:text-[22px]`}></h4>
                            </div>
                        </span>
                    </div>
                </foreignObject>
                <path d="M48 548.5H166.5L188.5 495" stroke="white"/>
                <foreignObject x="45" y={idioma === 'es' ? "500" : "500"} width="260" height="600">
                    <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any} style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span className={`w-[40%] h-[300px] lg:w-full lg:h-auto xl:w-full xl:h-[410px] lg:pt-0 xl:pt-9 px-4 pb-5 flex flex-col items-center relative `}>
                            <div className={`flex flex-col text-center w-full lg:w-[100%] xl:w-full`}>
                                <h3 dangerouslySetInnerHTML={{ __html: titles[1] }} className={`${className} text-left leading-[15px] lg:leading-5 xl:leading-7 uppercase font-orbitron font-bold text-[#3BF3FF] text-[13px] xl:text-[24px] tracking-[3px] mb-4 lg:mb-8 xl:mb-8`}></h3>
                            </div>
                        </span>
                    </div>
                </foreignObject>
                <foreignObject x="10" y={idioma === 'es' ? "545" : "545"} width="100%" height="600">
                    <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any} style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span className={`w-[84%] h-[300px] lg:w-full lg:h-auto xl:w-full xl:h-[410px] lg:pt-0 xl:pt-9 px-4 pb-5 flex flex-col items-center relative `}>
                            <div className={`flex flex-col text-center w-full lg:w-[100%] xl:w-full`}>
                                <h4 dangerouslySetInnerHTML={{ __html: descriptions[1] }} className={`text-left leading-[18px] lg:leading-5 xl:leading-6 text-white text-[11px] lg:text-[17px] xl:text-[22px]`}></h4>
                            </div>
                        </span>
                    </div>
                </foreignObject>
                <path d="M362 548.5H243.5L221 493.5" stroke="white"/>
                <foreignObject x="140" y="360" width="350" height="600">
                    <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any} style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span className={`w-[45%] h-[300px] lg:w-full lg:h-auto xl:w-full xl:h-[410px] lg:pt-0 xl:pt-9 px-4 pb-5 flex flex-col items-center relative `}>
                            <div className={`flex flex-col text-center w-full`}>
                                <h3 dangerouslySetInnerHTML={{ __html: titles[2] }} className={`${className} text-left leading-[15px] lg:leading-5 xl:leading-7 uppercase font-orbitron font-bold text-[#3BF3FF] text-[13px] xl:text-[24px] tracking-[3px] mb-4 lg:mb-8 xl:mb-8`}></h3>
                                <h4 dangerouslySetInnerHTML={{ __html: descriptions[2] }} className={`text-left leading-[18px] lg:leading-5 xl:leading-6 text-white text-[11px] lg:text-[17px] xl:text-[22px]`}></h4>
                            </div>
                        </span>
                    </div>
                </foreignObject>
                <circle cx="128" cy="645" r="1.5" stroke="white"/>
                <circle cx="282" cy="645" r="1.5" stroke="white"/>
                <path d="M129.5 645H280.5" stroke="white"/>
                <circle cx="364" cy="549" r="1.5" stroke="white"/>
                <circle cx="47" cy="549" r="1.5" stroke="white"/>
                <circle cx="128" cy="687" r="1.5" stroke="white"/>
                <circle cx="282" cy="687" r="1.5" stroke="white"/>
                <path d="M129.5 687H280.5" stroke="white"/>
                <ellipse cx="205.5" cy="310.21" rx="191.5" ry="185.5" fill="black"/>
                <ellipse cx="206" cy="291.21" rx="177" ry="176.5" fill="url(#paint0_linear_6_215)"/>
                <ellipse cx="206" cy="291.21" rx="177" ry="176.5" fill="url(#paint1_radial_6_215)"/>
                <path d="M376.647 236.189L395.931 229.483C395.908 229.416 395.885 229.349 395.838 229.216C392.863 220.658 389.307 212.376 385.376 204.525L408.41 196.515C390.812 160.366 364.35 130.672 332.655 109.242L321.99 131.237C308.987 122.118 294.95 114.558 280.239 108.732L293.527 81.3281L287.177 79.0395C237.045 60.2735 181.444 59.6717 130.733 77.2302L124.907 79.2559L134.904 108.006C33.8807 146.431 -18.8832 258.458 16.8034 361.089C16.8266 361.155 16.8499 361.222 16.8964 361.356L36.1807 354.65C54.6838 407.647 95.5171 446.509 144.562 464.304L135.601 482.784C176.974 498.375 223.737 500.326 268.922 485.439L262.227 466.183C263.298 465.811 264.392 465.505 265.464 465.132C359.341 432.489 409.131 330.04 376.647 236.189ZM132.755 83.047C184.204 65.2324 237.713 67.1608 285.052 84.7997L274.43 106.704C232.728 91.6772 185.86 90.2872 140.706 105.913L132.755 83.047ZM264.374 462.214C171.97 494.345 71.117 445.626 39.034 353.359C6.95092 261.092 55.8868 160.288 148.224 128.181C240.628 96.0499 341.481 144.769 373.564 237.036C405.647 329.303 356.778 430.083 264.374 462.214Z" fill="white" fillOpacity="0.2"/>
                <path d="M110.789 108.372L106.464 95.9359C75.6314 111.304 49.6992 133.211 29.624 159.228L41.7119 165.067C60.007 141.918 83.3008 122.352 110.789 108.372Z" fill="white" fillOpacity="0.2"/>
                <path d="M274.554 172.463C269.483 182.919 264.369 193.466 259.299 203.923C280.433 216.134 297.42 235.633 306.069 260.505C314.741 285.444 313.472 311.366 304.363 334.169L335.846 349.377C348.778 318.575 350.937 283.125 339.103 249.094C327.27 215.062 303.716 188.553 274.554 172.463Z" fill="white" fillOpacity="0.2"/>
                <path d="M205.306 442.358L201.958 432.73C181.776 432.104 162.143 427.015 144.323 418.072L158.397 389.046C134.958 377.111 115.872 356.543 106.55 329.732C97.878 304.793 99.147 278.871 108.256 256.069L79.2086 242.037C87.5677 222.043 100.659 204.001 117.496 189.827L114.148 180.2C66.8281 218.088 46.0706 282.938 67.1106 343.446C88.1505 403.954 144.621 442.026 205.306 442.358Z" fill="white" fillOpacity="0.2"/>
                <path d="M31.7619 386.839C30.4163 383.185 26.3132 381.315 22.6099 382.752C18.9504 384.1 17.1406 388.176 18.4862 391.83C19.8318 395.484 23.9349 397.355 27.6382 395.918C31.2977 394.57 33.1745 390.47 31.7619 386.839Z" fill="white" fillOpacity="0.2"/>
                <path d="M43.178 407.151C41.8323 403.497 37.7293 401.627 34.026 403.064C30.3665 404.412 28.4897 408.512 29.9255 412.209C31.2712 415.863 35.3743 417.734 39.0775 416.297C42.6701 414.972 44.5468 410.872 43.178 407.151Z" fill="white" fillOpacity="0.2"/>
                <path d="M55.9484 426.393C54.6027 422.739 50.4996 420.869 46.7964 422.306C43.1369 423.654 41.2601 427.754 42.6959 431.451C44.0416 435.105 48.1446 436.976 51.8479 435.538C55.4842 434.124 57.3609 430.024 55.9484 426.393Z" fill="white" fillOpacity="0.2"/>
                <path d="M72.1168 443.105C70.7712 439.451 66.6681 437.58 62.9649 439.017C59.3053 440.365 57.4285 444.465 58.8644 448.162C60.21 451.816 64.3131 453.687 68.0163 452.25C71.6526 450.835 73.5294 446.735 72.1168 443.105Z" fill="white" fillOpacity="0.2"/>
                <path d="M80.2029 453.408C76.5434 454.756 74.6666 458.856 76.1024 462.553C77.4481 466.207 81.5511 468.078 85.2544 466.641C88.9139 465.293 90.7907 461.193 89.3549 457.495C87.9423 453.865 83.8392 451.994 80.2029 453.408Z" fill="white" fillOpacity="0.2"/>
                <path d="M99.3307 466.543C95.6712 467.89 93.7944 471.99 95.2302 475.688C96.5759 479.342 100.679 481.213 104.382 479.775C108.042 478.428 109.918 474.328 108.483 470.63C107.07 466.999 102.967 465.128 99.3307 466.543Z" fill="white" fillOpacity="0.2"/>
                <path d="M57.18 347.049C57.0405 346.648 56.9242 346.313 56.808 345.979L46.764 349.471C46.8803 349.806 47.0198 350.207 47.136 350.541C76.8942 436.122 168.839 482.318 254.952 456.272L251.465 446.243C170.909 470.356 85.0085 427.08 57.18 347.049Z" fill="white" fillOpacity="0.2"/>
                <path d="M151.014 136.204C111.91 149.801 80.9916 176.365 61.4073 209.406L71.0596 214.068C89.3967 183.485 118.232 158.919 154.524 146.3C236.885 117.661 326.822 161.108 355.418 243.346C368.042 279.651 366.606 317.397 353.952 350.726L363.605 355.388C377.416 319.559 379.106 278.876 365.529 239.83C334.98 151.976 238.999 105.61 151.014 136.204Z" fill="white" fillOpacity="0.2"/>
                <path d="M421.639 229.163C428.624 251.841 431.734 274.816 431.434 297.479C423.432 297.563 415.474 297.558 407.47 297.418C407.667 282.66 406.249 267.79 403.038 252.943L391.856 256.832C409.05 339.737 368.477 424.442 293.213 463.128L297.095 474.294C313.581 466.014 328.425 455.606 341.615 443.675C347.156 449.467 352.587 455.373 357.951 461.302C348.198 470.164 337.675 478.32 326.263 485.436L329.704 495.331C419.58 440.172 463.419 329.675 431.348 225.787L421.639 229.163ZM364.851 453.732C361.215 449.75 357.579 445.768 353.762 441.7C389.363 405.938 410.914 358.049 414.054 307.719C420.018 307.819 425.42 307.814 430.508 307.768C427.29 362.622 403.798 414.858 364.851 453.732Z" fill="white" fillOpacity="0.2"/>
                <path d="M256.167 155.848C225.477 144.861 190.988 143.888 157.776 155.437C154.83 156.461 151.997 157.596 149.121 158.821C149.784 159.865 150.403 160.998 151.066 162.042C153.698 160.977 156.33 159.912 159.009 158.98C191.35 147.735 224.875 148.743 254.754 159.338C255.188 158.212 255.689 157.064 256.167 155.848Z" fill="white" fillOpacity="0.2"/>
                <defs>
                    <linearGradient id="paint0_linear_6_215" x1="206" y1="114.71" x2="206" y2="467.71" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#222325"/>
                        <stop offset="0.298077" stopColor="#264346"/>
                        <stop offset="0.567308" stopColor="#295C60"/>
                        <stop offset="0.975962" stopColor="#3BF3FF"/>
                    </linearGradient>
                    <radialGradient id="paint1_radial_6_215" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(206 291.21) rotate(90) scale(176.5 177)">
                        <stop stopColor="#717171" stopOpacity="0.04"/>
                        <stop offset="1" stopColor="#0B0B0B"/>
                    </radialGradient>
                </defs>
                <foreignObject x="50%" y="50%" width="2800" height="600" transform="translate(-1400, -335)">
                    <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any} className="flex flex-col items-center justify-center gap-4" style={{width: '100%', height: '100%'}}>
                        <VectorLines only_circles className="w-[8.5%] md:w-[400px] lg:w-[308px] xl:w-[13%]" />
                        <div className="py-2 w-[30%] sm:py-5 lg:py-8 xl:py-12 px-0 sm:px-16 md:px-20 lg:px-30 pointer-events-auto z-10 text-center">
                            <h1 className="text-center font-orbitron text-[28.5px] sm:text-3xl md:text-2xl lg:text-[39px] xl:text-[48px] leading-[30px] lg:leading-[2.2rem] xl:leading-[3rem]  text-white">
                                {vectorTitle}
                                <br />
                                <span className="font-black">
                                    {vectorTitleBold}
                                </span>
                            </h1>
                            <h2 className="text-center font-light text-[12px] leading-[13px] text-white mt-3 lg:mt-8 xl:mt-8 w-[30%]  mx-auto"
                                dangerouslySetInnerHTML={vectorDescription ? { __html: vectorDescription } : undefined}
                            />
                        </div>
                        <VectorLines flip only_circles className="w-[8.5%] md:w-[400px] lg:w-[308px] xl:w-[13%]" />
                    </div>
                </foreignObject>
            </svg>
        </div>
    );
}

export default CenterItem;