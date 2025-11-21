import React, { ReactNode } from "react";

interface RectangleProps {
    icon?: ReactNode;
    title: string;
    text: string;
    className?: string;
    width?: string;
}

export default function Rectangle({ icon, title, text, className, width }: RectangleProps) {
    return (
        <span className={`w-1/3 h-auto lg:w-[30%] lg:h-auto xl:w-[300px] xl:h-[300px] bg-[#212121] rounded-[30px] lg:rounded-[30px] xl:rounded-[30px] pt-9 px-2 lg:px-4 pb-5 flex flex-col items-center relative shadow-[0_1px_0_rgba(0,0,0,0.03)] overflow-visible font-sans ${className ?? ""}`}>
            <div className="absolute top-0 left-1/2  -translate-x-1/2 w-full flex items-center justify-center pointer-events-none max-[360px]:w-[72px]" aria-hidden="true">
                <div className="relative z-10 top-[-7.5px] w-[70px] h-[15px] lg:top-[-7.5px] lg:w-[100px] lg:h-[15px] xl:top-[-10px] xl:w-[120px] xl:h-[20px] bg-[#35DBE5] max-[360px]:w-[56px]" />
                <div className="pointer-events-none absolute top-[7.5px] w-[70px] h-[10px] lg:top-[7.5px] lg:w-[100px] lg:h-[15px] xl:top-[10px] z-10 xl:w-[120px] xl:h-[10px] bg-gradient-to-b from-[#35DBE5]/100 to-transparent max-[360px]:w-[56px]" />
            </div>

            <div className={`flex flex-col items-center lg:mt-2 xl:mt-4 text-center font-roboto ${width ? width : 'w-full lg:w-[100%] xl:w-[85%]'}`}>
                {icon && <div className="w-[4rem] h-[4rem] lg:w-[4rem] lg:h-[4rem] xl:w-[6rem] xl:h-[4rem] flex items-center justify-center xl:mb-3 text-[24px]">{icon}</div>}
                <h3 className="mt-3 lg:mt-3 xl:mt-4 text-[15px] lg:text-[1.15rem] xl:text-[20px] font-[1000] text-[#35DBE5] leading-[1.2]">{title}</h3>
                <p className="mt-3 lg:mt-4 xl:mt-3 text-[11px] lg:text-[0.83rem] xl:text-[15px] font-normal lg:font-light text-left text-white leading-[1.3]">{text}</p>
            </div>
        </span>
    );
}