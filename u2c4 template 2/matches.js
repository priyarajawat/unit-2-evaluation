// write js code here corresponding to matches.html
var mat = JSON.parse(localStorage.getItem("schedule")) || []

var arr = JSON.parse(localStorage.getItem("favourites")) || []

display(mat)

function display(data){
document.querySelector("tbody").innerHTML=""
    data.map(function (elem){
      

        var tr = document.createElement("tr")

        var td1 = document.createElement("td")
        td1.innerText = elem.name

        var td2 = document.createElement("td")
        td2.innerText = elem.team

        var td3 = document.createElement("td")
        td3.innerText = elem.teamb

        var td4 = document.createElement("td")
        td4.innerText = elem.date

        var td5 = document.createElement("td")
        td5.innerText = elem.venue

        var td6 = document.createElement("td")
        td6.innerText = "favourite"
        td6.style.color="orange"
        td6.addEventListener("click",function(){
            mychoice(elem)
        })

        tr.append(td1,td2,td3,td4,td5,td6)
        document.querySelector("tbody").append(tr)
    })
    
    
    function mychoice(elem){
        arr.push(elem)
        
        localStorage.setItem("favourites",JSON.stringify(arr))
    }
}