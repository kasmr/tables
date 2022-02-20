import React, { CSSProperties, Dispatch, SetStateAction, useLayoutEffect, useState } from 'react';

import { IData } from './Table';

import { Button, Checkbox, FormControlLabel, Modal as MUIModal, Paper, TextField, Typography } from '@mui/material';
import { ModalProps } from '@mui/material/Modal';
import { Edit } from '@mui/icons-material';


export const paperStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    minWidth: 400,
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
};

export const headingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
};

export const formStyle = {
    display: 'flex',
    flexDirection: 'column' as CSSProperties['flexDirection'],
    gap: '1rem',
};

interface Props {
    data: IData[];
    setData: Dispatch<SetStateAction<IData[]>>;
    changeModal: {
        isOpen: boolean;
        cellId: number;
    };
    onClose: ModalProps['onClose'];
}


const ChangeRowModal = ({ data, setData, changeModal, onClose }: Props) => {

    useLayoutEffect(() => {
        setRowData(getRowData);
    }, [ changeModal ]);

    const getRowData = changeModal.cellId && data.filter(row => row.id === changeModal.cellId)[0];

    const [ rowData, setRowData ] = useState<IData | 0>(0);

    const { id, email, first_name, pay_status, last_name, username, profile_link } = rowData as IData;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'pay_status') {
            setRowData({ ...rowData as IData, [event.target.name]: event.target.checked });
        } else {
            setRowData({ ...rowData as IData, [event.target.name]: event.target.value });
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setData(prevState => [ ...prevState ].map(row => row.id === id ? rowData as IData : row));
        onClose && onClose(event, 'escapeKeyDown');
    };

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        setData(prevState => [ ...prevState ].filter(row => row.id !== id));
        onClose && onClose(event, 'escapeKeyDown');
    };

    return (
        <MUIModal disableAutoFocus open={changeModal.isOpen} onClose={onClose}>
            <Paper sx={paperStyle}>
                <div style={headingStyle}>
                    <Typography component="h6" variant="h6">
                        Change row
                    </Typography>
                    <Edit color="primary" fontSize="small"/>
                </div>

                <form onSubmit={handleSubmit} style={formStyle}>
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
                    <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
                </form>
            </Paper>
        </MUIModal>
    );
};


export { ChangeRowModal };