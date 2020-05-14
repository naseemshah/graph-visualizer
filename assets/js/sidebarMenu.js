
function smoothmove(){
    Panzoom.smoothZoomAbs(0,0,2);
    Panzoom.moveTo(-400+(window.innerWidth/2),-400+(window.innerHeight/2))
}
let sidebar = document.getElementById("sidebar");
let upContainer = document.getElementById("up-container");
let LeftContainer = document.getElementById("left-container");
let nodesTreeContainer = document.getElementById("nodes-tree-container");
let linesTreeContainer = document.getElementById("lines-tree-container");
let AdjMatrixWrapper = document.getElementById("adj-matrix-wrapper");
let incdMatrixWrapper = document.getElementById("incd-matrix-wrapper");


let sidebarInnerWrapper1 = document.getElementById('sidebar-inner-wrapper-1'); 

//sidebar buttons
let browseNodesButton = document.getElementById("nodes-button");
let browseLinesButton  = document.getElementById("lines-button");
let adjMatButton  = document.getElementById("adjmat-button");
let incdMatButton = document.getElementById("incmat-button");

upContainer.addEventListener('click',()=>{
    sidebar.classList.toggle("sidebar-mobile-open");
    if(upContainer.children[1].innerText == "Tap to open"){
        upContainer.children[0].style.transform = 'rotate(180deg)';
        upContainer.children[1].innerText = "Tap to Close";
    }else if(upContainer.children[1].innerText == "Tap to Close"){
        upContainer.children[1].innerText = "Tap to open";
        upContainer.children[0].style.transform = 'rotate(0deg)';
    }

},false);

sidebar.oncontextmenu = function() {
    console.log("insie sidebar");
    
    return false;
    }
function closeSidebar(){
    sidebar.classList.add("sidebar-close");
    LeftContainer.classList.add('left-container-close');
    
    if(LeftContainer.children[1].innerText == "Tap to Close"){
        LeftContainer.children[0].style.transform = 'rotate(0deg)';
        LeftContainer.children[1].innerText = "Tap to open";
    }
}

function openSidebar(){
    sidebar.classList.remove("sidebar-close");
    if(LeftContainer.children[1].innerText == "Tap to open"){
        LeftContainer.classList.remove('left-container-close');
        LeftContainer.children[0].style.transform = 'rotate(180deg)';
        LeftContainer.children[1].innerText = "Tap to Close";
    }
}

function closeNodesTree(){
    nodesTreeContainer.classList.add("nodes-tree-close");
}
function openNodesTree(){
    nodesTreeContainer.classList.remove("nodes-tree-close");
}

function closeLinesTree(){
    linesTreeContainer.classList.add("lines-tree-close");
}
function openLinesTree(){
    linesTreeContainer.classList.remove("lines-tree-close");
}
function closeAdjMatrix(){
    AdjMatrixWrapper.classList.add("adj-matrix-wrapper-close");
}
function openAdjMatrix(){
    AdjMatrixWrapper.classList.remove("adj-matrix-wrapper-close");
}

function closeIncdMatrix(){
    incdMatrixWrapper.classList.add("incd-matrix-wrapper-close");
}
function openIncdMatrix(){
    incdMatrixWrapper.classList.remove("incd-matrix-wrapper-close");
}


// Nested Tree Code
let toggler = document.getElementsByClassName("treeCaret");
for (let i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nestedTree").classList.toggle("activeTree");
    this.classList.toggle("treeCare-down");
    });
}

let renameNodeFromTree = document.getElementsByClassName("rename-node-tree");
for (let i = 0; i < toggler.length; i++) {
    renameNodeFromTree[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nestedTree").classList.toggle("activeTree");
    // this.classList.toggle("caret-down");
    });
}

let toggler2 = document.getElementsByClassName("treeCaret");
    for (let i = 0; i < toggler2.length; i++) {
        
        toggler2[i].addEventListener("click", function() {
        console.log(this.parentElement.querySelector(".nestedTree"));
        this.parentElement.querySelector(".nestedTree").classList.toggle("activeTree");
        this.classList.toggle("treeCare-down");
        });
    }

let renameNodeFromTree2 = document.getElementsByClassName("rename-node-tree");
    for (let i = 0; i < renameNodeFromTree2.length; i++) {
        renameNodeFromTree2[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nestedTree").classList.toggle("activeTree");
        // this.classList.toggle("caret-down");
        });
    }



function updateLinesTree(){
    if(lines.length){
        let nodetree = document.getElementById("LinestreeUL");
        nodetree.innerHTML = '';
        lines.forEach((line,idx) => {
            
            nodetree.innerHTML += `
            <li><span class="treeCaret-lines">Line ${line.id}</span>
                <ul class="nestedTree-lines">
                    <li>Weight: ${line.weight} <span class="rename-lines-tree italic fake-link">edit</span>
                        <ul class="nestedTree-lines">
                                <li>
                                    <input type="number" id="line-browser-edit-${line.id}" type="text">
                                    <button onclick="setWeightFromTree(${line.id})">edit</button>
                                </li>
                                
                        </ul>
                    </li>
                    <li><span class="treeCaret-lines">Nodes Connected</span>
                        <ul class="nestedTree-lines">
                            <li >From Node:<br> <span >${line.fromNode.text}</span> <span style="font-style: italic;">(id: ${line.fromNode.id})</span></li>
                            <li >To Node:<br> <span >${line.toNode.text} </span> <span>(id: ${line.toNode.id})</span></li>
                        </ul>
                    </li>
                    <li onclick="deleteLineById(${line.id})" class="italic fake-link">delete line</li>
                </ul>
            </li>   
            `;
            
        });
    }else{
            let LinestreeUL= document.getElementById("LinestreeUL");
            LinestreeUL.innerHTML = `
            <li>
            <p>No Lines to show. Please connect some Lines to Nodes.</p>
            </li> `;
        }
        
    
    let toggler2 = document.getElementsByClassName("treeCaret-lines");
    for (let i = 0; i < toggler2.length; i++) {
        
        toggler2[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nestedTree-lines").classList.toggle("activeTree-lines");
        this.classList.toggle("treeCare-down-lines");
        });
    }

    let renameNodeFromTree2 = document.getElementsByClassName("rename-lines-tree");
    for (let i = 0; i < renameNodeFromTree2.length; i++) {
        renameNodeFromTree2[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nestedTree-lines").classList.toggle("activeTree-lines");
        // this.classList.toggle("caret-down");
        });
    }
}

//rename node from tree browser
function setTextFromTree(id){
    let renameText=document.getElementById('rename-fromTree-text-'+id).value;
    if(renameText ==''){
        renameText += 'Node '+ id; 
    }
    editNameById(id,renameText)
}

function setWeightFromTree(id){
    let newWeight=document.getElementById('line-browser-edit-'+id).value;
    if(newWeight ==''){
        newWeight = 10; 
    }
    editWeightById(id,newWeight);
}

function updateNodesTree(){
    if(nodes.length){
    let nodetree = document.getElementById("treeUL");
    nodetree.innerHTML = '';
    nodes.forEach((node,idx) => {
        let linehtml = '';
        let linecount = 0;
        lines.forEach((line,idx)=>{
            if((line.fromNode.id == node.id) || (line.toNode.id == node.id)){
                linecount++;
                linehtml += `<li>Line ${line.id} <span class="rename-node-tree italic fake-link">delete</span></li>`
            }
        });
        nodetree.innerHTML += `
        <li><span class="treeCaret">${node.text}</span> <span class="italic">(Node ${node.id})</span>
            <ul class="nestedTree">
            <li>id: ${node.id}</li>
                <li>Name: ${node.text} <span class="rename-node-tree italic fake-link">rename</span>
                <ul class="nestedTree">
                        <li>
                            <input id="rename-fromTree-text-${node.id}"type="text">
                            <button onclick=" setTextFromTree(${node.id})">rename</button>
                        </li>
                        
                </ul>
                </li>
                <li><span class="treeCaret">${linecount} Lines connected</span>
                    <ul class="nestedTree">
                            ${linehtml} 
                    </ul>
                </li>
                <li onclick="deleteNodebyID(${node.id})"class="italic fake-link" >delete node</li>
            </ul>
        </li>   
        `;
        
    });
    }else{
        let treeUL= document.getElementById("treeUL");
        treeUL.innerHTML = `
        <li>
            <p>No Nodes to show. Please add some Nodes.</p>
        </li> `;
    }
    

    let toggler = document.getElementsByClassName("treeCaret");
    for (let i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nestedTree").classList.toggle("activeTree");
        this.classList.toggle("treeCare-down");
        });
    }

    let renameNodeFromTree = document.getElementsByClassName("rename-node-tree");
    for (let i = 0; i < renameNodeFromTree.length; i++) {
        renameNodeFromTree[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nestedTree").classList.toggle("activeTree");
        // this.classList.toggle("caret-down");
        });
    }

    
}
                
LeftContainer.addEventListener("click",()=>{
    if(sidebar.classList.contains("sidebar-close")){
        openSidebar();
    }else{
        closeSidebar()
    }
},false)

window.addEventListener('resize',(e)=>{
    if(e.currentTarget.innerWidth<990){
        closeSidebar();
    }else{
        openSidebar();
    }
},false);

window.addEventListener('load',(e)=>{
    
    if(e.currentTarget.innerWidth<990){
        closeSidebar();
    }else{
        openSidebar();
    }
},false);



//handle button clicks

browseLinesButton.addEventListener("click",()=>{
    if(browseLinesButton.children[0].innerText == "Close Lines Browser"){
        closeLinesTree();
        browseLinesButton.children[0].innerText = "Open Lines Browser";
    }else{
        openLinesTree();
        browseLinesButton.children[0].innerText = "Close Lines Browser";
    }
},false);
browseNodesButton.addEventListener("click",()=>{
    if(browseNodesButton.children[0].innerText == "Close Nodes Browser"){
        closeNodesTree();
        browseNodesButton.children[0].innerText = "Open Nodes Browser";
    }else{
        openNodesTree();
        browseNodesButton.children[0].innerText = "Close Nodes Browser";
    }
},false);

adjMatButton.addEventListener("click",()=>{
    if(adjMatButton.children[0].innerText == "Hide Adjacency Matrix"){
        closeAdjMatrix();
        adjMatButton.children[0].innerText = "Show Adjacency Matrix";
    }else{
        openAdjMatrix();
        adjMatButton.children[0].innerText = "Hide Adjacency Matrix";
    }
},false);

incdMatButton.addEventListener("click",()=>{
    if(incdMatButton.children[0].innerText == "Hide Incidence Matrix"){
        closeIncdMatrix();
        incdMatButton.children[0].innerText = "Show Incidence Matrix";
    }else{
        openIncdMatrix();
        incdMatButton.children[0].innerText = "Hide Incidence Matrix";
    }
},false);