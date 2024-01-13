import React from 'react'
import { TableDashboard } from '../table/Type/TableDashboard'

export const CrossBorderTable = () => {
    return (
        <>
            <div className="my-[10px] ">
                <div className="left-[3px] top-0 text-zinc-900 text-[14px] font-medium font-['Poppins']">Declare Content</div>
                <TableDashboard />
            </div>
        </>
    )
}
// export const CrossBorder = () => {
//     return (
//         <>

//             <div className="w-[1098px] h-[400px] relative">
//                 <div className="left-[10px] top-[358px] absolute text-zinc-500 text-sm font-normal font-['Poppins']">Select your Broker option. If using ShipLink’s Brokerage, please upload the purchase invoice. If using your own Broker, a PARS/PAPS number will be generated  when you Save this form. Then register the Entry Number provided by your broker to clear this package for Transport.</div>
//                 <div className="left-[3px] top-0 absolute text-zinc-900 text-[17px] font-medium font-['Poppins']">Declare Content</div>
//                 <div className="w-[1098px] h-[311px] left-0 top-[32px] absolute flex-col justify-start items-start gap-px inline-flex">
//                     <div className="w-[1098px] px-1.5 py-[11px] bg-sky-50 rounded-tl rounded-tr border border-neutral-200 justify-start items-start gap-[13px] inline-flex">
//                         <div className="h-[21px] justify-start items-start gap-[27px] flex">
//                             <div className="px-2.5 justify-start items-start gap-[41px] flex">
//                                 <div className="justify-start items-start gap-[30px] flex">
//                                     <div className="justify-start items-start gap-2.5 flex">
//                                         <div className="w-[51px] text-sky-700 text-sm font-semibold font-['Poppins']">Qty</div>
//                                     </div>
//                                     <div className="h-[21px] justify-start items-start gap-2.5 flex">
//                                         <div className="w-[60px] text-sky-700 text-sm font-semibold font-['Poppins']">Value</div>
//                                     </div>
//                                     <div className="w-[310px] text-sky-700 text-sm font-semibold font-['Poppins']">Description</div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="w-[314px] text-sky-700 text-sm font-semibold font-['Poppins']">HS Description</div>
//                         <div className="w-[104px] text-sky-700 text-sm font-semibold font-['Poppins']">HS Code</div>
//                         <div className="w-20 text-sky-700 text-sm font-semibold font-['Poppins']">Made in</div>
//                     </div>
//                     <div className="w-[1098px] px-[15px] py-2.5 bg-white border border-neutral-200 justify-start items-center gap-2.5 inline-flex">
//                         <div className="justify-start items-center gap-2.5 flex">
//                             <div className="justify-start items-start flex">
//                                 <div className="h-[31px] pr-px py-px bg-gray-50 rounded-tl rounded-bl border border-gray-200 justify-start items-center flex">
//                                     <div className="h-[29px] py-1 rounded-tl rounded-bl justify-start items-center flex">
//                                         <div className="grow shrink basis-0 text-center text-neutral-900 text-sm font-normal font-['Poppins']">1</div>
//                                     </div>
//                                 </div>
//                                 <div className="w-7 bg-gray-200 rounded-tr-[3px] rounded-br-[3px] border-l border-gray-200 justify-center items-center gap-2.5 flex">
//                                     <div className="w-7 h-9 rounded-tr-sm rounded-br-sm flex-col justify-center items-start inline-flex">
//                                         <div className="self-stretch grow shrink basis-0 px-1.5 pt-1 justify-center items-center inline-flex">
//                                             <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
//                                         </div>
//                                         <div className="self-stretch grow shrink basis-0 px-1.5 pb-1 justify-center items-center inline-flex">
//                                             <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="h-[31px] justify-start items-start flex">
//                                 <div className="h-[31px] pr-px py-px bg-gray-50 rounded-tl rounded-bl border border-gray-200 justify-start items-center flex">
//                                     <div className="grow shrink basis-0 h-[29px] py-1 rounded-tl rounded-bl justify-start items-center flex">
//                                         <div className="grow shrink basis-0 text-center text-neutral-900 text-sm font-normal font-['Poppins']">$100</div>
//                                     </div>
//                                 </div>
//                                 <div className="w-7 bg-gray-200 rounded-tr-[3px] rounded-br-[3px] border-l border-gray-200 justify-center items-center gap-2.5 flex">
//                                     <div className="w-7 h-9 rounded-tr-sm rounded-br-sm flex-col justify-center items-start inline-flex">
//                                         <div className="self-stretch grow shrink basis-0 px-1.5 pt-1 justify-center items-center inline-flex">
//                                             <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
//                                         </div>
//                                         <div className="self-stretch grow shrink basis-0 px-1.5 pb-1 justify-center items-center inline-flex">
//                                             <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="w-[317px] h-[35px] pr-px py-px bg-gray-50 rounded border border-gray-200 justify-start items-center flex">
//                                 <div className="grow shrink basis-0 h-[26px] px-2 py-1 rounded-tl rounded-bl justify-start items-center flex">
//                                     <div className="grow shrink basis-0 text-zinc-600 text-xs font-normal font-['Poppins']">Description</div>
//                                 </div>
//                             </div>
//                             <div className="justify-start items-center gap-2.5 flex">
//                                 <div className="w-[317px] h-[35px] pr-px py-px bg-gray-50 rounded border border-gray-200 justify-start items-center flex">
//                                     <div className="grow shrink basis-0 h-[26px] px-2 py-1 rounded-tl rounded-bl justify-start items-center flex">
//                                         <div className="grow shrink basis-0 text-zinc-600 text-xs font-normal font-['Poppins']">Search</div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="w-[107px] pr-px py-px bg-gray-50 rounded border border-gray-200 justify-start items-center flex">
//                                 <div className="px-2 py-1 rounded-tl rounded-bl justify-center items-center flex">
//                                     <div className="text-zinc-600 text-sm font-normal font-['Poppins']">8103.99.0000</div>
//                                 </div>
//                             </div>
//                             <div className="h-[35px] justify-between items-center flex">
//                                 <div className="w-12 pr-px py-px bg-gray-50 rounded border border-gray-200 justify-start items-center flex">
//                                     <div className="px-2 py-1 rounded-tl rounded-bl justify-center items-center flex">
//                                         <div className="text-zinc-600 text-sm font-normal font-['Poppins']">CAN</div>
//                                     </div>
//                                 </div>
//                                 <div className="w-[26px] h-[25px] relative rounded">
//                                     <div className="w-[26px] h-[25px] left-0 top-0 absolute bg-blue-100 rounded border border-black border-opacity-20" />
//                                     <div className="w-[21px] h-[21px] left-[2px] top-[2px] absolute">
//                                         <img className="w-[21px] h-[21px] left-0 top-0 absolute" src="https://via.placeholder.com/21x21" />
//                                         <div className="w-[25.20px] h-[27.30px] left-[-4.20px] top-[-4.20px] absolute bg-sky-700" />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-[1098px] px-[15px] py-2.5 bg-white border border-neutral-200 justify-start items-center gap-2.5 inline-flex">
//                         <div className="justify-start items-center gap-2.5 flex">
//                             <div className="justify-start items-start flex">
//                                 <div className="h-[31px] pr-px py-px bg-gray-50 rounded-tl rounded-bl border border-gray-200 justify-start items-center flex">
//                                     <div className="h-[29px] py-1 rounded-tl rounded-bl justify-start items-center flex">
//                                         <div className="grow shrink basis-0 text-center text-neutral-900 text-sm font-normal font-['Poppins']">1</div>
//                                     </div>
//                                 </div>
//                                 <div className="w-7 bg-gray-200 rounded-tr-[3px] rounded-br-[3px] border-l border-gray-200 justify-center items-center gap-2.5 flex">
//                                     <div className="w-7 h-9 rounded-tr-sm rounded-br-sm flex-col justify-center items-start inline-flex">
//                                         <div className="self-stretch grow shrink basis-0 px-1.5 pt-1 justify-center items-center inline-flex">
//                                             <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
//                                         </div>
//                                         <div className="self-stretch grow shrink basis-0 px-1.5 pb-1 justify-center items-center inline-flex">
//                                             <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="h-[31px] justify-start items-start flex">
//                                 <div className="h-[31px] pr-px py-px bg-gray-50 rounded-tl rounded-bl border border-gray-200 justify-start items-center flex">
//                                     <div className="grow shrink basis-0 h-[29px] py-1 rounded-tl rounded-bl justify-start items-center flex">
//                                         <div className="grow shrink basis-0 text-center text-neutral-900 text-sm font-normal font-['Poppins']">$100</div>
//                                     </div>
//                                 </div>
//                                 <div className="w-7 bg-gray-200 rounded-tr-[3px] rounded-br-[3px] border-l border-gray-200 justify-center items-center gap-2.5 flex">
//                                     <div className="w-7 h-9 rounded-tr-sm rounded-br-sm flex-col justify-center items-start inline-flex">
//                                         <div className="self-stretch grow shrink basis-0 px-1.5 pt-1 justify-center items-center inline-flex">
//                                             <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
//                                         </div>
//                                         <div className="self-stretch grow shrink basis-0 px-1.5 pb-1 justify-center items-center inline-flex">
//                                             <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="w-[317px] h-[35px] pr-px py-px bg-gray-50 rounded border border-gray-200 justify-start items-center flex">
//                                 <div className="grow shrink basis-0 h-[26px] px-2 py-1 rounded-tl rounded-bl justify-start items-center flex">
//                                     <div className="grow shrink basis-0 text-zinc-600 text-xs font-normal font-['Poppins']">Description</div>
//                                 </div>
//                             </div>
//                             <div className="justify-start items-center gap-2.5 flex">
//                                 <div className="w-[317px] h-[35px] pr-px py-px bg-gray-50 rounded border border-gray-200 justify-start items-center flex">
//                                     <div className="grow shrink basis-0 h-[26px] px-2 py-1 rounded-tl rounded-bl justify-start items-center flex">
//                                         <div className="grow shrink basis-0 text-zinc-600 text-xs font-normal font-['Poppins']">Description</div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="w-[107px] pr-px py-px bg-gray-50 rounded border border-gray-200 justify-start items-center flex">
//                                 <div className="px-2 py-1 rounded-tl rounded-bl justify-start items-center flex">
//                                     <div className="text-zinc-600 text-sm font-normal font-['Poppins']">8103.99.0000</div>
//                                 </div>
//                             </div>
//                             <div className="h-[35px] justify-between items-center flex">
//                                 <div className="w-12 pr-px py-px bg-gray-50 rounded border border-gray-200 justify-start items-center flex">
//                                     <div className="px-2 py-1 rounded-tl rounded-bl justify-center items-center flex">
//                                         <div className="text-zinc-600 text-sm font-normal font-['Poppins']">CAN</div>
//                                     </div>
//                                 </div>
//                                 <div className="w-[26px] h-[25px] relative rounded">
//                                     <div className="w-[26px] h-[25px] left-0 top-0 absolute bg-blue-100 rounded border border-black border-opacity-20" />
//                                     <div className="w-[21px] h-[21px] left-[2px] top-[2px] absolute">
//                                         <img className="w-[21px] h-[21px] left-0 top-0 absolute" src="https://via.placeholder.com/21x21" />
//                                         <div className="w-[25.20px] h-[27.30px] left-[-4.20px] top-[-4.20px] absolute bg-sky-700" />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-[1098px] h-[45px] px-[15px] py-3 bg-white border border-neutral-200 justify-between items-center inline-flex">
//                         <div className="justify-start items-center gap-5 flex">
//                             <div className="w-[69px] h-[13px] text-sky-700 text-[15px] font-medium font-['Poppins']">Totals :</div>
//                             <div className="justify-start items-center gap-[100px] flex">
//                                 <div className="w-[120px] h-[13.60px] text-zinc-800 text-[15px] font-medium font-['Poppins']">$ 100.00</div>
//                             </div>
//                         </div>
//                         <div className="h-[35px] justify-between items-center flex">
//                             <div className="w-[153px] px-[7px] py-1.5 bg-sky-50 rounded justify-end items-center gap-[5px] flex">
//                                 <div className="w-5 h-[15px] relative">
//                                     <img className="w-5 h-[15px] left-0 top-0 absolute" src="https://via.placeholder.com/20x15" />
//                                     <div className="w-[26.67px] h-[15px] left-0 top-0 absolute bg-sky-700" />
//                                 </div>
//                                 <div className="text-sky-700 text-sm font-normal font-['Poppins']">Add Other Items</div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-[1098px] h-[54px] px-[15px] py-2.5 bg-white border border-neutral-200 justify-start items-center gap-[19px] inline-flex">
//                         <div className="rounded-lg justify-start items-start flex">
//                             <div className="w-[100px] h-9 px-2.5 py-2 bg-green-500 rounded-tl rounded-bl justify-start items-start gap-2.5 flex">
//                                 <div className="text-white text-xs font-medium font-['Poppins'] leading-tight">Select Broker</div>
//                             </div>
//                             <div className="h-9 px-2.5 py-2 bg-stone-50 rounded-tr rounded-br border border-neutral-200 justify-between items-center flex">
//                                 <div className="text-zinc-400 text-xs font-medium font-['Poppins'] leading-tight">Use Own Broker</div>
//                                 <div className="w-[19px] h-[19px] relative">
//                                     <img className="w-[19px] h-[19px] left-0 top-0 absolute origin-top-left rotate-90" src="https://via.placeholder.com/19x19" />
//                                     <div className="w-7 h-[26px] left-[-4px] top-[-4px] absolute bg-zinc-900" />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="h-9 bg-neutral-400 rounded-lg justify-start items-start flex">
//                             <div className="w-[100px] h-9 px-2.5 py-2 bg-zinc-400 rounded-tl rounded-bl justify-center items-center gap-2.5 flex">
//                                 <div className="text-white text-xs font-medium font-['Poppins'] leading-tight">Invoice</div>
//                             </div>
//                             <div className="h-9 px-2.5 py-2 bg-stone-50 rounded-tr rounded-br border border-neutral-200 justify-start items-center gap-[29px] flex">
//                                 <div className="text-zinc-400 text-xs font-medium font-['Poppins'] leading-tight">Upload Invoice</div>
//                             </div>
//                         </div>
//                         <div className="rounded-lg justify-start items-start flex">
//                             <div className="w-[100px] h-9 px-2.5 py-2 bg-neutral-900 rounded-tl rounded-bl justify-center items-center gap-2.5 flex">
//                                 <div className="text-white text-xs font-medium font-['Poppins'] leading-tight">PARS/PAPS</div>
//                             </div>
//                             <div className="h-9 px-2.5 py-2 bg-stone-50 rounded-tr rounded-br border border-neutral-200 justify-start items-center gap-[29px] flex">
//                                 <div className="text-zinc-400 text-xs font-medium font-['Poppins'] leading-tight">12313131231</div>
//                             </div>
//                         </div>
//                         <div className="rounded-lg justify-start items-start flex">
//                             <div className="w-[100px] h-9 px-2.5 py-2 bg-sky-700 rounded-tl rounded-bl justify-start items-start gap-2.5 flex">
//                                 <div className="text-white text-xs font-medium font-['Poppins'] leading-tight">Entry Number</div>
//                             </div>
//                             <div className="h-9 px-2.5 py-2 bg-stone-50 rounded-tr rounded-br border border-neutral-200 justify-start items-center gap-[29px] flex">
//                                 <div className="text-zinc-400 text-xs font-medium font-['Poppins'] leading-tight">1231321</div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-[1098px] h-[54px] px-[15px] py-2.5 bg-white border border-neutral-200 justify-start items-center gap-5 inline-flex">
//                         <div className="h-9 justify-between items-center flex">
//                             <div className="h-9 justify-start items-center gap-[140px] flex">
//                                 <div className="rounded-lg justify-start items-start flex">
//                                     <div className="w-[100px] h-9 px-2.5 py-2 bg-sky-700 rounded-tl rounded-bl justify-center items-start gap-2.5 flex">
//                                         <div className="text-white text-xs font-medium font-['Poppins'] leading-tight">Warehouse</div>
//                                     </div>
//                                     <div className="h-9 px-2.5 py-2 bg-stone-50 rounded-tr rounded-br border border-neutral-200 justify-start items-center gap-[29px] flex">
//                                         <div className="text-zinc-400 text-xs font-medium font-['Poppins'] leading-tight">WR. Toronto</div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="h-[35px] justify-between items-start flex">
//                                 <div className="w-[126px] h-[35px] px-8 bg-white rounded shadow border border-red-700 justify-center items-center gap-2 flex">
//                                     <div className="text-red-700 text-base font-medium font-['Poppins']">Cancel</div>
//                                 </div>
//                                 <div className="w-[126px] justify-start items-start flex">
//                                     <div className="w-[126px] h-[35px] px-8 bg-red-700 rounded shadow justify-center items-center gap-2 flex">
//                                         <div className="text-white text-base font-medium font-['Poppins']">Save</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
