import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableList = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id });

    const itemStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
        userSelect: "none",
        cursor: "grab",
        boxSizing: "border-box"
    };

    return (
        <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners} className="w-full flex items-center h-[35px] bg-blue-50 px-5 py-4 border border-blue-900 rounded-md text-md font-medium m-2">
            Item {props.id}
        </div>
    );
};

