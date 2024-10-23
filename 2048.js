document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("game-container");
    const size = 4;
    const tiles = [];
    const tileElements = [];

    // Initialize the board
    function init() {
        container.innerHTML = "";
        for (let i = 0; i < size; i++) {
            tiles[i] = Array(size).fill(0);
        }
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const tile = document.createElement("div");
                tile.className = "tile";
                container.appendChild(tile);
                tile.style.top = `${r * 100}px`;
                tile.style.left = `${c * 100}px`;
                tileElements.push(tile);
            }
        }
        addRandomTile();
        addRandomTile();
        updateTiles();
    }

    function addRandomTile() {
        let emptyTiles = [];
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (tiles[r][c] === 0) {
                    emptyTiles.push({ r, c });
                }
            }
        }
        if (emptyTiles.length > 0) {
            const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            tiles[r][c] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    function updateTiles() {
        tileElements.forEach((tile, index) => {
            const r = Math.floor(index / size);
            const c = index % size;
            const value = tiles[r][c];
            tile.textContent = value ? value : "";
            tile.style.backgroundColor = value ? getTileColor(value) : "#eee4da";
        });
    }

    function getTileColor(value) {
        switch (value) {
            case 2: return "#eee4da";
            case 4: return "#ede0c8";
            case 8: return "#f2b179";
            case 16: return "#f59563";
            case 32: return "#f67c5f";
            case 64: return "#f65e3b";
            case 128: return "#edcf72";
            case 256: return "#edcc61";
            case 512: return "#edc850";
            case 1024: return "#edc53f";
            case 2048: return "#edc22e";
            default: return "#3c3a32";
        }
    }

    // Handle user input
    function handleInput(event) {
        switch (event.key) {
            case "ArrowUp":
                moveTiles(-1, 0);
                break;
            case "ArrowDown":
                moveTiles(1, 0);
                break;
            case "ArrowLeft":
                moveTiles(0, -1);
                break;
            case "ArrowRight":
                moveTiles(0, 1);
                break;
        }
        addRandomTile();
        updateTiles();
    }

    function moveTiles(dRow, dCol) {
        const tempTiles = tiles.map(row => row.slice());
        for (let r = dRow < 0 ? 0 : size - 1; dRow < 0 ? r < size : r >= 0; dRow < 0 ? r++ : r--) {
            for (let c = dCol < 0 ? 0 : size - 1; dCol < 0 ? c < size : c >= 0; dCol < 0 ? c++ : c--) {
                let row = r;
                let col = c;
                while (true) {
                    let nextRow = row + dRow;
                    let nextCol = col + dCol;
                    if (nextRow < 0 || nextRow >= size || nextCol < 0 || nextCol >= size) break;
                    if (tiles[nextRow][nextCol] === 0) {
                        tiles[nextRow][nextCol] = tiles[row][col];
                        tiles[row][col] = 0;
                        row = nextRow;
                        col = nextCol;
                    } else if (tiles[nextRow][nextCol] === tiles[row][col]) {
                        tiles[nextRow][nextCol] *= 2;
                        tiles[row][col] = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }

    init();
    document.addEventListener("keydown", handleInput);
});
