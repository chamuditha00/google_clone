console.log('Hello from index.js!');
async function searchwiki(s){
    const endpoint = "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&prop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${s}"
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
    try{
        const results = await searchwiki(searchquery);
        console.log(results);
    } catch(err){
        console.log(err);

    }
}
const formsend = document.querySelector('.form1');
formsend.addEventListener('submit', submitsearch);