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
        createDashboard: function () {

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

                // I want to add a rowChart for the type of accommodation the sales were made.
                // first we create the dimension we want
                var type = houseSales.dimension(function (d) {
                    return d['Accommodation Type'];
                });

                var typeGroup = type.group();
                dc.pieChart('#typeChart')
                    .innerRadius(40)
                    .width(400)
                    .dimension(type)
                    .group(typeGroup)
                    .legend(dc.legend());


                // I want to add a barChart for the price.
                var price = houseSales.dimension(function (d) {
                    return d['Sale Price'];
                });

                // We get the price range from our price group (as already illustrated in our
                // crossfilter section)
                var minPrice = new Date(price.bottom(1)[0]['Sale Price']);
                var maxPrice = new Date(price.top(1)[0]['Sale Price']);

                var priceGroup = price.group();

                dc.barChart('#priceChart')
                    .x(d3.scale.linear().domain([minPrice, maxPrice]))
                    .width(300)
                    .dimension(price)
                    .group(priceGroup)
                    .xAxisLabel('Price (£1000s)')
                    .yAxisLabel('Number of Sales');

                dc.renderAll();
            });
        }
    }

})();