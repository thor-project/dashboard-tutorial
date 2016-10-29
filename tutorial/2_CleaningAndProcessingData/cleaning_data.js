var dashboardTutorial = (function () {

    var parseDate = function (d) {
        return new Date('20' + d.substring(6),
            d.substring(3, 5),
            d.substring(0,2));
    };

    var cleanData = function(data) {
        data.forEach(function(d) {
            d['Sale Date'] = parseDate(d['Sale Date']);

            // We can also convert values, parse floats etc.

            // EXERCISE: Cleaning up data further.
            // If you look at our data as it's been imported, it has some values as strings,
            // which should be numeric. You can easily cast a string (which you know is numeric)
            // to an integer (e.g. 1) or float (e.g. 1.43) with the parseFloat and parseInt methods
            // built in to JavaScript.
            //
            // Should look at 'Sale Price', 'Square meters', 'Bedrooms', and 'Bathrooms'
        });
    };

    return {
        loadAndCleanData: function () {

            d3.csv('../data/house_sales.csv', function (data) {
                console.log(data);

                cleanData(data);

                /**
                 * D3 allows us to join data and the HTML DOM together.
                 * This is its main power.
                 *
                 * So, what we're saying here, is take all p elements in
                 * #our_data, if an item doesn't exist for a corresponding data element,
                 * create it, otherwise replace its contents with whatever we tell it.
                 */
                d3.selectAll('#our_data p').data(data)
                    .enter()
                    .append('p')
                    .text(function (d) {
                        return d['Sale Date'] + ' - ' + d.City;
                    });
            });
        }
    }

})();