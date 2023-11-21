var rows = 4;
var columns = 4;
var currTile;
var otherTile;
var turns = 0;

// TRABALHOS
const workItems = [
    {
        imageSrc: "work/VI_artefacto.png",
        title: "A Week in My Natural Habitat (Poster)",
        category: "Visualização de Informação",
        year: 2023
    },
    {
        imageSrc: "work/artefactos_mini.png",
        title: "A Week in My Natural Habitat (Detail)",
        category: "Visualização de Informação",
        year: 2023
    },
    {
        imageSrc: "work/impulso.png",
        title: "Festival Impuslo (Flyer)",
        category: "Tipografia",
        year: 2022
    }
];

// NAVIGATE

function navigate(url) {
    window.location.href = url;
}

/* ABOUT */

// ADJUST PIECES CONTAINER TO WINDOW
function updatePiecesWidth() {
    var pieceContainer = document.getElementById('pieces');
    var numPieces = pieceContainer.childElementCount;
    var pieceWidth = 100;
    var margin = 4;
    var containerWidth = Math.floor((window.innerWidth - 20) / (pieceWidth + margin)) * (pieceWidth + margin);

    pieceContainer.style.width = containerWidth + 'px';
}

window.addEventListener('resize', updatePiecesWidth);

// CREATE BOARD AND PIECES

window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./images/blank.png";

            // DRAG ACTIONS
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }

    // pieces
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString());
    }
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    let pic = Math.floor((Math.random() * 5) + 1);
    document.getElementById("info").getElementsByTagName("p")[0].innerText = getPuzzleText(pic);

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./images/" + pic + "_" + pieces[i] + "-100.jpg";

        // DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);
    }

    updatePiecesWidth();
}

// CHANGE TEXT DEPENDING ON PUZZLE

function getPuzzleText(pic) {
    switch (pic) {
        case 1:
            return "This is my older cat";
        case 2:
            return "This is my face";
        case 3:
            return "This is my younger cat";
        case 4:
            return "This is where I study";
        case 5:
            return "This is where I'm from";
            
        default:
            return "ERROR";
    }
}

// DRAG TILES

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;

    // Update the pieces container width after the drag and drop operation
    updatePiecesWidth();
}

/* ABOUT */
function loadWorkItems() {
    const workContainer = document.querySelector('.work');

    workItems.forEach(item => {
        const workItem = document.createElement('div');
        workItem.classList.add('work-item');

        const frame = document.createElement('img');
        frame.classList.add('frame');
        frame.src = item.imageSrc;
        frame.alt = item.title;

        const description = document.createElement('div');
        description.classList.add('description');

        const title = document.createElement('h2');
        title.textContent = item.title;

        const category = document.createElement('p');
        category.textContent = item.category + ', ' + item.year;

        // Append elements to their respective parents
        description.appendChild(title);
        description.appendChild(category);

        workItem.appendChild(frame);
        workItem.appendChild(description);

        // Append the work item to the work container
        workContainer.appendChild(workItem);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('work.html')) {
        loadWorkItems();
    }
});