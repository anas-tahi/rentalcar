// paypalClient.js
import paypal from '@paypal/checkout-server-sdk';

// Creating an environment
let clientId = "Aeupc8zj_gky1djJPbmkHcg1eIW1OethjI0QI_er2zbmieip5ZXemh0uSk59K4-jCeD8ZfxXw528-I64";
let clientSecret = "EISV5AKyLcWNyymRvM0rj7Z-gWUMsolsgnW-Vszq2ckLCFEQUT2Q1qJPApXtAn7IiahwiHGWHUPPvPDv";

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default  client ;
