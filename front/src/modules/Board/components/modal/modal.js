import React, { useState } from 'react';
import { Modal, Button, TextField } from '@mui/material';
import './modal.css';

const CustomModal = ({ title, onSave, open, setOpen, initialValue }) => {
    const [value, setValue] = useState(
        initialValue || {
            title: '',
            text: '',
            date_end: '',
            date_created: '',
            date_updated: '',
            likes: 0,
            dislike: 0,
        }
    );
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(value, file);
        setOpen(!open);
    };

    const selectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <Modal open={open} onClose={() => setOpen(!open)}>
            <div className="modal-overlay">
                <div className="modal">
                    <div className="box">
                        <span className="text-center">{title}</span>
                        <div className="input-container">
                            <TextField
                                name="title"
                                label="Title"
                                value={value.title}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </div>
                        <div className="input-container">
                            <TextField
                                name="text"
                                label="Text"
                                value={value.text}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </div>
                        <div className="input-container">
                            <TextField
                                name="date_end"
                                type="date"
                                value={value.date_end}
                                onChange={handleChange}
                                fullWidth
                                required
                                inputProps={{ min: new Date().toISOString().split("T")[0] }}
                            />
                        </div>
                        <div className="input-container">
                            <TextField
                                type="file"
                                name="file"
                                onChange={selectFile}
                                accept="image/*,image/jpeg"
                                fullWidth
                                required
                            />
                        </div>
                        <div className="addFilm__btn">
                            <Button variant="contained" onClick={handleSave}>
                                Submit
                            </Button>
                            <Button variant="contained" onClick={() => setOpen(!open)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CustomModal;
