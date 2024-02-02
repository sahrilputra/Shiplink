'use client'
import React, { useState } from 'react'
import { DndContext } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

export const CategoriesList = () => {

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

    const [isDropped, setIsDropped] = useState(false);
    const draggableMarkup = (
        <Draggable>Drag me</Draggable>
    );

    return (
        <>
            <div>CategoriesList</div>
            <DndContext onDragEnd={handleDragEnd}>
                {!isDropped ? draggableMarkup : null}
                {Object.entries(data).map(([category, items]) => (
                    <Droppable key={category} id={category}>
                        <p>{category}</p>
                        {items.map((item) => (
                            <div className="flex flex-col gap-2" key={item.id}>
                                <Draggable id={`draggable-${item.id}`}>{item.name}</Draggable>
                                {item.subCategories && (
                                    <Droppable key={`sub-${item.id}`} id={`sub-${item.id}`}>
                                        {item.subCategories.map((subCategory) => (
                                            <Draggable key={`sub-draggable-${subCategory.id}`} id={`draggable-${subCategory.id}`}>
                                                {subCategory.name}
                                            </Draggable>
                                        ))}
                                    </Droppable>
                                )}
                            </div>
                        ))}
                    </Droppable>
                ))}
            </DndContext>
        </>
    )
    function handleDragEnd(event) {
        const { over } = event;

        if (over) {
            // Adjust logic based on the category being dragged over
            const targetCategory = over.id;

            if (targetCategory.startsWith('draggable')) {
                setIsDropped(true);
            } else if (targetCategory.startsWith('sub-')) {
                // Handle dropping into subcategories
                setIsDropped(true);
            }
        }
    }
};
