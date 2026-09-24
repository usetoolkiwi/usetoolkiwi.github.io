(function(){
  var zone=TK.$("#drop"),input=TK.$("#file"),fmt=TK.$("#fmt"),list=TK.$("#results");
  TK.dropzone(zone,input,async function(files){
    list.innerHTML="";var t=fmt.value,e=t==="image/png"?"png":t==="image/webp"?"webp":"jpg";
    for(const f of files){
      var row=document.createElement("div");row.className="result";
      try{
        var img=await TK.loadImage(f),c=document.createElement("canvas");c.width=img.naturalWidth;c.height=img.naturalHeight;
        var x=c.getContext("2d");if(t==="image/jpeg"){x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);}x.drawImage(img,0,0);
        var b=await TK.canvasBlob(c,t,0.92),name=TK.baseName(f.name)+"."+e;
        row.innerHTML='<img alt=""><div class="meta"><div class="name"></div><div class="sub">'+TK.fmtBytes(f.size)+' → '+TK.fmtBytes(b.size)+'</div></div><button class="btn ghost">Download</button>';
        row.querySelector("img").src=img.src;row.querySelector(".name").textContent=name;
        row.querySelector("button").onclick=function(){TK.download(b,name);};
      }catch(err){row.innerHTML='<div class="err"></div>';row.firstChild.textContent=err.message+" (this browser may not support that format)";}
      list.appendChild(row);
    }
  });
})();
