import React, { useState, useEffect } from 'react';

export const Loaders = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => {
                return prevDots.length >= 3 ? '' : prevDots + '.';
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <style>{`
                .loader-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(100, 116, 139, 0.25);
                    z-index: 9999; 
                }

                .loader {
                    --s: 40px;
                    --g: 10px;
                    width: calc(3*(1.353*var(--s) + var(--g)));
                    display: grid;
                    justify-items: end;
                    aspect-ratio: 3;
                    overflow: hidden;
                    --_m: linear-gradient(90deg,#0000,#000 15px calc(100% - 15px),#0000);
                    -webkit-mask: var(--_m);
                    mask: var(--_m);
                }
                
                .loader:before { 
                    content: "";
                    width: 200%;
                    background:
                        linear-gradient(90deg,#ff1818 50%,#0000 0),
                        conic-gradient(from -90deg at var(--s) calc(0.353*var(--s)),
                            #fff 135deg,#666 0 270deg,#aaa 0); 
                    background-blend-mode: multiply;
                    --_m:
                        linear-gradient(to bottom right,
                            #0000 calc(0.25*var(--s)),#000 0 calc(100% - calc(0.25*var(--s)) - 1.414*var(--g)),#0000 0),
                        conic-gradient(from -90deg at right var(--g) bottom var(--g),#000 90deg,#0000 0);
                    -webkit-mask: var(--_m);
                    mask: var(--_m);
                    background-size:   calc(100%/3) 100%, calc(100%/6) 100%;
                    -webkit-mask-size: calc(100%/6) 100%;
                    mask-size: calc(100%/6) 100%;
                    -webkit-mask-composite: source-in;
                    mask-composite: intersect;
                    animation: l10 1s infinite linear;
                }
                
                @keyframes l10 {
                    to {transform:translate(calc(100%/3))}
                }
            `}</style>
            <div className="loader-container">
                <div className='flex flex-col items-center gap-2'>
                    <div className="loader"></div>
                    <p className='text-red-700 font-bold w-[100px] text-nowrap'>Loading {dots}</p>
                </div>
            </div>
        </>
    );
}
