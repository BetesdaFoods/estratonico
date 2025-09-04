import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const phone = formData.get("phone") as string;
		const message = formData.get("message") as string;

		if (!email) {
			return NextResponse.json(
				{ error: "Email is required" },
				{ status: 400 }
			);
		}

		// Configure email
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			secure: true,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		} as SMTPTransport.Options);

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: process.env.EMAIL_CONTACT_RECIPIENT,
			replyTo: email,
			subject: "Estratonico: Nueva Solicitud de Contacto",
			html: `
		<h2>Nueva Solicitud del Formulario de Contacto</h2>
		<p><strong>Nombre:</strong> ${name}</p>
		<p><strong>Correo Electrónico:</strong> ${email}</p>
		<p><strong>Teléfono:</strong> ${phone}</p>
		<p><strong>Mensaje:</strong> ${message}</p>
	  `,
		};

		await transporter.sendMail(mailOptions);
		return NextResponse.json({ success: true }, { status: 201 });
	} catch (error) {
		console.error("Error sending email:", error);
		return NextResponse.json(
			{ error: "Failed to send email" },
			{ status: 500 }
		);
	}
}
