import React from 'react'

const DropdownField = (props) => {
    return (
        <select defaultValue='default' {...props}>
            <option disabled value='default'> --- i am an --- </option>
            <option value='user'>user</option>    
            <option value='admin'>admin</option>    
        </select>
    )
}

export default DropdownField
