import React from 'react';

import { IData } from '../Table';

import { Checkbox, TableCell, TableRow } from '@mui/material';


const TableBodyView = ({ id, email, first_name, pay_status, last_name, username, profile_link }: IData) => {
    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, wordBreak: 'break-word' }}>
            <TableCell align="left">{id}</TableCell>
            <TableCell align="left">{email}</TableCell>
            <TableCell align="left">{first_name}</TableCell>
            <TableCell align="center">
                <Checkbox checked={pay_status}/>
            </TableCell>
            <TableCell align="left">{last_name}</TableCell>
            <TableCell align="left">{username}</TableCell>
            <TableCell align="left">{profile_link}</TableCell>
        </TableRow>
    );
};


export { TableBodyView };