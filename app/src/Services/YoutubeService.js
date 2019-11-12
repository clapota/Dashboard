const channelUrl = 'https://www.googleapis.com/youtube/v3/channels';
const commentThreadUrl = 'https://www.googleapis.com/youtube/v3/commentThreads';
const commentsUrl = 'https://www.googleapis.com/youtube/v3/comments';
const viewUrl = 'https://www.googleapis.com/youtube/v3/videos';

const apiKey = 'AIzaSyA6OihoMHEMZciRB6KonGj5g_sOfY8boFA';

function getSubscribers(username) {
    return new Promise(function(resolve, reject) {
        const fullUrl = channelUrl + '?key=' + apiKey + '&part=id,statistics&forUsername=' + username;
        fetch(fullUrl)
        .then(response => response.json())
        .then(data => {
                    if (data.pageInfo.totalResults > 0)
                        resolve(data.items[0].statistics.subscriberCount);
                    else
                        reject(new Error('failed'));
        })
        .catch(error => reject(error));
    });
}

function youtubeParseId(link) {
    if (link === undefined)
        return false;
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = link.match(regExp);
    return (match&&match[7].length===11) ? match[7] : false;
}

function getComment(videoLink, maxResult) {
    return new Promise(function(resolve, reject) {
        let id = youtubeParseId(videoLink);
        const fullUrlThread = commentThreadUrl + '?videoId=' + id + '&key=' + apiKey + '&part=id&maxResults=' + maxResult;
        fetch(fullUrlThread)
            .then((response) => response.json())
            .then(data => {
                let idString = '';
                if (data.pageInfo.totalResults < 1)
                    reject('error');
                else {
                    let items = data.items;
                    for (let item of items) {
                        idString += item.id + ',';
                    }
                    const fullUrlComment = commentsUrl + '?id=' + idString + '&key=' + apiKey + '&part=id,snippet';
                    fetch(fullUrlComment)
                    .then(response => response.json())
                    .then(data => 
                        resolve(data.items)
                    )
                    .catch(error => reject(error));
                }
            })
            .catch(error => reject(error));
    });
}

function getViews(videoLink) {
    return new Promise(function(resolve, reject) {
        const id = youtubeParseId(videoLink);
        if (id === false)
            return undefined;
        const fullUrl = viewUrl + '?key=' + apiKey + '&part=id,statistics,snippet&id=' + id;
        fetch(fullUrl)
        .then(response => response.json())
        .then(data =>  {
            console.log('JAIME LES NOIR ');
            if (data.pageInfo.totalResults < 1) {
                reject(new Error('no data'));
            }
            console.log('le zizi c\'est fantastique');
            resolve({views: data.items[0].statistics.viewCount,
                    videoName: data.items[0].snippet.title});
            }
        )
        .catch((err) => reject(err));
    })
}

export {getComment, getViews, getSubscribers};