import Percolation from "./percolation.js";

const canvas = document.querySelector("canvas");
canvas.height = 600;
canvas.width = 600;
const ctx = canvas.getContext("2d");
const ctxHeight = canvas.offsetHeight;
const ctxWidth = canvas.offsetWidth;
const n = document.querySelector("#n");
const percolationLabel = document.querySelector("#percolationLabel");

function getSquareSize(canvas, n)
{
    const canvasHeight = canvas.offsetHeight;
    const squareSize = Math.floor(canvasHeight / n);
    return squareSize;
}

function getClickPosition(canvas, event, nValue, perc)
{
    const squareSize = getSquareSize(canvas, nValue);
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let row = Math.floor(y / squareSize);
    let col = Math.floor(x / squareSize);
    perc.open(row, col);
    ctx.clearRect(0, 0, ctxWidth, ctxHeight);
    ctx.fillStyle = "#000000";
    for (let i = 0; i < nValue; i++)
        {
            for (let j = 0; j < nValue; j++)
            {
                if (perc.isFull(i, j) == true)
                {
                    ctx.fillStyle = "#00FF00"; 
                    ctx.fillRect(j * squareSize, i * squareSize, squareSize-1, squareSize-1);
                }
                else if (perc.isOpen(i, j) == true)
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
    if(perc.percolates())
    {
        percolationLabel.textContent = "True";
    }
}

window.addEventListener("load", () => {
    let perc;
    n.addEventListener("change", (e) => {
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);
        percolationLabel.textContent = "False";
        ctx.fillStyle = "black";
        let nValue = e.target.value;
        perc = new Percolation(nValue);
        let squareSize = getSquareSize(canvas, nValue);
        for (let i = 0; i < nValue; i++)
        {
            for (let j = 0; j < nValue; j++)
            {
                ctx.fillRect(j * squareSize, i * squareSize, squareSize-1, squareSize-1);
            }
        }
    })

    canvas.addEventListener("mousedown", (e) => {
        getClickPosition(canvas, e, n.value, perc);
    });
});