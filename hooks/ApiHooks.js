import React, { useState, useEffect } from 'react';

const url = 'http://media.mw.metropolia.fi/wbma/media/';

const useLoadMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);

    const loadMedia = async () => {
        try {
            const posts = await fetch(url);
            const json = await posts.json();

            console.log(json);

            const data = await Promise.all(
                json.map(async (item) => {
                    const response = await fetch(url + item.file_id);
                    const rJson = response.json();

                    return rJson;
                })
            );
            setMediaArray(data);
        } catch (err) {
            console.log('loadmedia : ', err);
        }
    };

    useEffect(() => {
        loadMedia();
    }, []);

    return mediaArray;
};

export { useLoadMedia };
