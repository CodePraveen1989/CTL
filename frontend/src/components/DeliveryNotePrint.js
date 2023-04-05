import React from 'react';

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';


const DeliveryNotePrint = (cartItems) => {

    const styles = StyleSheet.create({
        page: {
            padding: 50,
            paddingTop: 70,
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
            width: '90%',
            marginBottom: 5
        },
        image: {
            position: "absolute",
            top: 10,
            width: "100%",
        },
        table: {
            padding: 50,
            paddingTop: 10,
            display: "table",
            width: "90%",
            borderStyle: "solid",
            borderWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0
        },
        tableRow: {
            margin: "auto",
            flexDirection: "row"
        },
        tableCol: {
            width: "25%",
            borderStyle: "solid",
            borderWidth: 0,
            borderLeftWidth: 0,
            borderTopWidth: 0,
        },
        tableCell: {
            margin: "auto",
            marginTop: 5,
            fontSize: 10
        },
        tableCol2: {
            width: "50%",
            borderStyle: "solid",
            borderWidth: 0,
            borderLeftWidth: 0,
            borderTopWidth: 0,
            fontSize: 15,
        },
        tableCell2: {
            paddingLeft: 5,
            marginTop: 5,
            fontSize: 12,
        },
        tableCol3: {
            width: "60%",
            borderStyle: "solid",
            marginTop: 10,
            borderWidth: 0,
            borderLeftWidth: 0,
            borderTopWidth: 0,
            fontSize: 25,
        },
        tableCell3: {
            paddingLeft: 5,
            marginBottom: 25,
            marginTop: 5,
            fontSize: 12,
        },
    });


    // 下面console.log('Invoice cartItems', cartItems, typeof cartItems);
    // 发现 返回的也是object，但是cartItems里面套了一个cartItems， 所以用InvCartItems解析一下，然后再map
    // 好奇怪，目前为止，userinfo he userAddress 都在 cartItems 被传过来了，所以 cartItems 其实是个合集，并不是仅仅一个array
    // 或者可以直接，用cartItems.XXXX 直接写到 {cartItems.XXXX}
    const DelCartItems = cartItems.cartItems
    const DelUserInfo = cartItems.userInfo
    const DelAddress = cartItems.userAddress





    console.log('DeliveryNote cartItems', cartItems, typeof cartItems);


    return (
        <>
            <Document id={cartItems.invoiceNumber}>
                <Page style={styles.body}>


                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol3}>
                                <Text style={styles.tableCol3}>Delivery Note #:</Text>
                            </View>
                            <View style={styles.tableCol2}>
                                <Image style={styles.image} src="https://res.cloudinary.com/dj2n5c46v/image/upload/v1675441255/CTL_jmb9kp.png" />
                            </View>
                        </View>


                        <View style={styles.tableRow}>
                            <View style={styles.tableCol3}>
                                <Text style={styles.tableCell3}>{cartItems.invoiceNumber} </Text>
                                <Text style={styles.tableCell3}>SLR PO #: {" "}{ cartItems.purchaseNumber}</Text>
                            </View>
                            <View style={styles.tableCol3}>
                            </View>

                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.tableCol2}>
                                <Text style={styles.tableCol2}>Delivery to:</Text>
                            </View>
                            <View style={styles.tableCol2}>
                                <Text style={styles.tableCol2}>Payable to:</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.tableCol2}>
                                <Text style={styles.tableCell2}>Customer Name</Text>
                                <Text style={styles.tableCell2}>location</Text>
                                <Text style={styles.tableCell2}>phone</Text>
                                <Text style={styles.tableCell2}>location Customer</Text>
                            </View>
                            <View style={styles.tableCol2}>
                                <Text style={styles.tableCell2}>Josh Collions</Text>
                                <Text style={styles.tableCell2}>CTL</Text>
                                <Text style={styles.tableCell2}>30 XXXX STREET, PERTH</Text>
                                <Text style={styles.tableCell2}>ABN:XXXXXX</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Product</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Quantity</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Price</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Total</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Checked</Text>
                            </View>
                            
                        </View>
                        {
                            DelCartItems.map((item, idx) => {
                                return (
                                    <View style={styles.tableRow} key={idx}>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{item.name}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{item.quantity}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>$ {item.price}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>$ {(item.price * item.quantity)}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>口</Text>
                                        </View>                                       
                                    </View>
                                )
                            })
                        }
                    </View>

                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Due Amount: $ {cartItems.cartSubtotal}</Text>
                    </View>
                </Page>
            </Document>
        </>
    );
};

export default DeliveryNotePrint;
