import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
function renderQuill({input, size, meta: { error}}) {
    const _quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }]
        ]
    }

    const _quillFormats = [
        "header",
        "bold", "italic", "underline", "strike", "blockquote", "code-block",
        "list", "script", "bullet", "indent", "direction", "size", "color", "background", "font", "align"
    ]

    return(
        <div className="w3-container" style={{ width : window.innerWidth <= 420 ? '95%' : '60%' }}>
            <ReactQuill
                theme='snow'
                {...input}
                modules={_quillModules}
                formats={_quillFormats}
                onChange={(newValue, delta, source) => {
                    if(source==='user'){
                        input.onChange(newValue);
                    }
                }}
                onBlur={(range, source, quill) => {
                    input.onBlur(quill.getHTML());
                }}
                style={{height : `${size}px`}}
            />
            <br/>
            {
                error &&
                <span className="w3-tag w3-round-large w3-pale-red"><ReportProblemIcon /> {error}</span>
            }
        </div>
    );
}
export default renderQuill;