function IndicatorLinesVector({ flip = false, type, title, className, description }: { flip?: boolean, type?: string, title?: string, className?: string, description?: string }) {
    return (
        <div className="flex flex-col w-full h-auto">
            {title && (
                <h3 dangerouslySetInnerHTML={{ __html: title }} className={`${className} leading-5 lg:leading-5 xl:leading-7 uppercase font-orbitron font-bold text-[#3BF3FF] lg:text-[17px] xl:text-[24px] tracking-[4px] mb-[-85px] lg:mb-1 xl:mb-2`}></h3>
            )}
            <svg
                width="546"
                height="29"
                viewBox="0 0 546 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth={2}
                role="img"
                aria-label={title ? `${title} - ${description ?? ''}` : 'indicator lines'}
                preserveAspectRatio="xMinYMin meet"
            >
                <g transform={flip ? "translate(546, 0) scale(-1, 1)" : ""}>
                    {type === "small" && (
                        <path fillRule="evenodd" clipRule="evenodd" d="M-0.000305176 6.74987C-0.000305176
                            3.01487 3.01471 -0.000127792 6.74969 -0.000127792C10.1697 -0.000127792 12.9597
                            2.51988 13.4097 5.80488V5.75987H416.34L438.435 27.8549H490.265V28.7549H438.075L415.98
                            6.65987H13.4997C13.4997 6.68987 13.4997 6.71987 13.4997 6.74987C13.4997 10.4849 10.4847
                            13.4999 6.74969 13.4999C3.01471 13.4999 -0.000305176 10.4849 -0.000305176 6.74987ZM0.899658
                            6.74987C0.899658 9.98987 3.5097 12.5999 6.74969 12.5999C9.98969 12.5999 12.5997 9.98987
                            12.5997 6.74987C12.5997 3.50987 9.98969 0.899872 6.74969 0.899872C3.5097 0.899872 0.899658
                            3.50987 0.899658 6.74987Z" fill="white"/>
                    )}
                    {type === "normal" && (
                        <path fillRule="evenodd" clipRule="evenodd" d="M-0.000305176 6.74987C-0.000305176
                            3.01487 3.01471 -0.000127792 6.74969 -0.000127792C10.1697 -0.000127792 12.9597
                            2.51988 13.4097 5.80488V5.75987H416.34L438.435 27.8549H520.265V28.7549H438.075L415.98
                            6.65987H13.4997C13.4997 6.68987 13.4997 6.71987 13.4997 6.74987C13.4997 10.4849 10.4847
                            13.4999 6.74969 13.4999C3.01471 13.4999 -0.000305176 10.4849 -0.000305176 6.74987ZM0.899658
                            6.74987C0.899658 9.98987 3.5097 12.5999 6.74969 12.5999C9.98969 12.5999 12.5997 9.98987
                            12.5997 6.74987C12.5997 3.50987 9.98969 0.899872 6.74969 0.899872C3.5097 0.899872 0.899658
                            3.50987 0.899658 6.74987Z" fill="white"/>
                    )}
                    {type === "large" && (
                        <path fillRule="evenodd" clipRule="evenodd" d="M-0.000305176 6.74987C-0.000305176
                            3.01487 3.01471 -0.000127792 6.74969 -0.000127792C10.1697 -0.000127792 12.9597
                            2.51988 13.4097 5.80488V5.75987H416.34L438.435 27.8549H545.265V28.7549H438.075L415.98
                            6.65987H13.4997C13.4997 6.68987 13.4997 6.71987 13.4997 6.74987C13.4997 10.4849 10.4847
                            13.4999 6.74969 13.4999C3.01471 13.4999 -0.000305176 10.4849 -0.000305176 6.74987ZM0.899658
                            6.74987C0.899658 9.98987 3.5097 12.5999 6.74969 12.5999C9.98969 12.5999 12.5997 9.98987
                            12.5997 6.74987C12.5997 3.50987 9.98969 0.899872 6.74969 0.899872C3.5097 0.899872 0.899658
                            3.50987 0.899658 6.74987Z" fill="white"/>
                    )}
                    {type === "without_line_small" && (
                        <svg width="280" height="14" viewBox="0 0 417 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M-9.15527e-05 6.75C-9.15527e-05 3.015 3.01491
                                0 6.74991 0C10.1699 0 12.9599 2.52002 13.4099 5.80502V5.75999H416.34L415.98 6.66H13.4999C13.4999
                                6.69 13.4999 6.72 13.4999 6.75C13.4999 10.485 10.4849 13.5 6.74991 13.5C3.01491 13.5 -9.15527e-05
                                10.485 -9.15527e-05 6.75ZM0.899872 6.75C0.899872 9.99 3.50991 12.6 6.74991 12.6C9.98991
                                12.6 12.5999 9.99 12.5999 6.75C12.5999 3.51 9.98991 0.900002 6.74991 0.900002C3.50991
                                0.900002 0.899872 3.51 0.899872 6.75Z" fill="white"
                            />
                        </svg>
                    )}
                    {type === "without_line_normal" && (
                        <svg width="320" height="14" viewBox="0 0 417 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M-9.15527e-05 6.75C-9.15527e-05 3.015 3.01491
                                0 6.74991 0C10.1699 0 12.9599 2.52002 13.4099 5.80502V5.75999H416.34L415.98 6.66H13.4999C13.4999
                                6.69 13.4999 6.72 13.4999 6.75C13.4999 10.485 10.4849 13.5 6.74991 13.5C3.01491 13.5 -9.15527e-05
                                10.485 -9.15527e-05 6.75ZM0.899872 6.75C0.899872 9.99 3.50991 12.6 6.74991 12.6C9.98991
                                12.6 12.5999 9.99 12.5999 6.75C12.5999 3.51 9.98991 0.900002 6.74991 0.900002C3.50991
                                0.900002 0.899872 3.51 0.899872 6.75Z" fill="white"
                            />
                        </svg>
                    )}
                    {type === "without_line_large" && (
                        <svg width="350" height="14" viewBox="0 0 417 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M-9.15527e-05 6.75C-9.15527e-05 3.015 3.01491
                                0 6.74991 0C10.1699 0 12.9599 2.52002 13.4099 5.80502V5.75999H416.34L415.98 6.66H13.4999C13.4999
                                6.69 13.4999 6.72 13.4999 6.75C13.4999 10.485 10.4849 13.5 6.74991 13.5C3.01491 13.5 -9.15527e-05
                                10.485 -9.15527e-05 6.75ZM0.899872 6.75C0.899872 9.99 3.50991 12.6 6.74991 12.6C9.98991
                                12.6 12.5999 9.99 12.5999 6.75C12.5999 3.51 9.98991 0.900002 6.74991 0.900002C3.50991
                                0.900002 0.899872 3.51 0.899872 6.75Z" fill="white"
                            />
                        </svg>
                    )}
                </g>
            </svg>
            {type === "mobile" && (
                <svg width="300" height="70" viewBox="0 0 144 57" fill="none" xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label={title ? `${title} - ${description ?? ''}` : 'indicator lines'}
                preserveAspectRatio="xMinYMin meet">
                    <g transform={flip ? "translate(144, 0) scale(-1, 1)" : ""}>
                        <path d="M3 53.6902H121.5L143.5 0.190186" stroke="white"/>
                        <circle cx="2" cy="54.1902" r="1.5" stroke="white"/>
                    </g>
                </svg>
            )}
            {description && (
                <h4 dangerouslySetInnerHTML={{ __html: description }} className={`${className} leading-5 lg:leading-5 xl:leading-6 text-white text-[14px] lg:text-[13px] xl:text-[22px] mt-1 lg:mt-[-5px] xl:mt-0`}></h4>
            )}
        </div>
    );
}

export default IndicatorLinesVector;