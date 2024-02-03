'use client'
import React from 'react';
import { Droppable } from './Droppable';
import { SortableList } from './SortableList';
import { DndContext } from '@dnd-kit/core';
export const RootCategory = ({ category, items }) => {
    return (
        <Droppable id={category}>
            <p>{category}</p>
            <DndContext>
                <SortableList items={items} parentId={`draggable-${category}`} />
            </DndContext>
        </Droppable>
    );
};
