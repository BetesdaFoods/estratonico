import Link from "next/link";

type BaseButtonProps = {
	children: React.ReactNode;
	className?: string;
	sm?: boolean;
	variant?: "transparent" | "white" | "black";
	disabled?: boolean;
};

type ButtonAsLink = BaseButtonProps & {
	href: string;
	onClick?: never;
};

type ButtonAsButton = BaseButtonProps & {
	onClick: () => void;
	href?: never;
};

type ButtonAsSubmit = BaseButtonProps & {
	submit: true;
};

export type ButtonProps = ButtonAsLink | ButtonAsButton | ButtonAsSubmit;

export default function ButtonOval(props: ButtonProps) {
	const {
		children,
		className: extraClasses,
		sm = false,
		variant = "transparent",
	} = props;

	const variantClasses = {
		transparent: "",
		white: "!bg-white !text-black",
		black: "!bg-black !text-white notched-shape-black",
	};

	const hoverClasses = props.disabled
		? {
				transparent: "",
				white: "",
				black: "",
		}
		: {
				transparent: "hover:bg-white hover:text-black",
				white: "hover:!bg-black hover:!text-white",
				black: "hover:!bg-white hover:!text-black",
		};

	const commonClasses = `
    oval-shape inline-block
    ${sm ? "oval-shape-sm" : ""}
    ${variantClasses[variant]}
    ${hoverClasses[variant]} transition-colors duration-300
    ${extraClasses}
    `;

	return "href" in props ? (
		<Link href={props.href!} className={commonClasses}>
			{children}
		</Link>
	) : "onClick" in props ? (
		<button
			onClick={props.onClick}
			className={commonClasses}
			disabled={props.disabled}
		>
			{children}
		</button>
	) : (
		<button
			type="submit"
			className={commonClasses}
			disabled={props.disabled}
		>
			{children}
		</button>
	);
}
