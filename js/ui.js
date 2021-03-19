// Build individual row of repository
function createAddRow(item) {
    var parent = document.getElementById('output-container');
    var container = document.createElement('div');
    container.classList.add('col-12','repo-container');

    // For repo name
    var nameContainer = document.createElement('div');
    nameContainer.classList.add('col-2','repos');
    nameContainer.textContent = item.name;
    container.appendChild(nameContainer);

    // For repo description
    var descContainer = document.createElement('div');
    descContainer.classList.add('col-3','repos');
    descContainer.textContent = item.description;
    container.appendChild(descContainer);
    
    // For owner name
    var ownerContainer = document.createElement('div');
    ownerContainer.classList.add('col-2','repos');
    ownerContainer.textContent = item.owner.login;
    container.appendChild(ownerContainer);

    // For Language
    var languageContainer = document.createElement('div');
    languageContainer.classList.add('col-1','repos');
    languageContainer.textContent = item.language;
    container.appendChild(languageContainer);
    
    // For forks
    var forksContainer = document.createElement('div');
    forksContainer.classList.add('col-1','repos');
    forksContainer.textContent = item.forks;
    container.appendChild(forksContainer);
    
    
    // For created at
    var createdContainer = document.createElement('div');
    createdContainer.classList.add('col-1','repos');
    var created = new Date(item.created_at);
    var createdStr = created.getFullYear()+"-";//+"-"+created.getDate();
    createdStr += ((created.getMonth()+1) >= 10) ? (created.getMonth()+1) : '0'+(created.getMonth()+1);
    createdStr += (created.getDate() >= 10) ? '-'+created.getDate() : '-0'+created.getDate();
    createdContainer.textContent = createdStr;
    container.appendChild(createdContainer);

    // For updated at
    var updatedContainer = document.createElement('div');
    updatedContainer.classList.add('col-1','repos');
    var updated = new Date(item.updated_at);
    var updatedStr = updated.getFullYear()+"-";//+"-"+created.getDate();
    updatedStr += ((updated.getMonth()+1) >= 10) ? (updated.getMonth()+1) : '0'+(updated.getMonth()+1);
    updatedStr += (updated.getDate() >= 10) ? '-'+updated.getDate() : '-0'+updated.getDate();
    updatedContainer.textContent = updatedStr;
    container.appendChild(updatedContainer);
    
    // For link
    var linkContainer = document.createElement('div');
    linkContainer.classList.add('col-1','repos');
    var link = document.createElement('a');
    link.classList.add('goto');
    link.href = item.html_url;
    link.target = '_blank'
    link.innerHTML = '&#62;';
    linkContainer.appendChild(link);
    container.appendChild(linkContainer);


    parent.appendChild(container);
}