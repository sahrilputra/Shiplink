'use client'
import React, { useState } from 'react'
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import { Droppable } from './Droppable';
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { arrayMove, insertAtIndex, removeAtIndex } from './Array';


export const CategoriesList = () => {
    const [items, setItems] = useState({
        group1: ["1", "2", "3"],
        group2: ["4", "5", "6"],
        group3: ["7", "8", "9"]
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );
    const data = {
        "Product": [
            {
                "id": 1213,
                "name": "By Material",
                "subCategories": [
                    {
                        "id": 152352,
                        "name": "Cotton"
                    },
                    {
                        "id": 2442342,
                        "name": "Silk"
                    }
                ]
            },
            {
                "id": 23123141241,
                "name": "Tapes",
                "subCategories": [
                    {
                        "id": 1423636,
                        "name": "Subcategory 1"
                    },
                    {
                        "id": 2,
                        "name": "Subcategory 2"
                    }
                ]
            }
        ],
        "Service": [
            {
                "id": 1623652,
                "name": "Packages",
                "subCategories": [
                    {
                        "id": 4234251,
                        "name": "Tapes"
                    },
                    {
                        "id": 6543462,
                        "name": "Bags"
                    }
                ]
            },
            {
                "id": 2636463473,
                "name": "Containers",
                "subCategories": [
                    {
                        "id": 132442,
                        "name": "Long"
                    },
                    {
                        "id": 2777458,
                        "name": "Short"
                    }
                ]
            }
        ]
    };

    const handleDragOver = ({ over, active }) => {
        const overId = over?.id;

        if (!overId) {
            return;
        }

        const activeContainer = active.data.current.sortable.containerId;
        const overContainer = over.data.current?.sortable.containerId;

        if (!overContainer) {
            return;
        }

        if (activeContainer !== overContainer) {
            setItems((items) => {
                const activeIndex = active.data.current.sortable.index;
                const overIndex = over.data.current?.sortable.index || 0;

                return moveBetweenContainers(
                    items,
                    activeContainer,
                    activeIndex,
                    overContainer,
                    overIndex,
                    active.id
                );
            });
        }
    };

    const handleDragEnd = ({ active, over }) => {
        if (!over) {
            return;
        }

        if (active.id !== over.id) {
            const activeContainer = active.data.current.sortable.containerId;
            const overContainer = over.data.current?.sortable.containerId || over.id;
            const activeIndex = active.data.current.sortable.index;
            const overIndex = over.data.current?.sortable.index || 0;

            setItems((items) => {
                let newItems;
                if (activeContainer === overContainer) {
                    newItems = {
                        ...items,
                        [overContainer]: arrayMove(
                            items[overContainer],
                            activeIndex,
                            overIndex
                        )
                    };
                } else {
                    newItems = moveBetweenContainers(
                        items,
                        activeContainer,
                        activeIndex,
                        overContainer,
                        overIndex,
                        active.id
                    );
                }

                return newItems;
            });
        }
    };

    const moveBetweenContainers = (
        items,
        activeContainer,
        activeIndex,
        overContainer,
        overIndex,
        item
    ) => {
        return {
            ...items,
            [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
            [overContainer]: insertAtIndex(items[overContainer], overIndex, item)
        };
    };


    const containerStyle = { display: "flex " };

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
        >
            <div style={containerStyle} className='flex-col gap-[20px] px-5'>
                {Object.keys(items).map((group) => (
                    <Droppable id={group} items={items[group]} key={group} />
                ))}
            </div>
        </DndContext>
    );
}
