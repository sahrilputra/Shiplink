'use client'
import React, { useEffect, useState } from 'react'
import styles from '../../styles.module.scss'
import { LotsDetailsTable } from '../../components/TransportTabled/LotsDetailsTable';
import axios from 'axios'
export default function LotsDetails({ params }) {
  const [isSkeleton, setIsSkeleton] = useState(true);
  const [open, setOpen] = useState(false);
  const lostId = params.slug
  const [query, setQuery] = useState({
    keyword: "",
    date_start: "",
    date_end: "",
    tracking_id: "",
    lots_id: params.slug,
    status: "",
    page: 1,
    limit: 10,
    index: 0,
  });


  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [rowTotalData, setRowTotalData] = useState({
    page_limit: 0,
    page_total: 0,
    total: 0
  })
  const handlerPaginationChange = (page) => {
    if (page >= 0) {
      console.log("🚀 ~ handlerPaginationChange ~ page:", page);
      setPagination(prevPagination => ({
        ...prevPagination,
        pageIndex: page,
      }));
      setQuery(prevQuery => ({
        ...prevQuery,
        page: page,
        index: page * prevQuery.limit
      }));
    }
  };

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `/api/admin/transport/lots/details`,
        query
      );
      console.log(response)
      const data = await response.data;
      setData(data.package_info);
      setRowTotalData({
        page_limit: data.page_limit,
        page_total: data.page_total,
        total: data.total
      });
      setPagination(prevPagination => ({
        ...prevPagination,
        pageSize: data.page_limit, // Menyesuaikan pageSize dengan nilai page_limit dari data
      }));
      setIsSkeleton(false);
    } catch (error) {
      setIsSkeleton(false);
      console.log('Error:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [query]);

  const reload = () => {
    setIsSkeleton(true);
    fetchData();
  }
  const handleSearchChange = (event) => {
    setQuery({
      ...query,
      keyword: event.target.value
    });
  };
  return (
    <>
      <div className={styles.carrier}>
        <div
          className={`${styles.carrier__container} flex flex-row justify-between items-center w-[100%]`}
        ></div>

        <div className={`${styles.listTable} flex flex-col gap-1`}>
          <LotsDetailsTable
            data={data}
            setOpen={setOpen}
            handleSearchChange={handleSearchChange}
            isSkeleton={isSkeleton}
            lostId={lostId}
            reload={reload}
            pagination={pagination}
            rowTotalData={rowTotalData}
            handlerPaginationChange={handlerPaginationChange}
            query={query}
            setPagination={setPagination}
          />
        </div>
      </div>
    </>
  );
}
