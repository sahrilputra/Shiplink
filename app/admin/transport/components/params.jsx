import { usePathname } from 'next/navigation'
import React from 'react'
export const Params = () => {
    const router = usePathname()
    if(router === '/admin/transport/lots/**'){
        console.log('true')
    }
    return (
        <>
            <div className="text-blue-900 text-xs font-normal">
                {
                    router === '/admin/transport'
                        ? (
                            'Transport Preparation'
                        ) : router === "/admin/transport/lots" ? (
                            'Showing All Transport Lots '
                        ) : (
                            'Showing Lots Details'
                        )
                }
            </div>
        </>
    )
}
