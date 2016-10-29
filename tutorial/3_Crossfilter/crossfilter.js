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
        crossfilter: function () {

            d3.csv('../data/house_sales.csv', function (data) {
                console.log(data);

                cleanData(data);

                var houseSales = crossfilter(data);

                var price = houseSales.dimension(function (d) {
                    return d['Sale Price'];
                });

                // This will reduce on the Sale Price, which results in a simple array of
                // key: e.g. 119 (the key is what we're reducing on)
                // value: 2 (this is how often the key occurs)

                var priceGroup = price.group();

                var body = d3.select('body');
                body.append('h2').text('Prices');
                body.append('p')
                    .text('Top price is £' + price.top(1)[0]['Sale Price'] + ',000');

                body.append('p')
                    .text('Lowest price is £' + price.bottom(1)[0]['Sale Price'] + ',000');

                body.append('p')
                    .text('Most common price is £' + priceGroup.top(1)[0]['key'] + ',000 with ' + priceGroup.top(1)[0]['value'] + ' occurrences');


                body.append('h4').text('Applying filter');
                body.append('p').text('Between £300k and £500k').style({'padding-left': '20px'});

                price.filter(function (d) {
                    return d > 300 && d < 500;
                }).top(2);


                body.append('h4').text('Filtered Prices').style({'padding-left': '20px'});
                body.append('p')
                    .text('Top price is £' + price.top(1)[0]['Sale Price'] + ',000')
                    .style({'padding-left': '20px'});

                body.append('p')
                    .text('Lowest price is £' + price.bottom(1)[0]['Sale Price'] + ',000')
                    .style({'padding-left': '20px'});


                body.append('hr');
                body.append('h2').text('Square meters');

                // EXERCISE: Create your own dimension, group, and filters.
                // Get the item with the highest square meters, and the lowest square feet.
                // Filter the square feet by some range, e.g. (70-90 Sq Meters).

            });
        }
    }

})();