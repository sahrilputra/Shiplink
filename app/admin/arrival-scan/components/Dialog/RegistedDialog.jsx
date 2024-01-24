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
import Image from "next/image"

export function RegisterDialog({ open, setOpen }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-base font-bold">Pacakge Registered</DialogTitle>
                </DialogHeader>
                <div className="border border-neutral-500/50 rounded-sm p-5">
                    <Image
                        src={"/logo.png"}
                        width={100}
                        height={100}
                        objectFit="contain"
                        alt="Shiplink Logo"
                    />

                    <div className="flex justify-between w-full flex-row text-sm">
                        <p>John Doe</p>
                        <p>#2313131</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="redOutline"
                        className="w-full"
                        type="submit"
                    >
                        Print
                    </Button>
                    <Button
                        variant="destructive"
                        className="w-full"
                        type="submit"
                    >
                        Save And Print
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}