var dashboardTutorial = (function () {

    var parseDate = function (d) {
        return new Date('20' + d.substring(6),
            d.substring(3, 5),
            d.substring(0, 2));
    };

    var cleanData = function (data) {
        data.forEach(function (d, i) {
            d.index = i;
            d.date = parseDate(d['Sale Date']);

            // We can also convert values, parse floats etc.

            d['Sale Price'] = parseFloat(d['Sale Price']);
            d['Square meters'] = parseInt(d['Square meters']);
            d['Bedrooms'] = parseInt(d['Bedrooms']);
            d['Bathrooms'] = parseInt(d['Bathrooms']);
        });
    };

    return {
        useDC: function () {

            d3.csv('../data/house_sales.csv', function (data) {

                cleanData(data);

                var houseSales = crossfilter(data);

                var salesDate = houseSales.dimension(function (d) {
                    return d.date;
                });

                var salesDatesalesDateGroup = salesDate.group();

                var minDate = new Date(salesDate.bottom(1)[0].date);
                var maxDate = new Date(salesDate.top(1)[0].date);

                dc.barChart('#salesChart')
                    .width(1000)
                    .x(d3.time.scale().domain([minDate, maxDate]))
                    .dimension(salesDate)
                    .group(salesDatesalesDateGroup)
                    .xAxisLabel('Year')
                    .yAxisLabel('Number of Sales');


                // Now let's add some other charts
                // We can have row charts, pie charts, scatter plots, multi-scale plots etc.

                // I want to add a rowChart for the town the sales were made.
                // first we create the dimension we want
                var city = houseSales.dimension(function (d) {
                    return d.City;
                });

                var cityGroup = city.group();
                dc.rowChart('#cityChart')
                    .width(300)
                    .dimension(city)
                    .group(cityGroup);



                dc.renderAll();
            });
        }
    }

})();