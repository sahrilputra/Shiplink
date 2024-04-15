'use client'
// TimeFormatContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const TimeFormatContext = createContext();

export const TimeFormatProvider = ({ children }) => {
  const [timeFormat, setTimeFormat] = useState(() => {
    return localStorage.getItem('timeFormat') || 'HH:mm:ss';
  });

  const [dateFormat, setDateFormat] = useState(() => {
    return localStorage.getItem('dateFormat') || 'MM/DD/YYYY';
  });

  const changeTimeFormat = (format) => {
    setTimeFormat(format);
    localStorage.setItem('timeFormat', format);
  };

  const changeDateFormat = (format) => {
    setDateFormat(format);
    localStorage.setItem('dateFormat', format);
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
