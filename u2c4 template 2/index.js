// write js code here corresponding to index.html
// You should add submit event on the form
document.querySelector("#masaiForm").addEventListener("submit", myfunction)

function myfunction(){
    event.preventDefault();

    var arr = JSON.parse(localStorage.getItem("schedule")) || []

    var obj = {
        name:masaiForm.matchNum.value,
        team:masaiForm.teamA.value,
        teamb:masaiForm.teamB.value,
        date:masaiForm.date.value,
        venue:masaiForm.venue.value,

    }
    arr.push(obj);
    console.log(arr)
    localStorage.setItem("schedule",JSON.stringify(arr))
    window.location.href="matches.html"
}