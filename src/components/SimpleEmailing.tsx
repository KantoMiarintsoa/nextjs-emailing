"use client";

import React from 'react'
import { Card, CardContent } from './ui/card'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SimpleEmailingSchema, simpleEmailSchema } from '@/components/schema';
import { simpleEmailAction } from './actions';

function SimpleEmailing() {

    const form = useForm<SimpleEmailingSchema>({
        resolver:zodResolver(simpleEmailSchema)
    });

    const handleSendEmail = async(data:SimpleEmailingSchema)=>{
        const formData = new FormData();
        formData.append("email", data.email);
        const response = await simpleEmailAction(formData);
        if(response.error){
            form.setError("email", {message:response.error});
            return;
        }

        form.reset();
    }

  return (
    <div className='flex flex-col gap-2'>
        <p className='font-semibold text-2xl'>Send simple Email</p>
        <Card>
            <CardContent>
                <Form {...form}>
                    <form className='flex flex-col gap-2 min-w-sm'
                        onSubmit={form.handleSubmit(handleSendEmail)}
                    >
                        <FormField
                            name='email'
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <Input {...field} placeholder='Your email, ex: johndoe@example.com'/>
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

export default SimpleEmailing