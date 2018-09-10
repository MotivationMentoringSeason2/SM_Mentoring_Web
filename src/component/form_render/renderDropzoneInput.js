import React from 'react';
import Dropzone from 'react-dropzone';

import UploadIcon from '@material-ui/icons/CloudUpload';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

const renderDropzoneInput = (field) => {
    const files = field.input.value;
    const dropzoneStyle = {
        cursor : "pointer",
        width : window.innerWidth <= 420 ? '95%' : '60%'
    };
    return (
        <div>
            <Dropzone
                className="w3-panel w3-border w3-border-blue w3-pale-blue"
                name={field.name}
                onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
                accept={field.accept}
                style={dropzoneStyle}
                multiple={false}
            >
                <h6><UploadIcon /> 올리고 싶은 파일을 여기에 Drop 하세요. 클릭하면 탐색기를 열 수 있습니다.</h6>
            </Dropzone>
            <br/>
            {
                field.meta.error &&
                <span className="w3-tag w3-round-large w3-pale-red"><ReportProblemIcon /> {field.meta.error}</span>
            }
            {
                files && Array.isArray(files) && (
                    files.map((file, i) =>
                        <div className="w3-card-4" style={{width: '100%', width : window.innerWidth <= 420 ? '95%' : '60%'}} key={i}>
                            { file.type.includes('image') ? <img src={file.preview} style={{width: '100%'}} /> : ''}
                            <div className="w3-container w3-center">
                                <h3>{file.name}</h3>
                                <p>{file.size} bytes</p>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    );
};
export default renderDropzoneInput;