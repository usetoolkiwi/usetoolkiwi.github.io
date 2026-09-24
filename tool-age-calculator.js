(function(){
  var dob=TK.$("#dob"),on=TK.$("#on"),out=TK.$("#out");
  var today=new Date();on.value=today.toISOString().slice(0,10);
  function calc(){
    if(!dob.value||!on.value){out.innerHTML='<p class="note">Enter a date of birth.</p>';return;}
    var a=new Date(dob.value+"T00:00:00"),b=new Date(on.value+"T00:00:00");
    if(b<a){out.innerHTML='<p class="err">The "age on" date is before the date of birth.</p>';return;}
    var y=b.getFullYear()-a.getFullYear(),m=b.getMonth()-a.getMonth(),d=b.getDate()-a.getDate();
    if(d<0){m--;d+=new Date(b.getFullYear(),b.getMonth(),0).getDate();}
    if(m<0){y--;m+=12;}
    var days=Math.round((b-a)/864e5);
    var nb=new Date(b.getFullYear(),a.getMonth(),a.getDate());if(nb<b)nb.setFullYear(b.getFullYear()+1);
    var until=Math.round((nb-b)/864e5);
    var wd=a.toLocaleDateString(undefined,{weekday:"long"});
    out.innerHTML='<div class="answer">'+y+' years, '+m+' months, '+d+' days</div>'+
      '<div class="stats"><div class="stat"><b>'+(y*12+m)+'</b><span>Total months</span></div><div class="stat"><b>'+Math.floor(days/7).toLocaleString()+'</b><span>Total weeks</span></div><div class="stat"><b>'+days.toLocaleString()+'</b><span>Total days</span></div><div class="stat"><b>'+(until===0?"Today! 🎂":until+" days")+'</b><span>Next birthday</span></div><div class="stat"><b>'+wd+'</b><span>Born on a</span></div></div>';
  }
  dob.addEventListener("input",calc);on.addEventListener("input",calc);calc();
})();
