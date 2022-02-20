import React, { useState } from 'react';

import db from '../ForTable.json';

import { TableRowView } from './TableRowView';
import { Modal } from './Modal';

import {
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


type TSort = 'up' | 'default' | 'down'
type Args = { [key: string]: any };

export interface IData {
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
    const [ sortType, setSortType ] = useState<TSort>('default');
    const [ sortField, setSortField ] = useState('');
    const [ search, setSearch ] = useState('');
    const [ modalState, setModalState ] = useState({ isOpen: false, cellId: 0 });

    const tableHead = new Set(data.flatMap(Object.keys));

    const sortBy = (a: Args, b: Args, type: TSort): number => {
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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value.toLowerCase());
    };

    const handleOpen = (id: number) => setModalState({ isOpen: true, cellId: id });
    const handleClose = () => setModalState({ isOpen: false, cellId: 0 });

    return (
        <>
            <TextField sx={{ margin: '1rem' }}
                       value={search}
                       onChange={handleSearch}
                       label="Search"
                       variant="standard"/>

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
                        {[ ...data ].sort((a, b) => sortBy(a, b, sortType))
                            .filter(entry => Object.values(entry).toString().toLowerCase().indexOf(search) !== -1)
                            .map((cell) => (
                                <TableRow onClick={() => handleOpen(cell.id)}
                                          key={cell.id}
                                          sx={{ wordBreak: 'break-word', cursor: 'pointer' }}>
                                    <TableRowView  {...cell} />
                                </TableRow>
                            ))}
                    </TableBody>
                </MUITable>
            </TableContainer>

            <Modal modalState={modalState} onClose={handleClose} data={data} setData={setData}/>
        </>
    );
};

export { Table };
