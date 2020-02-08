// import React from 'react';
// // import Stripe from 'stripe';

// class StripeComponent extends React.Component{

//   // "Stripe": {
//   //   "Publisher_Key": "pk_test_rmguZ1IdJrE01JOAs4bgz8Mj005tMPrNc3",
//   //   "Secret_Key": "sk_test_xfDDhm4xfIj80DUetzGm3nA900gMQt1gtL"
//   // }

//   componentDidMount () {
//     const script = document.createElement("script");

//     script.src = "https://js.stripe.com/v3/";
//     script.async = true;

//     document.body.appendChild(script);
//   }

//   processPayment = (checkoutSessionId) => {
//     var stripe = Stripe('pk_test_rmguZ1IdJrE01JOAs4bgz8Mj005tMPrNc3');

//     stripe.redirectToCheckout({
//       // Make the id field from the Checkout Session creation API response
//       // available to this file, so you can provide it as parameter here
//       // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
//       sessionId: checkoutSessionId
//     }).then(function (result) {
//       console.log(result);

//     }).catch(error => {
//       result.error.message;
//     })
//   }

//   render(){
//     return(
//       <h4>Stripe</h4>
//     )
//   }
// }

// export default StripeComponent;