'use client'
import React from 'react'
import { ModalProvider } from '@/context/ModalContext'
import { Dialog } from '@/components/ui/dialog'
import { SidebarProvider } from './SidebarContext'
export const LayoutProvider = ({ children }) => {
    return (
        <>
            <ModalProvider>
                <SidebarProvider >
                    <Dialog>
                        {children}
                    </Dialog>
                </SidebarProvider>
            </ModalProvider>
        </>
    )
}
