module.exports = {
    calculateValues: function(body) {
        // extract values array from each asset
        var asset1TSData = body.tags[0];
        var asset2TSData = body.tags[1];
        var asset1OCData = body.tags[2];
        var asset2OCData = body.tags[3];
        var asset1FQData = body.tags[4];
        var asset2FQData = body.tags[5];
        var asset1MLData = body.tags[6];
        var asset2MLData = body.tags[7];
        var asset1RRData = body.tags[8];
        var asset2RRData = body.tags[9];
        var asset3OCData = body.tags[10];
        var asset3PFData = body.tags[11];
        
        var retValue = {};
        retValue.aggregatedTimeSeriesData = this.getAggregatePower(asset1TSData, asset2TSData);
        retValue.avgPowerData = this.getAvgPower(asset1TSData, asset2TSData);
        retValue.maxPowerData = this.getMaxPower(asset1TSData, asset2TSData);
        retValue.frequencyData = this.getFrequency(asset1FQData, asset2FQData);
        retValue.rampRateData = this.getRampRate(asset1RRData, asset2RRData);
        retValue.minimumLoadData = this.getMinimumLoad(asset1MLData, asset2MLData);
        retValue.operatingCostData = this.getOperatingCost(asset1OCData, asset2OCData, asset3OCData);
        retValue.powerFactorData = this.getPowerFactor(asset3PFData);
        
        console.log(retValue);
        return retValue;
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
    },
    getOperatingCost: function(asset1, asset2, asset3) {
        var result = [];
        
        var asset1json = {};
        asset1json.name = asset1.name;
        asset1json.operatingCost = asset1.results[0].values[0][1];
        result.push(asset1json);
        
        var asset2json = {};
        asset2json.name = asset2.name;
        asset2json.operatingCost = asset2.results[0].values[0][1];
        result.push(asset2json);
        
        var asset3json = {};
        asset3json.name = asset3.name;
        asset3json.operatingCost = asset3.results[0].values[0][1];
        result.push(asset3json);
        
        return result;
    },
    getFrequency: function(asset1, asset2) {
        var result = [];
        
        var asset1json = {};
        asset1json.name = asset1.name;
        asset1json.frequency = asset1.results[0].values[0][1];
        result.push(asset1json);
        
        var asset2json = {};
        asset2json.name = asset2.name;
        asset2json.frequency = asset2.results[0].values[0][1];
        result.push(asset2json);
        
        return result;
    },
    getRampRate: function(asset1, asset2) {
        var result = [];
        
        var asset1json = {};
        asset1json.name = asset1.name;
        asset1json.rampRate = asset1.results[0].values[0][1];
        result.push(asset1json);
        
        var asset2json = {};
        asset2json.name = asset2.name;
        asset2json.rampRate = asset2.results[0].values[0][1];
        result.push(asset2json);
        
        return result;
    },
    getMinimumLoad: function(asset1, asset2) {
        var result = [];
        
        var asset1json = {};
        asset1json.name = asset1.name;
        asset1json.minimumLoad = asset1.results[0].values[0][1];
        result.push(asset1json);
        
        var asset2json = {};
        asset2json.name = asset2.name;
        asset2json.minimumLoad = asset2.results[0].values[0][1];
        result.push(asset2json);
        
        return result;
    },
    getPowerFactor: function(asset3) {
        var result = [];
        
        var asset3json = {};
        asset3json.name = asset3.name;
        asset3json.powerFactor = asset3.results[0].values[0][1];
        result.push(asset3json);
        
        return result;
    }
};