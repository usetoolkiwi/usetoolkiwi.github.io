(function(){
  var zone=TK.$("#drop"),input=TK.$("#file"),W=TK.$("#w"),H=TK.$("#h"),lock=TK.$("#lock"),fmt=TK.$("#fmt"),go=TK.$("#go"),info=TK.$("#info"),prev=TK.$("#prev"),pct=TK.$("#pct");
  var img=null,file=null;
  TK.dropzone(zone,input,async function(fs){
    file=fs[0];if(!/^image\//.test(file.type)){info.innerHTML='<span class="err">Please choose an image file.</span>';return;}
    img=await TK.loadImage(file);W.value=img.naturalWidth;H.value=img.naturalHeight;
    prev.src=img.src;prev.hidden=false;go.disabled=false;
    info.textContent=file.name+" — original "+img.naturalWidth+" × "+img.naturalHeight+" px, "+TK.fmtBytes(file.size);
  });
  W.oninput=function(){if(img&&lock.checked)H.value=Math.round(W.value*img.naturalHeight/img.naturalWidth)||"";};
  H.oninput=function(){if(img&&lock.checked)W.value=Math.round(H.value*img.naturalWidth/img.naturalHeight)||"";};
  pct.onchange=function(){if(!img||!pct.value)return;var p=pct.value/100;W.value=Math.round(img.naturalWidth*p);H.value=Math.round(img.naturalHeight*p);pct.value="";};
  go.onclick=async function(){
    var w=+W.value,h=+H.value;if(!img||w<1||h<1||w>12000||h>12000){info.innerHTML='<span class="err">Enter a width and height between 1 and 12000 px.</span>';return;}
    var c=document.createElement("canvas");c.width=w;c.height=h;var x=c.getContext("2d");
    var t=fmt.value==="same"?(file.type==="image/png"?"image/png":file.type==="image/webp"?"image/webp":"image/jpeg"):fmt.value;
    if(t==="image/jpeg"){x.fillStyle="#fff";x.fillRect(0,0,w,h);}
    x.imageSmoothingQuality="high";x.drawImage(img,0,0,w,h);
    var b=await TK.canvasBlob(c,t,0.92),e=t==="image/png"?"png":t==="image/webp"?"webp":"jpg";
    TK.download(b,TK.baseName(file.name)+"-"+w+"x"+h+"."+e);
    info.textContent="Resized to "+w+" × "+h+" px — "+TK.fmtBytes(b.size);
  };
})();
