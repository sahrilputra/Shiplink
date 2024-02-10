import { usePathname } from 'next/navigation'
import React from 'react'
export const Params = ({ setShow }) => {
    const router = usePathname()
    console.log(router)
    const parts = router.split('/');
    const customerId = parts[parts.length - 1];
    return (
        <>
            <div className="text-blue-900 text-xs font-normal">
                {
                    router.startsWith('/admin/customers-manager')
                        ? (
                            'Showing All Users', setShow(true)
                        ) : router.startsWith('/admin/customers-manager/') ? (
                            <>
                                {`showing ${customerId}`}
                            </>, setShow(true)
                        ) : (
                            ' '
                        )
                }
            </div>
        </>
    )
}
