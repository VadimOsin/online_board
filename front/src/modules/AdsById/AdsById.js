import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneByIdAds } from '../Board/axios/adsApi';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const AdsById = () => {
    const { id } = useParams();
    const [ads, setAds] = useState();

    // useEffect(() => {
    //     getOneByIdAds(id)
    //         .then(resp => setAds(resp))
    //         .catch(e => console.log(e));
    // }, []);

    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );

    const editor = React.useRef(null);

    function focusEditor() {
        editor.current.focus();
    }

    React.useEffect(() => {
        focusEditor()
    }, []);
    return (
        <div onClick={focusEditor}>
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={editorState => setEditorState(editorState)}
            />
        </div>
    );
};

export default AdsById;
