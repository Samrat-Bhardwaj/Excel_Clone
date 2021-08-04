let leftCol = document.querySelector(".left_col");
let topRow = document.querySelector(".top_row");
let addressInput = document.querySelector(".address-input");
let g = document.querySelector(".grid");
let boldBtn = document.querySelector(".bold");
let ulBtn = document.querySelector(".underline");
let italicBtn = document.querySelector(".italic");
let fontFamily = document.querySelector(".font-family");
let textcolor = document.querySelector(".text-color");
let backgroundColor = document.querySelector(".backgroundcolor");

let alignmentContainer=document.querySelectorAll(".align-container>*");
let fontSizeBtn = document.querySelector(".font-size");
let center=document.querySelector(".center");
let alignBtn = document.querySelectorAll(".align-container");
let formulaBar=document.querySelector(".formula-input");

let rows = 100;
let cols = 26;

// for making left-column
for (let i = 0; i < rows; i++) {
  let colBox = document.createElement("div");
  colBox.innerText = i + 1;
  colBox.setAttribute("class", "box");
  leftCol.appendChild(colBox);
}

// making top row
for (let i = 0; i < cols; i++) {
  let cell = document.createElement("div");
  cell.innerText = String.fromCharCode(65 + i);

  cell.setAttribute("class", "cell");
  topRow.appendChild(cell);
}

// making the grid
for (let i = 0; i < rows; i++) {
  let row = document.createElement("div");
  row.setAttribute("class", "row");
  for (let j = 0; j < cols; j++) {
    let cell = document.createElement("div");
    // cell.innerText = `${String.fromCharCode(65 + j)} ${i+1}`;

    cell.setAttribute("class", "cell");
    cell.setAttribute("rid", i);
    cell.setAttribute("cid", j);
    cell.contentEditable = true;
    row.appendChild(cell);
  }
  g.appendChild(row);
}

// Adding sheet button 
let sheetArr =[]; //-> THIS IS THE WHOLE 3D CONTAINER WHICH CONTAINS SHEETS
let sheetDB; // -> Current Sheet

let btnContainer=document.querySelector(".add-btn-container");
let sheetList=document.querySelector(".sheet-list");
let firstSheet=document.querySelector(".sheet");
firstSheet.addEventListener("click",makeActive);

firstSheet.click();



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

    // making out first sheet
    createSheet();

    // intialising sheetDB 
    sheetDB=sheetArr[lastI];
    newSheet.addEventListener("click",makeActive);
})

function makeActive(e){
    let sheet=e.currentTarget;
        let allSheets=document.querySelectorAll(".sheet");
        for(let i=0; i<allSheets.length; i++){
            allSheets[i].classList.remove("active");
        }

        sheet.classList.add("active");

        // changing UI
        let idx=sheet.getAttribute("idx");
        if(!sheetArr[idx]){ // if it doesnt exist
          createSheet();
        }

        sheetDB=sheetArr[idx];
        setUi(); // function to change UI 
}

function createSheet(){
  let newDB = []; // making sheet DB which contains which cells have what properties
for (let i = 0; i < rows; i++) {
  let row = [];
  for (let j = 0; j < cols; j++) {
    let cell = {
      bold: "normal",
      italic: "normal",
      underlined: "normal",
      fontfamily:"sans-serif",
      align:"center",
      fontSize:8,
      value:"",
      formula:"",
      children : [],
      textColor:"#000000",
      backgroundColor:"#000000",

    };
    row.push(cell);
  }
  newDB.push(row);
}
sheetArr.push(newDB);
}

function setUi(){
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let elem = document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
        let value = sheetDB[i][j].value;
        elem.innerText = value;
    }
}
formulaBar.value="";
// allCells[0].click();// bug -> allcells upar ana chahiye
}


// event listeners to get address of cell which we clicked on
let allCells = document.querySelectorAll(".grid .cell");
for (let i = 0; i < allCells.length; i++) {
  allCells[i].addEventListener("click", function () {
    let rid = allCells[i].getAttribute("rid");
    let cid = allCells[i].getAttribute("cid");
    rid = Number(rid);
    cid = Number(cid);
    let address = `${String.fromCharCode(65 + cid)}${rid + 1}`;
    addressInput.value = address;

    let cellObject = sheetDB[rid][cid];
    if (cellObject.bold == "normal") {
      boldBtn.classList.remove("active");
    } else {
      boldBtn.classList.add("active");
    }

    if (cellObject.italic == "normal") {
      italicBtn.classList.remove("active");
    } else {
      italicBtn.classList.add("active");
    }

    if (cellObject.underlined == "normal") {
      ulBtn.classList.remove("active");
    } else {
      ulBtn.classList.add("active");
    }

    if(cellObject.formula){
      formulaBar.value=cellObject.formula;
    }else{
      formulaBar.value="";
    }
    let cell=getClickedCell();
    let cellObj=cellObject;
    let align=cellObj.align;
    
     if(align=="center"){
         for(let j=0;j<alignmentContainer.length;j++){
          alignmentContainer[j].classList.remove("active-btn");
         }
         center.classList.add("active-btn");
         cell.style.textAlign="center";
     }else if (align!="center"){
         for(let j=0;j<alignmentContainer.length;j++){
             if(align==alignmentContainer[j].classList[0]){
                 alignmentContainer[j].classList.add("active-btn");
                 cell.style.textAlign=align;
             }else{
                 alignmentContainer[j].classList.remove("active-btn");
                 center.classList.remove("active-btn");
             }
         }
     }
     if(cellObj.fontfamily!="sans-serif"){
      fontFamily.value=cellObj.fontfamily;
      cell.style.fontFamily=cellObj.fontFamily;
  }else{
      fontFamily.value="sans-serif";
      cell.style.fontFamily="sans-serif";
  }
  //text Color check
  if(cellObj.textColor!="#000000"){
      textcolor.value=cellObj.textColor;
      cell.style.color=cellObj.textColor;
  }else{
      textcolor.value="#000000";
      cell.style.color="#000000";
  }
  //background color check
  if(cellObj.backgroundColor!="#000000"){
      backgroundColor.value=cellObj.backgroundColor;
      cell.style.background=cellObj.textColor;
  }else{
      backgroundColor.value="#000000";
    //  cell.style.background="#000000";
  }
  });

  
}

// event listeners to change text styling of clicked cell
boldBtn.addEventListener("click", function () {
  let cell = getClickedCell();
  let rid = cell.getAttribute("rid");
  let cid = cell.getAttribute("cid");

  let cellObject = sheetDB[rid][cid];
  if (cellObject.bold == "normal") {
    cell.style.fontWeight="bold";
    boldBtn.classList.add("active");
    cellObject.bold="bold";
  } else {
    boldBtn.classList.remove("active");
    cell.style.fontWeight="normal";
    cellObject.bold="normal";
  }
});

ulBtn.addEventListener("click", function () {
  let cell = getClickedCell();
  let rid = cell.getAttribute("rid");
  let cid = cell.getAttribute("cid");
  let cellObject = sheetDB[rid][cid];
  if (cellObject.underlined == "normal") {
    cell.style.textDecoration = "underline";
    ulBtn.classList.add("active");
    cellObject.underlined="underline";
  } else {
    ulBtn.classList.remove("active");
    cell.style.textDecoration = "normal";
    cellObject.underlined="normal";
  }
});

italicBtn.addEventListener("click", function () {
  let cell = getClickedCell();
  cell.style.fontStyle = "italic";
  let rid = cell.getAttribute("rid");
  let cid = cell.getAttribute("cid");
  let cellObject = sheetDB[rid][cid];
  if (cellObject.italic == "normal") {
    cell.style.fontStyle = "italic";
    italicBtn.classList.add("active");
    cellObject.italic="italic";
  } else {
    italicBtn.classList.remove("active");
    cell.style.fontStyle = "normal";
    cellObject.italic="normal";
  }
});

textcolor.addEventListener("change",function(e){
  let color=e.target.value;
  let cell = getClickedCell();
  // cell.style.fontStyle = "italic";
  let rid = cell.getAttribute("rid");
  let cid = cell.getAttribute("cid");
  let cellObject = sheetDB[rid][cid];
  // console.log("okay",color,"as",cellObject.textColor);
  cellObject.textColor=color;
})

backgroundColor.addEventListener("change",function(e){
  let color=e.target.value;
  let uicellElement=getClickedCell();
  uicellElement.style.backgroundColor=color;
  let rid=uicellElement.getAttribute("rid");
 let cid=uicellElement.getAttribute("cid");
 let cellObj=sheetDB[rid][cid];
 cellObj.backgroundColor=color;
})

fontFamily.addEventListener("change",function(){
  let family=fontFamily.value;
  let uicellElement=getClickedCell();
  uicellElement.style.fontFamily=family;
  let rid=uicellElement.getAttribute("rid");
  let cid=uicellElement.getAttribute("cid");
  let cellObj=sheetDB[rid][cid];
  cellObj.fontfamily=family;
})

for(let i=0;i<alignmentContainer.length;i++){
  
  alignmentContainer[i].addEventListener("click",function(e){
    
      let align=e.currentTarget.classList[0];
     let uicellElement=getClickedCell();
     let rid=uicellElement.getAttribute("rid");
     let cid=uicellElement.getAttribute("cid");
     let cellObj=sheetDB[rid][cid];
     
     if(cellObj.align=="center"){
          if(align!="center"){
              for(let j=0;j<alignmentContainer.length;j++){
                  alignmentContainer[j].classList.remove("active");
              }
           //   center.classList.remove("active-btn");
              e.currentTarget.classList.add("active");
              cellObj.align=align;
              uicellElement.style.textAlign=align;
            
          }
     }else if(cellObj.align!="center"){
         if(cellObj.align==align){
             e.currentTarget.classList.remove("active");
             cellObj.align="center";
             uicellElement.style.textAlign="center";
             center.classList.add("active");
         }else if(align!=cellObj.align){
             
          for(let j=0;j<alignmentContainer.length;j++){
              alignmentContainer[j].classList.remove("active");
          }
        
         // center.classList.remove("active-btn");
          e.currentTarget.classList.add("active");
          cellObj.align=align;
          uicellElement.style.textAlign=align;
         }
     }
  })
  }

fontSizeBtn.addEventListener("change", function () {
  let value = fontSizeBtn.value;
  let cell = getClickedCell();
  cell.style.fontSize = value + "px";
});

for (let i = 0; i < alignBtn.length; i++) {
  alignBtn[i].addEventListener("click", function () {
    let cell = getClickedCell();
    // console.log(alignBtn[i].classList);
    cell.style.textAlign = alignBtn[i].classList[i];
  });
}

function getClickedCell() {
  let address = addressInput.value;
  let cid = Number(address.charCodeAt(0)) - 65;
  let rid = Number(address.slice(1)) - 1;
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  return cell;
}

// so that zeroth cell is clicked on loading
allCells[0].click();
