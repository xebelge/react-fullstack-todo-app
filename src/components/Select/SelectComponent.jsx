import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const SelectComponent = ({ id, menuItems, label, placeHolder, onChange, value }) => {
    return (
        <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id={id}
                value={value}
                label={label}
                placeholder={placeHolder}
                onChange={onChange}
            >
                {menuItems.map((item, index) => (
                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectComponent