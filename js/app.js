
/* ======= Model ======= */

var model = {
    currentTurbine: null,
    Turbines: [
        {
            clickCount : 0,
            name : 'Turbine 1',
            imgSrc : 'http://i.kinja-img.com/gawker-media/image/upload/xga2es0kjiiwsroruscn.jpg',
            imgAttribution : 'Google'
        },
        {
            clickCount : 0,
            name : 'Turbine 2',
            imgSrc : 'https://upload.wikimedia.org/wikipedia/commons/7/79/Dampfturbine_Montage01.jpg',
            imgAttribution : 'Google'
        },
        {
            clickCount : 0,
            name : 'Turbine 3',
            imgSrc : 'http://www.energy.siemens.com/hq/pool/hq/power-generation/gas-turbines/sgt-750/SIM00010_458.jpg',
            imgAttribution : 'Google'
        },
        {
            clickCount : 0,
            name : 'Turbine 4',
            imgSrc : 'https://powergen.gepower.com/content/dam/gepower-pgdp/global/en_US/images/service/upgrades/E-class%20gas%20turbine.jpg',
            imgAttribution : 'Google'
        },
        {
            clickCount : 0,
            name : 'Turbine 5',
            imgSrc : 'http://4.bp.blogspot.com/-v2QePS45WZk/VYV1d7b0LMI/AAAAAAAAAAk/N8kBt5tYdN8/s1600/gas-turbine-gt24-gt26-ev-burner.jpg',
            imgAttribution : 'Google'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current Turbine to the first one in the list
        model.currentTurbine = model.Turbines[0];

        // tell our views to initialize
        TurbineListView.init();
        TurbineView.init();
    },

    getCurrentTurbine: function() {
        return model.currentTurbine;
    },

    getTurbines: function() {
        return model.Turbines;
    },

    // set the currently-selected Turbine to the object passed in
    setCurrentTurbine: function(Turbine) {
        model.currentTurbine = Turbine;
    },

    // increments the counter for the currently-selected Turbine
    incrementCounter: function() {
        model.currentTurbine.clickCount++;
        TurbineView.render();
    }
};


/* ======= View ======= */

var TurbineView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.TurbineElem = document.getElementById('Turbine');
        this.TurbineNameElem = document.getElementById('Turbine-name');
        this.TurbineImageElem = document.getElementById('Turbine-img');
        this.countElem = document.getElementById('Turbine-count');

        // on click, increment the current Turbine's counter
        this.TurbineImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current Turbine
        var currentTurbine = octopus.getCurrentTurbine();
        this.countElem.textContent = currentTurbine.clickCount;
        this.TurbineNameElem.textContent = currentTurbine.name;
        this.TurbineImageElem.src = currentTurbine.imgSrc;
    }
};

var TurbineListView = {

    init: function() {
        // store the DOM element for easy access later
        this.TurbineListElem = document.getElementById('Turbine-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var Turbine, elem, i;
        // get the Turbines we'll be rendering from the octopus
        var Turbines = octopus.getTurbines();

        // empty the Turbine list
        this.TurbineListElem.innerHTML = '';

        // loop over the Turbines
        for (i = 0; i < Turbines.length; i++) {
            // this is the Turbine we're currently looping over
            Turbine = Turbines[i];

            // make a new Turbine list item and set its text
            elem = document.createElement('li');
            elem.textContent = Turbine.name;

            // on click, setCurrentTurbine and render the TurbineView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the Turbine variable to the click event function)
            elem.addEventListener('click', (function(TurbineCopy) {
                return function() {
                    octopus.setCurrentTurbine(TurbineCopy);
                    TurbineView.render();
                };
            })(Turbine));

            // finally, add the element to the list
            this.TurbineListElem.appendChild(elem);
        }
    }
};

// make it go!
octopus.init();
