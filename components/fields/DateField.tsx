'use client'

import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import useDesigner from "../hooks/useDesigner"
import { Form, FormDescription, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Switch } from "../ui/switch"
import { cn } from "@/lib/utils"
import { BsFillCalendarDateFill } from "react-icons/bs"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { Popover, PopoverTrigger } from "../ui/popover"
import { format } from "date-fns"
import { PopoverContent } from "@radix-ui/react-popover"
import { Calendar } from "../ui/calendar"

const type: ElementsType = 'DateField'

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

const extraAttributes = {
  label: 'Date field',
  helperText: 'Pick a date',
  required: false,
}

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(600),
  required: z.boolean().default(false),
})

const DesignerComponent = ({ elementInstance }: { elementInstance: FormElementInstance }) => {
  const element = elementInstance as CustomInstance
  const { label, helperText, required } = element.extraAttributes
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Button variant={'ghost'} className="w-full justify-start text-left font-normal">
        <CalendarIcon className="mr-2 h-4 w-4" />
        Pick a date
      </Button>
      {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
    </div>
  )
}

const FormComponent = ({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue
}: {
  elementInstance: FormElementInstance,
  submitValue?: SubmitFunction,
  isInvalid?: boolean,
  defaultValue?: string
}) => {
  const element = elementInstance as CustomInstance
  const { label, helperText, required, placeholder } = element.extraAttributes

  const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : undefined)
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(isInvalid === true)
  }, [isInvalid])

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && 'text-red-500')}>
        {label}
        {required && "*"}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground', error && 'border-red-500')} >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} className="bg-background" onSelect={(date) => {
            setDate(date)
            if (!submitValue) return
            const value = date?.toUTCString() || ''
            const valid = DateFieldFormElement.validate(element, value)
            setError(!valid)
            submitValue(element.id, value)
          }} />
        </PopoverContent>
      </Popover>
      {helperText && <p className={cn("text-muted-foreground text-[0.8rem]", error && 'text-red-500')}>{helperText}</p>}
    </div>
  )
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>

const PropertiesComponent = ({ elementInstance }: { elementInstance: FormElementInstance }) => {

  const element = elementInstance as CustomInstance
  const { updateElement } = useDesigner()
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
    }
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element, form])

  const applyChanges = (values: propertiesFormSchemaType) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label: values.label,
        helperText: values.helperText,
        required: values.required,
      }
    })
  }

  return (
    <Form{...form}>
      <form onBlur={form.handleSubmit(applyChanges)} className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <FormField control={form.control} name="label" render={({ field }) => (
          <FormItem>
            <FormLabel>Label</FormLabel>
            <FormControl>
              <Input {...field} onKeyDown={(e) => {
                if (e.key === 'Enter') e.currentTarget.blur()
              }}
              />
            </FormControl>
            <FormDescription>
              The label of the field. <br /> It will be displayed above the field.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField control={form.control} name="helperText" render={({ field }) => (
          <FormItem>
            <FormLabel>HelperText</FormLabel>
            <FormControl>
              <Input {...field} onKeyDown={(e) => {
                if (e.key === 'Enter') e.currentTarget.blur()
              }}
              />
            </FormControl>
            <FormDescription>
              The helper text of the field <br /> It will be displayed below the field.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField control={form.control} name="required" render={({ field }) => (
          <FormItem className="flex justify-between items-center rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>Required</FormLabel>
              <FormDescription>
                The helper text of the field <br /> It will be displayed below the field.
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />

      </form>
    </Form>
  )
}

export const DateFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: BsFillCalendarDateFill,
    label: 'Date Field'
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance
    if (element.extraAttributes.required) {
      return currentValue.length > 0
    }
    return true
  }
}

