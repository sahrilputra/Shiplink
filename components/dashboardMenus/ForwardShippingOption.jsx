import { React, useState } from 'react'
import { Carrier } from './carrier/Carrier'
import { PaymentModals } from './payments/paymentModals'
export const ForwardShippingOption = () => {

    const [select, isSelect] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const toggleSelect = () => {
        isSelect(!select)
    }

    const handleConfirmClick = () => {
        setShowPaymentModal(true);
    };

    const handleClosePaymentModal = () => {
        setShowPaymentModal(false);
    };


    return (
        <>
            <div className="flex-col justify-start items-start gap-4 flex">
                <div className="text-zinc-900 text-sm font-medium font-['Poppins']">Select Your Shipping Option</div>
                <div className="justify-start items-start gap-4 inline-flex">
                    <button
                        className="px-6 py-2 bg-red-600 bg-opacity-20 rounded border border-red-600 justify-center items-center gap-2 flex">
                        <div className="text-red-600 text-xs font-medium font-['Poppins']">Cheapest</div>
                    </button>
                    <button className="px-6 py-2 bg-white rounded border border-black border-opacity-10 justify-center items-center gap-2 flex">
                        <div className="text-zinc-500 text-xs font-normal font-['Poppins']">Fastest</div>
                    </button>
                </div>
            </div>
            <div className="w-[100%] flex-col justify-start items-start gap-0.5 flex">
                <Carrier />
                <Carrier />
            </div>
            <div className="w-[100%]  h-10 flex-col justify-start items-end gap-2.5 inline-flex">
                <button
                    onClick={handleConfirmClick}
                    className="h-[35px] px-10 bg-secondary rounded shadow justify-start items-center gap-2 inline-flex">
                    <p className="text-white text-xs font-medium font-['Poppins']">Confirm</p>
                </button>
            </div>

        </>
    )
}
