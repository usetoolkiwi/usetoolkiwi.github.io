(function(){
  var t=TK.$("#txt"),out=TK.$("#stats"),kw=TK.$("#kw");
  var STOP=new Set("the a an and or but of to in on at for with is are was were be been it this that as by from your you i we they he she his her their our not have has had do does did so if then than there here what which who will would can could should about into over also just more most very".split(" "));
  function upd(){
    var v=t.value,words=(v.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu)||[]),wc=words.length;
    var sent=(v.match(/[^.!?…]+[.!?…]+|[^.!?…]+$/g)||[]).filter(function(s){return s.trim().length;}).length;
    var para=v.split(/\n\s*\n/).filter(function(p){return p.trim();}).length;
    var s=[["Words",wc],["Characters",v.length],["Characters (no spaces)",v.replace(/\s/g,"").length],["Sentences",sent],["Paragraphs",para],["Reading time",Math.ceil(wc/238)+" min"],["Speaking time",Math.ceil(wc/140)+" min"]];
    out.innerHTML=s.map(function(x){return '<div class="stat"><b>'+x[1]+'</b><span>'+x[0]+'</span></div>';}).join("");
    var f={};words.forEach(function(w){w=w.toLowerCase();if(w.length>2&&!STOP.has(w))f[w]=(f[w]||0)+1;});
    var top=Object.keys(f).sort(function(a,b){return f[b]-f[a];}).slice(0,8);
    kw.innerHTML=top.length?"<b>Top keywords:</b> "+top.map(function(w){return w.replace(/</g,"&lt;")+" ("+f[w]+")";}).join(", "):"";
  }
  t.addEventListener("input",upd);TK.$("#clear").onclick=function(){t.value="";upd();t.focus();};
  TK.$("#copy").onclick=function(){TK.copy(t.value,this);};upd();
})();
