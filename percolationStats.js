import Percolation from "./percolation.js";

class PercolationStats {
    data;
    canvas;
    ctx;
    getSquareSize;
    trials;
    round;
    perc;
    length;
    nSlider;
    tSlider;
    state;

    generateSimulation(n, canvas, ctx, getSquareSize, t)
    {
        this.data = Array(n.value);
        this.canvas = canvas;
        this.ctx = ctx;
        this.getSquareSize = getSquareSize;
        this.trials = t.value;
        this.length = n.value;
        this.round = 0;
        this.perc = new Percolation(n.value);
        this.nSlider = n;
        this.tSlider = t;
    }

    getRandomNumber(n)
    {
        return Math.floor(Math.random() * n);
    }

    runRound()
    {
        if (this.checkNumberOfTrials() || this.checkForGridSizeChange() || this.checkForTrialSizeChange())
        {
            this.displayStats();
            this.state = 0;
            return ;
        }
        setTimeout(() => {
            this.perc.open(this.getRandomNumber(this.length), this.getRandomNumber(this.length));
            this.perc.fillGrid(this.canvas, this.length, this.ctx, this.getSquareSize);
            this.doesPercolate();
        }, 1);
    }

    checkForGridSizeChange()
    {
        if (this.length !== this.nSlider.value)
        {
            return true;
        }
        return false;
    }

    checkNumberOfTrials()
    {
        if (this.round >= this.trials)
        {
            return true;
        }
        return false;
    }

    checkForTrialSizeChange()
    {
        console.log(this.trials + " " + this.tSlider.value);
        if (this.trials !== this.tSlider.value)
        {
            return true;
        }
        return false;
    }

    displayConfidenceLow()
    {
        const confidenceLowSpan = document.querySelector("#confidenceLow");
        let confidenceLow = this.getConfidenceLow();
        confidenceLowSpan.textContent = confidenceLow;
    }

    displayConfidenceHigh()
    {
        const confidenceHighSpan = document.querySelector("#confidenceHigh");
        let confidenceHigh = this.getConfidenceHigh();
        confidenceHighSpan.textContent = confidenceHigh;
    }

    displayMean()
    {
        const meanSpan = document.querySelector("#mean");
        let mean = this.getMeanOfData();
        meanSpan.textContent = mean;
    }

    displayStddev()
    {
        const stddevSpan = document.querySelector("#stddev");
        let stddev = this.getStandardDeviationOfData();
        stddevSpan.textContent = stddev;
    }

    displayStats()
    {
        this.displayStatsLabels();
        this.displayConfidenceHigh();
        this.displayConfidenceLow();
        this.displayMean();
        this.displayStddev();
    }

    displayStatsLabels()
    {
        const formStats = document.querySelector(".form__stats");
        formStats.style.display = "block";
    }

    doesPercolate()
    {
        if (!this.perc.percolates()) { 
            this.runRound((this.canvas, this.length, this.ctx, this.getSquareSize))
        }
        else
        {
            this.recordPercolationRoundIntoDataArray();
            this.perc = new Percolation(this.length);
            this.runRound((this.canvas, this.length, this.ctx, this.getSquareSize));

        }
    }

    getConfidenceLow()
    {
        return this.getMeanOfData() - (( 1.96 * this.getStandardDeviationOfData() ) / Math.sqrt( this.trials ));
    }

    getConfidenceHigh()
    {
        return this.getMeanOfData() + (( 1.96 * this.getStandardDeviationOfData() ) / Math.sqrt( this.trials ));
    }

    getMeanOfData()
    {
        return (this.data.reduce((a, b) => a + b, 0) / this.data.length);
    }

    getStandardDeviationOfData()
    {
        let mean = this.getMeanOfData();
        return Math.sqrt(this.data.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / this.data.length);
    }

    hideStats()
    {
        const formStats = document.querySelector(".form__stats");
        formStats.style.display = "none";
    }

    get state()
    {
        return this.state;
    }

    set state(status)
    {
        this.state = status;
    }

    recordPercolationRoundIntoDataArray()
    {
        this.data[this.round] = (this.perc.numberOfOpenSites() / (this.length*this.length));
        this.round++;
    }
}

export default PercolationStats;