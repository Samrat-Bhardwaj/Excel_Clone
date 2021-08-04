let save = document.querySelector(".save");
let open = document.querySelector(".open");
let newSheet = document.querySelector(".new");

// changing excel into some json file(not reafable)
save.addEventListener("click", function () {
  // saving excel
  const data = JSON.stringify(sheetDB);

  // converting it to blob
  //The Blob object represents a blob, which is a file-like object of immutable,
  // raw data; they can be read as text or binary data, or converted into a 
  //ReadableStream so its methods can be used for processing the data. 
  //Blobs can represent data that isn't necessarily in a JavaScript-native format.

  const blob=new Blob([data],{type:`application/json`});

  const url=window.URL.createObjectURL(blob);
  let a=document.createElement("a");
  a.href=url;

  a.download="file.json";
  a.click();
});


open.addEventListener("change",function(){
    // we will get a file array 
    console.log("zjhb")
    let select=document.createElement("input");
    select.type="file";
    select.click();
        select.addEventListener("change",function(){
            let filesArr=select.files;
            let fileObj=filesArr[0];
            let fr=new FileReader(fileObj);
            fr.readAsText(fileObj);
            fr.onload=function(){
                  sheetArray=fr.result;
                  sheetArray=JSON.parse(sheetArray);
                  
                  let allsheets=document.querySelectorAll(".sheet");
               for(let i=1;i<allsheets.length;i++){
                    allsheets[i].remove();
                }
               let len=sheetArray.length-1;
                while(len!=0){
                    addBtn.click();
                    len--;
                }
                firstSheet.addEventListener("click",makeMeActive);
                firstSheet.click();
                
                  
              }
         })
})

newSheet.addEventListener("click",function(){
  let allsheets=document.querySelectorAll(".sheet");
  sheetArray=[];
   for(let i=1;i<allsheets.length;i++){
       allsheets[i].remove();
   }
   firstSheet.addEventListener("click",makeActive);
   firstSheet.click();
   let firstcell=document.querySelector(`.cell[rid="0"][cid="0"]`);
   firstcell.click();
});