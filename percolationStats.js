import Percolation from "./percolation.js";

class PercolationStats {
    data;
    constructor(n)
    {
        this.data = Array(n);
        for (let i = 0; i < 5; i++)
        {
            let perc = new Percolation(n);
            while (!perc.percolates())
            {
                console.log("opening");
                perc.open(this.getRandomNumber(n), this.getRandomNumber(n));
            }
            console.log(perc.numberOfOpenSites());
            this.data[i] = (perc.numberOfOpenSites() / (n*n));
        }
    }

    getRandomNumber(n)
    {
        return Math.floor(Math.random() * n);
    }
}

export default PercolationStats;