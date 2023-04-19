import React, {useState} from 'react';
import './modal.css'

const Modal = ({title, onSave, open, setOpen, initialValue}) => {
    const [value, setValue] = useState(initialValue || {
        title: "",
        text: "",
        date_end: "",
        date_created: "",
        date_updated: "",
        likes: 0,
        dislike: 0
    });
    const [file, setFile] = useState(null);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setValue(prev => ({...prev, [name]: value}));
    };

    const handleSave = () => {
        onSave(value,file);
        setOpen(!open)
    };
    const selectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    }
    return open ? (
        <div className="modal-overlay">
            <div className="modal">
                <div className="box">
                    <span className="text-center">{title}</span>
                    <div className="input-container">
                        <input type="text" name="title" value={value.title} onChange={handleChange}/>
                        <label>Title</label>
                    </div>
                    <div className="input-container">
                        <input type="text" name="text" value={value.text} onChange={handleChange}/>
                        <label>Text</label>
                    </div>
                    <div className="input-container">
                        <input type="date" name="date_end" value={value.date_end} onChange={handleChange}/>
                        <label>Date End</label>
                    </div>
                    <div className="input-container">
                        <input type="file" name="file" onChange={selectFile}
                               accept="image/*,image/jpeg"/>
                    </div>
                    <div className="addFilm__btn">
                        <button type="button" className="btn" onClick={handleSave}>submit</button>
                        <button type="reset" className="btn" onClick={() => setOpen(!open)}>cancel</button>
                    </div>
                </div>
            </div>
        </div>
    ) : null
};

export default Modal;