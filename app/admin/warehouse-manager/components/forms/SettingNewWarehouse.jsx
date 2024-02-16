import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = yup.object().shape({
    WarehouseCatalog: yup.string().required(),
    WarehouseType: yup.string().required(),
    WarehouseBullet: yup.string().required(),

})

export const SettingNewWarehouse = ({ close, data = null }) => {
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            WarehouseCatalog: "",
            WarehouseType: "",
            WarehouseBullet: "",
        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
                    className=''
                    action="">
                    <div className="flex flex-col gap-2 text-xs py-4 px-2">
                        <FormField
                            className="w-full"
                            name="WarehouseCatalog"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                        <FormLabel className="text-sm">Warehouse Catalog</FormLabel>
                                        <FormControl>
                                            <Input id="WarehouseCatalog" type="text" placeholder="Warehouse Set Category" className="text-sm bg-slate-100" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />

                        <FormField
                            className="w-full"
                            name="WarehouseType"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                        <FormLabel className="text-sm">Warehouse Capacity ? </FormLabel>
                                        <FormControl>
                                            <Input id="WarehouseType" placeholder="Warehouse Type" className="text-sm bg-slate-100" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="WarehouseBullet"
                            className="w-full text-neutral-900"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                        <FormLabel className="text-sm" >Warehouse</FormLabel>
                                        <FormControl >
                                            <Input id="WarehouseBullet" className="text-sm bg-slate-100"  {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                    <div className=" flex flex-row justify-between gap-2 py-5 ">
                        <Button
                            variant="redOutline"
                            size="sm"
                            className="w-full"
                            onClick={(e) => {
                                e.preventDefault()
                                close()
                            }}
                        >
                            <p className=' font-normal text-xs'>Cancel</p>
                        </Button>
                        <Button
                            variant="destructive"

                            size="sm"
                            className="w-full"
                            onClick={() => {
                                setShowSettings(true)
                            }}
                        >
                            <p className=' font-normal text-xs'>Next</p>
                        </Button>
                    </div>


                </form>
            </Form >
        </>
    )
}
