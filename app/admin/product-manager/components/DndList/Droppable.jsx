import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import React from "react";
import { SortableList } from "./SortableList";
export const Droppable = ({ id, items }) => {
    const { setNodeRef } = useDroppable({ id });

    const droppableStyle = {
        padding: "20px 10px",
        border: "1px solid black",
        borderRadius: "5px",
        minWidth: 110
    };

    return (
        <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
            <div ref={setNodeRef} style={droppableStyle}>
                <p>Services</p>
                {items.map((item) => (
                    <SortableList key={item} id={item} />
                ))}
            </div>
        </SortableContext>
    );
};


