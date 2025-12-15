import React, { forwardRef, useId } from 'react'


const Input = forwardRef(({
    label,
    type = 'text',
    classes = '',
    ...props
}, ref) => {

    const id = useId();

    return (
        <div className='w-full'>
            {
                label && <label className='block text-sm font-medium text-slate-700 mb-1' htmlFor={id}>{label}</label>
            }

            <Input type={type}
        
                className={`w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${classes}`}
                {...props}
                ref={ref}
                id={id}
            />

        </div>
    )

});






export default Input