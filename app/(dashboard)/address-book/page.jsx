'use client'
import React, { useEffect, useState } from 'react'
import { SearchBar } from '@/components/ui/searchBar'
import { Button } from '@/components/ui/button'
import { GridIcons, FilterIcons, IconList, DeleteIcons } from '@/components/icons/iconCollection'
import { PlusIcon } from 'lucide-react'
import { PromoOne } from '@/components/ads/promoOne'
import styles from './styles.module.scss'
import { SavedAddressCard } from './components/SavedAddressCard'
import { DeleteAddress } from './components/DeleteAddress'
import { NewAdressMenus } from './components/NewAdressMenus'
import { useToast } from '@/components/ui/use-toast'
import { EditAddressMenu } from './components/EditedAddressMenu'
import axios from 'axios'
import { SkeletonAddressBook } from './components/SkeletonsAddress/SkeletonAddressBook'
export default function AssitedPurchase() {

    const { toast } = useToast();

    const [newAddress, setIsNew] = useState(false);
    const [editAddress, setIsEdit] = useState(false);
    const [selectedData, setSelectedData] = useState("");
    const [keyForEditAddressMenu, setKeyForEditAddressMenu] = useState(0);
    const [isPicked, setIsPicked] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteID, setDeleteID] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isDeleteButtonActive, setIsDeleteButtonActive] = useState(false);
    const [clicked, isClicked] = useState(true);

    console.log("🚀 ~ AssitedPurchase ~ deleteID:", deleteID)

    const toggleClicked = (clickedButtons) => {
        isClicked(clickedButtons);
    }


    const toggleSelectNewAddress = () => {
        setIsNew(true);
        setIsEdit(false);
    }

    const toggleEditedAddress = () => {
        setIsEdit(true);
        setIsNew(false);
        setKeyForEditAddressMenu(prevKey => prevKey + 1); // Update key unik

    }

    const toggleClose = () => {
        setIsEdit(false);
        setIsNew(false);
        setIsPicked(false)
    }

    const [isSkeleton, setIsSkeleton] = useState(true)
    const [savedAddress, setSavedAddress] = useState([]);
    const [query, setQuery] = useState({
        keyword: "",
        page: 0,
        limit: 0,
        index: 0,
        shortby: "",
    })


    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.post(
                    `/api/customerAPI/address/list`,
                    query
                ).then((response) => {
                    const data = response.data;
                    // console.log("🚀 ~ ).then ~ data:", data)
                    setIsSkeleton(false)
                    setSavedAddress(data.my_address);
                }).catch((error) => {
                    setIsSkeleton(false)
                    console.log('Error:', error);
                });
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData();
    }, [query]);

    const reloadData = () => {
        setQuery({ ...query, page: 0, limit: 0, index: 0, shortby: "" });
    }

    const handleCardSelected = (id) => {
        const selectedAddress = savedAddress.find(item => item.my_address_id === id);
        setSelectedData(selectedAddress);
        setIsPicked(true)
        if (selectedItemId === id) {
            setSelectedItemId(null);
            setIsDeleteButtonActive(false);
        } else {
            setSelectedItemId(id);
            setIsDeleteButtonActive(true);
        }
    }

    const renderMenus = () => {
        switch (true) {
            case newAddress:
                return <NewAdressMenus close={toggleClose} reload={reloadData} />;
            case editAddress:
                return <EditAddressMenu keyProp={keyForEditAddressMenu} close={toggleClose} data={selectedData} reload={reloadData} />;
            default:
                return <PromoOne />;
        }
    }

    return (
        <>
            <>
                <DeleteAddress open={openDelete} setOpen={setOpenDelete} reloadData={reloadData} deleteID={deleteID} />
                <div className={styles.main}>
                    <div className={styles.header}>

                        <div className="wrap flex justify-between items-center w-full px-[20px]">
                            <div className="left flex flex-row justify-center items-center gap-5">
                                <div className="p-1 rounded-md border border-neutral-200 justify-start items-start gap-2.5 inline-flex">
                                    <button
                                        id='savedAddress'
                                        className={`font-normal px-2.5 py-[8px] justify-center items-center gap-2.5 flex rounded hover:bg-red-100
                            ${clicked ? 'bg-none text-black' : 'bg-red-700 text-white font-semiBold hover:bg-red-800'}`}
                                        onClick={() => toggleClicked(false)}
                                    >
                                        <GridIcons width={15} height={15} className={`${clicked ? ' text-black' : ' fill-white font-semiBold hover:bg-red-800'}`} />
                                    </button>
                                    <button
                                        id='newAddress'
                                        className={`font-normal px-2.5 py-[8px] justify-center items-center gap-2.5 flex rounded hover:bg-red-100
                                        ${clicked ? 'bg-red-700 text-white font-semiBold hover:bg-red-800' : 'bg-none'}`}
                                        onClick={() => toggleClicked(true)}
                                    >
                                        <IconList width={15} height={15} className={`${clicked ? ' fill-white font-semiBold hover:bg-red-800' : 'bg-none'}`} />
                                    </button>
                                </div>
                            </div>

                            <div className="left flex flex-row justify-center items-center gap-5">
                                <SearchBar />
                                <Button
                                    variant="filter"
                                    size="icon"
                                    className='w-[37px] h-[37px]  border border-neutral-200 flex items-center'>
                                    <FilterIcons fill="#CC0019" />
                                </Button>
                            </div>

                            <div className="left flex flex-row justify-center items-center gap-5">
                                <Button
                                    variant={deleteID.length > 0 ? "destructive" : "disable"}
                                    size="icon"
                                    onClick={() => setOpenDelete(true)}
                                    className={`px-2 py-2`}
                                    disabled={deleteID.length === 0}
                                >
                                    <DeleteIcons width={20} height={20} fill="#ffff" />
                                </Button>

                                <Button
                                    variant="destructive"
                                    className="h-10 px-10 text-xs flex flex-row justify-around items-center gap-2"
                                    onClick={toggleSelectNewAddress}

                                >
                                    <PlusIcon width={15} height={15} fontWeight={20} fill="#ffff" />
                                    <p className='text-sm font-semibold'>Add New</p>
                                </Button>
                            </div>
                        </div>

                    </div>
                    <div className={styles.item_container}>
                        <div className={`${styles.items} w-full flex flex-row gap-5 justify-center items-center`}>
                            {
                                isSkeleton ? (
                                    <>
                                        <SkeletonAddressBook />
                                        <SkeletonAddressBook />
                                        <SkeletonAddressBook />
                                    </>
                                ) : (
                                    savedAddress.map((item, i) => (
                                        <SavedAddressCard
                                            key={i}
                                            addressBook={item}
                                            select={toggleEditedAddress}
                                            onClick={handleCardSelected}
                                            isSelected={isPicked && selectedData?.my_address_id === item.my_address_id}
                                            variant={clicked ? 'list' : ""}
                                            setDeleteID={setDeleteID}
                                            deleteID={deleteID}
                                        />
                                    ))
                                )
                            }

                        </div>
                    </div>
                </div>

                <div className={styles.rightPanel}>
                    <div className={styles.rightPanelHeader}>
                        {renderMenus()}
                    </div>
                </div>
            </>
        </>
    )
}
