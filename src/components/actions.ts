"use server";

import { sendEmail } from "@/lib/emailing";
import { contactSchema, simpleEmailSchema } from "./schema";
import { formDataToObject } from "@/lib/utils";

type SimpleEmailActionResponse = {
    error?:string;
    success:boolean
}

export async function simpleEmailAction(data:FormData):Promise<SimpleEmailActionResponse>{
    try {
        const form = simpleEmailSchema.parse(formDataToObject(data));

        await sendEmail({
            from:"no-reply@example.com",
            to:form.email,
            text:"Here is a simple email",
            subject:"Test email"
        });
    
        return {
            success:true
        };
    }
    catch(error){
        console.log(error)
        return {
            error:"Invalid input",
            success:false
        };
    }
}


type ContactActionResponse = {
    error?:string;
    success:boolean;
}

export async function contactAction(data:FormData):Promise<ContactActionResponse>{
    const validate = contactSchema.safeParse(formDataToObject(data));

    if(!validate.success){
        return {
            error:"Invalid input",
            success:false
        };
    }

    const contact = validate.data;

    const messageContent = `
    Hello,

    ${contact.name} (${contact.email}), is contacting you.
    Here is the message:
    "${contact.content}".

    Best regards,
    `;

    await sendEmail({
        to:process.env.SMTP_DEFAULT_RECEIVER!,
        from:"no-reply@example.com",
        subject:`Contact form - ${contact.name}`,
        text:messageContent
    });

    return {
        success:true
    };
}