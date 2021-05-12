let leftCol = document.querySelector(".left_col");
let topRow = document.querySelector(".top_row");
let addressInput=document.querySelector(".address-input");
let g=document.querySelector(".grid");
let boldBtn=document.querySelector(".bold");
let ulBtn=document.querySelector(".underline");
let italicBtn=document.querySelector(".italic");

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
  row.setAttribute("class","row");
  for (let j = 0; j < cols; j++) {
    let cell = document.createElement("div");
    // cell.innerText = `${String.fromCharCode(65 + j)} ${i+1}`;

    cell.setAttribute("class", "cell");
    cell.setAttribute("rid",i);
    cell.setAttribute("cid",j);
    cell.contentEditable=true;
    row.appendChild(cell);
  }
  g.appendChild(row);
}

// event listeners to get address of cell which we clicked on
let allCells = document.querySelectorAll(".cell");
for(let i=0; i<allCells.length; i++){
    allCells[i].addEventListener("click",function(){
        let rid=allCells[i].getAttribute("rid");
        let cid=allCells[i].getAttribute("cid");
        rid=Number(rid); cid=Number(cid);
        let address=`${String.fromCharCode(65 + cid)}${rid+1}`;
        
        addressInput.value=address;
    })
}

// event listeners to change text styling of clicked cell

boldBtn.addEventListener("click",function(){
  let cell=getClickedCell();
  cell.style.fontWeight="bold";
})

ulBtn.addEventListener("click",function(){
  let cell=getClickedCell();
  cell.style.textDecoration ="underline";
})

italicBtn.addEventListener("click",function(){
  let cell=getClickedCell();
  cell.style.fontStyle="italic";
})


function getClickedCell(){
  let address=addressInput.value;
  let cid = Number(address.charCodeAt(0)) - 65;
  let rid = Number(address.slice(1)) - 1;
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
  return cell;
}
// so that zeroth cell is clicked on loading
allCells[0].click();