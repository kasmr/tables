import React, { Dispatch, SetStateAction, useState } from 'react';

import { IData } from './Table';
import { formStyle, headingStyle, paperStyle } from './ChangeRowModal';

import { ModalProps } from '@mui/material/Modal';
import { NoteAdd } from '@mui/icons-material';
import { Button, Checkbox, FormControlLabel, Modal as MUIModal, Paper, TextField, Typography } from '@mui/material';


interface Props {
    setData: Dispatch<SetStateAction<IData[]>>;
    isOpen: boolean;
    onClose: ModalProps['onClose'];
}

const CreateRowModal = ({ setData, isOpen, onClose }: Props) => {

    const getRandomNumber = () => Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);

    const rowDataObject = {
        id: getRandomNumber(),
        email: '',
        first_name: '',
        pay_status: false,
        last_name: '',
        username: '',
        profile_link: '',
    };

    const [ rowData, setRowData ] = useState<IData>(rowDataObject);

    const { email, first_name, pay_status, last_name, username, profile_link } = rowData;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'pay_status') {
            setRowData(prevState => ({ ...prevState, [event.target.name]: event.target.checked }));
        } else {
            setRowData(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setData(prevState => [ ...prevState, rowData ]);
        setRowData(rowDataObject);
        onClose && onClose(event, 'escapeKeyDown');
    };

    return (
        <MUIModal disableAutoFocus open={isOpen} onClose={onClose}>
            <Paper sx={paperStyle}>
                <div style={headingStyle}>
                    <Typography component="h6" variant="h6">
                        Create row
                    </Typography>
                    <NoteAdd color="primary" fontSize="small"/>
                </div>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <TextField name="email"
                               label="email"
                               value={email}
                               onChange={handleChange}
                               required
                               variant="standard"/>

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


export { CreateRowModal };