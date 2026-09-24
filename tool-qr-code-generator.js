(function(){
  qrcode.stringToBytes=qrcode.stringToBytesFuncs["UTF-8"];
  var txt=TK.$("#txt"),size=TK.$("#size"),fg=TK.$("#fg"),bg=TK.$("#bg"),ecl=TK.$("#ecl"),box=TK.$("#qr"),png=TK.$("#png"),svg=TK.$("#svg"),msg=TK.$("#msg");
  var qr=null;
  function make(){
    var v=txt.value.trim();png.disabled=svg.disabled=!v;
    if(!v){box.innerHTML='<span class="note" style="color:#5b6478">Your QR code will appear here</span>';qr=null;return;}
    try{qr=qrcode(0,ecl.value);qr.addData(v);qr.make();msg.textContent="";}
    catch(e){msg.textContent="That text is too long for a QR code. Try something shorter.";qr=null;return;}
    var n=qr.getModuleCount(),px=+size.value,m=4,cell=px/(n+2*m),c=document.createElement("canvas");
    c.width=c.height=px;var x=c.getContext("2d");x.fillStyle=bg.value;x.fillRect(0,0,px,px);x.fillStyle=fg.value;
    for(var r=0;r<n;r++)for(var k=0;k<n;k++)if(qr.isDark(r,k))x.fillRect(Math.floor((k+m)*cell),Math.floor((r+m)*cell),Math.ceil(cell),Math.ceil(cell));
    c.style.width=Math.min(px,260)+"px";c.style.height=c.style.width;box.innerHTML="";box.appendChild(c);box.dataset.ready=1;
  }
  function toSVG(){
    var n=qr.getModuleCount(),m=4,t=n+2*m,d="";
    for(var r=0;r<n;r++)for(var k=0;k<n;k++)if(qr.isDark(r,k))d+="M"+(k+m)+" "+(r+m)+"h1v1h-1z";
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+t+' '+t+'" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="'+bg.value+'"/><path d="'+d+'" fill="'+fg.value+'"/></svg>';
  }
  [txt,size,fg,bg,ecl].forEach(function(el){el.addEventListener("input",make);});
  png.onclick=function(){var c=box.querySelector("canvas");c&&c.toBlob(function(b){TK.download(b,"qr-code.png");});};
  svg.onclick=function(){qr&&TK.download(new Blob([toSVG()],{type:"image/svg+xml"}),"qr-code.svg");};
  make();
})();
