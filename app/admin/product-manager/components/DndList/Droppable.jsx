import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export const Droppable = (props) => {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });
    const style = {
        color: isOver ? 'green' : undefined,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    };


    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}
