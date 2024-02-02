import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export const Draggable = (props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `draggable-${props.id}`, // Use dynamic ID based on props
    });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined;

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