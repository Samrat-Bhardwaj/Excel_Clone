let btnContainer=document.querySelector(".add-btn-container");
let sheetList=document.querySelector(".sheet-list");
let firstSheet=document.querySelector(".sheet");
firstSheet.addEventListener("click",makeActive);

btnContainer.addEventListener("click",function(){

    let allSheets=document.querySelectorAll(".sheet");
    let lastSheet=allSheets[allSheets.length-1];

    let lastI=lastSheet.getAttribute("idx");
    lastI=Number(lastI);

    let newSheet=document.createElement("div");
    newSheet.setAttribute("class","sheet");
    newSheet.setAttribute("idx",`${lastI+1}`);
    newSheet.innerText=`Sheet ${lastI+2}`;

    sheetList.appendChild(newSheet);
    for(let i=0; i<sheetList.length; i++){
        allSheets[i].classList.remove("active");
    }

    // newSheet.classList.add("active");

    newSheet.addEventListener("click",makeActive);
})

function makeActive(e){
    let sheet=e.currentTarget;
        let allSheets=document.querySelectorAll(".sheet");
        for(let i=0; i<allSheets.length; i++){
            allSheets[i].classList.remove("active");
        }

        sheet.classList.add("active");
}