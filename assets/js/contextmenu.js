
let contextMenuPos = {x: 0, y: 0}
let contextmenu = document.getElementById('contextmenu');
let ctxMenuContent = document.getElementById('ctxMenuContent');
let ctxMenuMode = false;
let html="";
//Mouse Events
document.addEventListener("mousemove",()=>{
    console.log(event.clientX)
    if((event.clientY>(window.innerHeight-250)) && (event.clientX>(window.innerWidth-250))){
        contextMenuPos.y = window.innerHeight-210;
        contextMenuPos.x = window.innerWidth-210;
    }
    else if(event.clientY>(window.innerHeight-250)){
        contextMenuPos.x = event.clientX;
        contextMenuPos.y = window.innerHeight-210;
    }
    else if(event.clientX>(window.innerWidth-250)){
        contextMenuPos.x = window.innerWidth-210;
        contextMenuPos.y = event.clientY;
    }else{
        contextMenuPos.x = event.clientX;
        contextMenuPos.y = event.clientY;
    }
    
    if(!ctxMenuMode){
        contextmenu.style.left = contextMenuPos.x+"px";
        contextmenu.style.top = contextMenuPos.y+"px";
        
    }
},false)



canvas.addEventListener('contextmenu', function(e) {
    console.log(e);
    contextmenu.style.left = contextMenuPos.x+"px";
    contextmenu.style.top = contextMenuPos.y+"px";
    
    loadCtxMenu();
    contextmenu.classList.toggle("contextmenuhide");
    if(contextmenu.classList.contains("contextmenuhide")){
        ctxMenuMode = false;
        
    }else{
        ctxMenuMode = true;
    }
    

    e.preventDefault();
}, false);



//touchevents
document.addEventListener('touchstart', function(e) {
    // Cache the client X/Y coordinates
    
    contextMenuPos.x = e.touches[0].clientX;
    contextMenuPos.y = e.touches[0].clientY;
   
    }, false);

var delta = {x:0, y:0}


document.addEventListener('touchmove', function(e) {
    
        
        // Cache the client X/Y coordinates
        contextMenuPos.x = e.touches[0].clientX;
        contextMenuPos.y = e.touches[0].clientY;
        // delta.x = e.changedTouches[0].pageX -  TouchStart.x;
        // delta.y = e.changedTouches[0].pageY -  TouchStart.y;
        // console.log(delta);


    }, false);
    

document.addEventListener('long-press', (e)=>{
    if((Math.abs(delta.x)<1) || (Math.abs(delta.y)<1) ){
        window.navigator.vibrate(50);
        contextmenu.style.left = contextMenuPos.x+"px";
        contextmenu.style.top = contextMenuPos.y+"px";
        loadCtxMenu();
        contextmenu.classList.toggle("contextmenuhide");
        if(contextmenu.classList.contains("contextmenuhide")){
            ctxMenuMode = false;
            
        }else{
            ctxMenuMode = true;
        }

    }
    
  });

document.addEventListener('touchend',()=>{
    istouchmove = false;
},false)

let contextMenuOptions = [];

function loadCtxMenu(){
    ctxMenuContent.innerHTML = "";
    let html = '';
    html += `<div >`
    contextMenuOptions.forEach((object,idx1)=>{
        title = object.title;
        options = object.options;
        
        html += `
        <div >
            <div id="contextmenu-${idx1}" class="innercontextmenu">
                <div class="ctxMenutitle">
                <p>${title}</p>
                </div>
                `;
                html+=`<div class="ctxMenuOptions">
                    <div class="ctxMenuOptionsButtonsContainer">               
                        `
                options.forEach((option,idx2)=>{
                    if(option.title=='Edit'){
                            html+=`<div class="button" onclick="document.getElementById('rename-${idx1}').classList.toggle('rename-menu-hide');"">
                                <img src="assets/img/edit.svg" alt="">
                                <p style="color: #EFA700;">Edit</p>
                            </div>
                            `;
                            

                    }else{
                            
                            html+=`<div class="button" onclick="${option.action};onEmptyCloseContextMenu();">
                                <img src="assets/img/bin.svg" alt="">
                                <p style="color: #CF0000;">Delete</p>
                            </div>
                            `
                    }
                });
                        html+=`</div>
                    </div>`
                html+=`
                    <div id="rename-${idx1}" class="rename-menu rename-menu-hide">
                        <input id="rename-text-${object.nodeId}" type="text">
                        <div>
                            <button onclick="setText(${object.nodeId})">Rename</button>                    
                            <span class="fake-link" onclick="document.getElementById('rename-${idx1}').classList.toggle('rename-menu-hide')">Close</span>
                        </div>
                    </div>
                `;
            html+=`</div>
        </div>
        `;

    });
    html +=`</div>`
    if(!contextmenu.innerHTML.includes(html)){ctxMenuContent.innerHTML += html;}
}

function setText(id){
    let renameText=document.getElementById('rename-text-'+id).value;
    if(renameText ==''){
        renameText += 'Node '+ id; 
    }
    editNameById(id,renameText)
}

function onEmptyCloseContextMenu(){
    let htmlOptions = Array.from(document.getElementsByClassName("innercontextmenu"));  
    let emptyFlag=true;
    for (let i = 0; i < htmlOptions.length; i++) {
        if(!htmlOptions[i].classList.contains("contextmenudeleted")){
            emptyFlag = false;
        }
    }    
    if(emptyFlag){contextmenu.classList.toggle('contextmenuhide');}
}