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
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from "axios";
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { Loaders } from "@/components/ui/loaders"


const formSchema = yup.object().shape({
    lots_id: yup.string().required(),
    tracking_id: yup.array().of(yup.string())
})

export function AssingLotsDialog({ open, setOpen, dataID, reload }) {

    const close = () => {
        setOpen(false)
    }
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            lots_id: "",
            tracking_id: [],
        },
        mode: "onChange",
    })
    const [select, setSeleceted] = useState("Exiting");
    const [loading, setLoading] = useState(false);
    const [selectedLots, setSelectedLots] = useState(null);
    const [lotsName, setLotsName] = useState(null)
    const handleSelect = (e) => {
        setSeleceted(e)
    }

    console.log("Form Watch", form.watch("tracking_id"))
    console.log("Form Watch", form.watch("lots_id"))

    const handleSelectedLotsID = (e, name) => {
        setSelectedLots(e)
        form.setValue("lots_id", e)
        setLotsName(name)
    }

    const handleSave = async (formData) => {
        formData.tracking_id = formData.tracking_id || [];
        formData.tracking_id.push(...dataID);
        console.log("submitting", formData)
        setLoading(true)
        try {
            const response = await axios.post(
                `/api/admin/transport/lots/assign`,
                formData
            );

            toast({
                title: `{${dataID.length}} Package assigned successfully!`,
                description: response.data.message,
                status: 'success',
            });
            reload()
            close()
            setLoading(false)
            form.reset()
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error creating assigned the package!',
                description: 'An error occurred while assign the package!.',
                status: 'error',
            });
        }
    };

    console.log('FORM ERROR', form.formState.errors);

    const IsFormError = () => {
        if (form.formState.errors.lots_id) {
            return true
        }
        return false
    }
    console.log("Data ID", dataID)
    console.log("selectedLots", selectedLots)
    return (
        <>
            {loading && <Loaders />}
            <Dialog open={open} onOpenChange={setOpen} modal={true}>
                <DialogContent className="sm:max-w-[450px]" close={false}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSave)} action="#">
                            <DialogHeader>
                                <DialogTitle>
                                    <div className="flex flex-col gap-2 font-bold">
                                        <p>Assing To Lots</p>
                                    </div>
                                </DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                                <div className="flex flex-col gap-2 ">
                                    <div className="flex flex-row gap-3 text-sm text-center">
                                        <div
                                            onClick={() => handleSelect("Exiting")}
                                            className={`${select === "Exiting"
                                                ? "text-myBlue border-b border-myBlue"
                                                : ""
                                                } cursor-pointer`}
                                        >
                                            Existing Lot
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <Separator className="w-full h-[1px]" />
                                    </div>
                                    <div className="flex flex-col gap-2 pt-3">
                                        <ExitingLotsDialog
                                            close={close}
                                            selectedLotsID={handleSelectedLotsID}
                                            lotsID={selectedLots}
                                            lotsName={lotsName}
                                            IsFormError={IsFormError}
                                            form={form}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
