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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[900.0, 1.0]], "isOverall": false, "label": "Entitlement - entitle user", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Watch List - add to watchlist", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Login - login", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Entitlement -channel list", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "payment - Payment By MNC Bank", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Content - deeplink to category", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Content - Get Upcoming Content List", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Req Password Reset", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Deleted - getAPI", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Search api -> select content", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "atv login - ATV login", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Entitlement -alive", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Content - Get Content Bundle List", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Entitlement - get channel  list", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Versioning - Version status", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Content - Get Indihome Children of Cluster Category", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "History - send history", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Content - alive", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Content - Get Cluster Category", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Deleted - Delete Confirmation", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Deleted - check deletion status", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Entitlement - entitle pay tv user", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "payment - alive", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Content - Get Content Detail", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Login Mobile Number", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Api legacy to nextgen - Get Watchlist Content List", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Login", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Search api -> get search history list", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Paytv(playbox) - Check by Customer ID", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Api legacy to nextgen - Add to watchlist", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "atv login - get ATV login", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "content tools - get status", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Entitlement - check content lock", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Content - Get Sub Category List", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get Profile Info", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "payment - Get Product Detail", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Entitlement - get player", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Content - Get Content List", "isController": false}, {"data": [[11400.0, 1.0]], "isOverall": false, "label": "content tools - reset quiz", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Content - Get  Content  List Tvod", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Content - Get Episode List", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Deleted - Wording Account Deletion", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "Entitlement - check entitlement", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Entitlement -  player v2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Visitor", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "token ETERNAL PROD", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Entitlement - get package detail", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Content - Get Children of Cluster Category Content", "isController": false}, {"data": [[4000.0, 1.0]], "isOverall": false, "label": "Api legacy to nextgen - otp", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Versioning -alive", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Content - Get Content Detail (legacy)", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "payment - Get Operator List", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "atv login - ATV logout", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Search api -> get search suggestion", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Watch List -remove from watchlist", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "APP CONFIG -get app config list", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Search api -> get popular search", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Mail Service - send email verify", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Content - Get  Content TVOD List", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "payment - checking operator", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "payment - Get Product List", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "payment - Payment By OVO", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Content - Get Content Core Detail", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Entitlement -  player", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Versioning - Get version status", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Entitlement - get package list", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Paytv(playbox) - login", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "payment - provider list", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "payment - Get Payment Method List", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "History - reset history", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Entitlement -  player v2 ios", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Search api -> clear all history search ", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Search api -> search content", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Sign Up", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Entitlement - get user type", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Api legacy to nextgen - Get Watchlist status", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Api legacy to nextgen - remove from watchlist", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Search api v2-> Search content", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Entitlement - get user package list", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "payment - Get Transaction Detail", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Search api -> delete history search", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "MNC life - Gateway", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Content - Get Homepage Content List", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Content - get banner", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Api legacy to nextgen - request otp", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Content - Get Children of Cluster Category", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Content - Get Homepage List", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 11400.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 2.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 76.0, "series": [{"data": [[0.0, 76.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 9.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 2.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.6905246E12, "maxY": 1.0, "series": [{"data": [[1.6905246E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6905246E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 5.0, "minX": 1.0, "maxY": 11499.0, "series": [{"data": [[1.0, 925.0]], "isOverall": false, "label": "Entitlement - entitle user", "isController": false}, {"data": [[1.0, 925.0]], "isOverall": false, "label": "Entitlement - entitle user-Aggregated", "isController": false}, {"data": [[1.0, 767.0]], "isOverall": false, "label": "Watch List - add to watchlist", "isController": false}, {"data": [[1.0, 767.0]], "isOverall": false, "label": "Watch List - add to watchlist-Aggregated", "isController": false}, {"data": [[1.0, 410.0]], "isOverall": false, "label": "Login - login", "isController": false}, {"data": [[1.0, 410.0]], "isOverall": false, "label": "Login - login-Aggregated", "isController": false}, {"data": [[1.0, 189.0]], "isOverall": false, "label": "Entitlement -channel list", "isController": false}, {"data": [[1.0, 189.0]], "isOverall": false, "label": "Entitlement -channel list-Aggregated", "isController": false}, {"data": [[1.0, 345.0]], "isOverall": false, "label": "payment - Payment By MNC Bank", "isController": false}, {"data": [[1.0, 345.0]], "isOverall": false, "label": "payment - Payment By MNC Bank-Aggregated", "isController": false}, {"data": [[1.0, 154.0]], "isOverall": false, "label": "Content - deeplink to category", "isController": false}, {"data": [[1.0, 154.0]], "isOverall": false, "label": "Content - deeplink to category-Aggregated", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "Content - Get Upcoming Content List", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "Content - Get Upcoming Content List-Aggregated", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "Req Password Reset", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "Req Password Reset-Aggregated", "isController": false}, {"data": [[1.0, 87.0]], "isOverall": false, "label": "Deleted - getAPI", "isController": false}, {"data": [[1.0, 87.0]], "isOverall": false, "label": "Deleted - getAPI-Aggregated", "isController": false}, {"data": [[1.0, 15.0]], "isOverall": false, "label": "Search api -> select content", "isController": false}, {"data": [[1.0, 15.0]], "isOverall": false, "label": "Search api -> select content-Aggregated", "isController": false}, {"data": [[1.0, 691.0]], "isOverall": false, "label": "atv login - ATV login", "isController": false}, {"data": [[1.0, 691.0]], "isOverall": false, "label": "atv login - ATV login-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "Entitlement -alive", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "Entitlement -alive-Aggregated", "isController": false}, {"data": [[1.0, 21.0]], "isOverall": false, "label": "Content - Get Content Bundle List", "isController": false}, {"data": [[1.0, 21.0]], "isOverall": false, "label": "Content - Get Content Bundle List-Aggregated", "isController": false}, {"data": [[1.0, 183.0]], "isOverall": false, "label": "Entitlement - get channel  list", "isController": false}, {"data": [[1.0, 183.0]], "isOverall": false, "label": "Entitlement - get channel  list-Aggregated", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "Versioning - Version status", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "Versioning - Version status-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "Content - Get Indihome Children of Cluster Category", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "Content - Get Indihome Children of Cluster Category-Aggregated", "isController": false}, {"data": [[1.0, 815.0]], "isOverall": false, "label": "History - send history", "isController": false}, {"data": [[1.0, 815.0]], "isOverall": false, "label": "History - send history-Aggregated", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "Content - alive", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "Content - alive-Aggregated", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "Content - Get Cluster Category", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "Content - Get Cluster Category-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "Deleted - Delete Confirmation", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "Deleted - Delete Confirmation-Aggregated", "isController": false}, {"data": [[1.0, 21.0]], "isOverall": false, "label": "Deleted - check deletion status", "isController": false}, {"data": [[1.0, 21.0]], "isOverall": false, "label": "Deleted - check deletion status-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "Entitlement - entitle pay tv user", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "Entitlement - entitle pay tv user-Aggregated", "isController": false}, {"data": [[1.0, 50.0]], "isOverall": false, "label": "payment - alive", "isController": false}, {"data": [[1.0, 50.0]], "isOverall": false, "label": "payment - alive-Aggregated", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "Content - Get Content Detail", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "Content - Get Content Detail-Aggregated", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "Login Mobile Number", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "Login Mobile Number-Aggregated", "isController": false}, {"data": [[1.0, 204.0]], "isOverall": false, "label": "Api legacy to nextgen - Get Watchlist Content List", "isController": false}, {"data": [[1.0, 204.0]], "isOverall": false, "label": "Api legacy to nextgen - Get Watchlist Content List-Aggregated", "isController": false}, {"data": [[1.0, 227.0]], "isOverall": false, "label": "Login", "isController": false}, {"data": [[1.0, 227.0]], "isOverall": false, "label": "Login-Aggregated", "isController": false}, {"data": [[1.0, 21.0]], "isOverall": false, "label": "Search api -> get search history list", "isController": false}, {"data": [[1.0, 21.0]], "isOverall": false, "label": "Search api -> get search history list-Aggregated", "isController": false}, {"data": [[1.0, 141.0]], "isOverall": false, "label": "Paytv(playbox) - Check by Customer ID", "isController": false}, {"data": [[1.0, 141.0]], "isOverall": false, "label": "Paytv(playbox) - Check by Customer ID-Aggregated", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "Api legacy to nextgen - Add to watchlist", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "Api legacy to nextgen - Add to watchlist-Aggregated", "isController": false}, {"data": [[1.0, 672.0]], "isOverall": false, "label": "atv login - get ATV login", "isController": false}, {"data": [[1.0, 672.0]], "isOverall": false, "label": "atv login - get ATV login-Aggregated", "isController": false}, {"data": [[1.0, 672.0]], "isOverall": false, "label": "content tools - get status", "isController": false}, {"data": [[1.0, 672.0]], "isOverall": false, "label": "content tools - get status-Aggregated", "isController": false}, {"data": [[1.0, 28.0]], "isOverall": false, "label": "Entitlement - check content lock", "isController": false}, {"data": [[1.0, 28.0]], "isOverall": false, "label": "Entitlement - check content lock-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "Content - Get Sub Category List", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "Content - Get Sub Category List-Aggregated", "isController": false}, {"data": [[1.0, 26.0]], "isOverall": false, "label": "Get Profile Info", "isController": false}, {"data": [[1.0, 26.0]], "isOverall": false, "label": "Get Profile Info-Aggregated", "isController": false}, {"data": [[1.0, 15.0]], "isOverall": false, "label": "payment - Get Product Detail", "isController": false}, {"data": [[1.0, 15.0]], "isOverall": false, "label": "payment - Get Product Detail-Aggregated", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "Entitlement - get player", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "Entitlement - get player-Aggregated", "isController": false}, {"data": [[1.0, 33.0]], "isOverall": false, "label": "Content - Get Content List", "isController": false}, {"data": [[1.0, 33.0]], "isOverall": false, "label": "Content - Get Content List-Aggregated", "isController": false}, {"data": [[1.0, 11499.0]], "isOverall": false, "label": "content tools - reset quiz", "isController": false}, {"data": [[1.0, 11499.0]], "isOverall": false, "label": "content tools - reset quiz-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "Content - Get  Content  List Tvod", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "Content - Get  Content  List Tvod-Aggregated", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "Content - Get Episode List", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "Content - Get Episode List-Aggregated", "isController": false}, {"data": [[1.0, 11.0]], "isOverall": false, "label": "Deleted - Wording Account Deletion", "isController": false}, {"data": [[1.0, 11.0]], "isOverall": false, "label": "Deleted - Wording Account Deletion-Aggregated", "isController": false}, {"data": [[1.0, 1151.0]], "isOverall": false, "label": "Entitlement - check entitlement", "isController": false}, {"data": [[1.0, 1151.0]], "isOverall": false, "label": "Entitlement - check entitlement-Aggregated", "isController": false}, {"data": [[1.0, 82.0]], "isOverall": false, "label": "Entitlement -  player v2", "isController": false}, {"data": [[1.0, 82.0]], "isOverall": false, "label": "Entitlement -  player v2-Aggregated", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "Visitor", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "Visitor-Aggregated", "isController": false}, {"data": [[1.0, 703.0]], "isOverall": false, "label": "token ETERNAL PROD", "isController": false}, {"data": [[1.0, 703.0]], "isOverall": false, "label": "token ETERNAL PROD-Aggregated", "isController": false}, {"data": [[1.0, 253.0]], "isOverall": false, "label": "Entitlement - get package detail", "isController": false}, {"data": [[1.0, 253.0]], "isOverall": false, "label": "Entitlement - get package detail-Aggregated", "isController": false}, {"data": [[1.0, 24.0]], "isOverall": false, "label": "Content - Get Children of Cluster Category Content", "isController": false}, {"data": [[1.0, 24.0]], "isOverall": false, "label": "Content - Get Children of Cluster Category Content-Aggregated", "isController": false}, {"data": [[1.0, 4028.0]], "isOverall": false, "label": "Api legacy to nextgen - otp", "isController": false}, {"data": [[1.0, 4028.0]], "isOverall": false, "label": "Api legacy to nextgen - otp-Aggregated", "isController": false}, {"data": [[1.0, 11.0]], "isOverall": false, "label": "Versioning -alive", "isController": false}, {"data": [[1.0, 11.0]], "isOverall": false, "label": "Versioning -alive-Aggregated", "isController": false}, {"data": [[1.0, 197.0]], "isOverall": false, "label": "Content - Get Content Detail (legacy)", "isController": false}, {"data": [[1.0, 197.0]], "isOverall": false, "label": "Content - Get Content Detail (legacy)-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "payment - Get Operator List", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "payment - Get Operator List-Aggregated", "isController": false}, {"data": [[1.0, 263.0]], "isOverall": false, "label": "atv login - ATV logout", "isController": false}, {"data": [[1.0, 263.0]], "isOverall": false, "label": "atv login - ATV logout-Aggregated", "isController": false}, {"data": [[1.0, 93.0]], "isOverall": false, "label": "Search api -> get search suggestion", "isController": false}, {"data": [[1.0, 93.0]], "isOverall": false, "label": "Search api -> get search suggestion-Aggregated", "isController": false}, {"data": [[1.0, 181.0]], "isOverall": false, "label": "Watch List -remove from watchlist", "isController": false}, {"data": [[1.0, 181.0]], "isOverall": false, "label": "Watch List -remove from watchlist-Aggregated", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "APP CONFIG -get app config list", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "APP CONFIG -get app config list-Aggregated", "isController": false}, {"data": [[1.0, 11.0]], "isOverall": false, "label": "Search api -> get popular search", "isController": false}, {"data": [[1.0, 11.0]], "isOverall": false, "label": "Search api -> get popular search-Aggregated", "isController": false}, {"data": [[1.0, 681.0]], "isOverall": false, "label": "Mail Service - send email verify", "isController": false}, {"data": [[1.0, 681.0]], "isOverall": false, "label": "Mail Service - send email verify-Aggregated", "isController": false}, {"data": [[1.0, 163.0]], "isOverall": false, "label": "Content - Get  Content TVOD List", "isController": false}, {"data": [[1.0, 163.0]], "isOverall": false, "label": "Content - Get  Content TVOD List-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "payment - checking operator", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "payment - checking operator-Aggregated", "isController": false}, {"data": [[1.0, 54.0]], "isOverall": false, "label": "payment - Get Product List", "isController": false}, {"data": [[1.0, 54.0]], "isOverall": false, "label": "payment - Get Product List-Aggregated", "isController": false}, {"data": [[1.0, 180.0]], "isOverall": false, "label": "payment - Payment By OVO", "isController": false}, {"data": [[1.0, 180.0]], "isOverall": false, "label": "payment - Payment By OVO-Aggregated", "isController": false}, {"data": [[1.0, 19.0]], "isOverall": false, "label": "Content - Get Content Core Detail", "isController": false}, {"data": [[1.0, 19.0]], "isOverall": false, "label": "Content - Get Content Core Detail-Aggregated", "isController": false}, {"data": [[1.0, 24.0]], "isOverall": false, "label": "Entitlement -  player", "isController": false}, {"data": [[1.0, 24.0]], "isOverall": false, "label": "Entitlement -  player-Aggregated", "isController": false}, {"data": [[1.0, 21.0]], "isOverall": false, "label": "Versioning - Get version status", "isController": false}, {"data": [[1.0, 21.0]], "isOverall": false, "label": "Versioning - Get version status-Aggregated", "isController": false}, {"data": [[1.0, 31.0]], "isOverall": false, "label": "Entitlement - get package list", "isController": false}, {"data": [[1.0, 31.0]], "isOverall": false, "label": "Entitlement - get package list-Aggregated", "isController": false}, {"data": [[1.0, 416.0]], "isOverall": false, "label": "Paytv(playbox) - login", "isController": false}, {"data": [[1.0, 416.0]], "isOverall": false, "label": "Paytv(playbox) - login-Aggregated", "isController": false}, {"data": [[1.0, 48.0]], "isOverall": false, "label": "payment - provider list", "isController": false}, {"data": [[1.0, 48.0]], "isOverall": false, "label": "payment - provider list-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "payment - Get Payment Method List", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "payment - Get Payment Method List-Aggregated", "isController": false}, {"data": [[1.0, 304.0]], "isOverall": false, "label": "History - reset history", "isController": false}, {"data": [[1.0, 304.0]], "isOverall": false, "label": "History - reset history-Aggregated", "isController": false}, {"data": [[1.0, 132.0]], "isOverall": false, "label": "Entitlement -  player v2 ios", "isController": false}, {"data": [[1.0, 132.0]], "isOverall": false, "label": "Entitlement -  player v2 ios-Aggregated", "isController": false}, {"data": [[1.0, 13.0]], "isOverall": false, "label": "Search api -> clear all history search ", "isController": false}, {"data": [[1.0, 13.0]], "isOverall": false, "label": "Search api -> clear all history search -Aggregated", "isController": false}, {"data": [[1.0, 74.0]], "isOverall": false, "label": "Search api -> search content", "isController": false}, {"data": [[1.0, 74.0]], "isOverall": false, "label": "Search api -> search content-Aggregated", "isController": false}, {"data": [[1.0, 203.0]], "isOverall": false, "label": "Sign Up", "isController": false}, {"data": [[1.0, 203.0]], "isOverall": false, "label": "Sign Up-Aggregated", "isController": false}, {"data": [[1.0, 12.0]], "isOverall": false, "label": "Entitlement - get user type", "isController": false}, {"data": [[1.0, 12.0]], "isOverall": false, "label": "Entitlement - get user type-Aggregated", "isController": false}, {"data": [[1.0, 32.0]], "isOverall": false, "label": "Api legacy to nextgen - Get Watchlist status", "isController": false}, {"data": [[1.0, 32.0]], "isOverall": false, "label": "Api legacy to nextgen - Get Watchlist status-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "Api legacy to nextgen - remove from watchlist", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "Api legacy to nextgen - remove from watchlist-Aggregated", "isController": false}, {"data": [[1.0, 51.0]], "isOverall": false, "label": "Search api v2-> Search content", "isController": false}, {"data": [[1.0, 51.0]], "isOverall": false, "label": "Search api v2-> Search content-Aggregated", "isController": false}, {"data": [[1.0, 26.0]], "isOverall": false, "label": "Entitlement - get user package list", "isController": false}, {"data": [[1.0, 26.0]], "isOverall": false, "label": "Entitlement - get user package list-Aggregated", "isController": false}, {"data": [[1.0, 28.0]], "isOverall": false, "label": "payment - Get Transaction Detail", "isController": false}, {"data": [[1.0, 28.0]], "isOverall": false, "label": "payment - Get Transaction Detail-Aggregated", "isController": false}, {"data": [[1.0, 16.0]], "isOverall": false, "label": "Search api -> delete history search", "isController": false}, {"data": [[1.0, 16.0]], "isOverall": false, "label": "Search api -> delete history search-Aggregated", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "MNC life - Gateway", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "MNC life - Gateway-Aggregated", "isController": false}, {"data": [[1.0, 13.0]], "isOverall": false, "label": "Content - Get Homepage Content List", "isController": false}, {"data": [[1.0, 13.0]], "isOverall": false, "label": "Content - Get Homepage Content List-Aggregated", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "Content - get banner", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "Content - get banner-Aggregated", "isController": false}, {"data": [[1.0, 70.0]], "isOverall": false, "label": "Api legacy to nextgen - request otp", "isController": false}, {"data": [[1.0, 70.0]], "isOverall": false, "label": "Api legacy to nextgen - request otp-Aggregated", "isController": false}, {"data": [[1.0, 14.0]], "isOverall": false, "label": "Content - Get Children of Cluster Category", "isController": false}, {"data": [[1.0, 14.0]], "isOverall": false, "label": "Content - Get Children of Cluster Category-Aggregated", "isController": false}, {"data": [[1.0, 10.0]], "isOverall": false, "label": "Content - Get Homepage List", "isController": false}, {"data": [[1.0, 10.0]], "isOverall": false, "label": "Content - Get Homepage List-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 729.1166666666667, "minX": 1.6905246E12, "maxY": 5725.1, "series": [{"data": [[1.6905246E12, 5725.1]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.6905246E12, 729.1166666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6905246E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 5.0, "minX": 1.6905246E12, "maxY": 11499.0, "series": [{"data": [[1.6905246E12, 925.0]], "isOverall": false, "label": "Entitlement - entitle user", "isController": false}, {"data": [[1.6905246E12, 767.0]], "isOverall": false, "label": "Watch List - add to watchlist", "isController": false}, {"data": [[1.6905246E12, 410.0]], "isOverall": false, "label": "Login - login", "isController": false}, {"data": [[1.6905246E12, 189.0]], "isOverall": false, "label": "Entitlement -channel list", "isController": false}, {"data": [[1.6905246E12, 345.0]], "isOverall": false, "label": "payment - Payment By MNC Bank", "isController": false}, {"data": [[1.6905246E12, 154.0]], "isOverall": false, "label": "Content - deeplink to category", "isController": false}, {"data": [[1.6905246E12, 8.0]], "isOverall": false, "label": "Content - Get Upcoming Content List", "isController": false}, {"data": [[1.6905246E12, 66.0]], "isOverall": false, "label": "Req Password Reset", "isController": false}, {"data": [[1.6905246E12, 87.0]], "isOverall": false, "label": "Deleted - getAPI", "isController": false}, {"data": [[1.6905246E12, 15.0]], "isOverall": false, "label": "Search api -> select content", "isController": false}, {"data": [[1.6905246E12, 691.0]], "isOverall": false, "label": "atv login - ATV login", "isController": false}, {"data": [[1.6905246E12, 6.0]], "isOverall": false, "label": "Entitlement -alive", "isController": false}, {"data": [[1.6905246E12, 21.0]], "isOverall": false, "label": "Content - Get Content Bundle List", "isController": false}, {"data": [[1.6905246E12, 183.0]], "isOverall": false, "label": "Entitlement - get channel  list", "isController": false}, {"data": [[1.6905246E12, 71.0]], "isOverall": false, "label": "Versioning - Version status", "isController": false}, {"data": [[1.6905246E12, 7.0]], "isOverall": false, "label": "Content - Get Indihome Children of Cluster Category", "isController": false}, {"data": [[1.6905246E12, 815.0]], "isOverall": false, "label": "History - send history", "isController": false}, {"data": [[1.6905246E12, 40.0]], "isOverall": false, "label": "Content - alive", "isController": false}, {"data": [[1.6905246E12, 8.0]], "isOverall": false, "label": "Content - Get Cluster Category", "isController": false}, {"data": [[1.6905246E12, 60.0]], "isOverall": false, "label": "Deleted - Delete Confirmation", "isController": false}, {"data": [[1.6905246E12, 21.0]], "isOverall": false, "label": "Deleted - check deletion status", "isController": false}, {"data": [[1.6905246E12, 60.0]], "isOverall": false, "label": "Entitlement - entitle pay tv user", "isController": false}, {"data": [[1.6905246E12, 50.0]], "isOverall": false, "label": "payment - alive", "isController": false}, {"data": [[1.6905246E12, 8.0]], "isOverall": false, "label": "Content - Get Content Detail", "isController": false}, {"data": [[1.6905246E12, 81.0]], "isOverall": false, "label": "Login Mobile Number", "isController": false}, {"data": [[1.6905246E12, 204.0]], "isOverall": false, "label": "Api legacy to nextgen - Get Watchlist Content List", "isController": false}, {"data": [[1.6905246E12, 227.0]], "isOverall": false, "label": "Login", "isController": false}, {"data": [[1.6905246E12, 21.0]], "isOverall": false, "label": "Search api -> get search history list", "isController": false}, {"data": [[1.6905246E12, 141.0]], "isOverall": false, "label": "Paytv(playbox) - Check by Customer ID", "isController": false}, {"data": [[1.6905246E12, 77.0]], "isOverall": false, "label": "Api legacy to nextgen - Add to watchlist", "isController": false}, {"data": [[1.6905246E12, 672.0]], "isOverall": false, "label": "atv login - get ATV login", "isController": false}, {"data": [[1.6905246E12, 672.0]], "isOverall": false, "label": "content tools - get status", "isController": false}, {"data": [[1.6905246E12, 28.0]], "isOverall": false, "label": "Entitlement - check content lock", "isController": false}, {"data": [[1.6905246E12, 7.0]], "isOverall": false, "label": "Content - Get Sub Category List", "isController": false}, {"data": [[1.6905246E12, 26.0]], "isOverall": false, "label": "Get Profile Info", "isController": false}, {"data": [[1.6905246E12, 15.0]], "isOverall": false, "label": "payment - Get Product Detail", "isController": false}, {"data": [[1.6905246E12, 35.0]], "isOverall": false, "label": "Entitlement - get player", "isController": false}, {"data": [[1.6905246E12, 33.0]], "isOverall": false, "label": "Content - Get Content List", "isController": false}, {"data": [[1.6905246E12, 11499.0]], "isOverall": false, "label": "content tools - reset quiz", "isController": false}, {"data": [[1.6905246E12, 7.0]], "isOverall": false, "label": "Content - Get  Content  List Tvod", "isController": false}, {"data": [[1.6905246E12, 9.0]], "isOverall": false, "label": "Content - Get Episode List", "isController": false}, {"data": [[1.6905246E12, 11.0]], "isOverall": false, "label": "Deleted - Wording Account Deletion", "isController": false}, {"data": [[1.6905246E12, 1151.0]], "isOverall": false, "label": "Entitlement - check entitlement", "isController": false}, {"data": [[1.6905246E12, 82.0]], "isOverall": false, "label": "Entitlement -  player v2", "isController": false}, {"data": [[1.6905246E12, 8.0]], "isOverall": false, "label": "Visitor", "isController": false}, {"data": [[1.6905246E12, 703.0]], "isOverall": false, "label": "token ETERNAL PROD", "isController": false}, {"data": [[1.6905246E12, 253.0]], "isOverall": false, "label": "Entitlement - get package detail", "isController": false}, {"data": [[1.6905246E12, 24.0]], "isOverall": false, "label": "Content - Get Children of Cluster Category Content", "isController": false}, {"data": [[1.6905246E12, 4028.0]], "isOverall": false, "label": "Api legacy to nextgen - otp", "isController": false}, {"data": [[1.6905246E12, 11.0]], "isOverall": false, "label": "Versioning -alive", "isController": false}, {"data": [[1.6905246E12, 197.0]], "isOverall": false, "label": "Content - Get Content Detail (legacy)", "isController": false}, {"data": [[1.6905246E12, 5.0]], "isOverall": false, "label": "payment - Get Operator List", "isController": false}, {"data": [[1.6905246E12, 263.0]], "isOverall": false, "label": "atv login - ATV logout", "isController": false}, {"data": [[1.6905246E12, 93.0]], "isOverall": false, "label": "Search api -> get search suggestion", "isController": false}, {"data": [[1.6905246E12, 181.0]], "isOverall": false, "label": "Watch List -remove from watchlist", "isController": false}, {"data": [[1.6905246E12, 65.0]], "isOverall": false, "label": "APP CONFIG -get app config list", "isController": false}, {"data": [[1.6905246E12, 11.0]], "isOverall": false, "label": "Search api -> get popular search", "isController": false}, {"data": [[1.6905246E12, 681.0]], "isOverall": false, "label": "Mail Service - send email verify", "isController": false}, {"data": [[1.6905246E12, 163.0]], "isOverall": false, "label": "Content - Get  Content TVOD List", "isController": false}, {"data": [[1.6905246E12, 55.0]], "isOverall": false, "label": "payment - checking operator", "isController": false}, {"data": [[1.6905246E12, 54.0]], "isOverall": false, "label": "payment - Get Product List", "isController": false}, {"data": [[1.6905246E12, 180.0]], "isOverall": false, "label": "payment - Payment By OVO", "isController": false}, {"data": [[1.6905246E12, 19.0]], "isOverall": false, "label": "Content - Get Content Core Detail", "isController": false}, {"data": [[1.6905246E12, 24.0]], "isOverall": false, "label": "Entitlement -  player", "isController": false}, {"data": [[1.6905246E12, 21.0]], "isOverall": false, "label": "Versioning - Get version status", "isController": false}, {"data": [[1.6905246E12, 31.0]], "isOverall": false, "label": "Entitlement - get package list", "isController": false}, {"data": [[1.6905246E12, 416.0]], "isOverall": false, "label": "Paytv(playbox) - login", "isController": false}, {"data": [[1.6905246E12, 48.0]], "isOverall": false, "label": "payment - provider list", "isController": false}, {"data": [[1.6905246E12, 6.0]], "isOverall": false, "label": "payment - Get Payment Method List", "isController": false}, {"data": [[1.6905246E12, 304.0]], "isOverall": false, "label": "History - reset history", "isController": false}, {"data": [[1.6905246E12, 132.0]], "isOverall": false, "label": "Entitlement -  player v2 ios", "isController": false}, {"data": [[1.6905246E12, 13.0]], "isOverall": false, "label": "Search api -> clear all history search ", "isController": false}, {"data": [[1.6905246E12, 74.0]], "isOverall": false, "label": "Search api -> search content", "isController": false}, {"data": [[1.6905246E12, 203.0]], "isOverall": false, "label": "Sign Up", "isController": false}, {"data": [[1.6905246E12, 12.0]], "isOverall": false, "label": "Entitlement - get user type", "isController": false}, {"data": [[1.6905246E12, 32.0]], "isOverall": false, "label": "Api legacy to nextgen - Get Watchlist status", "isController": false}, {"data": [[1.6905246E12, 55.0]], "isOverall": false, "label": "Api legacy to nextgen - remove from watchlist", "isController": false}, {"data": [[1.6905246E12, 51.0]], "isOverall": false, "label": "Search api v2-> Search content", "isController": false}, {"data": [[1.6905246E12, 26.0]], "isOverall": false, "label": "Entitlement - get user package list", "isController": false}, {"data": [[1.6905246E12, 28.0]], "isOverall": false, "label": "payment - Get Transaction Detail", "isController": false}, {"data": [[1.6905246E12, 16.0]], "isOverall": false, "label": "Search api -> delete history search", "isController": false}, {"data": [[1.6905246E12, 296.0]], "isOverall": false, "label": "MNC life - Gateway", "isController": false}, {"data": [[1.6905246E12, 13.0]], "isOverall": false, "label": "Content - Get Homepage Content List", "isController": false}, {"data": [[1.6905246E12, 8.0]], "isOverall": false, "label": "Content - get banner", "isController": false}, {"data": [[1.6905246E12, 70.0]], "isOverall": false, "label": "Api legacy to nextgen - request otp", "isController": false}, {"data": [[1.6905246E12, 14.0]], "isOverall": false, "label": "Content - Get Children of Cluster Category", "isController": false}, {"data": [[1.6905246E12, 10.0]], "isOverall": false, "label": "Content - Get Homepage List", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6905246E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 5.0, "minX": 1.6905246E12, "maxY": 11499.0, "series": [{"data": [[1.6905246E12, 925.0]], "isOverall": false, "label": "Entitlement - entitle user", "isController": false}, {"data": [[1.6905246E12, 767.0]], "isOverall": false, "label": "Watch List - add to watchlist", "isController": false}, {"data": [[1.6905246E12, 410.0]], "isOverall": false, "label": "Login - login", "isController": false}, {"data": [[1.6905246E12, 189.0]], "isOverall": false, "label": "Entitlement -channel list", "isController": false}, {"data": [[1.6905246E12, 345.0]], "isOverall": false, "label": "payment - Payment By MNC Bank", "isController": false}, {"data": [[1.6905246E12, 154.0]], "isOverall": false, "label": "Content - deeplink to category", "isController": false}, {"data": [[1.6905246E12, 8.0]], "isOverall": false, "label": "Content - Get Upcoming Content List", "isController": false}, {"data": [[1.6905246E12, 66.0]], "isOverall": false, "label": "Req Password Reset", "isController": false}, {"data": [[1.6905246E12, 87.0]], "isOverall": false, "label": "Deleted - getAPI", "isController": false}, {"data": [[1.6905246E12, 15.0]], "isOverall": false, "label": "Search api -> select content", "isController": false}, {"data": [[1.6905246E12, 691.0]], "isOverall": false, "label": "atv login - ATV login", "isController": false}, {"data": [[1.6905246E12, 6.0]], "isOverall": false, "label": "Entitlement -alive", "isController": false}, {"data": [[1.6905246E12, 21.0]], "isOverall": false, "label": "Content - Get Content Bundle List", "isController": false}, {"data": [[1.6905246E12, 183.0]], "isOverall": false, "label": "Entitlement - get channel  list", "isController": false}, {"data": [[1.6905246E12, 71.0]], "isOverall": false, "label": "Versioning - Version status", "isController": false}, {"data": [[1.6905246E12, 7.0]], "isOverall": false, "label": "Content - Get Indihome Children of Cluster Category", "isController": false}, {"data": [[1.6905246E12, 815.0]], "isOverall": false, "label": "History - send history", "isController": false}, {"data": [[1.6905246E12, 40.0]], "isOverall": false, "label": "Content - alive", "isController": false}, {"data": [[1.6905246E12, 8.0]], "isOverall": false, "label": "Content - Get Cluster Category", "isController": false}, {"data": [[1.6905246E12, 60.0]], "isOverall": false, "label": "Deleted - Delete Confirmation", "isController": false}, {"data": [[1.6905246E12, 21.0]], "isOverall": false, "label": "Deleted - check deletion status", "isController": false}, {"data": [[1.6905246E12, 60.0]], "isOverall": false, "label": "Entitlement - entitle pay tv user", "isController": false}, {"data": [[1.6905246E12, 50.0]], "isOverall": false, "label": "payment - alive", "isController": false}, {"data": [[1.6905246E12, 8.0]], "isOverall": false, "label": "Content - Get Content Detail", "isController": false}, {"data": [[1.6905246E12, 81.0]], "isOverall": false, "label": "Login Mobile Number", "isController": false}, {"data": [[1.6905246E12, 204.0]], "isOverall": false, "label": "Api legacy to nextgen - Get Watchlist Content List", "isController": false}, {"data": [[1.6905246E12, 227.0]], "isOverall": false, "label": "Login", "isController": false}, {"data": [[1.6905246E12, 21.0]], "isOverall": false, "label": "Search api -> get search history list", "isController": false}, {"data": [[1.6905246E12, 141.0]], "isOverall": false, "label": "Paytv(playbox) - Check by Customer ID", "isController": false}, {"data": [[1.6905246E12, 77.0]], "isOverall": false, "label": "Api legacy to nextgen - Add to watchlist", "isController": false}, {"data": [[1.6905246E12, 672.0]], "isOverall": false, "label": "atv login - get ATV login", "isController": false}, {"data": [[1.6905246E12, 672.0]], "isOverall": false, "label": "content tools - get status", "isController": false}, {"data": [[1.6905246E12, 28.0]], "isOverall": false, "label": "Entitlement - check content lock", "isController": false}, {"data": [[1.6905246E12, 7.0]], "isOverall": false, "label": "Content - Get Sub Category List", "isController": false}, {"data": [[1.6905246E12, 26.0]], "isOverall": false, "label": "Get Profile Info", "isController": false}, {"data": [[1.6905246E12, 15.0]], "isOverall": false, "label": "payment - Get Product Detail", "isController": false}, {"data": [[1.6905246E12, 35.0]], "isOverall": false, "label": "Entitlement - get player", "isController": false}, {"data": [[1.6905246E12, 33.0]], "isOverall": false, "label": "Content - Get Content List", "isController": false}, {"data": [[1.6905246E12, 11499.0]], "isOverall": false, "label": "content tools - reset quiz", "isController": false}, {"data": [[1.6905246E12, 7.0]], "isOverall": false, "label": "Content - Get  Content  List Tvod", "isController": false}, {"data": [[1.6905246E12, 9.0]], "isOverall": false, "label": "Content - Get Episode List", "isController": false}, {"data": [[1.6905246E12, 11.0]], "isOverall": false, "label": "Deleted - Wording Account Deletion", "isController": false}, {"data": [[1.6905246E12, 1151.0]], "isOverall": false, "label": "Entitlement - check entitlement", "isController": false}, {"data": [[1.6905246E12, 82.0]], "isOverall": false, "label": "Entitlement -  player v2", "isController": false}, {"data": [[1.6905246E12, 8.0]], "isOverall": false, "label": "Visitor", "isController": false}, {"data": [[1.6905246E12, 700.0]], "isOverall": false, "label": "token ETERNAL PROD", "isController": false}, {"data": [[1.6905246E12, 252.0]], "isOverall": false, "label": "Entitlement - get package detail", "isController": false}, {"data": [[1.6905246E12, 24.0]], "isOverall": false, "label": "Content - Get Children of Cluster Category Content", "isController": false}, {"data": [[1.6905246E12, 4028.0]], "isOverall": false, "label": "Api legacy to nextgen - otp", "isController": false}, {"data": [[1.6905246E12, 11.0]], "isOverall": false, "label": "Versioning -alive", "isController": false}, {"data": [[1.6905246E12, 197.0]], "isOverall": false, "label": "Content - Get Content Detail (legacy)", "isController": false}, {"data": [[1.6905246E12, 5.0]], "isOverall": false, "label": "payment - Get Operator List", "isController": false}, {"data": [[1.6905246E12, 263.0]], "isOverall": false, "label": "atv login - ATV logout", "isController": false}, {"data": [[1.6905246E12, 93.0]], "isOverall": false, "label": "Search api -> get search suggestion", "isController": false}, {"data": [[1.6905246E12, 181.0]], "isOverall": false, "label": "Watch List -remove from watchlist", "isController": false}, {"data": [[1.6905246E12, 64.0]], "isOverall": false, "label": "APP CONFIG -get app config list", "isController": false}, {"data": [[1.6905246E12, 10.0]], "isOverall": false, "label": "Search api -> get popular search", "isController": false}, {"data": [[1.6905246E12, 681.0]], "isOverall": false, "label": "Mail Service - send email verify", "isController": false}, {"data": [[1.6905246E12, 163.0]], "isOverall": false, "label": "Content - Get  Content TVOD List", "isController": false}, {"data": [[1.6905246E12, 55.0]], "isOverall": false, "label": "payment - checking operator", "isController": false}, {"data": [[1.6905246E12, 53.0]], "isOverall": false, "label": "payment - Get Product List", "isController": false}, {"data": [[1.6905246E12, 180.0]], "isOverall": false, "label": "payment - Payment By OVO", "isController": false}, {"data": [[1.6905246E12, 19.0]], "isOverall": false, "label": "Content - Get Content Core Detail", "isController": false}, {"data": [[1.6905246E12, 24.0]], "isOverall": false, "label": "Entitlement -  player", "isController": false}, {"data": [[1.6905246E12, 21.0]], "isOverall": false, "label": "Versioning - Get version status", "isController": false}, {"data": [[1.6905246E12, 31.0]], "isOverall": false, "label": "Entitlement - get package list", "isController": false}, {"data": [[1.6905246E12, 415.0]], "isOverall": false, "label": "Paytv(playbox) - login", "isController": false}, {"data": [[1.6905246E12, 48.0]], "isOverall": false, "label": "payment - provider list", "isController": false}, {"data": [[1.6905246E12, 6.0]], "isOverall": false, "label": "payment - Get Payment Method List", "isController": false}, {"data": [[1.6905246E12, 304.0]], "isOverall": false, "label": "History - reset history", "isController": false}, {"data": [[1.6905246E12, 132.0]], "isOverall": false, "label": "Entitlement -  player v2 ios", "isController": false}, {"data": [[1.6905246E12, 13.0]], "isOverall": false, "label": "Search api -> clear all history search ", "isController": false}, {"data": [[1.6905246E12, 74.0]], "isOverall": false, "label": "Search api -> search content", "isController": false}, {"data": [[1.6905246E12, 203.0]], "isOverall": false, "label": "Sign Up", "isController": false}, {"data": [[1.6905246E12, 11.0]], "isOverall": false, "label": "Entitlement - get user type", "isController": false}, {"data": [[1.6905246E12, 32.0]], "isOverall": false, "label": "Api legacy to nextgen - Get Watchlist status", "isController": false}, {"data": [[1.6905246E12, 55.0]], "isOverall": false, "label": "Api legacy to nextgen - remove from watchlist", "isController": false}, {"data": [[1.6905246E12, 51.0]], "isOverall": false, "label": "Search api v2-> Search content", "isController": false}, {"data": [[1.6905246E12, 26.0]], "isOverall": false, "label": "Entitlement - get user package list", "isController": false}, {"data": [[1.6905246E12, 28.0]], "isOverall": false, "label": "payment - Get Transaction Detail", "isController": false}, {"data": [[1.6905246E12, 16.0]], "isOverall": false, "label": "Search api -> delete history search", "isController": false}, {"data": [[1.6905246E12, 296.0]], "isOverall": false, "label": "MNC life - Gateway", "isController": false}, {"data": [[1.6905246E12, 11.0]], "isOverall": false, "label": "Content - Get Homepage Content List", "isController": false}, {"data": [[1.6905246E12, 8.0]], "isOverall": false, "label": "Content - get banner", "isController": false}, {"data": [[1.6905246E12, 70.0]], "isOverall": false, "label": "Api legacy to nextgen - request otp", "isController": false}, {"data": [[1.6905246E12, 14.0]], "isOverall": false, "label": "Content - Get Children of Cluster Category", "isController": false}, {"data": [[1.6905246E12, 10.0]], "isOverall": false, "label": "Content - Get Homepage List", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6905246E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.6905246E12, "maxY": 336.0, "series": [{"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Entitlement - entitle user", "isController": false}, {"data": [[1.6905246E12, 192.0]], "isOverall": false, "label": "Watch List - add to watchlist", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Login - login", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Entitlement -channel list", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "payment - Payment By MNC Bank", "isController": false}, {"data": [[1.6905246E12, 55.0]], "isOverall": false, "label": "Content - deeplink to category", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - Get Upcoming Content List", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Req Password Reset", "isController": false}, {"data": [[1.6905246E12, 79.0]], "isOverall": false, "label": "Deleted - getAPI", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Search api -> select content", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "atv login - ATV login", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Entitlement -alive", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - Get Content Bundle List", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Entitlement - get channel  list", "isController": false}, {"data": [[1.6905246E12, 49.0]], "isOverall": false, "label": "Versioning - Version status", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - Get Indihome Children of Cluster Category", "isController": false}, {"data": [[1.6905246E12, 197.0]], "isOverall": false, "label": "History - send history", "isController": false}, {"data": [[1.6905246E12, 33.0]], "isOverall": false, "label": "Content - alive", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - Get Cluster Category", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Deleted - Delete Confirmation", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Deleted - check deletion status", "isController": false}, {"data": [[1.6905246E12, 27.0]], "isOverall": false, "label": "Entitlement - entitle pay tv user", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "payment - alive", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - Get Content Detail", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Login Mobile Number", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Api legacy to nextgen - Get Watchlist Content List", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Login", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Search api -> get search history list", "isController": false}, {"data": [[1.6905246E12, 24.0]], "isOverall": false, "label": "Paytv(playbox) - Check by Customer ID", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Api legacy to nextgen - Add to watchlist", "isController": false}, {"data": [[1.6905246E12, 195.0]], "isOverall": false, "label": "atv login - get ATV login", "isController": false}, {"data": [[1.6905246E12, 213.0]], "isOverall": false, "label": "content tools - get status", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Entitlement - check content lock", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - Get Sub Category List", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Get Profile Info", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "payment - Get Product Detail", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Entitlement - get player", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - Get Content List", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "content tools - reset quiz", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - Get  Content  List Tvod", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - Get Episode List", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Deleted - Wording Account Deletion", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Entitlement - check entitlement", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Entitlement -  player v2", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Visitor", "isController": false}, {"data": [[1.6905246E12, 336.0]], "isOverall": false, "label": "token ETERNAL PROD", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Entitlement - get package detail", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - Get Children of Cluster Category Content", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Api legacy to nextgen - otp", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Versioning -alive", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - Get Content Detail (legacy)", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "payment - Get Operator List", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "atv login - ATV logout", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Search api -> get search suggestion", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Watch List -remove from watchlist", "isController": false}, {"data": [[1.6905246E12, 56.0]], "isOverall": false, "label": "APP CONFIG -get app config list", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Search api -> get popular search", "isController": false}, {"data": [[1.6905246E12, 194.0]], "isOverall": false, "label": "Mail Service - send email verify", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - Get  Content TVOD List", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "payment - checking operator", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "payment - Get Product List", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "payment - Payment By OVO", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - Get Content Core Detail", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Entitlement -  player", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Versioning - Get version status", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Entitlement - get package list", "isController": false}, {"data": [[1.6905246E12, 37.0]], "isOverall": false, "label": "Paytv(playbox) - login", "isController": false}, {"data": [[1.6905246E12, 43.0]], "isOverall": false, "label": "payment - provider list", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "payment - Get Payment Method List", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "History - reset history", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Entitlement -  player v2 ios", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Search api -> clear all history search ", "isController": false}, {"data": [[1.6905246E12, 42.0]], "isOverall": false, "label": "Search api -> search content", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Sign Up", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Entitlement - get user type", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Api legacy to nextgen - Get Watchlist status", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Api legacy to nextgen - remove from watchlist", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Search api v2-> Search content", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Entitlement - get user package list", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "payment - Get Transaction Detail", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Search api -> delete history search", "isController": false}, {"data": [[1.6905246E12, 52.0]], "isOverall": false, "label": "MNC life - Gateway", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - Get Homepage Content List", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - get banner", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Api legacy to nextgen - request otp", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - Get Children of Cluster Category", "isController": false}, {"data": [[1.6905246E12, 0.0]], "isOverall": false, "label": "Content - Get Homepage List", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6905246E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 5.0, "minX": 1.6905246E12, "maxY": 11499.0, "series": [{"data": [[1.6905246E12, 11499.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.6905246E12, 683.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.6905246E12, 11499.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.6905246E12, 880.9999999999993]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.6905246E12, 5.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.6905246E12, 55.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6905246E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 17.0, "minX": 1.0, "maxY": 703.0, "series": [{"data": [[1.0, 703.0], [4.0, 62.5], [2.0, 183.0], [17.0, 21.0], [9.0, 82.0], [5.0, 74.0], [20.0, 17.0], [3.0, 304.0], [7.0, 180.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 20.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 17.0, "minX": 1.0, "maxY": 700.0, "series": [{"data": [[1.0, 700.0], [4.0, 62.0], [2.0, 183.0], [17.0, 21.0], [9.0, 82.0], [5.0, 74.0], [20.0, 17.0], [3.0, 304.0], [7.0, 180.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 20.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 1.45, "minX": 1.6905246E12, "maxY": 1.45, "series": [{"data": [[1.6905246E12, 1.45]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6905246E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 1.45, "minX": 1.6905246E12, "maxY": 1.45, "series": [{"data": [[1.6905246E12, 1.45]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6905246E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.6905246E12, "maxY": 0.016666666666666666, "series": [{"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - Get Content List-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - get banner-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Entitlement -channel list-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - Get  Content TVOD List-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - Get Sub Category List-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "payment - Get Operator List-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "atv login - get ATV login-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Paytv(playbox) - Check by Customer ID-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Login - login-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - Get Homepage List-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Deleted - Wording Account Deletion-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Entitlement - get user package list-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "content tools - reset quiz-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Login Mobile Number-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "atv login - ATV login-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Search api -> clear all history search -success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Api legacy to nextgen - Add to watchlist-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Entitlement -alive-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - Get Cluster Category-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "History - reset history-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Entitlement - get user type-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "History - send history-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - Get Content Bundle List-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "MNC life - Gateway-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Api legacy to nextgen - request otp-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Entitlement - entitle user-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Entitlement - check entitlement-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "content tools - get status-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Search api v2-> Search content-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "payment - Get Product List-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "payment - Payment By MNC Bank-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Visitor-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Watch List - add to watchlist-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Search api -> get search suggestion-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Versioning - Get version status-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Watch List -remove from watchlist-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Api legacy to nextgen - Get Watchlist status-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Mail Service - send email verify-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Entitlement -  player v2-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - Get Children of Cluster Category Content-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - Get Indihome Children of Cluster Category-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - Get Children of Cluster Category-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - Get Content Detail (legacy)-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - Get Content Detail-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "payment - alive-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - Get Episode List-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Entitlement -  player v2 ios-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Versioning -alive-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "payment - provider list-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Search api -> delete history search-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Paytv(playbox) - login-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - Get Content Core Detail-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Login-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Deleted - Delete Confirmation-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "payment - checking operator-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Entitlement - entitle pay tv user-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "payment - Get Transaction Detail-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Sign Up-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Entitlement - get package list-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Entitlement - check content lock-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Versioning - Version status-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Req Password Reset-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "payment - Get Payment Method List-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - Get Homepage Content List-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "atv login - ATV logout-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Entitlement - get package detail-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Get Profile Info-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Deleted - getAPI-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Entitlement -  player-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Search api -> search content-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Api legacy to nextgen - remove from watchlist-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Search api -> get search history list-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Api legacy to nextgen - Get Watchlist Content List-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Search api -> select content-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - Get  Content  List Tvod-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Entitlement - get channel  list-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - deeplink to category-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Entitlement - get player-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "payment - Payment By OVO-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "payment - Get Product Detail-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Api legacy to nextgen - otp-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "token ETERNAL PROD-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Search api -> get popular search-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - alive-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Content - Get Upcoming Content List-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "APP CONFIG -get app config list-success", "isController": false}, {"data": [[1.6905246E12, 0.016666666666666666]], "isOverall": false, "label": "Deleted - check deletion status-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6905246E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 1.45, "minX": 1.6905246E12, "maxY": 1.45, "series": [{"data": [[1.6905246E12, 1.45]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6905246E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
