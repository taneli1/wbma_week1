import { useState } from 'react';

const useLoginForm = (callback) => {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (name, text) => {
        console.log('Name: ', name, ' Text: ', text);
        setInputs((inputs) => {
            return {
                ...inputs,
                [name]: text
            };
        });
    };
    return {
        handleInputChange,
        inputs
    };
};

export default useLoginForm;
