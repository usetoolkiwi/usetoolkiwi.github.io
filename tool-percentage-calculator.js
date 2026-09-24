(function(){
  function n(id){var v=parseFloat(TK.$(id).value);return isNaN(v)?null:v;}
  function f(x){return (Math.round(x*10000)/10000).toLocaleString(undefined,{maximumFractionDigits:4});}
  function run(){
    var a=n("#a1"),b=n("#b1");TK.$("#r1").textContent=(a!==null&&b!==null)?f(a/100*b):"–";
    a=n("#a2");b=n("#b2");TK.$("#r2").textContent=(a!==null&&b)?f(a/b*100)+"%":"–";
    a=n("#a3");b=n("#b3");
    if(a&&b!==null){var c=(b-a)/Math.abs(a)*100;TK.$("#r3").textContent=(c>0?"+":"")+f(c)+"% ("+(c>=0?"increase":"decrease")+")";}else TK.$("#r3").textContent="–";
  }
  document.querySelectorAll(".pc input").forEach(function(i){i.addEventListener("input",run);});run();
})();
