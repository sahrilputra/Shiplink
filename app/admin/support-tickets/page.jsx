'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { DatePickerWithRange } from '@/components/date/DateRangePicker'
import Image from 'next/image'
import { SupportTable } from './components/SupportTable/SupportTable'
import { SupportTicketsMenus } from './components/menus/SupportTicketsMenus'
import data from '../../../data/admin/supportListData.json'
import { OpenedTickets } from './components/OpenedTickets'
import CreateNewTickets from './components/dialog/NewTickets'

export default function SupportTickets() {

    const [open, setOpen] = useState(false);

    const [selectedTab, setSelectedTab] = useState("Open");
    console.log("parent : ", selectedTab)

    const filterData = selectedTab === 'Open' ? data : data.filter(item => item.CustomsStatus === selectedTab);

    const [isCreateTicket, setIsCreateTicket] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

    const handleTableRowClick = (ticket) => {
        console.log(`Ticket ID ${ticket.ticket_id} clicked`);
        setSelectedTicket(ticket);
        setIsSelected(true);
        setIsCreateTicket(false);
    };

    const handleCreateTicket = () => {
        setIsSelected(false);
        setIsCreateTicket(true);
        setSelectedTicket(null)
    }

    const handleCloseTicket = () => {
        setIsSelected(false);
        setIsCreateTicket(false);
        setSelectedTicket(null)
    }
    return (
        <>
            <div className={styles.support}>
                <div className={styles.wrapper}>
                    <div className={styles.configHeader}>
                        <div className={styles.banner}>
                            <div className={styles.icon}>
                                <Image
                                    src={"/backoffice/support-blue.png"}
                                    width={40}
                                    height={40}
                                    alt='config icon'
                                />
                            </div>
                            <div className={`${styles.title} flex flex-col`}>
                                <h1 className=" text-zinc-900 text-sm font-bold ">Support Tickets</h1>
                                <p className=" text-blue-900 text-xs font-normal">Showing Listing TIckets</p>
                            </div>
                        </div>
                        <div className={`${styles.menus}`}>
                            <SupportTicketsMenus selectedTab={setSelectedTab} isSelected={selectedTab} />
                        </div>
                    </div>
                    <div className={styles.childContent}>
                        <div className={`${styles.listTable} flex flex-col gap-1`}>
                            <SupportTable data={data} onRowClick={handleTableRowClick} onHide={isSelected} setOpen={setOpen} open={open} />
                        </div>
                    </div>
                </div>
                <div className={`${styles.menusComponents}  ${isSelected || isCreateTicket ? ('block') : ('hidden')}`}>
                    {
                        isSelected && selectedTicket !== 'null' && (
                            <>
                                <div className="">
                                    <OpenedTickets close={handleCloseTicket} />
                                </div>
                            </>
                        )
                    }
                </div>

            </div>
            <CreateNewTickets open={open} setOpen={setOpen} />
        </>
    )
}
