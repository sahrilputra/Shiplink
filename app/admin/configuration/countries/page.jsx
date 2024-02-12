import React from 'react'
import { CountriesTabled } from './components/CountriesTabled';
const axios = require('axios');
import { cookies } from 'next/headers'

export default function Countries() {
  
    return (
        <>
            <CountriesTabled />
        </>
    )
}