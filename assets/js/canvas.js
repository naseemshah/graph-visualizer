//Initializing canvas

var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 1080;
c.imageSmoothingEnabled= true;

//

//


//Initializing Panzoom
var panzoomElement = document.getElementById("canvas");
var Panzoom = panzoom(panzoomElement);


//



class Node{
    constructor(x,y,radius,id){
        this.id = id;
        this.x=x;
        this.y = y;
        this.radius = radius | 50;
        this.fillcolor = "white";
        this.strokecolor = 'black';
        this.connectorRadius = 8;
        this.connectorColor = 'red';
        this.text = "Node "+ this.id;
        
    }
    editName(newName){
        this.text = newName;
    }
    delete(){
        deleteNodebyID(this.id);
    }
    draw(){
        //node
        c.beginPath();
        c.shadowColor = "rgba(0,0,0,0.1)";
        c.shadowBlur = 20;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.strokeStyle= this.strokecolor;
        c.lineWidth=5;
        c.stroke();
        c.fillStyle=this.fillcolor;
        c.fill();
        //shadow reset
        c.shadowBlur = 0;
        //node text
        c.font = "600 18px Arial";
        c.fillStyle = "blue";
        c.textAlign = "center";
        c.fillText(this.text, this.x, this.y+6);
        //connector
        c.beginPath();
        c.arc(this.x+this.radius, this.y, this.connectorRadius, 0, Math.PI * 2, false);
        c.fillStyle=this.connectorColor;
        c.fill();
        //double tap message
        if(this.strokecolor == "green"){
            c.font = "600 18px Arial";
            c.fillStyle = "blue";
            c.textAlign = "center";
            c.fillText("double tap to", this.x, this.y+this.radius+30);
            c.fillText("cancel selection", this.x, this.y+this.radius+48);
            
        }      
    }
}

class Line{
    constructor(x,y,id){
        this.id = id;
        this.start = {x: x, y: y};
        this.end = {};
        this.center = {};
        this.weight = 10;
        this.fromNode = null;
        this.toNode = null;
        this.slope = null;
        this.theta = null;
    }
    editWeight(newWeight){
        this.weight = newWeight;
    }
    draw(){
        c.beginPath();
        if(this.fromNode && this.fromNode.x && this.fromNode.y){
            c.moveTo(this.fromNode.x, this.fromNode.y);
            this.start.x = this.fromNode.x;
            this.start.y = this.fromNode.y;            
        }else{
        c.moveTo(this.start.x, this.start.y);        
        }
        if(this.toNode && this.toNode.x && this.toNode.y){
            this.center.x = (this.fromNode.x+this.toNode.x)/2;
            this.center.y = (this.fromNode.y+this.toNode.y)/2;
            c.lineTo(this.toNode.x,this.toNode.y);
            this.end.x = this.toNode.x;
            this.end.y = this.toNode.y;
            this.slope = (this.end.y - this.start.y)/(this.end.x - this.start.x);
            this.theta = Math.atan(this.slope);
            
        }
        else if(this.end.x && this.end.y){
            c.lineTo(this.end.x,this.end.y);            
        }
        else{
            if(touchPos.x){
            c.lineTo(touchPos.x,touchPos.y);
            }else{
                c.lineTo(mousePos.x,mousePos.y);
            }
        }        
        c.lineWidth = 2.5;
        c.strokeStyle = '#00A7E1';
        c.globalCompositeOperation = 'destination-over';
        c.stroke();
        c.globalCompositeOperation = 'source-over';
        //weight circle
        if(this.center && this.center.x && this.center.y){
            c.beginPath();
            // c.moveTo(this.center.x,this.center.y);
            c.arc(this.center.x,this.center.y,10,0,Math.PI*2,false);            
            c.fillStyle='red';
            c.fill();
            //weight text
            c.font = "800 10px Arial";
            c.fillStyle = "white";
            c.textAlign = "center";
            
            c.fillText(this.weight, this.center.x, this.center.y+2.5);
            ////////////
            
            let triagOffset = 18;
            let triagFill = 'black';
            let point1 = {x: (triagOffset+8)*Math.cos(this.theta), y: (triagOffset+8)*Math.sin(this.theta)}
            let point2 = {x: triagOffset*Math.cos(this.theta+0.4), y: triagOffset*Math.sin(this.theta+0.4)};
            let point3 = {x: triagOffset*Math.cos(this.theta-0.4), y: triagOffset*Math.sin(this.theta-0.4)};
            
            if((this.start.x>this.end.x)){
                if(this.start.y>this.end.y){
                    //tirangle
                    c.beginPath();
                    c.moveTo(this.center.x-point1.x,this.center.y-point1.y);
                    c.lineTo(this.center.x-point2.x,this.center.y-point2.y);
                    c.lineTo(this.center.x-point3.x,this.center.y-point3.y);
                    c.closePath();
                    c.fillStyle=triagFill;           
                    c.fill();
                }else{
                    c.beginPath();
                    c.moveTo(this.center.x-point1.x,this.center.y-point1.y);
                    c.lineTo(this.center.x-point2.x,this.center.y-point2.y);
                    c.lineTo(this.center.x-point3.x,this.center.y-point3.y);
                    c.closePath();
                    c.fillStyle=triagFill;           
                    c.fill();
                
                }
            }            
            else{
                if(this.start.y>this.end.y){
                    c.beginPath();
                    c.moveTo(this.center.x+point1.x,this.center.y+point1.y);
                    c.lineTo(this.center.x+point2.x,this.center.y+point2.y);
                    c.lineTo(this.center.x+point3.x,this.center.y+point3.y);
                    c.closePath();
                    c.fillStyle=triagFill; 
                    c.fill();
                }else{
                    c.beginPath();
                    c.moveTo(this.center.x+point1.x,this.center.y+point1.y);
                    c.lineTo(this.center.x+point2.x,this.center.y+point2.y);
                    c.lineTo(this.center.x+point3.x,this.center.y+point3.y);
                    c.closePath();
                    c.fillStyle=triagFill;
                    c.fill();  
                        
                }
            }
        }
    }
}


var nodes = [];
//node FUnctions
function editNameById(id,newName){
    nodes.some((node) => {
        if(node.id === id){
            node.editName(newName);
        }
    });
    update();
    updateNodesTree();
    updateLinesTree()
}

function editWeightById(id,newWeight){
    lines.some((line) => {
        if(line.id === id){
            line.editWeight(newWeight);
        }
    });
    update();
    updateNodesTree();
    updateLinesTree()
}

function deleteNodebyID(id){
    let deleteLinesIds = [];
    //delete the corresponding node
    nodes.some((node,idx) => {
        if(node.id === id){
            //determine all the lines to delete
            
            lines.forEach((line,ind)=>{                
                if((line.fromNode.id == id) || (line.toNode.id==id)){
                    deleteLinesIds.push(ind);
                }
            });
            nodes.splice(idx,1)
        }
    });
    
    for (let i = deleteLinesIds.length -1; i >= 0; i--){
        lines.splice(deleteLinesIds[i],1);
    }
    // nodes.splice(id-1, 1);
    update(); //update the changes
    loadCtxMenu(); // load the updated options in context menu
    contextMenuOptions.some((el,idx) => {
        if(el.nodeId === id){            
            //delete animation
            document.getElementById(`contextmenu-${idx}`).classList.add("contextmenudeleted");
            setTimeout(()=>{
                //delete from the html
                document.getElementById(`contextmenu-${idx}`).classList.add("hide");
                //delete from ctx menu
                contextMenuOptions.splice(idx,1);                
            },510);
        }
    });
    updateAdjMatrixSize();
    updateAdjMatrixLines();
    updateIncdMatrixSize();
    updateIncdMatrixLines();
    updateNodesTree();
    updateLinesTree();
}

function deleteLineById(id){
    lines.some((line,idx) => {
        if(line.id === id){
            lines.splice(idx,1);
        }
    });
    update();
    updateAdjMatrixSize();
    updateAdjMatrixLines();
    updateIncdMatrixSize();
    updateIncdMatrixLines();
    updateNodesTree();
    updateLinesTree();
}

function reInitNodeIds(){
    nodes.forEach((node,idx)=>{
        node.id = idx+1;
    });
    updateNodesTree();
    updateLinesTree()
}

function newNode(x,y){
    let idx = 1;
    while(nodes.some(el => el.id === idx)){
        idx++;
    }
    var newNode = new Node(x,y,50,idx);
    newNode.draw();
    nodes.push(newNode);
    updateAdjMatrixSize();
    updateAdjMatrixLines();
    updateIncdMatrixSize();
    updateIncdMatrixLines();
    updateNodesTree();
    updateLinesTree()
}


var lines = [];
var currentLine;

var newLineMode = false;
function newLineFromNode(node){
    let idx = 1;
    while(lines.some(el => el.id === idx)){
        idx++;
    }
    var newLine = new Line(node.x,node.y,idx);
    newLine.draw();
    newLineMode = true;
    lines.push(newLine);        
    
    return newLine;
}

var isclick = false;


var currentNode;
var nodeToConnect;
var isConnectorActive = false;
function update(){
    requestAnimationFrame(()=>{});    
    c.clearRect(0, 0, canvas.width, canvas.height);
    //render Lines
    lines.forEach((line,idx) => {
        //conditional for checking if line is connceted
        //to same node, if so delete it. 
        if(line.fromNode == line.toNode){
            lines.splice(idx, 1);
            updateNodesTree();
            updateLinesTree()
        }
        line.draw();
    });
    nodes.forEach((node,idx) => {
        //condition for checking if it's inside a connector
        if( 
            (
            (mousePos.x <= (node.x + node.radius + node.connectorRadius))
            && (mousePos.x >= (node.x + node.radius - node.connectorRadius))
            && (mousePos.y <= (node.y + node.connectorRadius))
            &&(mousePos.y >= (node.y  - node.connectorRadius))
            )
            ||
            (
                (touchPos.x <= (node.x + node.radius + node.connectorRadius+15))
                && (touchPos.x >= (node.x + node.radius - node.connectorRadius-15))
                && (touchPos.y <= (node.y + node.connectorRadius+15))
                &&(touchPos.y >= (node.y  - node.connectorRadius-15))
            )
            
        ){
            node.connectorRadius = 10;
            node.connectorColor = 'yellow';
            Panzoom.pause();
            if(isclick && !newLineMode && !isNodeMoveMode && !touchPos.x){
                isConnectorActive = true;
                Panzoom.pause();
                connectLine(node);
            }else{
                Panzoom.resume();
            }
            if(isclick && !newLineMode && !isNodeMoveMode && touchPos.x){
                isConnectorActive = true;
                Panzoom.pause();
                connectLine(node);
            }else{
                Panzoom.resume();
            }
        currentNode = null;
        node.draw();
        }
        else{
            Panzoom.resume();
            node.connectorRadius = 8;
            node.connectorColor = 'red';        
            node.draw();            
        }
        
        //conditional for checking if mouse is  inside a node
        if(          
            (
                (touchPos.x < (node.x + node.radius - node.connectorRadius))
                && (touchPos.x > (node.x - node.radius))
                && (touchPos.y < (node.y + node.radius))
                && (touchPos.y > (node.y - node.radius))
                && isclick
            ) 
            ||          
            (
                (mousePos.x < (node.x + node.radius - node.connectorRadius))
                && (mousePos.x > (node.x - node.radius))
                && (mousePos.y < (node.y + node.radius))
                && (mousePos.y > (node.y - node.radius))
                
            )
        ){  
            if(!isNodeMoveMode){
                currentNode = node;
                touchPosOffset.x = touchPos.x-node.x;
                touchPosOffset.y = touchPos.y-node.y;
                mousePosOffset.x = mousePos.x-node.x;
                mousePosOffset.y = mousePos.y-node.y;
            }
            
            if(touchPos.x && newLineMode){                    
                    nodeToConnect = node;
                    if( lines.some(line => line.fromNode == currentLine.fromNode && line.toNode == nodeToConnect) ){
                        lines.splice(currentLine.id, 1);
                    }else{
                    currentLine.toNode = nodeToConnect;
                    currentLine.end.x = currentLine.toNode.x;
                    currentLine.end.y = currentLine.toNode.y;
                    currentLine.draw();
                    updateAdjMatrixLines();
                    updateIncdMatrixSize();
                    updateIncdMatrixLines();
                    updateNodesTree();
                    updateLinesTree()
                    isConnectorActive = false;
                    currentLine = null;
                    nodeToConnect = null;
                    newLineMode = null;
                    }
            }
            
            if(newLineMode && mousePos.x){
                if(isclick){
                    nodeToConnect = node;                    
                    if( lines.some(line => line.fromNode == currentLine.fromNode && line.toNode == nodeToConnect) ){
                        lines.splice(currentLine.id, 1);
                    }else{
                    currentLine.toNode = nodeToConnect;
                    currentLine.end.x = currentLine.toNode.x;
                    currentLine.end.y = currentLine.toNode.y;
                    currentLine.draw();
                    updateAdjMatrixLines();
                    updateIncdMatrixSize();
                    updateIncdMatrixLines();
                    updateLinesTree();
                    isConnectorActive = false;
                    currentLine = null;
                    nodeToConnect = null;
                    newLineMode = false;
                    }
                }
            }

            
            
            //Context menu options
            if(!contextMenuOptions.some(el => el.nodeId === node.id)) {
                let id= node.id;
                
                contextMenuOptions.push(
                {
                    nodeId: id,
                    title: `Node ${id} Options`,
                    options : [
                        {   title:'Delete',
                            action: `deleteNodebyID(${id})`
                            
                        },
                        {
                            title: 'Edit',
                            action: `editNameById(${id},'tets')`
                        }
                    ]
                }

                );      
            }
            
            
            node.radius = 55;
            
            node.draw();
        }
        else {
            node.radius = 50;            
            node.draw();
            //delete entry form the context menu
            contextMenuOptions.some((el,idx) => {
                if(el.nodeId === node.id){
                    contextMenuOptions.splice(idx,1);
                    
                }
            })
        }

            

    });

    //render Lines
    lines.forEach((line,idx) => {
        //conditional for checking if line is connceted
        //to same node, if so delete it. 
        if(line.fromNode == line.toNode){
            lines.splice(idx, 1);
        }
        line.draw();
        
        
    });

    
    
}

//Touch Location
var touchPos = {x: null, y:null};
var touchPosOffset = {x: null, y:null};
var Txstat = document.getElementById("tx");
var Tystat = document.getElementById("ty");
var TouchStart= {x:null, y:null};
canvas.addEventListener('touchstart', e =>{
    isclick = true;
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
    var rect = canvas.getBoundingClientRect();
    touchPos = {
        x: (clientX - rect.left)*(1/Panzoom.getTransform().scale),
        y: (clientY - rect.top)*(1/Panzoom.getTransform().scale)
    }
    TouchStart.x = clientX;
    TouchStart.y = clientY;
    
    update();
    }, false);

var delta = {x: 0, y: 0};

canvas.addEventListener('touchmove', e =>{    
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
    var rect = canvas.getBoundingClientRect();
    touchPos = {
        x: (clientX - rect.left)*(1/Panzoom.getTransform().scale),
        y: (clientY - rect.top)*(1/Panzoom.getTransform().scale)
    }
    delta.x = clientX - TouchStart.x;
    delta.y = clientY - TouchStart.y;
    if(isclick && currentNode && !isConnectorActive && !newLineMode){
        Panzoom.pause();
        currentNode.strokecolor = 'green';
        isNodeMoveMode = true;
        currentNode.x= touchPos.x - touchPosOffset.x;
        currentNode.y= touchPos.y - touchPosOffset.y;
        currentNode.draw();       
    }else{
        Panzoom.resume();
        currentNode = null;
        isNodeMoveMode = false;
    }
    
    update();
    
    }, false);

canvas.addEventListener('touchend', e =>{    
    isclick = false;
    if(currentNode){
        currentNode.strokecolor = 'black';
        currentNode.radius = 50;

    }
    currentNode = null;
    
    if(newLineMode){
        lines.pop();
        newLineMode = false;
        isConnectorActive = false;
    }

    Panzoom.resume();
    update();
    }, false);
    


//Mouse Pointer Location
var mousePos= {x: null, y: null};
var mousePosOffset = {};
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left)*(1/Panzoom.getTransform().scale),
        y: (evt.clientY - rect.top)*(1/Panzoom.getTransform().scale)
    };
}


var mxstat = document.getElementById("mx");
var mystat = document.getElementById("my");
var isNodeMoveMode = false;
canvas.addEventListener('mousemove', evt =>{    
    mousePos = getMousePos(canvas, evt);
    if(isclick && currentNode && !isConnectorActive && !newLineMode && !touchPos.x){
        Panzoom.pause();
        isNodeMoveMode = true;        
        currentNode.x= mousePos.x - mousePosOffset.x;
        currentNode.y= mousePos.y - mousePosOffset.y;
        currentNode.draw(); 
    }else{
        Panzoom.resume();  
        currentNode = null;
        isNodeMoveMode = false;
    }


    

update();


}, false);

canvas.addEventListener("mouseup",()=>{
    isclick = false;
    if(newLineMode){
        lines.pop();
        newLineMode = false;
        isConnectorActive = false;
    }
    
    currentNode = null;
    
    },false);



    canvas.addEventListener("mousedown",()=>{
        isclick = true;
        
    },false);
    
    function connectLine(curNode){
        currentLine = newLineFromNode(curNode);
        currentLine.fromNode = curNode;
        
    }