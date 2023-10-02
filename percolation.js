import QuickUnion from "./quickUnion.js";

export class Percolation {
    board;
    sz;
    UF;
    altUF;
    virtualTop;
    virtualBottom;
    percolationFlag = false;
    openSites;
    
    constructor(n)
    {
        this.UF = new QuickUnion((n*n) + 1);
        this.altUF = new QuickUnion((n*n) + 2);
        this.board = Array(n);
        this.sz = n;
        this.openSites = 0;
        for (let i = 0; i < n; i++)
        {
            this.board[i] = 0;
        }
        this.virtualTop = (n*n);
        this.virtualBottom = (n*n) + 1;
    }

    open(row, col)
    {
        const id = this.convertCoordinatesTo1D(row, col);
        if (this.board[id] == 1) { return ;}
        this.board[id] = 1;
        this.openSites++;
        if (id < this.sz)
        {
            this.UF.union(this.virtualTop, id);
            this.altUF.union(this.virtualTop, id);
        }
        if (id >= (this.sz * (this.sz - 1)))
        {
            this.altUF.union(this.virtualBottom, id);
        }
        this.connectToNeighbor(id, row-1, col);
        this.connectToNeighbor(id, row+1, col);
        this.connectToNeighbor(id, row, col-1);
        this.connectToNeighbor(id, row, col+1);
    }

    isOpen(row, col)
    {
        const id = this.convertCoordinatesTo1D(row, col);
        if (this.board[id] == 1) { return true; }
        return false;
    }

    isFull(row, col)
    {
        const id = this.convertCoordinatesTo1D(row, col);
        if (this.UF.find(id) == this.UF.find(this.virtualTop)) { return true; }
        return false;
    }

    percolates()
    {
        if (this.percolationFlag == true) { return this.percolationFlag }
        if (this.altUF.find(this.virtualBottom) == this.altUF.find(this.virtualTop))
        {
            this.percolationFlag = true;
        }
        return this.percolationFlag;
    }

    convertCoordinatesTo1D(row, col)
    {
        let x = row * this.sz;
        let y = col;
        return (x + y);
    }

    connectToNeighbor(id, row, col)
    {
        if (this.isValidCoords(row, col) && this.isOpen(row, col))
        {
            const neighborId = this.convertCoordinatesTo1D(row, col);
            this.UF.union(id, neighborId);
            this.altUF.union(id, neighborId);
        }
    }

    isValidCoords(row, col)
    {
        if ((row >= 0 && col >= 0) && (row < this.sz && col < this.sz))
        {
            return true;
        }
        return false;
    }

    numberOfOpenSites()
    {
        return this.openSites;
    }

    fillGrid(canvas, nValue, ctx, getSquareSize)
    {
        const squareSize = getSquareSize(canvas, nValue);
        ctx.clearRect(0, 0, canvas.offsetHeight, canvas.offsetWidth);
        ctx.fillStyle = "#000000";
        for (let i = 0; i < nValue; i++)
            {
                for (let j = 0; j < nValue; j++)
                {
                    if (this.isFull(i, j) == true)
                    {
                        ctx.fillStyle = "#00FF00"; 
                        ctx.fillRect(j * squareSize, i * squareSize, squareSize-1, squareSize-1);
                    }
                    else if (this.isOpen(i, j) == true)
                    {
                        ctx.fillStyle = "#e0e0e0";
                        ctx.fillRect(j * squareSize, i * squareSize, squareSize-1, squareSize-1);
                    }
                    else
                    {
                        ctx.fillStyle = "#000000";
                        ctx.fillRect(j * squareSize, i * squareSize, squareSize-1, squareSize-1); 
                    }
                }
            }
    }
}

export default Percolation;