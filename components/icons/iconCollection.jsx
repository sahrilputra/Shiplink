import React from 'react'
import Image from 'next/image'
export const SearchIcon = () => {
    return (
        <Image
            src={'/icon/searchIcon.svg'}
            width={20}
            height={20}
            alt='search icon'
        />

    )
}

export const ArrowDownIcon = () => {
    return (
        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 5.59128L12.4447 0.5L14 1.95436L7 8.5L0 1.95436L1.55531 0.5L7 5.59128Z" fill="#6A707E" fillOpacity="0.5" />
        </svg>

    )
}

export const ArrowBoldDownIcon = () => {
    return (
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L0 0H8L4 6Z" fill="#212529" />
        </svg>
    )
}


export const DeleteIcons = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={512}
            height={512}
            data-name="Layer 2"
            viewBox="0 0 24 24"
            {...props}
        >
            <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1ZM20 4h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" />
            <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0ZM15 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
        </svg>
    )
}

export const PlusIcons = () => {
    return (
        <svg
            fill='#00509D' width="10" height="10"
            id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m467 211h-166v-166c0-24.853-20.147-45-45-45s-45 20.147-45 45v166h-166c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45v-166h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z" /></g></svg>
    )
}
