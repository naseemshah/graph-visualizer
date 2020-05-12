let AdjMatrix = [];
let AdjMatrixContainer = document.getElementById("AdjMatrixContainer");

let incdMatrix = [];
let incdMatrixContainer = document.getElementById("incdMatrixContainer");
//Panzoom init for matrix
let AdjMatPanzoom = panzoom(AdjMatrixContainer);
let incdMatPanzoom = panzoom(incdMatrixContainer);

if(lines.length == 0){
    incdMatrixContainer.innerHTML= "<p>No Matrix to show. Please connect some nodes to calculate matrix. </p>"
    incdMatPanzoom.pause();        
}else{
    incdMatPanzoom.resume();
}

if(AdjMatrix.length == 0){
    AdjMatrixContainer.innerHTML= "<p>No Matrix to show. Please Connect some lines to calculate matrix. </p>"
    AdjMatPanzoom.pause();        
}else{
    AdjMatPanzoom.resume();
}

let adjMatCells = [];
let incdMatCells = [];


function updateAdjMatrixSize(){
    AdjMatrix = [];
    adjMatCells = [];
    AdjMatrixContainer.innerHTML = '';
    AdjMatrixContainer.style.setProperty('--adjMatRows', nodes.length);
    AdjMatrixContainer.style.setProperty('--adjMatcolumns', nodes.length);
    for(let i=0; i<nodes.length; i++){        
        AdjMatrix[i]= [];
        adjMatCells[i] = [];
        for(let j=0; j<nodes.length; j++){
            AdjMatrix[i][j] = 0;
            adjMatCells[i][j] = document.createElement("div");
            adjMatCells[i][j].innerText = `0`;
            AdjMatrixContainer.appendChild(adjMatCells[i][j]).className = "AdjMatrixCellitem";        

        }
    }
    AdjMatPanzoom.smoothZoomAbs(0,0,1);
    AdjMatPanzoom.moveTo(0,0);
}
function updateAdjMatrixLines(){
    lines.forEach((line,idx)=>{
        if(line.fromNode && line.toNode && line.fromNode.id && line.toNode.id){
            AdjMatrix[line.fromNode.id-1][line.toNode.id-1] = line.weight;
            adjMatCells[line.fromNode.id-1][line.toNode.id-1].innerText = line.weight;
            //UpdateLinesBrowser
            updateLinesTree();
        }
    });
    console.log("AdjMat ",AdjMatrix);
    if(AdjMatrix.length == 0){
        AdjMatrixContainer.innerHTML= "<p>No Matrix to show. Please Add Nodes to calculate matrix. </p>"
        AdjMatPanzoom.pause();        
    }else{
        AdjMatPanzoom.resume();
    }
}


function updateIncdMatrixSize(){
    incdMatrix = [];
    incdMatCells = [];
    incdMatrixContainer.innerHTML = '';
    if(lines.length){
        incdMatrixContainer.style.setProperty('--incdMatRows', nodes.length);
        incdMatrixContainer.style.setProperty('--incdMatcolumns', lines.length);
        for(let i=0; i<nodes.length; i++){        
            incdMatrix[i]= [];
            incdMatCells[i] = [];
            for(let j=0; j<lines.length; j++){
                incdMatrix[i][j] = 0;
                incdMatCells[i][j] = document.createElement("div");
                incdMatCells[i][j].innerText = `0`;
                incdMatrixContainer.appendChild(incdMatCells[i][j]).className = "incdMatrixCellitem";        
    
            }
        }
    
    }
    AdjMatPanzoom.smoothZoomAbs(0,0,1);
    AdjMatPanzoom.moveTo(0,0);
    
}

function updateIncdMatrixLines(){
    lines.forEach((line,idx)=>{
        if(line.fromNode && line.fromNode.id && line.toNode && line.toNode.id){
            incdMatrix[line.fromNode.id-1][line.id-1] = 1;
            incdMatCells[line.fromNode.id-1][line.id-1].innerText = 1;   
            incdMatrix[line.toNode.id-1][line.id-1] = -1;
            incdMatCells[line.toNode.id-1][line.id-1].innerText = -1; 
        }
    });
    // console.log("AdjMat ",AdjMatrix);
    if(lines.length == 0){
        incdMatrixContainer.innerHTML= "<p>No Matrix to show. Please connect some nodes to calculate matrix. </p>"
        incdMatPanzoom.pause();        
    }else{
        incdMatPanzoom.resume();
    }
}
