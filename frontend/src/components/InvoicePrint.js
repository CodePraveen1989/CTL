import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const InvoicePrint = (cartItems) => {
  const styles = StyleSheet.create({
    page: {
      padding: 50,
      paddingTop: 70,
    },
    container: {
      display: "flex",
      flexDirection: "row",
      width: "90%",
      marginBottom: 5,
    },
    image: {
      position: "absolute",
      top: 5,
      width: "100%",
    },

    table: {
      paddingLeft: 50,
      paddingRight: 50,
      paddingTop: 10,
      display: "table",
      width: "95%",
      borderStyle: "solid",
      borderWidth: 0,
    },
    tableItem: {
      paddingLeft: 50,
      paddingBottom: 5,
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 0,
    },

    tableItemChunk: {
      paddingLeft: 50,
      paddingBottom: 5,
      paddingTop: 30,
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 0,
    },

    tableBorder: {
      display: "table",
      width: "95%",
      borderStyle: "solid",
      borderWidth: 1,
      borderTop: 0,
      borderRight: 0,
    },
    tableBorderBottom: {
      flexDirection: "row",
      display: "table",
      width: "40%",
      borderStyle: "solid",
      borderWidth: 1,
      marginLeft: "55%",
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
      height: "auto",
      width: "100%",
    },
    tableRow1: {
      margin: "auto",
      flexDirection: "row",
      height: "auto",
      backgroundColor: "#D4CACA",
      width: "100%",
      borderBottomWidth: 1,
      borderTopWidth: 1,
    },
    tableRow2: {
      flexDirection: "row",
      height: "auto",
      width: "100%",
      borderBottomWidth: 1,
    },
    tableRowProducts: {
      flexDirection: "row",
      height: "30px",
      width: "100%",
    },
    tableOrder: {
      padding: 10,
      marginLeft: 30,
      display: "table",
      width: "90%",
      borderStyle: "solid",
      borderWidth: 1,
    },
    tableColHeader: {
      width: "33.33%",
      borderStyle: "solid",
      marginTop: 5,
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 15,
    },
    tableColHeaderSide: {
      float: "left",
      width: "25%",
      borderStyle: "solid",
      borderRightWidth: 1,
      fontSize: 15,
      fontWeight: "bold",
      paddingLeft: 5,
    },
    tableColHeaderCenter: {
      float: "left",
      width: "50%",
      borderStyle: "solid",
      borderRightWidth: 1,
      fontSize: 15,
      fontWeight: "bold",
      paddingLeft: 0,
    },
    tableColHeaderShort: {
      float: "left",
      width: "15%",
      borderStyle: "solid",
      borderRightWidth: 1,
      fontSize: 15,
      fontWeight: "bold",
      paddingLeft: 0,
    },
    tableColHeaderMedium: {
      float: "left",
      width: "15%",
      borderStyle: "solid",
      borderRightWidth: 1,
      fontSize: 15,
      fontWeight: "bold",
      paddingLeft: 0,
    },

    tableColImageHeader: {
      width: "50%",
      height: "80px",
      borderStyle: "solid",
      marginTop: 5,
      marginRight: 10,
      paddingRight: 10,
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 20,
    },

    tableColBill: {
      width: "50%",
      borderStyle: "solid",
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 10,
    },
    tableColBillItem: {
      borderStyle: "solid",
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 10,
      textAlign: "center",
      paddingTop: 5,
    },

    tableCellHeader: {
      width: "33%",
      paddingLeft: 5,
      fontSize: 10,
      borderRight: 1,
    },
    tableCellHeaderLeft: {
      width: "67%",
      paddingLeft: 5,
      fontSize: 10,
      borderRight: 1,
    },
    tableCellBill: {
      paddingLeft: 5,
      marginTop: 0,
      fontSize: 10,
    },
    tableCellBillBox: {
      paddingLeft: 5,
      marginTop: 5,
      fontSize: 10,
      height: "15px",
    },
    tableColOrderName: {
      width: "40%",
      borderStyle: "solid",
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableColOrder: {
      width: "20%",
      borderStyle: "solid",
      borderBottomWidth: 1,
    },
    tableCellOrderName: {
      margin: "auto",
      marginTop: 5,
      fontSize: 10,
    },
    tableCellOrder: {
      margin: "auto",
      marginTop: 5,
      fontSize: 10,
    },
    tableCell7day: {
      margin: 5,
      justifyContent: "right",
    },
  });

  const InvCartItems = cartItems.cartItems;
  const InvUserInfo = cartItems.userInfo;
  const InvAddress = cartItems.userAddress;
  var counter = 0;

  console.log("Invoice cartItems", cartItems, typeof cartItems);

  function splitArrayIntoChunks(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  function splitCartItems(InvCartItems) {
    const firstChunk = InvCartItems.slice(0, 8);
    const remainingItems = InvCartItems.slice(8);
    const chunks = splitArrayIntoChunks(remainingItems, 15);
    return [firstChunk, ...chunks];
  }

  const [firstItems, ...otherChunks] = splitCartItems(InvCartItems);

  return (
    <>
      <Document id={cartItems.invoiceNumber}>
        <Page style={styles.body} size="A4" orientation="landscape">
          {/* ******* header ******* */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColImageHeader}>
                <Image
                  style={styles.image}
                  src="https://res.cloudinary.com/dj2n5c46v/image/upload/v1675441255/CTL_jmb9kp.png"
                />
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellBill}>Perth</Text>
                <Text style={styles.tableCellBill}>T : 0475448299</Text>
                <Text style={styles.tableCellBill}>
                  E : sales@ctlservices.com.au
                </Text>
                <Text style={styles.tableCellBill}>
                  W : ctlaustralia.com.au
                </Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellBill}>Perth</Text>
                <Text style={styles.tableCellBill}>T : 0475448299</Text>
                <Text style={styles.tableCellBill}>
                  E : sales@ctlservices.com.au
                </Text>
                <Text style={styles.tableCellBill}>
                  W : ctlaustralia.com.au
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text>INVOICE #:</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>{cartItems.invoiceNumber} </Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>SLR PO #: {cartItems.purchaseNumber}</Text>
              </View>
            </View>
          </View>
          {/* ******* header ******* */}
          <View style={styles.tableItem}>
            <View style={styles.tableBorder}>
              <View style={styles.tableRow1}>
                <View style={styles.tableColHeaderSide}>
                  <Text style={styles.tableColBill}>Bill to:</Text>
                </View>
                <View style={styles.tableColHeaderCenter}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCellHeaderLeft}>
                      <Text>Despatch From: To:</Text>
                    </View>
                    <View style={styles.tableCellHeader}>
                      <Text>Page #</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.tableColHeaderSide}>
                  <Text style={styles.tableColBill}>Payable to:</Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableColHeaderSide}>
                  <Text style={styles.tableCellBill}>
                    {InvUserInfo.name} {InvUserInfo.lastName}{" "}
                  </Text>
                  <Text style={styles.tableCellBill}>
                    {InvAddress.location}{" "}
                  </Text>
                  <Text style={styles.tableCellBill}>{InvAddress.phone}</Text>
                  <Text style={styles.tableCellBill}>
                    {InvAddress.city} {InvAddress.state} {InvAddress.postCode}
                  </Text>
                </View>
                <View style={styles.tableColHeaderCenter}>
                  <View style={styles.tableRow2}>
                    <View style={styles.tableCellHeaderLeft}>
                      <View style={styles.tableCellBillBox}>
                        <Text>Perth</Text>
                      </View>
                    </View>
                    <View style={styles.tableCellHeader}>
                      <View style={styles.tableCellBillBox}>
                        <Text>Page 1</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.tableColHeaderSide}>
                  <Text style={styles.tableCellBill}>Josh Collions</Text>
                  <Text style={styles.tableCellBill}>CTL</Text>
                  <Text style={styles.tableCellBill}>
                    30 XXXX STREET, PERTH
                  </Text>
                  <Text style={styles.tableCellBill}>ABN:XXXXXX</Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableColHeaderSide}></View>
                <View style={styles.tableColHeaderCenter}>
                  <View style={styles.tableRow1}>
                    <View style={styles.tableCellHeaderLeft}>
                      <Text>Invoice Date</Text>
                    </View>
                    <View style={styles.tableCellHeaderLeft}>
                      <Text>Invoice Number</Text>
                    </View>
                    <View style={styles.tableCellHeader}>
                      <Text>Sales Order No.</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.tableColHeaderSide}></View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableColHeaderSide}></View>
                <View style={styles.tableColHeaderCenter}>
                  <View style={styles.tableRow2}>
                    <View style={styles.tableCellHeaderLeft}>
                      <View style={styles.tableCellBillBox}>
                        <Text>{cartItems.invoiceDate.split("T")[0]}</Text>
                      </View>
                    </View>
                    <View style={styles.tableCellHeaderLeft}>
                      <View style={styles.tableCellBillBox}>
                        <Text>{cartItems.invoiceNumber}</Text>
                      </View>
                    </View>
                    <View style={styles.tableCellHeader}>
                      <View style={styles.tableCellBillBox}>
                        <Text></Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.tableColHeaderSide}></View>
              </View>

              <View style={styles.tableRow1}>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableColBill}>Account</Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableColBill}>Delivery Date</Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableColBill}>Purchase Order No. </Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableColBill}>Carrier</Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableColHeaderSide}>
                  <Text style={styles.tableCellBillBox}>CTLAUS</Text>
                </View>
                <View style={styles.tableColHeaderSide}>
                  <Text style={styles.tableCellBillBox}>
                    {cartItems.invoiceDate.split("T")[0]}
                  </Text>
                </View>
                <View style={styles.tableColHeaderSide}>
                  <Text style={styles.tableCellBillBox}>
                    {cartItems.purchaseNumber}
                  </Text>
                </View>
                <View style={styles.tableColHeaderSide}>
                  <Text style={styles.tableCellBillBox}>6062</Text>
                </View>
              </View>
            </View>
          </View>
          {/* ******* Product List (first page) ******* */}
          <View style={styles.tableItem}>
            <View style={styles.tableBorder}>
              <View style={styles.tableRow1}>
                <View style={styles.tableColHeaderShort}>
                  <Text style={styles.tableColBillItem}>Item Code</Text>
                </View>
                <View style={styles.tableColHeaderCenter}>
                  <Text style={styles.tableColBillItem}>Item Description</Text>
                </View>
                <View style={styles.tableColHeaderShort}>
                  <Text style={styles.tableColBillItem}>Qty Order</Text>
                </View>
                <View style={styles.tableColHeaderShort}>
                  <Text style={styles.tableColBillItem}>Qty Supply</Text>
                </View>
                <View style={styles.tableColHeaderShort}>
                  <Text style={styles.tableColBillItem}>Unit Price</Text>
                </View>
                <View style={styles.tableColHeaderShort}>
                  <Text style={styles.tableColBillItem}>Net Amount</Text>
                </View>
                <View style={styles.tableColHeaderShort}>
                  <Text style={styles.tableColBillItem}>GST</Text>
                </View>
                <View style={styles.tableColHeaderSide}>
                  <Text style={styles.tableColBillItem}>Total Inc. GST</Text>
                </View>
              </View>
              {firstItems.map((item, idx) => {
                return (
                  <View style={styles.tableRowProducts} key={idx}>
                    <View style={styles.tableColHeaderShort}>
                      <Text style={styles.tableColBillItem}>{item.cartProducts[0].ctlsku}</Text>
                    </View>
                    <View style={styles.tableColHeaderCenter}>
                      <Text style={styles.tableColBillItem}>{item.name}</Text>
                    </View>
                    <View style={styles.tableColHeaderShort}>
                      <Text style={styles.tableColBillItem}>
                        {item.cartProducts[0].quantity}
                      </Text>
                    </View>
                    <View style={styles.tableColHeaderShort}>
                      <Text style={styles.tableColBillItem}>
                        {item.cartProducts[0].quantity}
                      </Text>
                    </View>
                    <View style={styles.tableColHeaderShort}>
                      <Text style={styles.tableColBillItem}>
                        ${item.cartProducts[0].price ? item.cartProducts[0].price.toLocaleString() : ''}
                      </Text>
                    </View>
                    <View style={styles.tableColHeaderShort}>
                      <Text style={styles.tableColBillItem}>
                        $ {item.cartProducts[0].price ? (item.cartProducts[0].price * item.cartProducts[0].quantity).toLocaleString() : ''}
                      </Text>
                    </View>
                    <View style={styles.tableColHeaderShort}>
                      <Text style={styles.tableColBillItem}>
                        ${" "}
                        {item.cartProducts[0].price ? (
                          (item.cartProducts[0].price * item.cartProducts[0].quantity * 10) /
                          100
                        ).toLocaleString() : ''}
                      </Text>
                    </View>
                    <View style={styles.tableColHeaderSide}>
                      <Text style={styles.tableColBillItem}>
                        ${" "}
                        {item.cartProducts[0].price ? (
                          item.cartProducts[0].price * item.cartProducts[0].quantity +
                          (item.cartProducts[0].price * item.cartProducts[0].quantity * 10) / 100
                        ).toLocaleString() : ''}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* bottom total price */}
          {otherChunks[0] ? (
            ""
          ) : (
            <>
              {" "}
              <View style={styles.tableBorderBottom}>
                <View style={styles.tableCellHeaderLeft}>
                  <Text style={styles.tableCellBillBox}>
                    Inv. Amount Excl. Tax
                  </Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableCellBillBox}>
                    $ {cartItems.cartSubtotal ? cartItems.cartSubtotal.toLocaleString() : ''}
                  </Text>
                </View>
              </View>
              <View style={styles.tableBorderBottom}>
                <View style={styles.tableCellHeaderLeft}>
                  <Text style={styles.tableCellBillBox}>Total GST</Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableCellBillBox}>
                    $ {cartItems.cartSubtotal ? (cartItems.cartSubtotal * 0.1).toLocaleString() : ''}
                  </Text>
                </View>
              </View>
              <View style={styles.tableBorderBottom}>
                <View style={styles.tableCellHeaderLeft}>
                  <Text style={styles.tableCellBillBox}>Invoice Amount</Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableCellBillBox}>
                    ${" "}
                    {cartItems.cartSubtotal ? (
                      cartItems.cartSubtotal * 0.1 +
                      cartItems.cartSubtotal
                    ).toLocaleString() : ''}
                  </Text>
                </View>
              </View>
            </>
          )}
        </Page>

        {/* ******* Product List (other pages) ******* */}
        {otherChunks.map((chunk, index) => (
          <React.Fragment key={index}>
            {chunk.length > 0 && (
              <Page style={styles.body} size="A4" orientation="landscape">
                <View style={styles.tableItemChunk}>
                  <View style={styles.tableBorder}>
                    <View style={styles.tableRow1}>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>Item Code</Text>
                      </View>
                      <View style={styles.tableColHeaderCenter}>
                        <Text style={styles.tableColBillItem}>
                          Item Description
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>Qty Order</Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>Qty Supply</Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>Unit Price</Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>Net Amount</Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>GST</Text>
                      </View>
                      <View style={styles.tableColHeaderSide}>
                        <Text style={styles.tableColBillItem}>
                          Total Inc. GST
                        </Text>
                      </View>
                    </View>
                    {chunk.map((item, idx) => {
                      return (
                        <View style={styles.tableRowProducts} key={idx}>
                          <View style={styles.tableColHeaderShort}>
                            <Text style={styles.tableColBillItem}>
                              {item.cartProducts[0].ctlsku}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderCenter}>
                            <Text style={styles.tableColBillItem}>
                              {item.name}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderShort}>
                            <Text style={styles.tableColBillItem}>
                              {item.cartProducts[0].quantity}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderShort}>
                            <Text style={styles.tableColBillItem}>
                              {item.cartProducts[0].quantity}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderShort}>
                            <Text style={styles.tableColBillItem}>
                              ${item.cartProducts[0].price ? item.cartProducts[0].price.toLocaleString() : ''}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderShort}>
                            <Text style={styles.tableColBillItem}>
                              $ {item.cartProducts[0].price ? (item.cartProducts[0].price * item.cartProducts[0].quantity).toLocaleString() : ''}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderShort}>
                            <Text style={styles.tableColBillItem}>
                              ${" "}
                              {item.cartProducts[0].price ? (
                                (item.cartProducts[0].price * item.cartProducts[0].quantity * 10) /
                                100
                              ).toLocaleString() : ''}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderSide}>
                            <Text style={styles.tableColBillItem}>
                              ${" "}
                              {item.cartProducts[0].price ? (
                                item.cartProducts[0].price * item.cartProducts[0].quantity +
                                (item.cartProducts[0].price * item.cartProducts[0].quantity * 10) / 100
                              ).toLocaleString() : ''}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>

                {/* show total price in last page */}
                {index === otherChunks.length - 1 && (
                  <>
                    <View style={styles.tableBorderBottom}>
                      <View style={styles.tableCellHeaderLeft}>
                        <Text style={styles.tableCellBillBox}>
                          Inv. Amount Excl. Tax
                        </Text>
                      </View>
                      <View style={styles.tableCellHeader}>
                        <Text style={styles.tableCellBillBox}>
                          $ {cartItems.cartSubtotal ? cartItems.cartSubtotal.toLocaleString() : ''}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableBorderBottom}>
                      <View style={styles.tableCellHeaderLeft}>
                        <Text style={styles.tableCellBillBox}>Total GST</Text>
                      </View>
                      <View style={styles.tableCellHeader}>
                        <Text style={styles.tableCellBillBox}>
                          $ {cartItems.cartSubtotal ? (cartItems.cartSubtotal * 0.1).toLocaleString() : ''}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableBorderBottom}>
                      <View style={styles.tableCellHeaderLeft}>
                        <Text style={styles.tableCellBillBox}>
                          Invoice Amount
                        </Text>
                      </View>
                      <View style={styles.tableCellHeader}>
                        <Text style={styles.tableCellBillBox}>
                          ${" "}
                          {cartItems.cartSubtotal ? (
                            cartItems.cartSubtotal * 0.1 +
                            cartItems.cartSubtotal
                          ).toLocaleString() : ''}
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              </Page>
            )}
          </React.Fragment>
        ))}
      </Document>
    </>
  );
};

export default InvoicePrint;
