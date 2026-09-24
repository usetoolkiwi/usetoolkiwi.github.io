(function(){
  var zone=TK.$("#drop"),input=TK.$("#file"),ul=TK.$("#files"),go=TK.$("#go"),msg=TK.$("#msg");
  var files=[];
  function draw(){
    ul.innerHTML="";files.forEach(function(f,i){
      var li=document.createElement("li");li.innerHTML='<b>'+(i+1)+'.</b><span></span><small class="note">'+TK.fmtBytes(f.size)+'</small><button title="Move up">↑</button><button title="Move down">↓</button><button title="Remove">✕</button>';
      li.querySelector("span").textContent=f.name;var b=li.querySelectorAll("button");
      b[0].onclick=function(){if(i>0){files.splice(i-1,0,files.splice(i,1)[0]);draw();}};
      b[1].onclick=function(){if(i<files.length-1){files.splice(i+1,0,files.splice(i,1)[0]);draw();}};
      b[2].onclick=function(){files.splice(i,1);draw();};ul.appendChild(li);
    });
    go.disabled=files.length<2;msg.textContent=files.length===1?"Add at least one more PDF to merge.":"";
  }
  TK.dropzone(zone,input,function(fs){fs.forEach(function(f){if(f.type==="application/pdf"||/\.pdf$/i.test(f.name))files.push(f);});draw();});
  go.onclick=async function(){
    go.disabled=true;msg.textContent="Merging…";
    try{
      var out=await PDFLib.PDFDocument.create();
      for(const f of files){
        var src=await PDFLib.PDFDocument.load(await f.arrayBuffer(),{ignoreEncryption:true});
        var pages=await out.copyPages(src,src.getPageIndices());pages.forEach(function(p){out.addPage(p);});
      }
      var bytes=await out.save();TK.download(new Blob([bytes],{type:"application/pdf"}),"merged.pdf");
      msg.textContent="Done — "+out.getPageCount()+" pages, "+TK.fmtBytes(bytes.length)+".";
    }catch(e){msg.innerHTML='<span class="err">Could not merge: '+e.message.replace(/</g,"&lt;")+'. Password-protected PDFs are not supported.</span>';}
    go.disabled=files.length<2;
  };
})();
