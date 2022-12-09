export function gameOfLife (grid: number[][]) {
    const original = grid;
    const n = grid.length, m = grid[0].length;
    const operations =[[0,1],[1,0],[0,-1],[-1,0],[1,1],[-1,-1],[-1,1],[1,-1]]

    function countLiveNeighbors(r: number, c: number): number {
        let cnt: number = 0;

        operations.forEach(([x,y]) => {
            let newI = Math.min(x+r, n-1); 
            newI = Math.max(0, newI );
            let newJ = Math.min(m-1,y+c);
            newJ = Math.max(newJ, 0);
            if (grid[newI][newJ] === 1 || grid[newI][newJ] === 3) cnt++
        })

        return cnt;
    }

    for (let i = 0; i<n; i++) {
        for (let j = 0; j<m; j++) {
            const liveNeigh = countLiveNeighbors(i, j);
            if (grid[i][j]) {
                if (liveNeigh > 3 || liveNeigh < 2) {
                    grid[i][j] = 1;
                } 
                else {
                    grid[i][j] = 3;
                }
            } else {
                if (liveNeigh === 3) grid[i][j] = 2;
            }
        }
    }

    for (let i = 0; i<n; i++) {
        for (let j = 0; j<m; j++) {
            if (grid[i][j] === 1) grid[i][j] = 0;
            else if (grid[i][j] === 3 || grid[i][j] === 2) grid[i][j] = 1;
        }
    }

}

export function createGridCopy (grid: number[][]) {
    const n = grid.length, m = grid[0].length, newGrid = []
  
    for (let i = 0; i<n; i++) {
        const row = [];
        for (let j = 0; j<m; j++) {
            row.push(grid[i][j])
        }
        newGrid.push(row)
    }
    
    return newGrid
}

export function isGridSame(newGrid: number[][], oldGrid: number[][]) {
    const n = newGrid.length, m = newGrid[0].length;
    for (let i = 0; i<n; i++) {
        for (let j = 0; j<m; j++) {
            if (newGrid[i][j] !== oldGrid[i][j]) return false;
        }
    }
    return true;
}