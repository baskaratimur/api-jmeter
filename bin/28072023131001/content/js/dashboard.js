/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9252873563218391, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "Entitlement - entitle user"], "isController": false}, {"data": [0.5, 500, 1500, "Watch List - add to watchlist"], "isController": false}, {"data": [1.0, 500, 1500, "Login - login"], "isController": false}, {"data": [1.0, 500, 1500, "Entitlement -channel list"], "isController": false}, {"data": [1.0, 500, 1500, "payment - Payment By MNC Bank"], "isController": false}, {"data": [1.0, 500, 1500, "Content - deeplink to category"], "isController": false}, {"data": [1.0, 500, 1500, "Content - Get Upcoming Content List"], "isController": false}, {"data": [1.0, 500, 1500, "Req Password Reset"], "isController": false}, {"data": [1.0, 500, 1500, "Deleted - getAPI"], "isController": false}, {"data": [1.0, 500, 1500, "Search api -> select content"], "isController": false}, {"data": [0.5, 500, 1500, "atv login - ATV login"], "isController": false}, {"data": [1.0, 500, 1500, "Entitlement -alive"], "isController": false}, {"data": [1.0, 500, 1500, "Content - Get Content Bundle List"], "isController": false}, {"data": [1.0, 500, 1500, "Entitlement - get channel  list"], "isController": false}, {"data": [1.0, 500, 1500, "Versioning - Version status"], "isController": false}, {"data": [1.0, 500, 1500, "Content - Get Indihome Children of Cluster Category"], "isController": false}, {"data": [0.5, 500, 1500, "History - send history"], "isController": false}, {"data": [1.0, 500, 1500, "Content - alive"], "isController": false}, {"data": [1.0, 500, 1500, "Content - Get Cluster Category"], "isController": false}, {"data": [1.0, 500, 1500, "Deleted - Delete Confirmation"], "isController": false}, {"data": [1.0, 500, 1500, "Deleted - check deletion status"], "isController": false}, {"data": [1.0, 500, 1500, "Entitlement - entitle pay tv user"], "isController": false}, {"data": [1.0, 500, 1500, "payment - alive"], "isController": false}, {"data": [1.0, 500, 1500, "Content - Get Content Detail"], "isController": false}, {"data": [1.0, 500, 1500, "Login Mobile Number"], "isController": false}, {"data": [1.0, 500, 1500, "Api legacy to nextgen - Get Watchlist Content List"], "isController": false}, {"data": [1.0, 500, 1500, "Login"], "isController": false}, {"data": [1.0, 500, 1500, "Search api -> get search history list"], "isController": false}, {"data": [1.0, 500, 1500, "Paytv(playbox) - Check by Customer ID"], "isController": false}, {"data": [1.0, 500, 1500, "Api legacy to nextgen - Add to watchlist"], "isController": false}, {"data": [0.5, 500, 1500, "atv login - get ATV login"], "isController": false}, {"data": [0.5, 500, 1500, "content tools - get status"], "isController": false}, {"data": [1.0, 500, 1500, "Entitlement - check content lock"], "isController": false}, {"data": [1.0, 500, 1500, "Content - Get Sub Category List"], "isController": false}, {"data": [1.0, 500, 1500, "Get Profile Info"], "isController": false}, {"data": [1.0, 500, 1500, "payment - Get Product Detail"], "isController": false}, {"data": [1.0, 500, 1500, "Entitlement - get player"], "isController": false}, {"data": [1.0, 500, 1500, "Content - Get Content List"], "isController": false}, {"data": [0.0, 500, 1500, "content tools - reset quiz"], "isController": false}, {"data": [1.0, 500, 1500, "Content - Get  Content  List Tvod"], "isController": false}, {"data": [1.0, 500, 1500, "Content - Get Episode List"], "isController": false}, {"data": [1.0, 500, 1500, "Deleted - Wording Account Deletion"], "isController": false}, {"data": [0.5, 500, 1500, "Entitlement - check entitlement"], "isController": false}, {"data": [1.0, 500, 1500, "Entitlement -  player v2"], "isController": false}, {"data": [1.0, 500, 1500, "Visitor"], "isController": false}, {"data": [0.5, 500, 1500, "token ETERNAL PROD"], "isController": false}, {"data": [1.0, 500, 1500, "Entitlement - get package detail"], "isController": false}, {"data": [1.0, 500, 1500, "Content - Get Children of Cluster Category Content"], "isController": false}, {"data": [0.0, 500, 1500, "Api legacy to nextgen - otp"], "isController": false}, {"data": [1.0, 500, 1500, "Versioning -alive"], "isController": false}, {"data": [1.0, 500, 1500, "Content - Get Content Detail (legacy)"], "isController": false}, {"data": [1.0, 500, 1500, "payment - Get Operator List"], "isController": false}, {"data": [1.0, 500, 1500, "atv login - ATV logout"], "isController": false}, {"data": [1.0, 500, 1500, "Search api -> get search suggestion"], "isController": false}, {"data": [1.0, 500, 1500, "Watch List -remove from watchlist"], "isController": false}, {"data": [1.0, 500, 1500, "APP CONFIG -get app config list"], "isController": false}, {"data": [1.0, 500, 1500, "Search api -> get popular search"], "isController": false}, {"data": [0.5, 500, 1500, "Mail Service - send email verify"], "isController": false}, {"data": [1.0, 500, 1500, "Content - Get  Content TVOD List"], "isController": false}, {"data": [1.0, 500, 1500, "payment - checking operator"], "isController": false}, {"data": [1.0, 500, 1500, "payment - Get Product List"], "isController": false}, {"data": [1.0, 500, 1500, "payment - Payment By OVO"], "isController": false}, {"data": [1.0, 500, 1500, "Content - Get Content Core Detail"], "isController": false}, {"data": [1.0, 500, 1500, "Entitlement -  player"], "isController": false}, {"data": [1.0, 500, 1500, "Versioning - Get version status"], "isController": false}, {"data": [1.0, 500, 1500, "Entitlement - get package list"], "isController": false}, {"data": [1.0, 500, 1500, "Paytv(playbox) - login"], "isController": false}, {"data": [1.0, 500, 1500, "payment - provider list"], "isController": false}, {"data": [1.0, 500, 1500, "payment - Get Payment Method List"], "isController": false}, {"data": [1.0, 500, 1500, "History - reset history"], "isController": false}, {"data": [1.0, 500, 1500, "Entitlement -  player v2 ios"], "isController": false}, {"data": [1.0, 500, 1500, "Search api -> clear all history search "], "isController": false}, {"data": [1.0, 500, 1500, "Search api -> search content"], "isController": false}, {"data": [1.0, 500, 1500, "Sign Up"], "isController": false}, {"data": [1.0, 500, 1500, "Entitlement - get user type"], "isController": false}, {"data": [1.0, 500, 1500, "Api legacy to nextgen - Get Watchlist status"], "isController": false}, {"data": [1.0, 500, 1500, "Api legacy to nextgen - remove from watchlist"], "isController": false}, {"data": [1.0, 500, 1500, "Search api v2-> Search content"], "isController": false}, {"data": [1.0, 500, 1500, "Entitlement - get user package list"], "isController": false}, {"data": [1.0, 500, 1500, "payment - Get Transaction Detail"], "isController": false}, {"data": [1.0, 500, 1500, "Search api -> delete history search"], "isController": false}, {"data": [1.0, 500, 1500, "MNC life - Gateway"], "isController": false}, {"data": [1.0, 500, 1500, "Content - Get Homepage Content List"], "isController": false}, {"data": [1.0, 500, 1500, "Content - get banner"], "isController": false}, {"data": [1.0, 500, 1500, "Api legacy to nextgen - request otp"], "isController": false}, {"data": [1.0, 500, 1500, "Content - Get Children of Cluster Category"], "isController": false}, {"data": [1.0, 500, 1500, "Content - Get Homepage List"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 87, 0, 0.0, 332.20689655172407, 5, 11499, 55.0, 683.0, 880.9999999999993, 11499.0, 2.815260654305407, 10.855097502669643, 1.382444412759279], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Entitlement - entitle user", 1, 0, 0.0, 925.0, 925, 925, 925.0, 925.0, 925.0, 925.0, 1.0810810810810811, 0.5268158783783784, 0.5996621621621622], "isController": false}, {"data": ["Watch List - add to watchlist", 1, 0, 0.0, 767.0, 767, 767, 767.0, 767.0, 767.0, 767.0, 1.303780964797914, 1.1777318285528031, 0.5487593709256845], "isController": false}, {"data": ["Login - login", 1, 0, 0.0, 410.0, 410, 410, 410.0, 410.0, 410.0, 410.0, 2.4390243902439024, 4.053925304878049, 1.426733993902439], "isController": false}, {"data": ["Entitlement -channel list", 1, 0, 0.0, 189.0, 189, 189, 189.0, 189.0, 189.0, 189.0, 5.291005291005291, 78.8793816137566, 2.816013558201058], "isController": false}, {"data": ["payment - Payment By MNC Bank", 1, 0, 0.0, 345.0, 345, 345, 345.0, 345.0, 345.0, 345.0, 2.898550724637681, 4.987545289855073, 1.4436141304347827], "isController": false}, {"data": ["Content - deeplink to category", 1, 0, 0.0, 154.0, 154, 154, 154.0, 154.0, 154.0, 154.0, 6.493506493506494, 3.506747159090909, 3.037489853896104], "isController": false}, {"data": ["Content - Get Upcoming Content List", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 8.0, 125.0, 460.44921875, 56.884765625], "isController": false}, {"data": ["Req Password Reset", 1, 0, 0.0, 66.0, 66, 66, 66.0, 66.0, 66.0, 66.0, 15.151515151515152, 10.313091856060606, 7.634943181818182], "isController": false}, {"data": ["Deleted - getAPI", 1, 0, 0.0, 87.0, 87, 87, 87.0, 87.0, 87.0, 87.0, 11.494252873563218, 1.795977011494253, 5.129759339080461], "isController": false}, {"data": ["Search api -> select content", 1, 0, 0.0, 15.0, 15, 15, 15.0, 15.0, 15.0, 15.0, 66.66666666666667, 40.559895833333336, 34.1796875], "isController": false}, {"data": ["atv login - ATV login", 1, 0, 0.0, 691.0, 691, 691, 691.0, 691.0, 691.0, 691.0, 1.447178002894356, 1.3835813133140378, 0.9892818379160637], "isController": false}, {"data": ["Entitlement -alive", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 166.66666666666666, 83.17057291666667, 75.68359375], "isController": false}, {"data": ["Content - Get Content Bundle List", 1, 0, 0.0, 21.0, 21, 21, 21.0, 21.0, 21.0, 21.0, 47.61904761904761, 108.5844494047619, 21.995907738095237], "isController": false}, {"data": ["Entitlement - get channel  list", 1, 0, 0.0, 183.0, 183, 183, 183.0, 183.0, 183.0, 183.0, 5.46448087431694, 63.49257172131148, 2.657530737704918], "isController": false}, {"data": ["Versioning - Version status", 1, 0, 0.0, 71.0, 71, 71, 71.0, 71.0, 71.0, 71.0, 14.084507042253522, 15.446192781690142, 7.317341549295775], "isController": false}, {"data": ["Content - Get Indihome Children of Cluster Category", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 7.0, 142.85714285714286, 127.09263392857143, 68.77790178571428], "isController": false}, {"data": ["History - send history", 1, 0, 0.0, 815.0, 815, 815, 815.0, 815.0, 815.0, 815.0, 1.2269938650306749, 1.4558569785276074, 0.6805981595092025], "isController": false}, {"data": ["Content - alive", 1, 0, 0.0, 40.0, 40, 40, 40.0, 40.0, 40.0, 40.0, 25.0, 18.26171875, 11.2060546875], "isController": false}, {"data": ["Content - Get Cluster Category", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 8.0, 125.0, 777.587890625, 57.4951171875], "isController": false}, {"data": ["Deleted - Delete Confirmation", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 3.7923177083333335, 9.016927083333334], "isController": false}, {"data": ["Deleted - check deletion status", 1, 0, 0.0, 21.0, 21, 21, 21.0, 21.0, 21.0, 21.0, 47.61904761904761, 10.044642857142856, 25.204613095238095], "isController": false}, {"data": ["Entitlement - entitle pay tv user", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 9.456380208333334, 8.333333333333334], "isController": false}, {"data": ["payment - alive", 1, 0, 0.0, 50.0, 50, 50, 50.0, 50.0, 50.0, 50.0, 20.0, 14.58984375, 8.92578125], "isController": false}, {"data": ["Content - Get Content Detail", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 8.0, 125.0, 406.494140625, 57.2509765625], "isController": false}, {"data": ["Login Mobile Number", 1, 0, 0.0, 81.0, 81, 81, 81.0, 81.0, 81.0, 81.0, 12.345679012345679, 7.788387345679012, 7.294077932098765], "isController": false}, {"data": ["Api legacy to nextgen - Get Watchlist Content List", 1, 0, 0.0, 204.0, 204, 204, 204.0, 204.0, 204.0, 204.0, 4.901960784313726, 5.557789522058824, 2.130246629901961], "isController": false}, {"data": ["Login", 1, 0, 0.0, 227.0, 227, 227, 227.0, 227.0, 227.0, 227.0, 4.405286343612335, 2.9985200991189425, 2.5683163546255505], "isController": false}, {"data": ["Search api -> get search history list", 1, 0, 0.0, 21.0, 21, 21, 21.0, 21.0, 21.0, 21.0, 47.61904761904761, 29.38988095238095, 21.484375], "isController": false}, {"data": ["Paytv(playbox) - Check by Customer ID", 1, 0, 0.0, 141.0, 141, 141, 141.0, 141.0, 141.0, 141.0, 7.092198581560283, 10.672927748226952, 2.0777925531914896], "isController": false}, {"data": ["Api legacy to nextgen - Add to watchlist", 1, 0, 0.0, 77.0, 77, 77, 77.0, 77.0, 77.0, 77.0, 12.987012987012989, 8.307122564935066, 6.239853896103896], "isController": false}, {"data": ["atv login - get ATV login", 1, 0, 0.0, 672.0, 672, 672, 672.0, 672.0, 672.0, 672.0, 1.488095238095238, 1.7118908110119047, 0.8443196614583333], "isController": false}, {"data": ["content tools - get status", 1, 0, 0.0, 672.0, 672, 672, 672.0, 672.0, 672.0, 672.0, 1.488095238095238, 2.2684733072916665, 0.6742931547619048], "isController": false}, {"data": ["Entitlement - check content lock", 1, 0, 0.0, 28.0, 28, 28, 28.0, 28.0, 28.0, 28.0, 35.714285714285715, 24.76283482142857, 21.83314732142857], "isController": false}, {"data": ["Content - Get Sub Category List", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 7.0, 142.85714285714286, 126.25558035714286, 67.94084821428571], "isController": false}, {"data": ["Get Profile Info", 1, 0, 0.0, 26.0, 26, 26, 26.0, 26.0, 26.0, 26.0, 38.46153846153847, 24.939903846153847, 16.78936298076923], "isController": false}, {"data": ["payment - Get Product Detail", 1, 0, 0.0, 15.0, 15, 15, 15.0, 15.0, 15.0, 15.0, 66.66666666666667, 114.453125, 30.6640625], "isController": false}, {"data": ["Entitlement - get player", 1, 0, 0.0, 35.0, 35, 35, 35.0, 35.0, 35.0, 35.0, 28.57142857142857, 28.62723214285714, 13.671874999999998], "isController": false}, {"data": ["Content - Get Content List", 1, 0, 0.0, 33.0, 33, 33, 33.0, 33.0, 33.0, 33.0, 30.303030303030305, 346.29498106060606, 14.470880681818182], "isController": false}, {"data": ["content tools - reset quiz", 1, 0, 0.0, 11499.0, 11499, 11499, 11499.0, 11499.0, 11499.0, 11499.0, 0.08696408383337682, 0.0919747097573702, 0.04195337638055483], "isController": false}, {"data": ["Content - Get  Content  List Tvod", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 7.0, 142.85714285714286, 132.11495535714286, 66.12723214285714], "isController": false}, {"data": ["Content - Get Episode List", 1, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 9.0, 111.1111111111111, 1114.6918402777778, 53.493923611111114], "isController": false}, {"data": ["Deleted - Wording Account Deletion", 1, 0, 0.0, 11.0, 11, 11, 11.0, 11.0, 11.0, 11.0, 90.9090909090909, 247.9580965909091, 42.96875], "isController": false}, {"data": ["Entitlement - check entitlement", 1, 0, 0.0, 1151.0, 1151, 1151, 1151.0, 1151.0, 1151.0, 1151.0, 0.8688097306689835, 0.5463998696785404, 0.4674942984361425], "isController": false}, {"data": ["Entitlement -  player v2", 1, 0, 0.0, 82.0, 82, 82, 82.0, 82.0, 82.0, 82.0, 12.195121951219512, 21.281916920731707, 6.597751524390244], "isController": false}, {"data": ["Visitor", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 8.0, 125.0, 107.91015625, 54.0771484375], "isController": false}, {"data": ["token ETERNAL PROD", 1, 0, 0.0, 703.0, 703, 703, 703.0, 703.0, 703.0, 703.0, 1.4224751066856332, 2.364309210526316, 0.48203013869132294], "isController": false}, {"data": ["Entitlement - get package detail", 1, 0, 0.0, 253.0, 253, 253, 253.0, 253.0, 253.0, 253.0, 3.952569169960474, 148.85051259881422, 1.821887351778656], "isController": false}, {"data": ["Content - Get Children of Cluster Category Content", 1, 0, 0.0, 24.0, 24, 24, 24.0, 24.0, 24.0, 24.0, 41.666666666666664, 40.1611328125, 19.694010416666668], "isController": false}, {"data": ["Api legacy to nextgen - otp", 1, 0, 0.0, 4028.0, 4028, 4028, 4028.0, 4028.0, 4028.0, 4028.0, 0.24826216484607744, 0.1566185141509434, 0.14037479828699106], "isController": false}, {"data": ["Versioning -alive", 1, 0, 0.0, 11.0, 11, 11, 11.0, 11.0, 11.0, 11.0, 90.9090909090909, 69.51349431818183, 42.96875], "isController": false}, {"data": ["Content - Get Content Detail (legacy)", 1, 0, 0.0, 197.0, 197, 197, 197.0, 197.0, 197.0, 197.0, 5.076142131979695, 8.33300285532995, 2.5925999365482233], "isController": false}, {"data": ["payment - Get Operator List", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 155.078125, 93.9453125], "isController": false}, {"data": ["atv login - ATV logout", 1, 0, 0.0, 263.0, 263, 263, 263.0, 263.0, 263.0, 263.0, 3.802281368821293, 3.6054836026615966, 2.2316124049429655], "isController": false}, {"data": ["Search api -> get search suggestion", 1, 0, 0.0, 93.0, 93, 93, 93.0, 93.0, 93.0, 93.0, 10.752688172043012, 7.339969758064516, 4.998319892473118], "isController": false}, {"data": ["Watch List -remove from watchlist", 1, 0, 0.0, 181.0, 181, 181, 181.0, 181.0, 181.0, 181.0, 5.524861878453039, 4.947556975138122, 2.352382596685083], "isController": false}, {"data": ["APP CONFIG -get app config list", 1, 0, 0.0, 65.0, 65, 65, 65.0, 65.0, 65.0, 65.0, 15.384615384615385, 457.5871394230769, 7.7824519230769225], "isController": false}, {"data": ["Search api -> get popular search", 1, 0, 0.0, 11.0, 11, 11, 11.0, 11.0, 11.0, 11.0, 90.9090909090909, 2143.821022727273, 40.57173295454546], "isController": false}, {"data": ["Mail Service - send email verify", 1, 0, 0.0, 681.0, 681, 681, 681.0, 681.0, 681.0, 681.0, 1.4684287812041115, 1.342235682819383, 0.8302932268722466], "isController": false}, {"data": ["Content - Get  Content TVOD List", 1, 0, 0.0, 163.0, 163, 163, 163.0, 163.0, 163.0, 163.0, 6.134969325153374, 5.577789493865031, 2.743960889570552], "isController": false}, {"data": ["payment - checking operator", 1, 0, 0.0, 55.0, 55, 55, 55.0, 55.0, 55.0, 55.0, 18.18181818181818, 15.198863636363637, 9.250710227272727], "isController": false}, {"data": ["payment - Get Product List", 1, 0, 0.0, 54.0, 54, 54, 54.0, 54.0, 54.0, 54.0, 18.51851851851852, 304.07262731481484, 9.349681712962964], "isController": false}, {"data": ["payment - Payment By OVO", 1, 0, 0.0, 180.0, 180, 180, 180.0, 180.0, 180.0, 180.0, 5.555555555555555, 4.606119791666667, 2.8917100694444446], "isController": false}, {"data": ["Content - Get Content Core Detail", 1, 0, 0.0, 19.0, 19, 19, 19.0, 19.0, 19.0, 19.0, 52.63157894736842, 123.92064144736842, 24.054276315789473], "isController": false}, {"data": ["Entitlement -  player", 1, 0, 0.0, 24.0, 24, 24, 24.0, 24.0, 24.0, 24.0, 41.666666666666664, 42.236328125, 19.04296875], "isController": false}, {"data": ["Versioning - Get version status", 1, 0, 0.0, 21.0, 21, 21, 21.0, 21.0, 21.0, 21.0, 47.61904761904761, 52.548363095238095, 24.181547619047617], "isController": false}, {"data": ["Entitlement - get package list", 1, 0, 0.0, 31.0, 31, 31, 31.0, 31.0, 31.0, 31.0, 32.25806451612903, 466.92288306451616, 15.656502016129032], "isController": false}, {"data": ["Paytv(playbox) - login", 1, 0, 0.0, 416.0, 416, 416, 416.0, 416.0, 416.0, 416.0, 2.403846153846154, 3.1221829927884617, 1.3075608473557694], "isController": false}, {"data": ["payment - provider list", 1, 0, 0.0, 48.0, 48, 48, 48.0, 48.0, 48.0, 48.0, 20.833333333333332, 16.6015625, 9.46044921875], "isController": false}, {"data": ["payment - Get Payment Method List", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 166.66666666666666, 292.1549479166667, 80.56640625], "isController": false}, {"data": ["History - reset history", 1, 0, 0.0, 304.0, 304, 304, 304.0, 304.0, 304.0, 304.0, 3.289473684210526, 3.4661543996710527, 1.64794921875], "isController": false}, {"data": ["Entitlement -  player v2 ios", 1, 0, 0.0, 132.0, 132, 132, 132.0, 132.0, 132.0, 132.0, 7.575757575757576, 14.737215909090908, 4.34274384469697], "isController": false}, {"data": ["Search api -> clear all history search ", 1, 0, 0.0, 13.0, 13, 13, 13.0, 13.0, 13.0, 13.0, 76.92307692307693, 47.02524038461539, 36.73377403846154], "isController": false}, {"data": ["Search api -> search content", 1, 0, 0.0, 74.0, 74, 74, 74.0, 74.0, 74.0, 74.0, 13.513513513513514, 17.0238597972973, 7.033889358108109], "isController": false}, {"data": ["Sign Up", 1, 0, 0.0, 203.0, 203, 203, 203.0, 203.0, 203.0, 203.0, 4.926108374384237, 3.146166871921182, 2.9777940270935956], "isController": false}, {"data": ["Entitlement - get user type", 1, 0, 0.0, 12.0, 12, 12, 12.0, 12.0, 12.0, 12.0, 83.33333333333333, 44.43359375, 38.167317708333336], "isController": false}, {"data": ["Api legacy to nextgen - Get Watchlist status", 1, 0, 0.0, 32.0, 32, 32, 32.0, 32.0, 32.0, 32.0, 31.25, 20.93505859375, 13.763427734375], "isController": false}, {"data": ["Api legacy to nextgen - remove from watchlist", 1, 0, 0.0, 55.0, 55, 55, 55.0, 55.0, 55.0, 55.0, 18.18181818181818, 11.825284090909092, 8.469460227272727], "isController": false}, {"data": ["Search api v2-> Search content", 1, 0, 0.0, 51.0, 51, 51, 51.0, 51.0, 51.0, 51.0, 19.607843137254903, 42.08792892156863, 9.574142156862745], "isController": false}, {"data": ["Entitlement - get user package list", 1, 0, 0.0, 26.0, 26, 26, 26.0, 26.0, 26.0, 26.0, 38.46153846153847, 79.43960336538461, 17.916165865384617], "isController": false}, {"data": ["payment - Get Transaction Detail", 1, 0, 0.0, 28.0, 28, 28, 28.0, 28.0, 28.0, 28.0, 35.714285714285715, 43.42215401785714, 14.334542410714285], "isController": false}, {"data": ["Search api -> delete history search", 1, 0, 0.0, 16.0, 16, 16, 16.0, 16.0, 16.0, 16.0, 62.5, 39.6728515625, 31.31103515625], "isController": false}, {"data": ["MNC life - Gateway", 1, 0, 0.0, 296.0, 296, 296, 296.0, 296.0, 296.0, 296.0, 3.3783783783783785, 1.6891891891891893, 1.9366290118243243], "isController": false}, {"data": ["Content - Get Homepage Content List", 1, 0, 0.0, 13.0, 13, 13, 13.0, 13.0, 13.0, 13.0, 76.92307692307693, 4555.513822115385, 35.75721153846154], "isController": false}, {"data": ["Content - get banner", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 8.0, 125.0, 698.974609375, 56.15234375], "isController": false}, {"data": ["Api legacy to nextgen - request otp", 1, 0, 0.0, 70.0, 70, 70, 70.0, 70.0, 70.0, 70.0, 14.285714285714285, 11.788504464285714, 7.8822544642857135], "isController": false}, {"data": ["Content - Get Children of Cluster Category", 1, 0, 0.0, 14.0, 14, 14, 14.0, 14.0, 14.0, 14.0, 71.42857142857143, 62.918526785714285, 33.761160714285715], "isController": false}, {"data": ["Content - Get Homepage List", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 10.0, 100.0, 1430.859375, 45.1171875], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 87, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
