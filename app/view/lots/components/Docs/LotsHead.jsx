import React from 'react'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'
export const LotsHead = ({ data }) => {
    console.log("🚀 ~ LotsHead ~ data:", data)
    return (
        <View style={{ padding: '10px', fontFamily: 'Helvetica', }}>
            {/* Lots Head */}
            <View >
                <Image
                    src={'/logo.png'}
                    style={{ width: 100, height: 25, marginBottom: '10px' }}
                    alt="logo"
                />
                {/* <Text style={{ fontWeight: 'extrabold', fontSize: '14px' }}>Lot {data?.lots_id} Details</Text> */}

                {/* line */}
                <View style={{ borderBottom: '2px solid #000', marginBottom: '10px' }}></View>

                {/* Lot Details */}
                <View style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: 'flex-end' }}>
                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: "2px" }}>
                        <View style={{ display: 'flex', justifyContent: "flex-start", gap: '3px', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: '11px', width: '100px' }}>Lot ID </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: '11px' }}>:</Text>
                            <Text style={{ fontWeight: 'light', color: '#5A5A5A', fontSize: '11px' }}>{data?.lots_id}</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: "flex-start", gap: '3px', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: '11px', width: '100px' }}>Origin </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: '11px' }}>:</Text>
                            <Text style={{ fontWeight: 'light', color: '#5A5A5A', fontSize: '11px' }}>{data?.warehouse_origin_name} WH - {data?.country_name}</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: "flex-start", gap: '3px', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'extrabold', fontSize: '11px', width: '100px' }}>Destination</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: '11px' }}>:</Text>
                            <Text style={{ fontWeight: 'extrabold', color: '#5A5A5A', fontSize: '11px' }}>{data?.warehouse_destination_name} WH - {data?.destination_name}</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: "flex-start", gap: '3px', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'extrabold', fontSize: '11px', width: '100px' }}>Trip Number</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: '11px' }}>:</Text>
                            <Text style={{ fontWeight: 'extrabold', color: '#5A5A5A', fontSize: '11px' }}>{data?.trip_number}</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: "flex-start", gap: '3px', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'extrabold', fontSize: '11px', width: '100px' }}>Pickup Schedule</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: '11px' }}>:</Text>
                            <Text style={{ fontWeight: '500', color: '#5A5A5A', fontSize: '11px' }}>{data?.pickup_schedule}</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: "flex-start", gap: '3px', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'extrabold', fontSize: '11px', width: '100px' }}>Total Items</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: '11px' }}>:</Text>
                            <Text style={{ fontWeight: '500', color: '#5A5A5A', fontSize: '11px' }}>{data?.total_items}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
