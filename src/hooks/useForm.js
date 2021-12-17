import {useState} from 'react'

export const useForm = (initialValues) => {
    const [fields, setValues ] = useState(initialValues)
    return [
        fields,
        event => {
            const {id, value} = event.target
            setValues({
                ...fields,
                [id]:value
            })
        }
    ]
}

