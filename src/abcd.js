function FreeSpace(z){
    return [[1, z], [0, 1]]
}

function ThinLens(f){
    return [[1,0], [-1/f, 1]]
}

class GaussianBeam{
    constructor(radius, waist, wavelength=1064e-9){
        this.wavelength = wavelength;
        this.value = math.divide(1, math.complex(1/radius, -wavelength/(math.pi*waist**2)));
    }
    get inverseQ(){ 
        return math.divide(1, this.value); 
    }
    get radius(){ 
        return 1/this.inverseQ.re; 
    }
    get rayleighRange(){ 
        return -1/this.inverseQ.im; 
    }
    get waist(){ 
        return math.sqrt(this.wavelength/math.pi * this.rayleighRange); 
    }
    propogate(matrix){
        let a = matrix[0][0];
        let b = matrix[0][1];
        let c = matrix[1][0];
        let d = matrix[1][1];
        let v = math.divide(
                math.add(math.multiply(a,this.value), b),
                math.add(math.multiply(c,this.value), d)
            );
        let newq = new GaussianBeam(this.radius, this.waist, this.wavelength);
        newq.value = math.complex(v.re, v.im);
        return newq;
    }
    goThrough(elements, x){
        var sortedElements = elements.slice().sort( (a, b) => { return a.x-b.x });
        var data = x.map(xx => {
            let curx = 0;
            let q = this.propogate(FreeSpace(0));
            sortedElements
                .filter((e)=>{ return e.x <= xx })
                .forEach((e)=>{
                        q = q.propogate(FreeSpace(e.x-curx))
                            .propogate(e.abcd);
                        curx = e.x;
                });
            q = q.propogate(FreeSpace(xx-curx));
            return [xx, q.waist];
        });
        return data;
    }
}
