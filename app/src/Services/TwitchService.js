const userUrl = 'https://api.twitch.tv/helix/users';
const streamUrl = 'https://api.twitch.tv/helix/streams/'

const apiKey = '9c27waatgjpoiimk6kqfznabp0s2it';

function isStreaming(username) {
    return new Promise(function(resolve, reject) {
        const fullUrl = userUrl + '?login=' + username;

        fetch(fullUrl, {
            headers: {
                'client-id': apiKey,
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.length < 1) {
                reject(new Error('Invalid username'));
            } else {
                const id = data.data[0].id;
                const fullStreamUrl = streamUrl + '?user_id=' + id;

                fetch(fullStreamUrl, {
                    headers: {
                        'client-id': apiKey,
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.data === null || data.length < 1)
                        resolve(false);
                    else {
                        resolve({title: data.data[0].title, viewers: data.data[0].viewer_count, thumbnail: data.data[0].thumbnail_url.replace('{width}', '480').replace('{height}', '270')});
                    }
                })
                .catch((error) => reject(error));
            }
        })
        .catch((error) => reject(error));
    });
}

export {isStreaming};