(function(){
  var zone=TK.$("#drop"),input=TK.$("#file"),ul=TK.$("#files"),go=TK.$("#go"),msg=TK.$("#msg"),ps=TK.$("#ps"),or=TK.$("#or"),mg=TK.$("#mg");
  var files=[];var SIZES={a4:[595.28,841.89],letter:[612,792]};
  function draw(){ul.innerHTML="";files.forEach(function(f,i){var li=document.createElement("li");
    li.innerHTML='<b>'+(i+1)+'.</b><span></span><button title="Move up">↑</button><button title="Move down">↓</button><button title="Remove">✕</button>';
    li.querySelector("span").textContent=f.name;var b=li.querySelectorAll("button");
    b[0].onclick=function(){if(i>0){files.splice(i-1,0,files.splice(i,1)[0]);draw();}};
    b[1].onclick=function(){if(i<files.length-1){files.splice(i+1,0,files.splice(i,1)[0]);draw();}};
    b[2].onclick=function(){files.splice(i,1);draw();};ul.appendChild(li);});go.disabled=!files.length;}
  TK.dropzone(zone,input,function(fs){fs.forEach(function(f){if(/^image\//.test(f.type))files.push(f);});draw();});
  go.onclick=async function(){
    go.disabled=true;msg.textContent="Creating PDF…";
    try{
      var pdf=await PDFLib.PDFDocument.create(),margin=+mg.value;
      for(const f of files){
        var img=await TK.loadImage(f),c=document.createElement("canvas");c.width=img.naturalWidth;c.height=img.naturalHeight;
        var x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(img,0,0);
        var jpg=await pdf.embedJpg(await (await TK.canvasBlob(c,"image/jpeg",0.92)).arrayBuffer());
        var pw,ph;
        if(ps.value==="fit"){pw=img.naturalWidth*0.75+2*margin;ph=img.naturalHeight*0.75+2*margin;}
        else{var s=SIZES[ps.value];var land=or.value==="landscape"||(or.value==="auto"&&img.naturalWidth>img.naturalHeight);pw=land?s[1]:s[0];ph=land?s[0]:s[1];}
        var aw=pw-2*margin,ah=ph-2*margin,k=Math.min(aw/jpg.width,ah/jpg.height),w=jpg.width*k,h=jpg.height*k;
        pdf.addPage([pw,ph]).drawImage(jpg,{x:(pw-w)/2,y:(ph-h)/2,width:w,height:h});
      }
      var bytes=await pdf.save();TK.download(new Blob([bytes],{type:"application/pdf"}),"images.pdf");
      msg.textContent="Done — "+files.length+" page(s), "+TK.fmtBytes(bytes.length)+".";
    }catch(e){msg.innerHTML='<span class="err">Something went wrong: '+e.message.replace(/</g,"&lt;")+'</span>';}
    go.disabled=!files.length;
  };
})();
