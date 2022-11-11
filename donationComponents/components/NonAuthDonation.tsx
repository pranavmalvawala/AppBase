import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import React from "react";
import { ApiHelper } from "../../helpers";
import { NonAuthDonationInner } from "./NonAuthDonationInner";

interface Props { churchId: string }

export const NonAuthDonation: React.FC<Props> = (props) => {
  const [stripePromise, setStripe] = React.useState<Promise<Stripe>>(null);

  const init = () => {
    ApiHelper.get("/gateways/churchId/" + props.churchId, "GivingApi").then(data => {
      if (data.length && data[0]?.publicKey) {
        setStripe(loadStripe(data[0].publicKey));
      }
    });
  }

  React.useEffect(init, []); //eslint-disable-line

  return (
    <Elements stripe={stripePromise}>
      <NonAuthDonationInner churchId={props.churchId} />
    </Elements>
  );
}

