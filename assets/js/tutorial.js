var dashboardTutorial = (function () {


    return {
        createSimpleDashboard: function (url, placement, options) {

            d3.csv(url, function (data) {
                console.log(data);

                var houseSales = crossfilter(data);

                var salesDate = houseSales.dimension(function (d) {
                    return d.date;
                });

                var salesDateGroup = salesDate.group();


                var salesByDateChart = dc.barChart(placement)
                    .x()
                    .dimension(salesDate)
                    .group(salesDateGroup);


            });
        }
    }

})();