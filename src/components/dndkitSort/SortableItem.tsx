import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function SortableItem({ id, children }: { id: string; children: any }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px 16px',
    background: '#eee',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'grab',
    display: 'inline-block',
    margin: '4px',
    width: '300px',
    hieght: 'auto',
    overflow: "hidden",
    textAlign: 'center',
  }

  return (
    <div ref={setNodeRef} style={{ ...style }} {...attributes} {...listeners}>
      {children}
    </div>
  )
}
