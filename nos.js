let save = document.querySelector(".save");
let open = document.querySelector(".open");

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
    let filesArray=open.files;

    let fileObj=filesArray[0];

    let fr=new FileReader();

    fr.readAsText(fileObj);
    fr.onload=function(){
        console.log(fr.result)
    }
})
