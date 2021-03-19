function removePreviousRepos(){
    var parent = document.getElementById('output-container');
    var repos = parent.querySelectorAll('.repo-container');
    if(repos.length > 0){
        for(var i = 0;i < repos.length;i++){
            parent.removeChild(repos[i]);
        }
    }
}

function showData(data) {
    var feedback = document.getElementById('empty');
    if (data.total_count != 0) {
        if (feedback.style.display != 'none') {
            feedback.style.display = 'none';
        }
        var items = data.items;
        items.forEach(item => {
            createAddRow(item);
        });
    } else {
        feedback.style.display = 'block';
        feedback.textContent = 'Nothing Found.';
        feedback.style.textShadow = '0 0 10px red';
    }
}

async function fetchRepos(values) {
    // values will be changed to object next
    // Fetching repos based on values[Later will be updated to hold more query values for more flexible search]
    
    removePreviousRepos();
    if (values) {
        if(window.fetch){
            var response = await fetch('https://api.github.com/search/repositories?q=topic:' + values);
            if(response.ok){
                var jsonData = await response.text();
                var data = await JSON.parse(jsonData);
                showData(data);
            }
        }else{
            var response = new Promise(function(resolve,reject){
                var xhr = null;
                if(window.XMLHttpRequest){
                    xhr = new XMLHttpRequest();
                }else{
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }
                xhr.open('GET','https://api.github.com/search/repositories?q=topic:' + values,true);

                xhr.onload = function(){
                    if(this.status == 200){
                        if(this.responseText){
                            resolve(this.responseText);
                        }else{
                            resolve(this.responseXML);
                        }
                    }
                }
                xhr.send();
            });

            response.then(function(jsonData){
                var data = await JSON.parse(jsonData);
                showData(data);
            });
        }
    }
}

function searchRepos(e) {
    e.preventDefault();
    var topicContainer = document.getElementById('repoTopic');
    if (topicContainer.value) {
        fetchRepos(topicContainer.value);
    } else {
        topicContainer.classList.add('alert');
    }
}


document.getElementById('repoSearch').addEventListener('submit', searchRepos);

document.getElementById('repoTopic').addEventListener('keyup', function () {
    document.getElementById('empty').textContent = 'Information about repositories will be shown here.';
    document.getElementById('empty').style.textShadow = '0 0 10px green';
    if (this.value) {
        this.classList.remove('alert');
    } else {
        this.classList.add('alert');
    }
});

document.getElementById('repoTopic').addEventListener('focusout', function () {
    this.classList.remove('alert');
    document.getElementById('empty').textContent = 'Information about repositories will be shown here.';
    document.getElementById('empty').style.textShadow = '0 0 10px green';
});

document.getElementById('repoTopic').addEventListener('focusin', function () {
    this.select();
});