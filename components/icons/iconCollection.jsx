import React from 'react'
import Image from 'next/image'

export const PhoneIcon = ({ props }) => {
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={51}
        fill="none"
        {...props}
    >
        <path
            fill="#0D509A"
            d="m43.287 31.58-9.228-4.099a2.758 2.758 0 0 0-2.595.237.946.946 0 0 0-.109.081l-4.823 4.066a.37.37 0 0 1-.329.011c-3.1-1.483-6.311-4.646-7.814-7.676a.367.367 0 0 1 0-.325l4.116-4.84a1.17 1.17 0 0 0 .082-.113 2.694 2.694 0 0 0 .22-2.57L18.7 7.223a2.719 2.719 0 0 0-1.15-1.281 2.756 2.756 0 0 0-1.695-.342 10.625 10.625 0 0 0-6.591 3.496 10.447 10.447 0 0 0-2.623 6.938c0 15.16 12.444 27.493 27.74 27.493 2.575.005 5.063-.92 7-2.6a10.476 10.476 0 0 0 3.528-6.533 2.69 2.69 0 0 0-.34-1.673 2.726 2.726 0 0 0-1.282-1.14Zm-8.906 9.623c-14.003 0-25.396-11.292-25.396-25.17a8.134 8.134 0 0 1 2.035-5.404 8.272 8.272 0 0 1 5.129-2.727h.044a.393.393 0 0 1 .36.253l4.122 9.121a.383.383 0 0 1 0 .323l-4.124 4.852a.91.91 0 0 0-.084.11 2.695 2.695 0 0 0-.178 2.66c1.733 3.515 5.308 7.031 8.895 8.748a2.756 2.756 0 0 0 2.69-.193c.037-.025.074-.053.11-.082l4.82-4.065a.378.378 0 0 1 .313-.02l9.23 4.099a.39.39 0 0 1 .237.387 8.157 8.157 0 0 1-2.75 5.087 8.296 8.296 0 0 1-5.453 2.02Z"
        />
    </svg>
}
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

export const GridIcons = (props) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            viewBox="0 0 512 512"
            {...props}
        >
            <path
                d="M187.628 0H43.707C19.607 0 0 19.607 0 43.707v143.921c0 24.1 19.607 43.707 43.707 43.707h143.921c24.1 0 43.707-19.607 43.707-43.707V43.707c0-24.1-19.607-43.707-43.707-43.707zm280.665 0H324.372c-24.1 0-43.707 19.607-43.707 43.707v143.921c0 24.1 19.607 43.707 43.707 43.707h143.921c24.1 0 43.707-19.607 43.707-43.707V43.707C512 19.607 492.393 0 468.293 0zM187.628 280.665H43.707C19.607 280.665 0 300.272 0 324.372v143.921C0 492.393 19.607 512 43.707 512h143.921c24.1 0 43.707-19.607 43.707-43.707V324.372c0-24.1-19.607-43.707-43.707-43.707zm280.665 0H324.372c-24.1 0-43.707 19.607-43.707 43.707v143.921c0 24.1 19.607 43.707 43.707 43.707h143.921c24.1 0 43.707-19.607 43.707-43.707V324.372c0-24.1-19.607-43.707-43.707-43.707z"
                data-original="#000000"
            />
        </svg>
    )
}

export const IconList = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width={512}
            height={512}
            style={{
                enableBackground: "new 0 0 512 512",
            }}
            viewBox="0 0 32 32"
            {...props}
        >
            <g data-name="Layer 2">
                <path
                    d="M28 4H12a2 2 0 0 0 0 4h16a2 2 0 0 0 0-4z"
                    data-original="#000000"
                />
                <circle cx={4} cy={6} r={2} data-original="#000000" />
                <path
                    d="M28 14H12a2 2 0 0 0 0 4h16a2 2 0 0 0 0-4z"
                    data-original="#000000"
                />
                <circle cx={4} cy={16} r={2} data-original="#000000" />
                <path
                    d="M28 24H12a2 2 0 0 0 0 4h16a2 2 0 0 0 0-4z"
                    data-original="#000000"
                />
                <circle cx={4} cy={26} r={2} data-original="#000000" />
            </g>
        </svg>
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


export const OptionIcons = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={512}
            height={512}
            viewBox="0 0 24 24"
            {...props}
        >
            <circle cx={12} cy={12} r={2} />
            <circle cx={4} cy={12} r={2} />
            <circle cx={20} cy={12} r={2} />
        </svg>
    )
}

export const FilterIcons = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            fill="none"
            {...props}
        >
            <path
                d="M17.282 0H.716C.166 0-.179.671.098 1.207l5.234 9.94v6.048c0 .445.32.805.715.805h5.905c.396 0 .715-.36.715-.805v-6.048l5.237-9.94C18.178.67 17.834 0 17.282 0Zm-6.226 16.19H6.943v-3.922h4.115v3.922h-.002Zm.216-5.948-.214.417H6.941l-.214-.417L2.265 1.81h13.47l-4.463 8.432Z"
            />
        </svg>
    )
}