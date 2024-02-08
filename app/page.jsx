import Image from "next/image";
import styles from "./styles.module.scss";
import { Button } from "@/components/ui/button";
import { CardMembership } from "./(dashboard)/membership/components/CardMembership";
import { CardsComponents } from "@/components/home/CardsComponents";
import { ListCardComponents } from "@/components/home/ListCardComponents";
import { WhyCardsComponents } from "@/components/home/WhyCardsComponents";
import { CarrierList } from "@/components/home/CarrierList";
import { SubsCardsComponents } from "@/components/home/SubsCardsComponents";
import { HomeNavbar } from "@/components/home/navigation/HomeNavbar";
import { HomeFooter } from "@/components/home/navigation/HomeFooter";
export default function Home() {
  return (
    <>
      <HomeNavbar />
      <div className={styles.container}>
        <div className={`${styles.header} flex flex-col gap-5 `}>
          <div className="flex flex-col text-center justify-center items-center gap-[32px] h-[80%]">
            <div className="flex flex-col gap-[24px] justify-center items-center">
              <h1 className=" text-white text-5xl font-bold">Cross-Border Ship & Receive is Here</h1>
              <Button
                variant="destructive"
                className="rounded w-[182px] py-5 px-10"
              >
                <p className="text-lg">Learn More</p>
              </Button>
            </div>

            <div className="flex flex-col gap-[24px] justify-center items-center">
              <h1 className=" text-white text-5xl font-bold">
                Up to 70% off Shipping Labels
              </h1>
              <Button
                variant="destructive"
                className="rounded w-[182px] py-5 px-10"
              >
                <p className="text-lg">Learn More</p>
              </Button>
            </div>
          </div>
        </div>

        {/* section */}
        <div className="w-[100%] bg-white">
          <div className={`flex flex-col gap-10 w-[90%] mx-auto my-10 `}>
            <div className="flex flex-col justify-center gap-5">
              <h1 className=" text-myBlue text-lg font-bold">Membership Plans</h1>
              <h1 className=" text-black text-3xl font-bold">2 Ways to Save on Shipping</h1>
              <div className="text-[#5A5A5A] text-base">
                <ul>
                  <li>
                    - Heavily discounted rates on shipping labels thanks to our
                    volume accounts with world class carriers and partners
                  </li>
                  <li>
                    - Your own local US and Canadian address for fast low cost
                    cross-border transfers
                  </li>
                </ul>
              </div>
              <div className="py-5 mt-3 flex flex-col gap-5 justify-center items-center">
                <SubsCardsComponents />
                <Button variant="secondary" size="lg" className="rounded px-10 mt-10">
                  <p className="text-base">More on Plans and Pricing</p>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* section */}
        <div className={`${styles.works} py-20 gap-10 bg-gradient-to-br from-blue-50 to-white`} >
          <div className="flex flex-row gap-5 justify-between items-center mx-auto w-[90%]">
            <div className="left w-[50%] flex flex-col justify-start gap-5">
              <h2 className="text-4xl text-myBlue font-bold">
                Cross-Border Mailboxes
              </h2>
              <h1 className=" text-black text-lg font-bold">How it Works</h1>
              <div className="text-[#5A5A5A] text-base">
                <p className="w-[90%] leading-loose">
                  With our Cross-Border Mailbox service you receive your
                  packages and documents within their originating country in the
                  most convenient, fast and economical way. With your ShipLink
                  address you can make purchases online at your favorite stores,
                  subscribe to magazines, receive correspondence and much more
                  without the extra costs of international shipping and
                  brokerage surcharges for items worth less than $800.
                </p>
              </div>
            </div>

            <div className="right w-max">
              <Image
                width={500}
                height={500}
                alt="mailbox"
                src={"/assets/home/Section2.png"}
                style={{ width: "720px", height: "444px" }}
              />
            </div>
          </div>
          <div className="flex flex-col mt-10 gap-5 mx-auto w-[90%]">
            <p className="text-xl font-bold">Buy and Receive</p>
            <div className="cardContent">
              <CardsComponents />
            </div>
          </div>
        </div>


        {/* section */}
        <div className={`${styles.sectionFree}`}>
          <div className={`${styles.contentFrame} mx-auto`}>
            <div className="flex flex-col gap-5 justify-center items-center text-center  px-10 py-10 h-[100%]">
              <h3 className="text-3xl  font-bold text-white">Free Account</h3>
              <p className="text-base px-4 text-white">Join us for great benefits by getting your Free Account right now! Enjoy exclusive access to our specialized services, unique features and unmatched prices</p>
              <Button
                variant="destructive"
                size="lg"
                className="rounded"
              >
                <p className="text-base">Get My Free Account Now</p>
              </Button>
            </div>
          </div>
        </div>

        {/* section */}
        <div className={`${styles.works} py-20 gap-10 bg-gradient-to-br from-blue-50 to-white`} >
          <div className="w-[90%] ">
            <h2 className="text-4xl text-myBlue font-bold">
              Shipping Labels
            </h2>
          </div>
          <div className="flex flex-row gap-8 mx-auto w-[90%]">
            <div className="left w-[600px] h-max flex flex-col justify-start gap-5">
              <div className="h-[598px] relative">
                <Image
                  width={388}
                  height={598}
                  alt="mailbox"
                  src={"/assets/home/Frame3.png"}
                  style={{ width: "388px", height: "598px" }}
                />

                <div className="p-5 w-[390px] absolute bottom-10 left-10 rounded shadow flex flex-col gap-[20px] bg-white">
                  <h3 className="text-xl  font-bold text-black">Lorem Ipsum</h3>
                  <p className="text-base text-[#5A5A5A]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit tempora accusamus iste in cum expedita sint optio ipsam laudantium quaerat.</p>
                </div>
              </div>
            </div>

            <div className="right w-full flex flex-col justify-between h-[100%] gap-6">
              <h3 className="text-xl font-bold text-black">How it Works</h3>
              <div className="h-full">
                <ListCardComponents />
              </div>
            </div>
          </div>

          <Button
            variant="destructive"
            size="lg"
            className="rounded px-10 w-[182px]"
          >
            <p className="text-base">More Details</p>
          </Button>

          <div className={`${styles.contentFrame2} mx-auto my-[20px]`}>
            <div className="flex flex-col gap-5 justify-center items-center text-center px-10 py-16 h-[100%]">
              <div className="py-5 gap-4 flex flex-col">
                <h3 className="text-3xl text-center font-bold text-white">Sign up</h3>
                <p className="text-base px-4 text-white">Join us for great benefits by getting your account right now! <br />Enjoy exclusive access to our specialized services, unique features and unmatched prices</p>
              </div>
              <Button
                variant="destructive"
                size="lg"
                className="rounded px-20"
              >
                <p className="text-base">Get My Account</p>
              </Button>
            </div>
          </div>
        </div>

        {/* Section Why */}
        <div className="w-[100%] bg-white">
          <div className={`flex flex-col gap-10 w-[90%] mx-auto my-10 `}>
            <h2 className="text-4xl text-myBlue font-bold">
              Why Choose ShipLink?
            </h2>
            <div className="bg-gradient-to-r from-blue-900 to-blue-900/90 w-full rounded-sm p-[32px]">
              <WhyCardsComponents />
            </div>
          </div>
        </div>

        {/* Patner Section */}
        <div className="w[100%] bg-[#F7F7F7] border border-[#E7E8EC] py-10">
          <div className={`flex flex-col gap-10 w-[90%] mx-auto justify-center items-center my-10 `}>
            <div className="flex flex-col justify-center w-full gap-5 text-center">
              <h2 className="text-4xl text-black font-bold">
                Our World Class Partners and Carriers
              </h2>
              <p>We only work with the world’s most reputable carriers</p>
              <div className="py-10 mt-10 w-full">
                <CarrierList />
              </div>
            </div>
          </div>
        </div>
      </div >
      <HomeFooter />
    </>
  );
}
