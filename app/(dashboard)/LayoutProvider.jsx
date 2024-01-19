'use client'
import React from 'react'
import { ModalProvider } from '@/context/ModalContext'
import { Dialog } from '@/components/ui/dialog'
export const LayoutProvider = ({ children }) => {
    return (
        <>
            <ModalProvider>
                <Dialog>
                    {children}
                </Dialog>
            </ModalProvider>
        </>
    )
}
