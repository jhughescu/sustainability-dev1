async function getLatestRelease(owner, repo) {
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
        return response.data.tag_name;
    } catch (error) {
        console.error('Error fetching latest release:', error);
        return null;
    }
}

const owner = 'jhughescu';
const repo = 'sustainability-dev1';

getLatestRelease(owner, repo)
    .then((releaseNumber) => {
        if (releaseNumber) {
            if (updateDebug) {
                updateDebug('release', releaseNumber);
            }
        }
    });
const loadTimestamp = function (url) {
//    console.log(url);
    const script = document.createElement('script');
    script.src = url;
    script.onload = function () {
        //        console.log('Second script loaded successfully.');
        // Additional logic after the second script is loaded
//        console.log('mpppp: ' + timestamp.datetime);
        updateDebug('timestamp', timestamp.datetime);
    };
    script.onerror = function () {
        console.error('Error loading second script.');
        // Additional error handling logic
    };
    document.head.appendChild(script);
}
loadTimestamp('tools/timestamp.js');
