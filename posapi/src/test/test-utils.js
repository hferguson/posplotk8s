const utilsPkg = {
    getDiff: ( val1, val2, precision) => {
        
        let diff = parseFloat(val1) * Math.pow(10, precision)
                    - parseFloat(val2) * Math.pow(10, precision);
        return Math.abs(diff);
    },
    // Expect coords to be passed as [lat,lon] arrays
    compareCoords: (coords1, coords2, precision) => {
        let latDiff = utilsPkg.getDiff(coords1[0], coords2[0], precision);
        let lonDiff = utilsPkg.getDiff(coords1[1], coords2[1], precision);
        //console.log(`coord diffs: ${latDiff}, ${lonDiff}`);
        return (latDiff<1 && lonDiff<1);
    },
   

};
module.exports = utilsPkg;

