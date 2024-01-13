
import React from 'react';
import { Sidebar } from '@/components/sidebar/sidebar'
import styles from './styles.module.scss';
import { Navbar } from '@/components/navbar/Navbar';
import { PromoOne } from '@/components/ads/promoOne';
import { SearchIcon } from '@/components/icons/iconCollection';
import { PromoTwo } from '@/components/ads/promoTwo';
import { ForwadPakage } from '@/components/dashboardMenus/ForwadPakage';
import { Button } from '@/components/ui/button';
export const metadata = {
    title: 'ShipLink',
    description: 'Canada\'s best package forwarding service',
}

export default function DashboardMenu({ children }) {


    return (
        <>
            <div className={styles.container}>
                <div className={styles.main}>
                    <div className={styles.header}>
                        <div className={styles.tabs}>
                            <div className="w-[311px] h-[46px] p-[5px] justify-start items-start gap-[19px] inline-flex">
                                <div className="flex-col justify-start items-center gap-1.5 inline-flex">
                                    <div className="justify-start items-start gap-[5px] inline-flex">
                                        <div className="text-zinc-900 text-base font-semibold font-['Poppins']">All</div>
                                        <div className="p-2 bg-red-700 rounded flex-col justify-center items-center gap-2.5 inline-flex">
                                            <div className="text-white text-xs font-semibold font-['Poppins']">0</div>
                                        </div>
                                    </div>
                                    <div className="w-[44.25px] h-1.5 relative">
                                        <div className="w-[35.48px] h-1.5 left-0 top-0 absolute bg-red-700 rounded-sm" />
                                        <div className="w-[5.38px] h-1.5 left-[38.87px] top-0 absolute bg-red-700 rounded-sm" />
                                    </div>
                                </div>
                                <div className="justify-start items-start gap-[5px] flex">
                                    <div className="text-zinc-900 text-base font-semibold font-['Poppins']">Incoming</div>
                                    <div className="p-2 bg-red-700 rounded flex-col justify-center items-center gap-2.5 inline-flex">
                                        <div className="text-white text-xs font-semibold font-['Poppins']">0</div>
                                    </div>
                                </div>
                                <div className="flex-col justify-start items-center gap-1.5 inline-flex">
                                    <div className="justify-start items-start gap-[5px] inline-flex">
                                        <div className="text-zinc-900 text-base font-semibold font-['Poppins']">Outgoing</div>
                                        <div className="p-2 bg-red-700 rounded flex-col justify-center items-center gap-2.5 inline-flex">
                                            <div className="text-white text-xs font-semibold font-['Poppins']">0</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.rightContent} mx-5 relative  right-[20.87px]`}>
                            <div className="w-[373px] h-10 justify-between items-start inline-flex gap-3">
                                <div type='text' className="w-full h-10 px-[15px] py-2.5 bg-white rounded-md border border-neutral-200 justify-between items-center inline-flex">
                                    <input type="text" className='w-[90%] text-zinc-500 text-xs font-normal focus:outline-none border-none' placeholder='Search ...' />
                                    {/* <div className="text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight">Search ...</div> */}
                                    <SearchIcon className="w-4 h-4" />
                                </div>
                                <Button
                                    variant="secondary"
                                    className ="h-10 px-10 text-xs"
                                    >
                                    <p>Consolidate</p>
                                </Button>
                                {/* <button className="h-10 px-10 bg-secondary rounded shadow justify-start items-center gap-2 inline-flex">
                                    <p className="text-white text-xs font-medium font-poppins ">Consolidate</p>
                                </button> */}
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
                <div className={styles.rightPanel}>
                    <div className="ads hidden ">
                        <PromoOne />
                        <PromoTwo />
                    </div>
                    <ForwadPakage />
                </div>

            </div >

        </>
    )
}
