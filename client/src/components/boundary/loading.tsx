import CircularProgress from '@material-ui/core/CircularProgress'

const LoadingBoundary = () => {
    return (
        <>
            <CircularProgress />
            Loading...
        </>
    )
}

export default LoadingBoundary