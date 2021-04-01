import API from '../API/API';
import FormData from 'form-data';

const handleFormSubmit = (state, req) => {
    let data = new FormData()

    const stateKeys = Object.keys(state);

    stateKeys.forEach(item => {
        data.append(item, state[item])
    });

    API[req](data)
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

export default handleFormSubmit;