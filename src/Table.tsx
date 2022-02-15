import React, { useState } from 'react';

import db from './ForTable.json';

import {
    Checkbox,
    IconButton,
    Paper,
    Table as MUITable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import { ArrowDownward, ArrowUpward, CompareArrows } from '@mui/icons-material';


type TCurrent = 'up' | 'default' | 'down'
type Args = { [key: string]: any };

interface IData {
    id: number;
    email: string;
    first_name: string;
    pay_status: boolean;
    last_name: string;
    username: string;
    profile_link: string;
}


const Table = () => {

    const [ data, setData ] = useState<IData[]>(db);
    const [ sortField, setSortField ] = useState('');
    const [ sortType, setSortType ] = useState<TCurrent>('default');
    const [ search, setSearch ] = useState('');

    const tableHead = new Set(data.flatMap(Object.keys));

    const sortBy = (a: Args, b: Args, type: TCurrent): number => {
        switch (type) {
            case 'up':
                return a[sortField] > b[sortField] ? 1 : -1;
            case 'down':
                return b[sortField] > a[sortField] ? 1 : -1;

            default:
                return 0;
        }
    };


    const onSortTypeChange = () => {
        let nextSort = sortType;

        if (sortType === 'down') nextSort = 'up';
        else if (sortType === 'up') nextSort = 'default';
        else if (sortType === 'default') nextSort = 'down';

        setSortType(nextSort);
    };

    return (
        <>
            <TextField value={search} onChange={(event) => {
                setSearch(event.target.value);
                setData(data.filter(item => item.first_name.includes(search)));
            }} label="Search" variant="standard"/>

            <TableContainer component={Paper}>
                <MUITable sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            {Array.from(tableHead).map((key) => (
                                <TableCell key={key}>
                                    {key}
                                    <IconButton onClick={() => {
                                        setSortField(key);
                                        onSortTypeChange();
                                    }} sx={{ marginLeft: 0 }}>
                                        {key === sortField && sortType === 'up'
                                            ? <ArrowUpward/>
                                            : key === sortField && sortType === 'down'
                                                ? <ArrowDownward/>
                                                : <CompareArrows/>}
                                    </IconButton>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[ ...data ].sort((a, b) => sortBy(a, b, sortType)).map(({
                                                                                     id,
                                                                                     email,
                                                                                     first_name,
                                                                                     pay_status,
                                                                                     last_name,
                                                                                     username,
                                                                                     profile_link,
                                                                                 }) => (
                            <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">{id}</TableCell>
                                <TableCell align="left">{email}</TableCell>
                                <TableCell align="left">{first_name}</TableCell>
                                <TableCell align="center"><Checkbox value={pay_status}
                                                                    checked={pay_status}/></TableCell>
                                <TableCell align="left">{last_name}</TableCell>
                                <TableCell align="left">{username}</TableCell>
                                <TableCell align="left">{profile_link}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </MUITable>
            </TableContainer>
        </>
    );
};

export { Table };
