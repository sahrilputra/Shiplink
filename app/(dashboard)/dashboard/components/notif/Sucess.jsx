import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"

export const SucessPayemnts = ({ open, setOpen }) => {
    const close = () => {
        setOpen(false);
    }
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <p>Sucess</p>
                    </DialogHeader>
                    <div className="App">
                        <div className="flex flex-col gap-3 items-center">
                            <CheckCircle width={100} height={100} className="text-greenStatus " />
                            <p className="text-2xl">Success</p>
                            <p className="text-xs">Your Payment is sucessfully</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-row gap-3 pt-3">
                        <Button
                            variant="redOutline"
                            size="sm"
                            className=" w-full text-xs"
                            onClick={() => {
                                close();
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

        </>
    )
}
