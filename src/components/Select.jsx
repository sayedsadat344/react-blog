import React, { forwardRef, useId } from 'react'

function Select({
    options,
    label,
    classes = '',
    ...props
}, ref) {


    const id = useId();

    return (
        <div className='w-full'>
            {
                label && <label className='block text-sm font-medium text-slate-700 mb-1' htmlFor={id}>{label}</label>
            }


            <select
                className={`w-full px-4 py-2 rounded-lg border border-slate-300 bg-white
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 ${classes}`}
                defaultValue="" id={id} ref={ref} {...props}
            >
                <option value="" disabled>
                    Select an option
                </option>

                {
                    options?.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))
                }

                
            </select>
        </div>
    )
}

export default forwardRef(Select)