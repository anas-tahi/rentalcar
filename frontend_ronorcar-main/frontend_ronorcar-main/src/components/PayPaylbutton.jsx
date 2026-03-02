import React, { useEffect } from "react";
import axios from "axios";

const PayPalButton = () => {
  useEffect(() => {
    const loadPayPalScript = async () => {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=Aeupc8zj_gky1djJPbmkHcg1eIW1OethjI0QI_er2zbmieip5ZXemh0uSk59K4-jCeD8ZfxXw528-I64";
      script.async = true;
      script.onload = () => {
        window.paypal
          .Buttons({
            createOrder: async (data, actions) => {
              const res = await axios.post("/api/payment/create-order");
              return res.data.id;
            },
            onApprove: async (data, actions) => {
              const res = await axios.post("/api/payment/capture-order", {
                orderID: data.orderID,
              });
              alert("Transaction completed");
            },
          })
          .render("#paypal-button-container");
      };
      document.body.appendChild(script);
    };

    loadPayPalScript();
  }, []);

  return <div id="paypal-button-container"style={{
    display:"flex",
    justifyContent:"center",
    width:"200px",
  }}></div>;
};

export default PayPalButton;
