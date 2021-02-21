import CircularProgress from '@material-ui/core/CircularProgress'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((_theme: Theme) => createStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',

        "& span": {
            marginLeft: '10px'
        }
    }
}))


const LoadingBoundary = () => {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <CircularProgress />
            <span>Loading...</span>
        </div>
    )
}

export default LoadingBoundary