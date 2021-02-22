import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ProductCard from '../../components/card'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import styles from './styles'
import { useQuery, QueryObserverResult } from 'react-query'
import { ErrorBoundary, LoadingBoundary } from '../../components/boundary'
import Layout from '../../components/layout'
import StripeCheckout from "react-stripe-checkout";
import useErrorHandler from '../../hooks/useErrorHandler'
import { withToastManager } from "react-toast-notifications";
import { apiRequest } from '../../utils/api'
import { STRIPE_PUBLISHABLE_KEY } from '../../constants'

type StripeToken = {
    card: {};
    client_ip: string;
    created: number;
    email: string;
    id: string;
    object: string;
    type: string;
    used: boolean;
    livemode: boolean;
};

type ToastNotificationType = {
    add(message: string, { }): void;
};

type Props = {
    toastManager: ToastNotificationType;
};

const currencyFormatter = (input: number | bigint) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(input);
}

const useStyles = makeStyles(styles)

const Dashboard = ({ toastManager }: Props) => {
    const classes = useStyles()

    const { error: err, showError } = useErrorHandler(null);

    const { isLoading, error, data }: QueryObserverResult<any, any> = useQuery('viewAllProducts', () => Promise.all([
        fetch('http://localhost:3000/dev/products?limit=5').then(res =>
            res.json()
        ),

        fetch('http://localhost:3000/dev/prices?limit=5').then(res =>
            res.json()
        ),
    ]))

    /**
      * Toast notification
      * @param message - notification message to be displayed
      */
    const toastNotification = (message: string, type: 'success' | 'error') => {
        toastManager.add(message, {
            appearance: type,
            autoDismiss: true
        });
    };

    /**
   * Make request to AWS lambda function that handles creating
   * a customer and a subscription plan on stripe
   * @param token - token with stripe key and details entered in stripe form
   * @param productPlanId - id of the product plan the user is subscribing to
   */
    const subscribeToProductPlan = async (
        token: StripeToken,
        productPlanId: string
    ) => {
        const bodyParams = {
            source: token.id,
            email: token.email,
            productPlanId
        };

        try {
            const response = await apiRequest("http://localhost:3000/dev/subscribe-plan", "POST", bodyParams)
            toastNotification("Subscription successful", 'success');
            return response
        } catch (err) {
            showError(err.message);
        }
        
    };

    const RenderAction = ({ node, priceId }: any) => (
        <StripeCheckout
            name={node?.name}
            description={node?.description}
            token={token => subscribeToProductPlan(token, priceId)}
            billingAddress={true}
            zipCode={true}
            panelLabel="Subscribe"
            stripeKey={STRIPE_PUBLISHABLE_KEY}
        >
            <Button size="small" color="primary">Select This Plan</Button>
        </StripeCheckout>
    )


    if (isLoading) return <LoadingBoundary />
    if (error) return <ErrorBoundary error={error} />

    const RenderLists = () => {
        const { data: productNodes } = data[0]
        const { data: priceNode } = data[1]

        return productNodes && productNodes.map((productNode: typeof productNodes, index: number) => {
            return (
                <Grid key={productNode?.id} container spacing={3} >
                    <Grid item>
                        <ProductCard
                            media={productNode?.images[0]}
                            title={productNode?.name}
                            description={productNode?.description}
                            price={currencyFormatter(priceNode[index]?.unit_amount)}
                            renderAction={
                                <RenderAction
                                    node={productNode}
                                    priceId={priceNode[index].id}
                                />
                            }
                        />
                    </Grid>
                </Grid>
            )
        })
    }

    const RenderNotes = () => (
        <div className={classes.notes}>
            <p>Notes: Try the successful test card: 4242424242424242.</p>
            <p>Use any future expiry date, CVC, and 5 digit postal code.</p>
        </div>
    )

    return (
        <Layout>
            <RenderNotes />
            <Container maxWidth="md" classes={{
                root: classes.root
            }}>
                <RenderLists />
            </Container>
        </Layout>

    )
}
export default withToastManager(Dashboard)

