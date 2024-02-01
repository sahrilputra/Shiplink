import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { NewLotsFrom } from "./NewLotForms"
import { Form } from "@/components/ui/form"
import { ExitingLotsDialog } from "./ExitingLots"
import { useState } from "react"

export function AssingLotsDialog({ open, setOpen }) {
    const [select, setSeleceted] = useState("New");

    const handleSelect = (e) => {
        setSeleceted(e)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* <Button variant="outline">Edit Profile</Button> */}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px]">
                <Form>
                    <form action="#">
                        <DialogHeader>
                            <DialogTitle>
                                <div className="flex flex-col gap-2 font-bold">
                                    <p>New Lots</p>
                                </div>

                            </DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                            <div className="flex flex-col gap-2 ">
                                <div className="flex flex-row gap-3 text-sm text-center">

                                    <p
                                        onClick={() => handleSelect("New")}
                                        className={`${select === "New" ? "text-myBlue border-b border-myBlue" : ""} cursor-pointer`}>
                                        New Lot
                                    </p>
                                    <p
                                        onClick={() => handleSelect("Exiting")}
                                        className={`${select === "Exiting" ? "text-myBlue border-b border-myBlue" : ""} cursor-pointer`}>
                                        Existing Lot</p>
                                </div>
                                <div className="w-full">
                                    <Separator className="w-full h-[1px]" />
                                </div>
                                <div className="flex flex-col gap-2 py-4">
                                    {
                                        select === "New" ? (
                                            <NewLotsFrom />
                                        ) : (
                                            <ExitingLotsDialog />
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <div className="flex flex-row justify-between w-full">
                                <Button
                                    variant="redOutline">Cancel</Button>
                                <Button
                                    variant="destructive"
                                >Save changes
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
