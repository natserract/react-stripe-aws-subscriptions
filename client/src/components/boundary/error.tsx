
interface IErrorProps {
    error: unknown
}

const ErrorBoundary = ({ error }: IErrorProps) => {
    return (
        <>
            {JSON.stringify(error)}
        </>
    )
}

export default ErrorBoundary