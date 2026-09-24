(function(){
  var L=TK.$("#len"),Lv=TK.$("#lenv"),up=TK.$("#up"),lo=TK.$("#lo"),nu=TK.$("#nu"),sy=TK.$("#sy"),sim=TK.$("#sim"),out=TK.$("#out"),str=TK.$("#str"),bar=TK.$("#bar");
  var S={up:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",lo:"abcdefghijklmnopqrstuvwxyz",nu:"0123456789",sy:"!@#$%^&*()-_=+[]{};:,.?/"};
  function rnd(n){var a=new Uint32Array(1),lim=Math.floor(4294967296/n)*n;do{crypto.getRandomValues(a);}while(a[0]>=lim);return a[0]%n;}
  function gen(){
    Lv.textContent=L.value;var sets=[];if(up.checked)sets.push(S.up);if(lo.checked)sets.push(S.lo);if(nu.checked)sets.push(S.nu);if(sy.checked)sets.push(S.sy);
    if(!sets.length){lo.checked=true;sets.push(S.lo);}
    if(sim.checked)sets=sets.map(function(s){return s.replace(/[Il1O0o]/g,"");});
    var all=sets.join(""),n=+L.value,p=sets.map(function(s){return s[rnd(s.length)];});
    while(p.length<n)p.push(all[rnd(all.length)]);
    for(var i=p.length-1;i>0;i--){var j=rnd(i+1),t=p[i];p[i]=p[j];p[j]=t;}
    out.textContent=p.join("");
    var bits=Math.round(n*Math.log2(all.length)),lab=bits<50?"Weak":bits<70?"Fair":bits<100?"Strong":"Very strong";
    str.textContent=lab+" · about "+bits+" bits of entropy";
    bar.style.width=Math.min(100,bits)+"%";bar.style.background=bits<50?"var(--warn)":bits<70?"#c98a00":"var(--ok)";
  }
  [L,up,lo,nu,sy,sim].forEach(function(e){e.addEventListener("input",gen);});
  TK.$("#regen").onclick=gen;TK.$("#copy").onclick=function(){TK.copy(out.textContent,this);};gen();
})();
