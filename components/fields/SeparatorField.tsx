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
import { RiSeparator } from "react-icons/ri"
import { Separator } from "../ui/separator"

const type: ElementsType = 'SeparatorField'

const DesignerComponent = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">
        Separator Field
      </Label>
      <Separator />
    </div>
  )
}

const FormComponent = () => {
  return (
    <Separator />
  )
}

const PropertiesComponent = () => {
  return (
    <p>No properties for this element.</p>
  )
}

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),

  designerBtnElement: {
    icon: RiSeparator,
    label: 'Separator Field'
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true
}

