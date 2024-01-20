'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger, DialogTitle } from './ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormMessage, FormLabel, FormItem } from './ui/form'
import { BsFileEarmarkPlus } from 'react-icons/bs'
import { ImSpinner2 } from 'react-icons/im'
import { Button } from './ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { log } from 'console'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { toast } from './ui/use-toast'
import { formSchema, formSchemaType } from '@/schemas/form'
import { CreateForm } from '@/actions/form'
import { useRouter } from 'next/navigation'



const CreateFormBtn = () => {
  const router = useRouter()
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (values: formSchemaType) => {
    try {
      const formId = await CreateForm(values)

      toast({
        title: 'Success',
        description: 'Form created successfully'
      })
      router.push(`/builder/${formId}`)

    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again later',
        variant: 'destructive'
      })
    }

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className='group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4'>
          <BsFileEarmarkPlus className='h-8 w-8 text-muted-foreground group-hover:text-primary' />
          <p className='font-bold text-bold text-muted-foreground group-hover:text-primary'>
            Create new form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create form
          </DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting} className='w-full mt-4'>
            {form.formState.isSubmitting ? <ImSpinner2 className='animate-spin' /> : <span>Save</span>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateFormBtn