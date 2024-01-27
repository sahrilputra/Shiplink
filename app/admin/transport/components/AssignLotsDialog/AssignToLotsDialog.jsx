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


export function AssingLotsDialog({ open, setOpen }) {

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
                                <div className="flex flex-row gap-3">
                                    <p className=" text-myBlue border-b border-myBlue text-sm text-center">New Lot</p>
                                    <p className=" text-myBlue border-b border-myBlue text-sm text-center">Existing Lot</p>
                                </div>
                                <div className="w-full">
                                    <Separator className="w-full h-[1px]" />
                                </div>
                                <div className="flex flex-col gap-2 py-4">
                                    <NewLotsFrom />
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
