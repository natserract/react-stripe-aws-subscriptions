import { makeStyles } from '@material-ui/core/styles'
import ProductCard from '../../components/card'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styles from './styles'
import { useQuery } from 'react-query'
import { ErrorBoundary, LoadingBoundary } from '../../components/boundary'

const useStyles = makeStyles(styles)

const Subscribe = () => {
    const classes = useStyles()

    const { isLoading, error, data } = useQuery('viewAllPrices', () =>
        fetch('http://localhost:3000/dev/prices?limit=3').then(res =>
            res.json()
        )
    )

    if (isLoading) return <LoadingBoundary />
    if (error) return <ErrorBoundary error={error} />

    return (
        <Container maxWidth="md" classes={{
            root: classes.root
        }}>
            { JSON.stringify(data) }
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <ProductCard />
                </Grid>
                <Grid item xs={4}>
                    <ProductCard />
                </Grid>
                <Grid item xs={4}>
                    <ProductCard />
                </Grid>
            </Grid>
        </Container>
    )
}
export default Subscribe