'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { SearchBar } from '@/components/ui/searchBar'
import { Button } from '@/components/ui/button'
import { FilterIcons } from '@/components/icons/iconCollection'
import { SupportTable } from './components/SupportTable/SupportTable'
import data from '../../../data/supportTickets.json'
import { NewTicketsForm } from './components/NewTickets/NewTicketsForm'
import { OpenedTickets } from './components/OpenedTickets'


export default function SupportPage() {
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
            <div className={styles.main}>
                <div className={styles.content}>
                    <div className="top">
                        <h1 className='m-2 text-lg font-bold'>Support</h1>
                        <p className='text-zinc-500 text-sm font-normal p-3'> Get our support from a dedicated team of experts who are committed to assisting you every step of the way. </p>
                    </div>

                    <div className="mid px-3 py-5">
                        <div className="w-full px-5 flex flex-row justify-between items-center">
                            <div className="left flex flex-row justify-start items-start gap-5">
                                <SearchBar />
                                <Button
                                    variant="filter"
                                    size="icon"
                                    className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                                    <FilterIcons fill="#CC0019" />
                                </Button>
                            </div>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleCreateTicket}
                            >
                                <p className='text-xs'>Create New Ticket</p>
                            </Button>
                        </div>

                        <div className="items w-full">
                            <SupportTable data={data} onRowClick={handleTableRowClick} />
                        </div>

                    </div>
                </div>

                <div className={`${styles.menusComponents}  ${isSelected || isCreateTicket ? ('block') : ('hidden')}`}>
                    {
                        isCreateTicket && (
                            <>
                                <div className="p-6">
                                    <h1 className='my-3 text-xl font-bold'>New Tickets</h1>
                                    <NewTicketsForm close={handleCloseTicket} />
                                </div>
                            </>
                        )
                    }

                    {
                        isSelected && selectedTicket !== 'null' && (
                            <>
                                <div className="">
                                    <OpenedTickets close={handleCloseTicket}  />
                                </div>
                            </>
                        )
                    }
                </div>
            </div >
        </>
    )
}
