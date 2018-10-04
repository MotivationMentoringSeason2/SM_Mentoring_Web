import axios from 'axios';


export const MEMO_POST_PROCESS = 'MEMO_POST_PROCESS';

const ROOT_URL = 'http://127.0.0.1:8082/MentoAPI/stickyNote';;

export function memoPostProcess(stickyNoteModel){
    const request = axios({
        method : 'post',
        url : `${ROOT_URL}/create`,
        data : stickyNoteModel
    });
    return {
        type : MEMO_POST_PROCESS,
        payload : request
    }
}