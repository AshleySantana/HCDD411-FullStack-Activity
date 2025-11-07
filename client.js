const exhibits = new XMLHttpRequest();
exhibits.open("POST", "http://localhost:3000/api/exhibition", true);
// this is for deadlines 
exhibits.send(data)
//create and onload function that happens when ever I click the button 
//sending data to the jsor and honding it here
const list = document.querySelector("ul");
function addAListItem(text) {}

function addexhibit(){

}


export function addDeadline(data){
    const deadlines = new XMLHttpRequest();
deadlines.open("POST", "http://localhost:3000/api/exhibition", true);
// this is for deadlines 
deadlines.send(data)
}
