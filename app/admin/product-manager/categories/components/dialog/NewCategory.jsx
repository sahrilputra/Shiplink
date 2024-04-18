"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Loaders } from "@/components/ui/loaders";
import { NewCategoryForms } from "./NewCategoryForms";

export const NewCategory =
    ({
        data = null,
        open,
        setOpen,
        setReloadData
    }) => {
        console.log("🚀 NewCategory ~ data:", data)
        const onClose = () => {
            setOpen(false);
        };
        const [loading, setLoading] = useState(false);

        return (
            <>
                {loading ? (
                    <Loaders />
                ) : (
                    <Dialog open={open} onOpenChange={setOpen} className="w-max">
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="font-bold">
                                    {
                                        data ? (
                                            <>
                                                <p>Edit {data?.categories} Category</p>
                                            </>
                                        ) : (
                                            <p>Create New Category</p>
                                        )
                                    }
                                </DialogTitle>
                            </DialogHeader>
                            <div className="">
                                <NewCategoryForms
                                    data={data}
                                    close={onClose}
                                    setLoading={setLoading}
                                    reloadData={setReloadData}
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </>
        );
    };
