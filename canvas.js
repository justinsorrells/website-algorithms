import Percolation from "./percolation.js";
import PercolationStats from "./percolationStats.js";
import SwapMenu from "./swapMenu.js";

const canvas = document.querySelector("canvas");
canvas.height = 600;
canvas.width = 600;
const ctx = canvas.getContext("2d");
const ctxHeight = canvas.offsetHeight;
const ctxWidth = canvas.offsetWidth;
const n = document.querySelector("#n");
const t = document.querySelector("#t");
const percolationLabel = document.querySelector("#percolationLabel");
const runSim = document.querySelector("#runSim");

let perc;

function createGrid()
{
    ctx.clearRect(0, 0, ctxWidth, ctxHeight);
    percolationLabel.textContent = "False";
    ctx.fillStyle = "black";
    let nValue = n.value;
    perc = new Percolation(nValue);
    let squareSize = getSquareSize(canvas, nValue);
    for (let i = 0; i < nValue; i++)
    {
        for (let j = 0; j < nValue; j++)
        {
            ctx.fillRect(j * squareSize, i * squareSize, squareSize-1, squareSize-1);
        }
    }
}

function getSquareSize(canvas, n)
{
    const canvasHeight = canvas.offsetHeight;
    const squareSize = Math.floor(canvasHeight / n);
    return squareSize;
}

function getClickPosition(canvas, event, nValue, perc, menu)
{
    if (menu.state == true) { return ; }
    const squareSize = getSquareSize(canvas, nValue);
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let row = Math.floor(y / squareSize);
    let col = Math.floor(x / squareSize);
    perc.open(row, col);
    perc.fillGrid(canvas, nValue, ctx, getSquareSize);
    if(perc.percolates())
    {
        percolationLabel.textContent = "True";
    }
}

function getPercolationStats(e, n)
{
    let stats = new PercolationStats(n, canvas, ctx, getSquareSize, t);
    stats.runRound();
}

function setEventListeners(menu)
{
    canvas.addEventListener("click", (e) => {
        getClickPosition(canvas, e, n.value, perc, menu);
    });
    runSim.addEventListener("click", (e) => {
        getPercolationStats(e, n);
    })
}

window.addEventListener("load", () => {
    const menu = new SwapMenu();
    createGrid();
    n.addEventListener("change", createGrid);
    setEventListeners(menu, perc);
});