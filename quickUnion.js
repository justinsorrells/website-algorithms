export class QuickUnion {
    id;
    sz;
    count;
    constructor(n)
    {
        this.id = Array(n);
        this.sz = Array(n);
        for (let i = 0; i < n; i++)
        {
            this.id[i] = i;
        }
        this.count = n;
    }

    set count(n)
    {
        this.count = n;
    }

    get count()
    {
        return this.count;
    }

    find(p)
    {
        while (p != this.id[p])
        {
            this.id[p] = this.id[this.id[p]];
            p = this.id[p];
        }
        return p;
    }

    union(p, q)
    {
        let i = this.find(p);
        let j = this.find(q);
        if (i == j) return;
        if (this.sz[i] < this.sz[j])
        {
            this.id[i] = j;
            this.sz[j] += this.sz[i];
        }
        else
        {
            this.id[j] = i;
            this.sz[i] += this.sz[j];
        }
        this.count--;
    }
}

export default QuickUnion;