(function(){
  var t=TK.$("#txt");
  function words(s){return s.replace(/([a-z0-9])([A-Z])/g,"$1 $2").split(/[^\p{L}\p{N}]+/u).filter(Boolean);}
  var F={
    upper:function(s){return s.toUpperCase();},lower:function(s){return s.toLowerCase();},
    title:function(s){var small=/^(a|an|and|as|at|but|by|for|in|of|on|or|the|to|via)$/i;return s.toLowerCase().replace(/[\p{L}\p{N}][^\s]*/gu,function(w,i){return i>0&&small.test(w)?w:w.charAt(0).toUpperCase()+w.slice(1);});},
    sentence:function(s){return s.toLowerCase().replace(/(^\s*|[.!?]\s+)(\p{L})/gu,function(m,a,b){return a+b.toUpperCase();});},
    camel:function(s){return words(s).map(function(w,i){w=w.toLowerCase();return i?w.charAt(0).toUpperCase()+w.slice(1):w;}).join("");},
    pascal:function(s){return words(s).map(function(w){w=w.toLowerCase();return w.charAt(0).toUpperCase()+w.slice(1);}).join("");},
    snake:function(s){return words(s).map(function(w){return w.toLowerCase();}).join("_");},
    kebab:function(s){return words(s).map(function(w){return w.toLowerCase();}).join("-");},
    alt:function(s){var i=0;return s.replace(/\p{L}/gu,function(c){return (i++%2)?c.toUpperCase():c.toLowerCase();});}
  };
  document.querySelectorAll("[data-case]").forEach(function(b){b.onclick=function(){t.value=F[b.dataset.case](t.value);};});
  TK.$("#copy").onclick=function(){TK.copy(t.value,this);};TK.$("#clear").onclick=function(){t.value="";t.focus();};
})();
