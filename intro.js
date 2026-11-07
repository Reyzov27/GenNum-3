/* Заставка PLATE SPIN: показывается до входа в игру, затем плавно исчезает */
(function(){
  var el=document.getElementById('intro');
  if(!el)return;
  var root=document.documentElement,done=false,MIN=4450;  /* вместе с уходом заставки — около 5 секунд */
  root.classList.add('intro-on');
  /* летящие линии скорости */
  var L=el.querySelector('.i-lines'),n=22;
  for(var i=0;i<n;i++){
    var s=document.createElement('i');
    s.style.top=(6+Math.random()*88)+'%';
    s.style.width=(18+Math.random()*34)+'%';
    s.style.animationDelay=(Math.random()*3).toFixed(2)+'s';
    s.style.animationDuration=(0.7+Math.random()*0.6).toFixed(2)+'s';
    L.appendChild(s);
  }
  /* барабаны SPIN: сверху вниз пролетают случайные буквы и останавливаются на нужной */
  var G=['s','p','i','n','l','a','t','e'];
  [].forEach.call(el.querySelectorAll('.i-win'),function(w){
    var t=w.dataset.t,n=+w.dataset.n,st=w.querySelector('.i-strip'),seq=[t],prev=t,k,g;
    for(k=1;k<n;k++){do{g=G[Math.floor(Math.random()*G.length)];}while(g===prev||(k===1&&g===t));seq.push(g);prev=g;}
    w.style.setProperty('--n',n);
    st.innerHTML=seq.map(function(g){return '<div class="i-cell"><img src="g-'+g+'.png" alt="" draggable="false"></div>';}).join('');
    st.addEventListener('animationend',function(e){if(e.animationName==='iReel')w.classList.add('land');});
  });
  function finish(){
    if(done)return;done=true;
    el.classList.add('out');
    setTimeout(function(){
      if(el.parentNode)el.parentNode.removeChild(el);
      root.classList.remove('intro-on');
    },600);
  }
  var t0=Date.now(),loaded=document.readyState==='complete';
  function tryFinish(){
    var left=MIN-(Date.now()-t0);
    setTimeout(finish,Math.max(0,left));
  }
  if(loaded)tryFinish();
  else{
    window.addEventListener('load',tryFinish);
    setTimeout(finish,MIN+3500); /* страховка, если что-то грузится долго */
  }
  /* пропустить нельзя: заставка закрывает экран и сама уходит через MIN мс */
  if(window.Telegram&&Telegram.WebApp){try{Telegram.WebApp.ready();Telegram.WebApp.expand();}catch(e){}}
})();
