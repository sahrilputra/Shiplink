import React from 'react'
import styles from '../../styles.module.scss'
export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <div className="flex flex-col text-center justify-center items-center gap-[32px] pt-[90px] w-full h-[100vh] bg-[#E3E7EE]">
          <div className="flex flex-col justify-center gap-5">
            <h1 className=" text-myBlue text-lg font-bold">About Us</h1>
            <h1 className=" text-black text-3xl font-bold">Closer to ShipLink</h1>
            <div className="text-[#5A5A5A] text-base">
              <p>We are the best-in-class platform for national and international shipping services. Our many years of experience, customer satisfaction.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
