
async function searchwiki(s){
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=pageImage|info&prop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${s}`
    const response = await fetch(endpoint);
    if(!response.ok){
        throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
}


async function submitsearch(event){
    event.preventDefault();
    const inputvalue = document.querySelector('.search').value;
    const searchquery = inputvalue.trim();
    const wordtosearch =document.querySelector('.results');
    wordtosearch.innerHTML = '';
    try{
        const results = await searchwiki(searchquery);
        console.log(results);
        if(results.query.searchinfo.totalhits === 0){
            alert('No results found. Try different keywords');
            return;
        }
        displayresult(results);
    } catch(err){
        console.log(err);
        alert('Failed to search');

    }
}
function displayresult(results){
    const wordtosearch = document.querySelector('.results');

    results.query.search.forEach(result => {   
        const url = 'https://en.wikipedia.org/?curid=${result.pageid}';
        const time = result.timestamp.substring(0,10); 
        wordtosearch.insertAdjacentHTML(
            'beforeend', 
            `<div class="card mb3">
            <h3>
            <a href="${url}" class="" rel="noopener">${result.title}</a></h3>
            <a href="${url}" class="text-secondary" rel="noopener">${time}</a>
            <span class="text-secondary">${result.snippet}</span>
            </div>`);

});
}
const formsend = document.querySelector('.form1');
formsend.addEventListener('submit', submitsearch);