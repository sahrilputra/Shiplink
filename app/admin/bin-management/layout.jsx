"use client"
import React from 'react';
import styles from './styles.module.scss'
import Image from 'next/image';
import { BinMenus } from './components/menus/BinMenus';
import { SearchBar } from '@/components/ui/searchBar';
import { Button } from '@/components/ui/button';
import { FilterIcons } from '@/components/icons/iconCollection';
import { Plus } from 'lucide-react';
import { BinTableList } from './components/BinTable/BinTableList';
export default function BinLayout({ children }) {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.binItems}>
                        <div className={styles.configHeader}>
                            <div className={styles.banner}>
                                <div className={styles.icon}>
                                    <Image
                                        src={"/backoffice/bin-blue.png"}
                                        width={40}
                                        height={40}
                                        alt='Bin Management icon'
                                    />
                                </div>
                                <div className={`${styles.title} flex flex-col`}>
                                    <h1 className=" text-zinc-900 text-sm font-bold ">Bin Manager</h1>
                                    <p className=" text-blue-900 text-sm font-light ">Bin Manager | 124 Bin | 1100 Items </p>
                                </div>
                            </div>
                            <div className={`${styles.menus}`}>
                                <BinMenus />
                            </div>
                        </div>
                        <div className="px-2 py-2 border-b border-[#dedede]">
                            <div className="wrap inline-flex gap-[10px] justify-evenly items-center">
                                <SearchBar />
                                <Button
                                    variant="filter"
                                    size="icon"
                                    className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                                    <FilterIcons fill="#CC0019" />
                                </Button>
                                <Button
                                    variant="filter"
                                    size="icon"
                                    className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                                    <Plus fill="#CC0019" />
                                </Button>
                            </div>
                        </div>
                        <div className="px-2 py-2">
                            <BinTableList />
                        </div>
                    </div>
                    <div className={styles.childContent}>
                        {children}
                    </div>
                </div>
            </div>

        </>
    )
}
