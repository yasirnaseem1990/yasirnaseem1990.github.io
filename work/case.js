// Neural graph animation for case-study hero
(function(){
    const canvas=document.getElementById('cg');
    if(!canvas)return;
    const ctx=canvas.getContext('2d');
    let w,h,nodes,D,pulses,dpr;
    function build(){
        dpr=Math.min(window.devicePixelRatio||1,2);
        const r=canvas.getBoundingClientRect();
        w=r.width;h=r.height;
        canvas.width=w*dpr;canvas.height=h*dpr;
        ctx.setTransform(dpr,0,0,dpr,0,0);
        const N=Math.max(20,Math.min(52,Math.floor(w/30)));
        nodes=Array.from({length:N},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:1.4+Math.random()*1.8}));
        D=Math.min(190,w/6);pulses=[];
    }
    function spawn(){const a=nodes[Math.floor(Math.random()*nodes.length)],b=nodes[Math.floor(Math.random()*nodes.length)];if(a!==b)pulses.push({a,b,t:0});}
    let f=0;
    function draw(){
        f++;ctx.clearRect(0,0,w,h);
        for(const n of nodes){n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>w)n.vx*=-1;if(n.y<0||n.y>h)n.vy*=-1;}
        for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
            const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.hypot(dx,dy);
            if(d<D){ctx.strokeStyle='rgba(56,225,255,'+((1-d/D)*.24)+')';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);ctx.stroke();}
        }
        for(const n of nodes){const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r*4);g.addColorStop(0,'rgba(94,234,212,.85)');g.addColorStop(1,'rgba(94,234,212,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(n.x,n.y,n.r*4,0,7);ctx.fill();ctx.fillStyle='#bff8ee';ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,7);ctx.fill();}
        if(f%40===0&&pulses.length<8)spawn();
        for(let i=pulses.length-1;i>=0;i--){const p=pulses[i];p.t+=.02;if(p.t>=1){pulses.splice(i,1);continue;}const x=p.a.x+(p.b.x-p.a.x)*p.t,y=p.a.y+(p.b.y-p.a.y)*p.t;ctx.fillStyle='#38e1ff';ctx.shadowColor='#38e1ff';ctx.shadowBlur=10;ctx.beginPath();ctx.arc(x,y,2.6,0,7);ctx.fill();ctx.shadowBlur=0;}
        requestAnimationFrame(draw);
    }
    build();draw();
    let rz;window.addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(build,200);});
})();
