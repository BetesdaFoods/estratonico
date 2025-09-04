import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
	const shortDate = date
		.toLocaleDateString("es-ES", {
			weekday: "long",
			day: "numeric",
			month: "long",
		})
		.replace(/,/g, "");
	return (
		<>
			{shortDate},{" "}
			<span className="font-light">{date.getFullYear()}</span>
		</>
	);
}

export function truncateText(text: string, maxChars: number) {
	return text.length > maxChars ? text.substring(0, maxChars) + "..." : text;
}

export function closestMultipleGreaterOrEqual(a: number, b: number): number {
    // Handle edge cases
    if (b === 0) {
        throw new Error("Cannot find multiple of zero");
    }
    
    // If a is already a multiple of b, return a
    if (a % b === 0) {
        return a;
    }
    
    // Calculate the quotient (integer division)
    const quotient = Math.floor(a / b);
    
    // Return (quotient + 1) * b, which is the next multiple of b after a
    return (quotient + 1) * b;
}