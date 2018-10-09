import axios from 'axios';

import { MENTO_URL } from "./distribute_urls";

export const MEMO_POST_PROCESS = 'MEMO_POST_PROCESS';

const ROOT_URL = `${MENTO_URL}/stickyNote`;

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