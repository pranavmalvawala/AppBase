import React from "react";
import { Stripe } from "@stripe/stripe-js";
import { Alert, Button, Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { InputBox, ErrorMessages } from "../../components";
import { FundDonations } from ".";
import { DonationPreviewModal } from "../modals/DonationPreviewModal";
import { ApiHelper, DateHelper } from "../../helpers";
import { PersonInterface, StripePaymentMethod, StripeDonationInterface, FundDonationInterface, FundInterface } from "../../interfaces";

interface Props { person: PersonInterface, customerId: string, paymentMethods: StripePaymentMethod[], stripePromise: Promise<Stripe>, donationSuccess: () => void }

export const DonationForm: React.FC<Props> = (props) => {
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [successMessage, setSuccessMessage] = React.useState<string>();
  const [fundDonations, setFundDonations] = React.useState<FundDonationInterface[]>();
  const [funds, setFunds] = React.useState<FundInterface[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [paymentMethodName, setPaymentMethodName] = React.useState<string>(`${props.paymentMethods[0].name} ****${props.paymentMethods[0].last4}`);
  const [donationType, setDonationType] = React.useState<string>();
  const [showDonationPreviewModal, setShowDonationPreviewModal] = React.useState<boolean>(false);
  const [donation, setDonation] = React.useState<StripeDonationInterface>({
    id: props.paymentMethods[0].id,
    type: props.paymentMethods[0].type,
    customerId: props.customerId,
    person: {
      id: props.person.id,
      email: props.person.contactInfo.email,
      name: props.person.name.display
    },
    amount: 0,
    billing_cycle_anchor: + new Date(),
    interval: {
      interval_count: 1,
      interval: "month"
    },
    funds: []
  });

  const loadData = () => {
    ApiHelper.get("/funds", "GivingApi").then(data => {
      setFunds(data);
      if (data.length) setFundDonations([{fundId: data[0].id}]);
    });
  }

  const handleKeyDown = (e: React.KeyboardEvent<any>) => { if (e.key === "Enter") { e.preventDefault(); handleSave(); } }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setErrorMessage(null);
    let d = { ...donation } as StripeDonationInterface;
    let value = e.target.value;
    switch (e.currentTarget.name) {
      case "method":
        d.id = value;
        let pm = props.paymentMethods.find(pm => pm.id === value);
        d.type = pm.type;
        setPaymentMethodName(`${pm.name} ****${pm.last4}`);
        break;
      case "type": setDonationType(value); break;
      case "date": d.billing_cycle_anchor = + new Date(value); break;
      case "interval-number": d.interval.interval_count = Number(value); break;
      case "interval-type": d.interval.interval = value; break;
      case "notes": d.notes = value; break;
    }
    setDonation(d);
  }

  const handleCancel = () => { setDonationType(null); }
  const handleSave = () => {
    if (donation.amount < .5) setErrorMessage("Donation amount must be greater than $0.50");
    else setShowDonationPreviewModal(true);
  }
  const handleDonationSelect = (type: string) => {
    let dt = donationType === type ? null : type;
    setDonationType(dt);
  }

  const makeDonation = async () => {
    let results;
    if (donationType === "once") results = await ApiHelper.post("/donate/charge/", donation, "GivingApi");
    if (donationType === "recurring") results = await ApiHelper.post("/donate/subscribe/", donation, "GivingApi");

    if (results?.status === "succeeded" || results?.status === "pending" || results?.status === "active") {
      setSuccessMessage("Donation successful!");
      setShowDonationPreviewModal(false);
      setDonationType(null);
      props.donationSuccess();
    }
    if (results?.raw?.message) {
      setShowDonationPreviewModal(false);
      setErrorMessage("Error: " + results?.raw?.message);
    }
  }

  const handleFundDonationsChange = (fd: FundDonationInterface[]) => {
    setErrorMessage(null);
    setFundDonations(fd);
    let totalAmount = 0;
    let selectedFunds: any = [];
    for (const fundDonation of fd) {
      totalAmount += fundDonation.amount || 0;
      let fund = funds.find((fund: FundInterface) => fund.id === fundDonation.fundId);
      selectedFunds.push({id: fundDonation.fundId, amount: fundDonation.amount || 0, name: fund.name});
    }
    let d = { ...donation };
    d.amount = totalAmount;
    d.funds = selectedFunds;
    setDonation(d);
    setTotal(totalAmount);
  }

  React.useEffect(loadData, [props.person?.id]);

  if (!funds.length) return null;
  else return (
    <>
      <DonationPreviewModal show={showDonationPreviewModal} onHide={() => setShowDonationPreviewModal(false)} handleDonate={makeDonation} donation={donation} donationType={donationType} paymentMethodName={paymentMethodName} funds={funds} />
      <InputBox id="donationBox" aria-label="donation-box" headerIcon="fas fa-hand-holding-usd" headerText="Donate" ariaLabelSave="save-button" cancelFunction={donationType ? handleCancel : undefined} saveFunction={donationType ? handleSave : undefined} saveText="Preview Donation">
        <Row>
          <Col>
            <Button aria-label="single-donation" size="sm" block style={{minHeight: "50px"}} variant={donationType === "once" ? "primary" : "light"} onClick={() => handleDonationSelect("once")}>Make a Donation</Button>
          </Col>
          <Col>
            <Button aria-label="recurring-donation" size="sm" block style={{minHeight: "50px"}} variant={donationType === "recurring" ? "primary" : "light"} onClick={() => handleDonationSelect("recurring")}>Make a Recurring Donation</Button>
          </Col>
        </Row>
        { successMessage && <Alert variant="success">{successMessage}</Alert> }
        { donationType
          && <div style={{marginTop: "20px"}}>
            <FormGroup>
              <FormLabel>Method</FormLabel>
              <FormControl as="select" name="method" aria-label="method" value={donation.id} className="capitalize" onChange={handleChange}>
                {props.paymentMethods.map((paymentMethod: any, i: number) => <option key={i} value={paymentMethod.id}>{paymentMethod.name} ****{paymentMethod.last4}</option>)}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>{donationType === "once" ? "Donation Date" : "Recurring Donation Start Date"}</FormLabel>
              <FormControl name="date" type="date" aria-label="date" min={DateHelper.formatHtml5Date(new Date())} value={DateHelper.formatHtml5Date(new Date(donation.billing_cycle_anchor))} onChange={handleChange} onKeyDown={handleKeyDown} />
            </FormGroup>
            {donationType === "recurring"
            && <Row>
              <Col>
                <FormGroup>
                  <FormLabel>Interval Number</FormLabel>
                  <FormControl name="interval-number" type="number" value={donation.interval.interval_count} aria-label="interval-number" min="1" step="1" onChange={handleChange} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>Interval Type</FormLabel>
                  <FormControl as="select" name="interval-type" aria-label="interval-type" value={donation.interval.interval} onChange={handleChange}>
                    <option value="day">Day(s)</option>
                    <option value="week">Week(s)</option>
                    <option value="month">Month(s)</option>
                    <option value="year">Year(s)</option>
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>
            }
            { funds && fundDonations
            && <FormGroup>
              <FormLabel>Fund</FormLabel>
              <FundDonations fundDonations={fundDonations} funds={funds} updatedFunction={handleFundDonationsChange} />
              { fundDonations.length > 1 && <p>Total Donation Amount: ${total}</p> }
            </FormGroup>
            }
            <div className="form-group">
              <label>Notes</label>
              <textarea className="form-control" aria-label="note" name="notes" value={donation.notes || ""} onChange={handleChange} onKeyDown={handleKeyDown}></textarea>
            </div>
            {errorMessage && <ErrorMessages errors={[errorMessage]}></ErrorMessages>}
          </div>
        }
      </InputBox>
    </>
  );
}
