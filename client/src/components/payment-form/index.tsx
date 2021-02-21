
import React, { useState, useCallback } from 'react';
import {
    TextField,
    Grid,
    Typography
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    CardCvcElement,
    CardNumberElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";
import StripeInput from '../stripe-input'
import { currencies } from './currencies.json'

const PaymentForm = () => {
    const [currencyState, setCurrencyState] = useState(null);
    const [amountState, setAmountState] = useState(null);

    const cardsLogo = [
        "amex",
        "cirrus",
        "diners",
        "dankort",
        "discover",
        "jcb",
        "maestro",
        "mastercard",
        "visa",
        "visaelectron",
    ];

    const handleChangeCurrency = useCallback((event, value) => {
        console.debug('event currency', event, value)
    }, [])

    const handleChangeAmount = useCallback((event) => {
        console.debug('event amount', event)
        // e.target.value.replace(/[^0-9,.]/g, '')
    }, [])

    return <>
        <Grid container item xs={12}>
            <Grid item xs={12} sm={3}>
                <Typography variant="h6">Payment Data</Typography>
            </Grid>
            <Grid container item xs={12} sm={9} justify="space-between">
                {cardsLogo.map(e => <img key={e} src={`./cards/${e}.png`} alt={e} width="50px" style={{ padding: "0 5px" }} />)}
            </Grid>
        </Grid>
        <Grid item xs={6} sm={3}>
            <Autocomplete
                options={currencies}
                getOptionLabel={(option: any) => option.code}
                renderOption={(option: any) => <>{option.name} ({option.code})</>}
                renderInput={(params: any) =>
                    <TextField
                        label="Currency"
                        name="currency"
                        variant="outlined"
                        fullWidth
                        {...params}
                    />
                }
                value={currencyState}
                onChange={(event, value) => handleChangeCurrency(event, value)}
            />
        </Grid>
        <Grid item xs={6} sm={3}>
            <TextField
                label="Amount"
                name="amount"
                variant="outlined"
                required
                fullWidth
                value={amountState}
                onChange={handleChangeAmount}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                label="Credit Card Number"
                name="ccnumber"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                    inputComponent: StripeInput,
                    inputProps: {
                        component: CardNumberElement
                    },
                }}
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
        <Grid item xs={6} sm={6}>
            <TextField
                label="Expiration Date"
                name="ccexp"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                    inputProps: {
                        component: CardExpiryElement
                    },
                    inputComponent: StripeInput
                }}
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
        <Grid item xs={6} sm={6}>
            <TextField
                label="CVC"
                name="cvc"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                    inputProps: {
                        component: CardCvcElement
                    },
                    inputComponent: StripeInput
                }}
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
    </>
}

export default PaymentForm;