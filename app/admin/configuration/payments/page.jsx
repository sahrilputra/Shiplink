import React from "react"
import styles from '../styles.module.scss'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export default function Payment() {

    return (
        <div className={styles.carrier}>
            <div className={`${styles.carrier__container} flex flex-col items-start w-[100%]`}>
                <p className="font-semibold text-sm">Payment API</p>

                <div className="flex flex-col gap-2 w-full mt-2 px-3">
                    <div className="flex flex-row w-full items-center">
                        <div className="text-xs w-[120px] bg-myBlue text-white h-[30px] flex items-center px-2 text-center rounded-l-sm justify-center">Publishable key</div>
                        <Input
                            placeholder="Enter your publishable key"
                            className="rounded-l-none"
                            size="xs"
                        />
                    </div>
                    <div className="flex flex-row w-full items-center">
                        <div className="text-xs w-[120px] bg-myBlue text-white h-[30px] flex items-center px-2 text-center rounded-l-sm justify-center">Secret key</div>
                        <Input
                            placeholder="Enter your Secret key"
                            className="rounded-l-none"
                            size="xs"
                        />
                    </div>

                    <div className="flex flex-row w-full items-center justify-end gap-3">
                        <Button
                            variant="redOutline"
                            size="xs"
                            className="px-4 text-xs"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            size="xs"
                            className="px-4 text-xs"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}