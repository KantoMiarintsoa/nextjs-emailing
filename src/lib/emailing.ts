"use server";

import nodemailer from "nodemailer";

const SERVER_HOST = process.env.SMTP_HOST;
const SERVER_PORT = process.env.SMTP_PORT??"0";
const SERVER_USER = process.env.SMTP_USER;
const SERVER_PASSWORD = process.env.SMTP_PASSWORD;

const tranpsorter = nodemailer.createTransport({
    host:SERVER_HOST,
    port:parseInt(SERVER_PORT),
    auth:{
        user:SERVER_USER,
        pass:SERVER_PASSWORD
    }
});

export async function sendEmail({
    from,
    to,
    subject,
    text,
    html
}:{
    from:string,
    to:string,
    subject:string,
    text:string,
    html?:string
}){
    try{
        await tranpsorter.verify();
    }
    catch(error:any){
        console.log(error);
        return;
    }

    const info = tranpsorter.sendMail({
        from,
        to,
        subject,
        text,
        html:html
    });

    console.log(`Email sent to ${to}`);
    return info;
}