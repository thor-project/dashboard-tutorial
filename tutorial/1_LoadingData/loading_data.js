var dashboardTutorial = (function () {

    return {
        loadData: function () {

            d3.csv('../data/house_sales.csv', function (data) {
                console.log(data);

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