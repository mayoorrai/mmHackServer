module.exports = {
    calculatePower: function(body) {
        // extract values array from each asset
        var asset1Data = body.tags[0];
        var asset2Data = body.tags[1];
        var retValue = {};
        retValue.aggregatedTimeSeriesData = this.getAggregatePower(asset1Data, asset2Data);
        retValue.avgPowerData = this.getAvgPower(asset1Data, asset2Data);
        retValue.maxPowerData = this.getMaxPower(asset1Data, asset2Data);
        console.log(JSON.stringify(retValue));
    },
    getAggregatePower: function(asset1, asset2) {
        var result = {};
        result.names = [asset1.name, asset2.name];
        result.powerVals = [];
        for (i in asset1.results[0].values) {
            result.powerVals[i] = asset1.results[0].values[i][1] + asset2.results[0].values[i][1];
        }
        return result;
    },
    getAvgPower: function(asset1, asset2) {
        var result = [];
        
        // build json and get avg power values...        
        var asset1json = {};
        asset1json.name = asset1.name;
        var sumPower = 0;
        for (i in asset1.results[0].values) {
            sumPower += asset1.results[0].values[i][1];
        }
        asset1json.avgPower = sumPower / asset1.results[0].values.length;
        result.push(asset1json);
        
        var asset2json = {};
        asset2json.name = asset2.name;
        var sumPower = 0;
        for (i in asset2.results[0].values) {
            sumPower += asset2.results[0].values[i][1];
        }
        asset2json.avgPower = sumPower / asset2.results[0].values.length;
        result.push(asset2json);
        
        return result;
    },
    getMaxPower: function(asset1, asset2) {
        var result = [];
        
        // build json and get max powers...       
        var asset1json = {};
        asset1json.name = asset1.name;
        var currentMaxValue = 0;
        for (i in asset1.results[0].values) {
            if (asset1.results[0].values[i][1] > currentMaxValue) {
                currentMaxValue = asset1.results[0].values[i][1];
            }
        }
        asset1json.maxPower = currentMaxValue;
        result.push(asset1json);
        
        var asset2json = {};
        asset2json.name = asset2.name;
        var currentMaxValue = 0;
        for (i in asset2.results[0].values) {
            if (asset2.results[0].values[i][1] > currentMaxValue) {
                currentMaxValue = asset2.results[0].values[i][1];
            }
        }
        asset2json.maxPower = currentMaxValue;
        result.push(asset2json);
        
        return result;
    }
};