"use client";

import React from 'react'
import { Card, CardContent } from './ui/card'
import { useForm } from 'react-hook-form'
import { contactSchema, ContactSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { contactAction } from './actions';

function ContactForm() {

    const form = useForm<ContactSchema>({
        resolver:zodResolver(contactSchema)
    });

    const handleSubmitContact = async(data:ContactSchema)=>{
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("content", data.content);

        const response = await contactAction(formData);

        if(response.error){
            form.setError("root", {message:response.error});
            return;
        }

        form.reset();
    }

  return (
    <div className='flex flex-col gap-2'>
        <p className="text-2xl font-semibold">
            Contact Us
        </p>
        <Card>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmitContact)}
                        className='flex flex-col gap-2 min-w-sm'
                    >
                        <FormField
                            name='name'
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <Input {...field} placeholder='Your name here'/>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='email'
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Input {...field} placeholder='Your email here'/>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='content'
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                        <Textarea {...field}
                                            rows={10}
                                        />
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button disabled={form.formState.isSubmitting}>
                            Send
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  )
}

export default ContactForm