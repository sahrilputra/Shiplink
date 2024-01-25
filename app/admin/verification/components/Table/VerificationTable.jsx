
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/tableDashboard"
import { Button } from "@/components/ui/button"
export function VerificationTable({ data, isOpen, setOpen }) {
    return (
        <Table>
            <TableHeader className="text-sm">
                <TableHead className="w-[100px]">Tracking ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead className="text-right">Last Update</TableHead>
                <TableHead className="">Customs Status</TableHead>
                <TableHead className=""></TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item) => (
                        <>
                            <TableRow key={item.id} >
                                <TableCell className="font-medium">{item.TrackingID}</TableCell>
                                <TableCell>{item.CustomerName}</TableCell>
                                <TableCell>{item.Origin}</TableCell>
                                <TableCell>{item.Destination}</TableCell>
                                <TableCell className="text-right">{item.UpdateDate}</TableCell>
                                <TableCell>{item.CustomsStatus}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="tableBlue"
                                        size="tableIcon"
                                        className="px-1 py-1"
                                        onClick={() => setOpen(!isOpen)}
                                    >
                                        <p className="text-xs">Klik</p>
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow  key={item.id} className={`${isOpen? "" : "hidden"}`} >
                                <TableCell className="font-medium" colSpan={7}>Expand</TableCell>
                            </TableRow>
                        </>
                    ))
                }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={6}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
