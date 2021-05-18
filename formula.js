for (let i = 0; i < allCells.length; i++) {
  allCells[i].addEventListener("blur", function () { // blur meaning when user is done inputing(leaving cell) in element then this event listener will be fired
    let value = allCells[i].innerText; //value from input
    let address = addressInput.value;

    
    let { rid, cid } = getValueOfRC(address);
    // agr value change hi nhi kri to return
    if(value==sheetDB[rid][cid].value){
      return;
    }

    // agr value dali kisi cell m vaha agr formula exist krta h to hatega vo
    if(sheetDB[rid][cid].formula){
      removeFormula(sheetDB[rid][cid],address);
      formulaBar.value="";
    }

    sheetDB[rid][cid].value = value;
    updateChildren(sheetDB[rid][cid]); // updating its children value
  });
}

// formula bar ka event listener
formulaBar.addEventListener("keypress", function (e) {
  if (e.key == "Enter" && formulaBar.value) {
    let currFormula = formulaBar.value;

    let v = evaluate(currFormula);
    let currCell=getClickedCell();

    // if we are changing the formula 
    if(currCell.formula && currFormula!=currCell.formula){
      removeFormula(currCell,addressInput.value);
    }

    setCell(v, currFormula);
    setParents(currFormula);

    // if formula changed to apan bhi to children jo change huye vo bhi update
    updateChildren(currCell);
  }
});

// function to set value and formula of clicked cell
function setCell(v, currFormula) {
  let address = addressInput.value;

  let cell = getClickedCell();
  cell.innerText = v;
  let { rid, cid } = getValueOfRC(address);
  sheetDB[rid][cid].value = v;
  sheetDB[rid][cid].formula = currFormula;
}

// to set parents of curr cell (which we got from formula)
function setParents(currFormula) {
  let arr = currFormula.split(" ");
  for (let i = 0; i < arr.length; i++) {
    let c = arr[i].charCodeAt(0); // if it starts from A-Z
    if (c >= 65 && c <= 90) {
      let { rid, cid } = getValueOfRC(arr[i]); // address nikala and then putted it in children array
      sheetDB[rid][cid].children.push(addressInput.value);
    }
  }
}

// to evaluate the Formula
function evaluate(currFormula) {
  let arr = currFormula.split(" ");
  for (let i = 0; i < arr.length; i++) {
    let c = arr[i].charCodeAt(0);
    if (c >= 65 && c <= 90) {
      let { rid, cid } = getValueOfRC(arr[i]);
      arr[i] = sheetDB[rid][cid].value;
    }
  }

  let newFormula = arr.join(" ");
  return eval(newFormula);
}


// dfs call to update every cell
function updateChildren(currCell) {
  let chArray = currCell.children;
 
  for (let i = 0; i < chArray.length; i++) {
    let childAddress = chArray[i];
    let { rid, cid } = getValueOfRC(childAddress);
    let v = evaluate(sheetDB[rid][cid].formula);
    // updating value
    sheetDB[rid][cid].value = v;
    let childCell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);

    childCell.innerText = v;
    updateChildren(sheetDB[rid][cid]);
  }
}

function removeFormula(cellObject, address){
  let currFormula=cellObject.formula;
  // removing parents 
  let arr = currFormula.split(" ");
  for (let i = 0; i < arr.length; i++) {
    let c = arr[i].charCodeAt(0); // if it starts from A-Z
    if (c >= 65 && c <= 90) {
      let { rid, cid } = getValueOfRC(arr[i]); // address nikala and then putted it in children array
      let idx=sheetDB[rid][cid].children.indexOf(address);
      sheetDB[rid][cid].children.splice(idx,1);
    }
  }

  //removing formula
  cellObject.formula="";
}

function getValueOfRC(address) {
  let cid = Number(address.charCodeAt(0)) - 65;
  let rid = Number(address.slice(1)) - 1;
  return { "rid": rid, "cid": cid };
}

function getClickedCell() {
  let address = addressInput.value;
  let cid = Number(address.charCodeAt(0)) - 65;
  let rid = Number(address.slice(1)) - 1;
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  return cell;
}
