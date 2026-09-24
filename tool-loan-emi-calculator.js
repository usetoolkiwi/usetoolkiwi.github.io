(function(){
  var P=TK.$("#p"),R=TK.$("#r"),T=TK.$("#t"),U=TK.$("#u"),out=TK.$("#out"),tbl=TK.$("#tbl");
  function money(x){return x.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});}
  function calc(){
    var p=parseFloat(P.value),r=parseFloat(R.value),n=parseFloat(T.value)*(U.value==="years"?12:1);
    if(!(p>0)||!(r>=0)||!(n>=1)){out.innerHTML='<p class="note">Enter the loan amount, interest rate and tenure.</p>';tbl.innerHTML="";return;}
    n=Math.round(n);var i=r/1200,emi=i?p*i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1):p/n,total=emi*n;
    out.innerHTML='<div class="note">Monthly payment (EMI)</div><div class="answer">'+money(emi)+'</div><div class="stats"><div class="stat"><b>'+money(p)+'</b><span>Principal</span></div><div class="stat"><b>'+money(total-p)+'</b><span>Total interest</span></div><div class="stat"><b>'+money(total)+'</b><span>Total payment</span></div><div class="stat"><b>'+n+'</b><span>Monthly payments</span></div></div>';
    var bal=p,rows="",yr=0,yi=0,yp=0;
    for(var k=1;k<=n;k++){var it=bal*i,pr=emi-it;bal=Math.max(0,bal-pr);yi+=it;yp+=pr;
      if(k%12===0||k===n){yr++;rows+="<tr><td>Year "+yr+"</td><td>"+money(yp)+"</td><td>"+money(yi)+"</td><td>"+money(bal)+"</td></tr>";yi=yp=0;}}
    tbl.innerHTML='<table class="sched"><thead><tr><th>Period</th><th>Principal paid</th><th>Interest paid</th><th>Balance</th></tr></thead><tbody>'+rows+'</tbody></table>';
  }
  [P,R,T,U].forEach(function(e){e.addEventListener("input",calc);});calc();
})();
