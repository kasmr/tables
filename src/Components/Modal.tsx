import React, { Dispatch, SetStateAction, useLayoutEffect, useState } from 'react';

import { IData } from './Table';

import { Button, Checkbox, FormControlLabel, Modal as MUIModal, Paper, TextField } from '@mui/material';
import { ModalProps } from '@mui/material/Modal';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    minWidth: 400,
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
};


interface Props {
    data: IData[];
    setData: Dispatch<SetStateAction<IData[]>>;
    modalState: {
        isOpen: boolean;
        cellId: number;
    };
    onClose: ModalProps['onClose'];
}


const Modal = ({ data, setData, modalState, onClose }: Props) => {

    useLayoutEffect(() => {
        setRowData(getRowData);
    }, [ modalState ]);

    const getRowData = modalState.cellId && data.filter(row => row.id === modalState.cellId)[0];

    const [ rowData, setRowData ] = useState<IData | 0>(0);

    const { id, email, first_name, pay_status, last_name, username, profile_link } = rowData as IData;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'pay_status') {
            setRowData({ ...rowData as IData, [event.target.name]: event.target.checked });
        } else {
            setRowData({ ...rowData as IData, [event.target.name]: event.target.value });
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setData(prevState => [ ...prevState ].map(data => data.id === id ? rowData as IData : data));
        onClose && onClose(event, 'escapeKeyDown');
    };

    return (
        <MUIModal disableAutoFocus open={modalState.isOpen} onClose={onClose}>
            <Paper sx={style}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <TextField name="email" label="email" value={email} onChange={handleChange} variant="standard"/>

                    <TextField name="first_name"
                               label="first name"
                               value={first_name}
                               onChange={handleChange}
                               variant="standard"/>

                    <FormControlLabel label="pay status" control={
                        <Checkbox name="pay_status" checked={pay_status} value={pay_status} onChange={handleChange}/>}/>

                    <TextField name="last_name"
                               label="last name "
                               value={last_name}
                               onChange={handleChange}
                               variant="standard"/>

                    <TextField name="username"
                               label="username"
                               value={username}
                               onChange={handleChange}
                               variant="standard"/>

                    <TextField name="profile_link"
                               label="profile link"
                               value={profile_link}
                               onChange={handleChange}
                               variant="standard"/>
                    <Button type="submit" variant="contained">Save</Button>
                </form>
            </Paper>
        </MUIModal>
    );
};


export { Modal };