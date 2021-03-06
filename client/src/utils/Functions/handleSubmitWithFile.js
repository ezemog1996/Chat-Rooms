import API from '../API';
import FormData from 'form-data';

const handleSubmitWithFile = (state, req) => {
    let data = new FormData()

    const stateKeys = Object.keys(state);

    stateKeys.forEach(item => {
        data.append(item, state[item])
    });

    return API[req](data);
}

export default handleSubmitWithFile;