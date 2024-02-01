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
                {children}
            </div>
        </>
    )
}
