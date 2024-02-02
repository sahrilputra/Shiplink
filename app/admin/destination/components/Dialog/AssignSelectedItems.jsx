import StatusForms from "@/app/admin/custom-clearance/components/Menus/StatusForms"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"


export function AssignSelectedItems({ open, setOpen }) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* <Button variant="outline">Edit Profile</Button> */}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex flex-col gap-2 font-bold">
                            <p>Assign Item Selected Item To Bin</p>
                            <p>12 Items Selected</p>
                        </div>

                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <div className="w-[50px] text-myBlue border-b border-myBlue text-sm text-center">
                        <p>Bin</p>
                    </div>
                    <div className="w-full">
                        <Separator className="w-full h-[1px]" />
                    </div>
                    <div className="flex flex-col gap-2 py-4">
                        <Label className="font-light">Select Bin</Label>
                        <div className="w-[100%]">
                            <StatusForms className="w-full" />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <div className="flex flex-row justify-between w-full">
                        <DialogClose asChild>
                            <Button
                                variant="redOutline">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            variant="destructive"
                        >Save changes
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
