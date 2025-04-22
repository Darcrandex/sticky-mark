import { closestCenter, DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { SortableItem } from './SortableItem'

type ItemType = { id: string }

export default function SortableGrid({ initData, renderItem }: { initData: ItemType[]; renderItem: any }) {
  const [items, setItems] = useState(initData)

  useEffect(() => {
    setItems(initData)
    return () => {}
  }, [initData])
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10, // 设置拖拽触发的最小移动距离
      },
    }),
  )

  // Handle drag end event to move items
  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        if (oldIndex !== newIndex) {
          const res = arrayMove(items, oldIndex, newIndex)
          return res
        }
        return items
      })
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items}>
        <div className='grid-container'>
          {items?.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              {renderItem && renderItem(item)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
