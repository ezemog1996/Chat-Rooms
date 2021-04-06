import API from '../API';

const handleFormSubmit = (state, req) => {

    return API[req](state);
}

export default handleFormSubmit;