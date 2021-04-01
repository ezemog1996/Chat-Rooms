const handleInputChangeState = (e, state, setState) => {
    const name = e.target.name;
    let value;
    if (e.target.name === "profilePic") {
        value = e.target.files[0]
    } else {
        value = e.target.value
    }
    setState({
        ...state,
        [ name ]: value
    })
}

export default handleInputChangeState;