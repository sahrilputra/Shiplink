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
import StatusCombo from "./StatusCombo"


export function UpdateStatusDialog({ open, setOpen }) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex flex-col gap-2 font-bold">
                            <p>Update Status</p>
                            <p>For Tickets #ID</p>
                        </div>

                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <div className="w-[50px] text-myBlue border-b border-myBlue text-sm text-center">
                        <p>Status</p>
                    </div>
                    <div className="w-full">
                        <Separator className="w-full h-[1px]" />
                    </div>
                    <div className="flex flex-col gap-2 py-4">
                        <Label className="font-light">Update Status</Label>
                        <div className="w-[100%]">
                            <StatusCombo className="w-full" />
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
            </DialogContent>
        </Dialog>
    )
}
