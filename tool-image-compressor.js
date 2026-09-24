(function(){
  var zone=TK.$("#drop"),input=TK.$("#file"),q=TK.$("#q"),qv=TK.$("#qv"),fmt=TK.$("#fmt"),list=TK.$("#results"),allBtn=TK.$("#all"),sum=TK.$("#summary");
  var outs=[];
  q.oninput=function(){qv.textContent=q.value+"%";};
  function outType(f){var v=fmt.value;if(v!=="same")return v;return f.type==="image/png"?"image/png":(f.type==="image/webp"?"image/webp":"image/jpeg");}
  function ext(t){return t==="image/png"?"png":t==="image/webp"?"webp":"jpg";}
  async function run(files){
    files=files.filter(function(f){return /^image\/(jpeg|png|webp)$/.test(f.type);});
    if(!files.length){sum.innerHTML='<span class="err">Please choose JPG, PNG or WebP images.</span>';return;}
    list.innerHTML="";outs=[];var before=0,after=0;
    for(const f of files){
      try{
        var img=await TK.loadImage(f),c=document.createElement("canvas");
        c.width=img.naturalWidth;c.height=img.naturalHeight;var x=c.getContext("2d");
        var t=outType(f);if(t==="image/jpeg"){x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);}
        x.drawImage(img,0,0);
        var b=await TK.canvasBlob(c,t,q.value/100);
        if(b.size>=f.size&&t===f.type){b=f;}          // never make a file bigger
        var name=TK.baseName(f.name)+"-compressed."+ext(t);outs.push({b:b,name:name});
        before+=f.size;after+=b.size;
        var pct=Math.max(0,Math.round((1-b.size/f.size)*100));
        var row=document.createElement("div");row.className="result";
        row.innerHTML='<img alt=""><div class="meta"><div class="name"></div><div class="sub">'+TK.fmtBytes(f.size)+' → '+TK.fmtBytes(b.size)+' '+(pct>0?'<span class="save">−'+pct+'%</span>':'<span class="note">already optimised — try WebP</span>')+'</div></div><button class="btn ghost">Download</button>';
        row.querySelector("img").src=img.src;row.querySelector(".name").textContent=name;
        (function(o){row.querySelector("button").onclick=function(){TK.download(o.b,o.name);};})(outs[outs.length-1]);
        list.appendChild(row);
      }catch(e){var er=document.createElement("div");er.className="err";er.textContent=e.message;list.appendChild(er);}
    }
    sum.innerHTML=outs.length?'<b>'+outs.length+' image(s)</b> — total '+TK.fmtBytes(before)+' → '+TK.fmtBytes(after)+' <span class="save">(saved '+Math.max(0,Math.round((1-after/before)*100))+'%)</span>':"";
    allBtn.disabled=outs.length<2;
  }
  allBtn.onclick=function(){outs.forEach(function(o,i){setTimeout(function(){TK.download(o.b,o.name);},i*350);});};
  TK.dropzone(zone,input,run);
})();
