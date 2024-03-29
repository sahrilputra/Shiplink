"use client"

import React, { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
    className,
    mySetdate = new Date(),
    myDate,
}) {
    const [date, setDate] = useState({
        from: new Date(),
        to: addDays(new Date(), 5),
    });

    useEffect(() => {
        mySetdate(date);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    return (
        <div
            style={{ fontFamily: 'roboto' }}
            className={cn("grid gap-2 ", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="flex flex-row justify-between bg-muted/50 border border-zinc-300 rounded bg-slate-100">
                        <Button
                            id="date"
                            variant={"outline"}
                            size="sm"
                            style={{ fontFamily: 'roboto' }}
                            className={cn(
                                "shadow-none w-[180px] text-left text-xs h-0 py-4 font-normal px-3 rounded-r-none border-none pl-2 bg-none   ",
                                !date && "text-muted-foreground relative"
                            )}
                        >

                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "LLL dd, y")} -{" "}
                                        {format(date.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(date.from, "LLL dd, y")
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                        <div className="relative right-0 bg-zinc-200 h-[full] w-10 flex items-center justify-center rounded-sm">
                            <CalendarIcon className="h-full w-4 text-myBlue" />
                        </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div >
    );
}
