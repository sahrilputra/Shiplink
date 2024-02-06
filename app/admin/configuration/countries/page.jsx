import React from 'react'
import { TextInput } from 'flowbite-react'
import { SearchIcon, OptionIcons, FilterIcons } from '@/components/icons/iconCollection'
import { Status } from '@/components/status/Status';
import { SearchBar } from '@/components/ui/searchBar';
import { Button } from '@/components/ui/button';
import { CountriesTabled } from './components/CountriesTabled';
export default function countries() {

    const allDummyData = [
        {
            country: 'United States',
            'Country Code': 'AFG',
            Numberic: '004',
            Status: 'Active',
        },
        {
            country: 'Canada',
            'Country Code': 'CAN',
            Numberic: '124',
            Status: 'Active',
        },
        {
            country: 'United Kingdom',
            'Country Code': 'GBR',
            Numberic: '826',
            Status: 'Disable',
        },
        {
            country: 'Australia',
            'Country Code': 'AUS',
            Numberic: '036',
            Status: 'Active',
        },
    ];

    return (
        <>
            <CountriesTabled />
        </>
    )
}