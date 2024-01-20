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
import { LuHeading1 } from "react-icons/lu"
import { BsTextParagraph } from "react-icons/bs"
import { Textarea } from "../ui/textarea"

const type: ElementsType = 'ParagraphField'

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

const extraAttributes = {
  text: 'Text here',
}

const propertiesSchema = z.object({
  text: z.string().min(2).max(500),
})


const DesignerComponent = ({ elementInstance }: { elementInstance: FormElementInstance }) => {
  const element = elementInstance as CustomInstance
  const { text } = element.extraAttributes
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">
        Paragraph Field
      </Label>
      <p className="text-base truncate">{text}</p>
    </div>
  )
}

const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance,
}) => {

  const element = elementInstance as CustomInstance
  const { text } = element.extraAttributes

  return (
    <p className="text-base">{text}</p>
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
      text: element.extraAttributes.text,
    }
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element, form])

  const applyChanges = (values: propertiesFormSchemaType) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        text: values.text,
      }
    })
  }

  return (
    <Form{...form}>
      <form onBlur={form.handleSubmit(applyChanges)} className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <FormField control={form.control} name="text" render={({ field }) => (
          <FormItem>
            <FormLabel>Text</FormLabel>
            <FormControl>
              <Textarea rows={10} {...field} onKeyDown={(e) => {
                if (e.key === 'Enter') e.currentTarget.blur()
              }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />

      </form>
    </Form>
  )
}

export const ParagraphFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: BsTextParagraph,
    label: 'Paragraph Field'
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true
}

