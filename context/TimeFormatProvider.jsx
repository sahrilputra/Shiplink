'use client'
// TimeFormatContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const TimeFormatContext = createContext();


export const TimeFormatProvider = ({ children }) => {
  const [timeFormat, setTimeFormat] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('timeFormat') || '12h';
      }
    } catch (e) {
      console.log(e)
    }
  });

  const [dateFormat, setDateFormat] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('dateFormat') || 'MM/DD/YYYY';
      }
    } catch (e) {
      console.log(e)
    }

  });

  const changeTimeFormat = (format) => {
    setTimeFormat(format);

    try {
      localStorage.setItem('timeFormat', format);
    } catch (e) {
      console.log(e)
    }
  };

  const changeDateFormat = (format) => {
    setDateFormat(format);
    try {
      localStorage.setItem('dateFormat', format);
    } catch (e) {
      console.log(e)
    }

  };

  useEffect(() => {
    const storedTimeFormat = localStorage.getItem('timeFormat');
    if (storedTimeFormat) {
      setTimeFormat(storedTimeFormat);
    }

    const storedDateFormat = localStorage.getItem('dateFormat');
    if (storedDateFormat) {
      setDateFormat(storedDateFormat);
    }
  }, []);

  return (
    <TimeFormatContext.Provider value={{ timeFormat, changeTimeFormat, dateFormat, changeDateFormat }}>
      {children}
    </TimeFormatContext.Provider>
  );
};

export const useTimeFormat = () => useContext(TimeFormatContext);
