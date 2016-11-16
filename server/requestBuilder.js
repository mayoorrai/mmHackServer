module.exports = {
    generateRequestForTimeseries: function(body) {
        var requestLoad = {};
        // build request and push to requestLoad queue
        var timeseries_url = "https://time-series-store-predix.run.aws-usw02-pr.ice.predix.io/v1/datapoints";
        var timeseries_zone_id   = '3bc48f70-1519-4b27-a713-cbeb6e6fc60f';

        var options = {
                   method: 'POST',
                   url: timeseries_url,
                   headers : {
                         'Accept': 'application/json, application/x-www-form-urlencoded',
                         'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiI2NWVkN2U3NzU4MDc0NDE5OGFmN2U5YTJjZjk1Mzc2ZCIsInN1YiI6ImhhY2thdGhvblVBQSIsInNjb3BlIjpbInRpbWVzZXJpZXMuem9uZXMuM2JjNDhmNzAtMTUxOS00YjI3LWE3MTMtY2JlYjZlNmZjNjBmLnVzZXIiLCJ0aW1lc2VyaWVzLnpvbmVzLjNiYzQ4ZjcwLTE1MTktNGIyNy1hNzEzLWNiZWI2ZTZmYzYwZi5xdWVyeSIsInVhYS5ub25lIiwidGltZXNlcmllcy56b25lcy4zYmM0OGY3MC0xNTE5LTRiMjctYTcxMy1jYmViNmU2ZmM2MGYuaW5nZXN0Il0sImNsaWVudF9pZCI6ImhhY2thdGhvblVBQSIsImNpZCI6ImhhY2thdGhvblVBQSIsImF6cCI6ImhhY2thdGhvblVBQSIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJyZXZfc2lnIjoiOTQxYTMyZTEiLCJpYXQiOjE0NzkzMTI4OTcsImV4cCI6MTQ3OTM1NjA5NywiaXNzIjoiaHR0cHM6Ly9mZmE4MDg3Yy02YmVmLTRmODMtOWZmYi01YmU2N2ZjYWMzODgucHJlZGl4LXVhYS5ydW4uYXdzLXVzdzAyLXByLmljZS5wcmVkaXguaW8vb2F1dGgvdG9rZW4iLCJ6aWQiOiJmZmE4MDg3Yy02YmVmLTRmODMtOWZmYi01YmU2N2ZjYWMzODgiLCJhdWQiOlsidGltZXNlcmllcy56b25lcy4zYmM0OGY3MC0xNTE5LTRiMjctYTcxMy1jYmViNmU2ZmM2MGYiLCJoYWNrYXRob25VQUEiXX0.WT7dc5cMbbouNIcIS48WRAteqeUPGWCpVc_zdB0HiTGXn4gpT0ngpVYXLdQcU7XO5tqGPS8OYdUsc0D-249YYhDz0W4ZDfu-30fdF2vz9AmxmV8TlKL1I1TjHLa0UXFMCaj_4EyhV2w1vYI8P_wJ8dBIy9miB48JmjsobHz9jbrRQQWrB83UiUUTP5Po-yDr8tuk_dBPWFNRxbmAqtjfRXhFS0W0fNmpDE3Q-hjYkAcb0B_Zj8tYJEcn7zthnAmQBKslrBfWU23MQR7QNeu9eeZhMd1szTeK8qaspOcjTpveqI9BmEoTmvaG4YBRtk9VATcmFqa67wUjoIK_OLeP2w',
                         'Predix-Zone-Id': timeseries_zone_id
                     },
                   json : body
           }
        return options;
    }
}