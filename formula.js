// function to update data in DB from UI
for(let i=0; i<allCells.length; i++){
    allCells[i].addEventListener("blur",function(){ // blur meaning when user is done inputing(leaving cell) in element then this event listener will be fired
        let address = addressInput.value;
        let cell=getClickedCell();
        let {rid,cid} = getValueOfRC(address);
        sheetDB[rid][cid].value=cell.innerText;
        updateChildren(sheetDB[rid][cid]);
    })
}

// formula evaluating 
formulaBar.addEventListener("keydown",function(e){
    if(e.key=="Enter" && formulaBar.value){

        let currFormula=formulaBar.value;
        let v=evaluate(currFormula);

        setCell(v,currFormula);
        updateParents(currFormula);
    }
})


function evaluate(formula){
    // har ek element nikala, if it starts from A-Z we replace it with values
    let arr=formula.split(" ");
    for(let i=0; i<arr.length; i++){
        let c=arr[i].charCodeAt(0);
        if(c>=65 && c<=90){
            let {rid,cid}=getValueOfRC(arr[i]);
            arr[i]=sheetDB[rid][cid].value;
        }
    }

    let finalFormula=arr.join(" ");
    return eval(finalFormula);
}

function setCell(v,currformula){
    let cell=getClickedCell();
    cell.innerText=v;

    let {rid,cid} = getValueOfRC(addressInput.value);
    sheetDB[rid][cid].value=v;
    sheetDB[rid][cid].formula=currformula;
}

function updateParents(currFormula){
    let arr=currFormula.split(" ");
    
    for(let i=0; i<arr.length; i++){
        let c=arr[i].charCodeAt(0);
        if(c>=65 && c<=90){
            let {rid,cid}=getValueOfRC(arr[i]);
            // curr cell parents m add krva liye
            sheetDB[rid][cid].children.push(addressInput.value); 
        }
    }
}

function updateChildren(chObject){
    let chArray=chObject.children;
    if(chArray==undefined) return;
    for(let i=0; i<chArray.length; i++){
        let childAddress=chArray[i];

        let {rid,cid}=getValueOfRC(childAddress);
        let v=evaluate(sheetDB[rid][cid].formula);

        sheetDB[rid][cid]=v;
        // sheetDB[rid][cid].formula=sheetDB[rid][cid].formula;
        let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
        cell.innerText=v;
        updateChildren(sheetDB[rid][cid]);
    }
}
function getValueOfRC(address){
    let rid=Number(address.charCodeAt(0))-65;
    let cid=Number(address.slice(1)) - 1;
    return { "rid": rid, "cid": cid };
}

function getClickedCell() {
    let address = addressInput.value;
    let cid = Number(address.charCodeAt(0)) - 65;
    let rid = Number(address.slice(1)) - 1;
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    return cell;
}