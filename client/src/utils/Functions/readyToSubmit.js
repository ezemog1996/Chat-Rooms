const readyToSubmit = (inputs, inputLabels, setMissingFieldsMessage) => {
    let readyToSubmit = true;
    const missingFields = [];

    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            readyToSubmit = false;
            missingFields.push(inputLabels[i].textContent)
        }
    }

    if (!readyToSubmit) {
        setMissingFieldsMessage(function() {
            return (
                <div style={{marginTop: '20px', marginBottom: '10px'}}>
                    <div>Complete the following fields:</div>
                    <div style={{marginTop: '10px', color: 'red'}}>{missingFields.join(', ')}</div>
                </div>
                
            )
        })
    }

    return readyToSubmit;
}

export default readyToSubmit;