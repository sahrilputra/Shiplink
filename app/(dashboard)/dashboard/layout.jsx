import { Sidebar } from '@/components/sidebar/sidebar'
import { Inter } from 'next/font/google'
import styles from './styles.module.scss';
import { Navbar } from '@/components/navbar/Navbar';
import { PromoOne } from '@/components/ads/promoOne';

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

                        <div className={styles.rightContent}>
                            <div className="w-[373px] h-10 justify-between items-start inline-flex">
                                <input
                                    type="search"
                                    className="text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
                                    placeholder='Search ...'
                                />
                                <button className=' px-10 '>Consolidate </button>
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
                <div className={styles.rightPanel}>
                    <PromoOne />
                </div>
            </div >

        </>
    )
}
