let leftCol = document.querySelector(".left_col");
let topRow = document.querySelector(".top_row");
let addressInput = document.querySelector(".address-input");
let g = document.querySelector(".grid");
let boldBtn = document.querySelector(".bold");
let ulBtn = document.querySelector(".underline");
let italicBtn = document.querySelector(".italic");

let fontSizeBtn = document.querySelector(".font-size");
let alignBtn = document.querySelectorAll(".align-container");

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

let sheetDB = []; // making sheet DB which contains which cells have what properties
for (let i = 0; i < rows; i++) {
  let row = [];
  for (let j = 0; j < cols; j++) {
    let cell = {
      bold: "normal",
      italic: "normal",
      underlined: "normal",
      leftAlign: "normal",
      centerAlign: "normal",
      rightAlign: "normal",
      fontSize:8,
    };
    row.push(cell);
  }
  sheetDB.push(row);
}

// event listeners to get address of cell which we clicked on
let allCells = document.querySelectorAll(".cell");
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

fontSizeBtn.addEventListener("change", function () {
  let value = fontSizeBtn.value;
  let cell = getClickedCell();
  cell.style.fontSize = value + "px";
});

for (let i = 0; i < alignBtn.length; i++) {
  alignBtn[i].addEventListener("click", function () {
    let cell = getClickedCell();
    console.log(alignBtn[i].classList);
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
