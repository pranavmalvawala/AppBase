import React from "react";
import { ApiHelper } from "../../helpers";
import { InputBox } from "../../components";
import { StripePaymentMethod, SubscriptionInterface } from "../../interfaces";
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { DonationHelper } from "../../helpers"

interface Props { subscriptionUpdated: (message?: string) => void, customerId: string, paymentMethods: StripePaymentMethod[], editSubscription: SubscriptionInterface };

export const RecurringDonationsEdit: React.FC<Props> = (props) => {
  const [editSubscription, setEditSubscription] = React.useState<SubscriptionInterface>(props.editSubscription);
  const [interval, setInterval] = React.useState("one_month");

  const handleCancel = () => { props.subscriptionUpdated(); }
  const handleSave = () => {
    let sub = { ...editSubscription } as SubscriptionInterface;
    const pmFound = props.paymentMethods.find((pm: StripePaymentMethod) => pm.id === sub.id);
    if (!pmFound) {
      let pm = props.paymentMethods[0];
      sub.default_payment_method = pm.type === "card" ? pm.id : null;
      sub.default_source = pm.type === "bank" ? pm.id : null;
    }
    ApiHelper.post("/subscriptions", [sub], "GivingApi").then(() => props.subscriptionUpdated("Recurring donation updated."))
  }

  const handleDelete = () => {
    const conf = window.confirm("Are you sure you want to delete this recurring donation?");
    if (!conf) return;
    let promises = [];
    promises.push(ApiHelper.delete("/subscriptions/" + props.editSubscription.id, "GivingApi"));
    promises.push(ApiHelper.delete("/subscriptionfunds/subscription/" + props.editSubscription.id, "GivingApi"));
    Promise.all(promises).then(() => props.subscriptionUpdated("Recurring donation canceled."));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    let sub = { ...editSubscription } as SubscriptionInterface;
    let value = e.target.value;
    switch (e.target.name) {
      case "method":
        let pm = props.paymentMethods.find((pm: StripePaymentMethod) => pm.id === value);
        sub.default_payment_method = pm.type === "card" ? value : null;
        sub.default_source = pm.type === "bank" ? value : null;
        break;
      case "interval": 
        setInterval(value);
        const inter = DonationHelper.getInterval(value);
        sub.plan.interval_count = inter.interval_count;
        sub.plan.interval = inter.interval;
        break;
    }
    setEditSubscription(sub);
  }

  const getFields = () => (
    <>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Method</InputLabel>
            <Select label="Method" name="method" aria-label="method" value={editSubscription.default_payment_method || editSubscription.default_source} className="capitalize" onChange={handleChange}>
              {props.paymentMethods.map((paymentMethod: any, i: number) => <MenuItem key={i} value={paymentMethod.id}>{paymentMethod.name} ****{paymentMethod.last4}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Frequency</InputLabel>
            <Select label="Frequency" name="interval" aria-label="interval" value={interval} onChange={handleChange}>
              <MenuItem value="one_week">Weekly</MenuItem>
              <MenuItem value="two_week">Bi-Weekly</MenuItem>
              <MenuItem value="one_month">Monthly</MenuItem>
              <MenuItem value="three_month">Quarterly</MenuItem>
              <MenuItem value="one_year">Annually</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )

  React.useEffect(() => {
    if (props.editSubscription) {
      const keyName = DonationHelper.getIntervalKeyName(props.editSubscription.plan.interval_count, props.editSubscription.plan.interval);
      setInterval(keyName);
    }
  }, [props.editSubscription]);

  return (
    <InputBox aria-label="person-details-box" headerIcon="person" headerText="Edit Recurring Donation" ariaLabelSave="save-button" ariaLabelDelete="delete-button" cancelFunction={handleCancel} deleteFunction={handleDelete} saveFunction={handleSave}>
      {getFields()}
    </InputBox>
  );
}
