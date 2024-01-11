import React from 'react'
import styles from './styles.module.scss'
export default function tax() {

    return (
        <>
            <div className={styles.taxLayout}>
                <div className={styles.left}>
                    <div className="w-[100%]  p-5 bg-white rounded-md border border-neutral-200 flex-col justify-start items-start gap-[15px] inline-flex">
                        <div className="w-[201px] text-zinc-800 text-lg font-semibold font-['Poppins'] leading-tight">Tax Configuration</div>
                        <div className="w-[241px] rounded-lg justify-start items-start inline-flex">
                            <div className="w-[201px] h-10 px-[17px] py-2 bg-stone-50 rounded-tl rounded-bl justify-start items-center gap-3 flex">
                                <div className="text-zinc-400 text-sm font-medium font-['Poppins'] leading-tight">Select Coutry</div>
                            </div>
                            <div className="w-[39px] px-2.5 py-2 bg-stone-200 rounded-tr rounded-br justify-center items-center gap-2.5 flex">
                                <div className="w-[19px] h-[19px] relative" />
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start gap-0.5 flex">
                            <div className="p-2.5 justify-start items-center gap-2.5 inline-flex">
                                <div className="text-black text-base font-medium font-['Poppins'] leading-tight">Province : </div>
                            </div>
                            <div className="h-[50px] px-2.5 py-[15px] bg-white rounded border border-neutral-200 flex-col justify-start items-start gap-3 flex">
                                <div className="h-5 pl-[9px] pr-1.5 flex-col justify-start items-center gap-3 flex">
                                    <div className="w-[308px] justify-start items-center gap-2.5 inline-flex">
                                        <div><span className="text-black text-sm font-normal font-['Poppins'] leading-tight">Alberta</span><span className="text-black text-sm font-medium font-['Poppins'] leading-tight"> : </span><span className="text-black text-sm font-semibold font-['Poppins'] leading-tight">HST ( 13 % )</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[50px] px-2.5 py-[15px] bg-blue-100 rounded border border-neutral-200 flex-col justify-start items-start gap-3 flex">
                                <div className="h-5 pl-[9px] pr-1.5 flex-col justify-start items-center gap-3 flex">
                                    <div className="w-[308px] justify-start items-center gap-2.5 inline-flex">
                                        <div><span className="text-black text-sm font-normal font-['Poppins'] leading-tight">Ohio</span><span className="text-black text-sm font-medium font-['Poppins'] leading-tight"> : </span><span className="text-black text-sm font-semibold font-['Poppins'] leading-tight">HST ( 13 % )</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[50px] px-2.5 py-[15px] bg-white rounded border border-neutral-200 flex-col justify-start items-start gap-3 flex">
                                <div className="h-5 pl-[9px] pr-1.5 flex-col justify-start items-center gap-3 flex">
                                    <div className="w-[308px] justify-start items-center gap-2.5 inline-flex">
                                        <div><span className="text-black text-sm font-normal font-['Poppins'] leading-tight">Quebec : </span><span className="text-black text-sm font-medium font-['Poppins'] leading-tight">QST</span><span className="text-black text-sm font-semibold font-['Poppins'] leading-tight"> ( 9.96 % ) + HST 5 %</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[50px] px-2.5 py-[15px] bg-white rounded border border-neutral-200 flex-col justify-start items-start gap-3 flex">
                                <div className="h-5 pl-[9px] pr-1.5 flex-col justify-start items-center gap-3 flex">
                                    <div className="w-[308px] justify-start items-center gap-2.5 inline-flex">
                                        <div><span className="text-black text-sm font-normal font-['Poppins'] leading-tight">Ontario : </span><span className="text-black text-sm font-medium font-['Poppins'] leading-tight">HST</span><span className="text-black text-sm font-semibold font-['Poppins'] leading-tight"> ( 11 % )</span><span className="text-black text-sm font-normal font-['Poppins'] leading-tight"> </span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className="w-[100%]   p-5 bg-white rounded-md border border-neutral-200 flex-col justify-start items-start gap-[15px] inline-flex">
                        <div className="w-[201px] text-zinc-800 text-lg font-semibold font-['Poppins'] leading-tight">Tax Assignment</div>
                        <div className="py-[5px] flex-col justify-start items-start gap-2.5 flex">
                            <div className="px-2.5 py-[5px] bg-sky-50 rounded border border-sky-700 justify-center items-center gap-2.5 inline-flex">
                                <div className="text-sky-700 text-xs font-medium font-['Poppins']">Create New Type</div>
                            </div>
                        </div>
                        <div className="px-[5px] py-5 bg-white rounded-md border flex-col justify-start items-start gap-[15px] flex">
                            <div className="w-[201px] text-zinc-800 text-lg font-semibold font-['Poppins'] leading-tight">Tax Types Details</div>
                            <div className="flex-col justify-start items-start gap-0.5 flex">
                                <div className="px-[5px] flex-col justify-start items-start gap-0.5 flex">
                                    <div className="w-[514px] p-2.5 bg-blue-100 rounded border border-neutral-200 justify-between items-center inline-flex">
                                        <div className="pl-[9px] pr-1.5 flex-col justify-start items-center gap-3 inline-flex">
                                            <div className="justify-start items-center gap-2.5 inline-flex">
                                                <div className="justify-start items-start gap-2.5 flex" />
                                                <div className="h-2.5 justify-between items-end flex">
                                                    <div className="text-black text-sm font-normal font-['Poppins'] leading-tight">HST : 13 %</div>
                                                    <div className="text-zinc-600 text-sm font-normal font-['Poppins'] leading-tight">HST123</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="justify-start items-start gap-2.5 flex">
                                            <div className="w-[30px] h-[30px] bg-sky-50 rounded" />
                                            <div className="w-[23.68px] h-[23.68px] relative">
                                                <img className="w-[23.68px] h-[23.68px] left-0 top-0 absolute" src="https://via.placeholder.com/24x24" />
                                                <div className="w-[28.42px] h-[30.79px] left-[-4.74px] top-[-4.74px] absolute bg-sky-700" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[514px] p-2.5 bg-white rounded border border-neutral-200 justify-between items-center inline-flex">
                                        <div className="pl-[9px] pr-1.5 flex-col justify-start items-center gap-3 inline-flex">
                                            <div className="justify-start items-center gap-2.5 inline-flex">
                                                <div className="justify-start items-start gap-2.5 flex" />
                                                <div className="h-2.5 justify-between items-end flex">
                                                    <div className="text-black text-sm font-normal font-['Poppins'] leading-tight">HST : 10 %</div>
                                                    <div className="text-zinc-600 text-sm font-normal font-['Poppins'] leading-tight">HST1204</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="justify-start items-start gap-2.5 flex">
                                            <div className="w-[30px] h-[30px] bg-sky-50 rounded" />
                                            <div className="w-[23.68px] h-[23.68px] relative">
                                                <img className="w-[23.68px] h-[23.68px] left-0 top-0 absolute" src="https://via.placeholder.com/24x24" />
                                                <div className="w-[28.42px] h-[30.79px] left-[-4.74px] top-[-4.74px] absolute bg-sky-700" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[514px] p-2.5 bg-blue-100 rounded border border-neutral-200 justify-between items-center inline-flex">
                                        <div className="pl-[9px] pr-1.5 flex-col justify-start items-center gap-3 inline-flex">
                                            <div className="justify-start items-center gap-2.5 inline-flex">
                                                <div className="justify-start items-start gap-2.5 flex" />
                                                <div className="h-2.5 justify-between items-end flex">
                                                    <div className="text-black text-sm font-normal font-['Poppins'] leading-tight">TVQ : 9.96%</div>
                                                    <div className="text-zinc-600 text-sm font-normal font-['Poppins'] leading-tight">TVQTR123</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="justify-start items-start gap-2.5 flex">
                                            <div className="w-[30px] h-[30px] bg-sky-50 rounded" />
                                            <div className="w-[23.68px] h-[23.68px] relative">
                                                <img className="w-[23.68px] h-[23.68px] left-0 top-0 absolute" src="https://via.placeholder.com/24x24" />
                                                <div className="w-[28.42px] h-[30.79px] left-[-4.74px] top-[-4.74px] absolute bg-sky-700" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[514px] p-2.5 bg-white rounded border border-neutral-200 justify-between items-center inline-flex">
                                        <div className="pl-[9px] pr-1.5 flex-col justify-start items-center gap-3 inline-flex">
                                            <div className="justify-start items-center gap-2.5 inline-flex">
                                                <div className="justify-start items-start gap-2.5 flex" />
                                                <div className="h-2.5 justify-between items-end flex">
                                                    <div className="text-black text-sm font-normal font-['Poppins'] leading-tight">HST : 5%</div>
                                                    <div className="text-right text-zinc-600 text-sm font-normal font-['Poppins'] leading-tight">HSTOH204</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="justify-start items-start gap-2.5 flex">
                                            <div className="w-[30px] h-[30px] bg-sky-50 rounded" />
                                            <div className="w-[23.68px] h-[23.68px] relative">
                                                <img className="w-[23.68px] h-[23.68px] left-0 top-0 absolute" src="https://via.placeholder.com/24x24" />
                                                <div className="w-[28.42px] h-[30.79px] left-[-4.74px] top-[-4.74px] absolute bg-sky-700" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}