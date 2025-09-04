import { NextResponse } from "next/server";
import { addSubscriberToNewsletter } from "@/lib/data";

export async function POST(request: Request) {
	const formData = await request.formData();
	const email = formData.get("email") as string;

	if (!email) {
		return NextResponse.json(
			{ error: "Email is required" },
			{ status: 400 }
		);
	}

	try {
		await addSubscriberToNewsletter(email);
	} catch (error) {
		console.error(
			"Error adding email to newsletter:",
			(error as Error).message
		);
		return NextResponse.json(
			{ error: "An error occurred while subscribing" },
			{ status: 500 }
		);
	}

	return NextResponse.json(
		{ message: "Subscription successful", email },
		{ status: 200 }
	);
}
