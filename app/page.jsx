import Image from 'next/image'
import styles from './styles.module.scss'
export default function Home() {
  return (
    <>
      <div className="w-[280px] h-[1024px] px-[5px] pt-5 bg-white flex-col justify-start items-center gap-5 inline-flex">
        <div className="h-[47px] flex-col justify-start items-center gap-[5px] flex">
          <div className="w-[122px] text-center text-red-700 text-[28px] font-bold font-['Poppins']">ShipLink</div>
        </div>
        <div className="flex-col justify-start items-center gap-2.5 flex">
          <div className="flex-col justify-end items-start gap-2.5 flex">
          <div className="w-[257px] px-[21px] py-2.5 bg-red-700 rounded-lg justify-start items-center gap-5 inline-flex">
              <div className="w-[25px] h-[25px] relative">
                <img className="w-[25px] h-[25px] left-0 top-0 absolute" src="https://via.placeholder.com/25x25" />
                <div className="w-[45.83px] h-[50px] left-[-14.17px] top-[-16.67px] absolute bg-neutral-50" />
              </div>
              <div className="justify-start items-start gap-[18px] flex">
                <div className="w-[191px] text-white text-sm font-semibold font-['Poppins']">Dashboard</div>
              </div>
            </div>
            <div className="w-[257px] px-[21px] py-2.5 bg-red-700 rounded-lg justify-start items-center gap-5 inline-flex">
              <div className="w-[25px] h-[25px] relative">
                <img className="w-[25px] h-[25px] left-0 top-0 absolute" src="https://via.placeholder.com/25x25" />
                <div className="w-[45.83px] h-[50px] left-[-14.17px] top-[-16.67px] absolute bg-neutral-50" />
              </div>
              <div className="justify-start items-start gap-[18px] flex">
                <div className="w-[191px] text-white text-sm font-semibold font-['Poppins']">Dashboard</div>
              </div>
            </div>
            <div className="w-[257px] px-[21px] py-2.5 bg-red-700 bg-opacity-0 rounded-lg justify-start items-center gap-5 inline-flex">
              <img className="w-[25px] h-[25px] opacity-50" src="https://via.placeholder.com/25x25" />
              <div className="opacity-50 justify-start items-start gap-[18px] flex">
                <div className="w-[191px] text-black text-[15px] font-normal font-['Poppins']">Shipping Mailbox</div>
              </div>
            </div>
            <div className="w-[250px] px-[21px] py-2.5 bg-red-700 bg-opacity-0 rounded-lg justify-start items-center gap-5 inline-flex">
              <div className="w-[30px] h-[30px] relative">
                <img className="w-[30px] h-[30px] left-0 top-0 absolute" src="https://via.placeholder.com/30x30" />
                <div className="w-[42px] h-[42px] left-0 top-[-6px] absolute bg-black" />
              </div>
              <div className="opacity-50 justify-start items-start gap-[18px] flex">
                <div className="text-black text-[15px] font-normal font-['Poppins']">Shipping Lebels</div>
              </div>
            </div>
            <div className="w-[257px] px-[21px] py-2.5 bg-red-700 bg-opacity-0 rounded-lg justify-start items-center gap-5 inline-flex">
              <img className="w-[25px] h-[25px] opacity-50" src="https://via.placeholder.com/25x25" />
              <div className="opacity-50 justify-start items-start gap-[18px] flex">
                <div className="w-[191px] text-black text-[15px] font-normal font-['Poppins']">Saved Quotes</div>
              </div>
            </div>
            <div className="w-[250px] px-[21px] py-2.5 bg-red-700 bg-opacity-0 rounded-lg justify-start items-center gap-5 inline-flex">
              <img className="w-[25px] h-[25px] opacity-50" src="https://via.placeholder.com/25x25" />
              <div className="opacity-50 justify-start items-start gap-[18px] flex">
                <div className="w-[205px] text-black text-[15px] font-normal font-['Poppins']">Assisted Purchase</div>
              </div>
            </div>
            <div className="px-2 py-[11px] flex-col justify-start items-start gap-[9px] flex">
              <div className="text-black text-opacity-50 text-base font-normal font-['Poppins']">SETTINGS</div>
              <div className="w-[223px] h-[0px] border border-neutral-200"></div>
            </div>
            <div className="w-[257px] px-[21px] py-2.5 bg-red-700 bg-opacity-0 rounded-lg justify-start items-center gap-5 inline-flex">
              <img className="w-[25px] h-[25px]" src="https://via.placeholder.com/25x25" />
              <div className="opacity-50 justify-start items-start gap-[18px] flex">
                <div className="w-[205px] text-black text-[15px] font-normal font-['Poppins']">Address Book</div>
              </div>
            </div>
            <div className="w-[257px] px-[21px] py-2.5 bg-red-700 bg-opacity-0 rounded-lg justify-start items-center gap-5 inline-flex">
              <img className="w-[25px] h-[25px]" src="https://via.placeholder.com/25x25" />
              <div className="opacity-50 justify-start items-start gap-[18px] flex">
                <div className="text-black text-[15px] font-normal font-['Poppins']">Saved Box Sizes</div>
              </div>
            </div>
            <div className="w-[257px] px-[21px] py-2.5 bg-red-700 bg-opacity-0 rounded-lg justify-start items-center gap-5 inline-flex">
              <img className="w-[30px] h-[30px] opacity-50" src="https://via.placeholder.com/30x30" />
              <div className="opacity-50 justify-start items-start gap-[18px] flex">
                <div className="w-[172px] text-black text-[15px] font-normal font-['Poppins']">Membership Plan</div>
              </div>
            </div>
            <div className="w-[257px] px-[21px] py-2.5 bg-red-700 bg-opacity-0 rounded-lg justify-start items-center gap-5 inline-flex">
              <img className="w-[25px] h-[25px]" src="https://via.placeholder.com/25x25" />
              <div className="opacity-50 justify-start items-start gap-[18px] flex">
                <div className="w-[205px] text-black text-[15px] font-normal font-['Poppins']">Account Detailss</div>
              </div>
            </div>
            <div className="w-[257px] px-[21px] py-2.5 bg-red-700 bg-opacity-0 rounded-lg justify-start items-center gap-5 inline-flex">
              <img className="w-[25px] h-[25px] opacity-50" src="https://via.placeholder.com/25x25" />
              <div className="opacity-50 justify-start items-start gap-[18px] flex">
                <div className="w-[205px] text-black text-[15px] font-normal font-['Poppins']">Billing History</div>
              </div>
            </div>
            <div className="w-[257px] px-[21px] py-2.5 bg-red-700 bg-opacity-0 rounded-lg justify-start items-center gap-5 inline-flex">
              <img className="w-[25px] h-[25px] opacity-50" src="https://via.placeholder.com/25x25" />
              <div className="opacity-50 justify-start items-start gap-[18px] flex">
                <div className="text-black text-[15px] font-normal font-['Poppins']">Refer Friends</div>
              </div>
            </div>
            <div className="w-[257px] px-[21px] py-2.5 bg-red-700 bg-opacity-0 rounded-lg justify-start items-center gap-5 inline-flex">
              <img className="w-[25px] h-[25px] opacity-50" src="https://via.placeholder.com/25x25" />
              <div className="h-[23px] opacity-50 justify-start items-start gap-[18px] flex">
                <div className="text-black text-[15px] font-normal font-['Poppins']">Support</div>
              </div>
            </div>
          </div>
          <div className="px-2.5 py-[15px] bg-white rounded-lg border border-neutral-200 flex-col justify-start items-center gap-3 flex">
            <div className="p-1 rounded-lg border border-neutral-200 justify-start items-start gap-2 inline-flex">
              <div className="h-10 px-6 py-2.5 bg-red-600 rounded-lg justify-center items-center gap-2.5 flex">
                <div className="text-white text-sm font-semibold font-['Poppins'] leading-tight">USA</div>
              </div>
              <div className="h-10 px-6 py-2.5 justify-center items-center gap-2.5 flex">
                <div className="text-black text-sm font-normal font-['Poppins'] leading-tight">Canada</div>
              </div>
            </div>
            <div className="h-[105px] flex-col justify-center items-start gap-2.5 flex">
              <div className="flex-col justify-start items-start flex text-left">
                <div className="text-neutral-900 text-sm font-semibold font-['Poppins']">FirstName LastName</div>
                <div className="text-neutral-900 text-sm font-normal font-['Poppins']">123 Street Name</div>
                <div className="text-neutral-900 text-sm font-normal font-['Poppins']">Unit/Apartment # </div>
                <div className="text-black text-sm font-normal font-['Poppins']">City, State, Zipcode</div>
                <div className="text-black text-sm font-normal font-['Poppins']">Country</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
