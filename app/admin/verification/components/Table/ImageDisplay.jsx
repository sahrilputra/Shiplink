import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'

export const ImageDisplay = ({ open, setOpen }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogDescription className="" >
                    <div className="w-full h-full">
                        <Image
                            src={"/assets/packageImage/packagePicture.png"}
                            width={300}
                            height={300}
                            alt="img Pict"
                            style={{ width: '200px', height: '200px' }}
                        />
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
