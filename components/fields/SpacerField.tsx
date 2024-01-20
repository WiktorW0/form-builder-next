'use client'

import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import useDesigner from "../hooks/useDesigner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { LuHeading1, LuSeparatorHorizontal } from "react-icons/lu"
import { Slider } from "../ui/slider"

const type: ElementsType = 'SpacerField'

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

const extraAttributes = {
  height: 20, //px
}

const propertiesSchema = z.object({
  height: z.number().min(5).max(300),
})


const DesignerComponent = ({ elementInstance }: { elementInstance: FormElementInstance }) => {
  const element = elementInstance as CustomInstance
  const { height } = element.extraAttributes
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <Label className="text-muted-foreground">
        Spacer Field: {height}px
      </Label>
      <LuSeparatorHorizontal className="h-8 w-8" />
    </div>
  )
}

const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance,
}) => {

  const element = elementInstance as CustomInstance
  const { height } = element.extraAttributes

  return (
    <div style={{ height, width: '100%' }}></div>
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
      height: element.extraAttributes.height,
    }
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element, form])

  const applyChanges = (values: propertiesFormSchemaType) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        height: values.height,
      }
    })
  }

  return (
    <Form{...form}>
      <form onBlur={form.handleSubmit(applyChanges)} className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <FormField control={form.control} name="height" render={({ field }) => (
          <FormItem>
            <FormLabel>Height (px): {form.watch('height')}</FormLabel>
            <FormControl className="pt-2">
              <Slider defaultValue={[field.value]} min={5} max={300} step={1}
                onValueChange={(value) => {
                  field.onChange(value[0])
                }} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />

      </form>
    </Form>
  )
}

export const SpacerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: LuSeparatorHorizontal,
    label: 'Spacer Field'
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true
}

