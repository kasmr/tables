import React, { useState } from 'react';

import db from '../ForTable.json';

import { TableRowView } from './TableRowView';
import { ChangeRowModal } from './ChangeRowModal';
import { CreateRowModal } from './CreateRowModal';

import {
    Fab,
    IconButton,
    Paper,
    Table as MUITable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
} from '@mui/material';
import { Add, ArrowDownward, ArrowUpward, CompareArrows } from '@mui/icons-material';


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
    const [ changeModal, setChangeModal ] = useState({ isOpen: false, cellId: 0 });
    const [ createModal, setCreateModal ] = useState(false);

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

    const openChangeModal = (id: number) => setChangeModal({ isOpen: true, cellId: id });
    const closeChangeModal = () => setChangeModal({ isOpen: false, cellId: 0 });

    const openCreateModal = () => setCreateModal(true);
    const closeCreateModal = () => setCreateModal(false);

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
                                <Tooltip key={cell.id} placement="right-end" title="Click to edit" followCursor arrow>
                                    <TableRow onClick={() => openChangeModal(cell.id)}
                                              sx={{ wordBreak: 'break-word', cursor: 'pointer' }}>
                                        <TableRowView  {...cell} />
                                    </TableRow>
                                </Tooltip>
                            ))}
                    </TableBody>
                </MUITable>
            </TableContainer>

            <ChangeRowModal changeModal={changeModal} onClose={closeChangeModal} data={data} setData={setData}/>
            <CreateRowModal setData={setData} isOpen={createModal} onClose={closeCreateModal}/>

            <Tooltip title="Add new row" placement="top" arrow>
                <Fab onClick={openCreateModal}
                     sx={{ position: 'fixed', right: '3rem', bottom: '3rem' }}
                     color="primary">
                    <Add/>
                </Fab>
            </Tooltip>
        </>
    );
};

export { Table };
