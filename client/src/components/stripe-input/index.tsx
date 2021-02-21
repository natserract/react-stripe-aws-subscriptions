import React, { useRef, useImperativeHandle } from 'react'

const StripeInput = ({ component: Component, inputRef, ...other }: any) => {
    const elementRef: React.MutableRefObject<any> = useRef();
    useImperativeHandle(inputRef, () => ({
        focus: () => elementRef.current.focus
    }));

    return (
        <Component onReady={(element: undefined) => (elementRef.current = element)} {...other} />
    );
}

export default StripeInput