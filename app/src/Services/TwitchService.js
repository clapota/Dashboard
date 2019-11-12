const userUrl = 'https://api.twitch.tv/helix/users';
const streamUrl = 'https://api.twitch.tv/helix/streams/'
const followUrl = 'https://api.twitch.tv/helix/users/follows'

const apiKey = '9c27waatgjpoiimk6kqfznabp0s2it';

function getId(username) {
    return new Promise(function(resolve, reject) {
        const fullUrl = userUrl + '?login=' + username;

        fetch(fullUrl, {
            headers: {
                'client-id': apiKey,
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.length < 1) {
                reject(new Error('invalid username'));
            } else {
                resolve(data.data[0].id);
            }
        })
        .catch((error) => reject(error));
    });
}

function isStreaming(username) {
    return new Promise(function(resolve, reject) {
        getId(username)
        .then((id) => {
            const fullStreamUrl = streamUrl + '?user_id=' + id;
            fetch(fullStreamUrl, {
                headers: {
                    'client-id': apiKey,
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.data === null || data.length < 1)
                    resolve(false);
                else {
                    resolve({title: data.data[0].title, viewers: data.data[0].viewer_count, thumbnail: data.data[0].thumbnail_url.replace('{width}', '480').replace('{height}', '270')});
                }
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
}

function getSubscribers(username) {
    return new Promise(function(resolve, reject) {
        getId(username)
        .then((id) => {
            const fullUrl = followUrl + '?to_id=' + id;
            
            fetch(fullUrl, {
                headers: {
                    'client-id': apiKey
                }
            })
            .then((response) => response.json())
            .then((data) => {
                resolve(data.total);
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    })
}

export {isStreaming, getSubscribers};