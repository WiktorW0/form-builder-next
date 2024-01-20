
import React from 'react'
import useDesigner from './hooks/useDesigner'
import FormElementsSidebar from './FormElementsSidebar'
import PropertiesFormSidebar from './PropertiesFormSidebar'
import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

const DesignerSidebar = () => {

  const { selectedElement } = useDesigner()
  const droppable = useDroppable({
    id: 'designer-sidebar-drop-area',
    data: {
      isDesignerSideBarDropArea: true
    }
  })

  return (
    <aside ref={droppable.setNodeRef} className={cn("w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full", droppable.isOver && 'ring-4 ring-primary/40')}>
      {selectedElement ? <PropertiesFormSidebar /> : <FormElementsSidebar />}
    </aside>
  )
}

export default DesignerSidebar