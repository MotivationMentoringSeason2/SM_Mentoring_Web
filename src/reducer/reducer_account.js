

const INITIAL_STATE = {
    accessAccount : {
        principal : null, loading : false, error : null
    }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        default :
            return state;
    }
}