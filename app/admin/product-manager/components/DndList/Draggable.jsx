import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const Draggable = (props) => {
    const { attributes, listeners, setNodeRef, transform } = useSortable({
      id: props.id,
    });
  
    const style = {
      transform: CSS.Transform.toString(transform),
    };
  
    return (
      <div
        className="w-full bg-sky-50 justify-start rounded-md border border-blue-400 px-4 py-2"
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        {props.children}
      </div>
    );
  };
  