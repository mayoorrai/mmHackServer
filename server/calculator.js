module.exports = {
    calculatePower: function(body) {
        // extract values array from each asset
        var asset1Data = body.tags[0].results[0].values;
        var asset2Data = body.tags[1].results[0].values;
        
        var powerVal = asset1Data[0];
        console.log(powerVal[1]);
    }
};

//1. Send aggregated time-series
//    add power values from two params
//2. Average power for each
//3. Max power for each