function GetRandomId() { return Math.floor(Math.random() * 100000); }

var passedIndexes = []
var incorrectLocations = []
var partlyCorrectLocations = []
var incorrectCount = 0;
var locations = [
    {
        RandomId: GetRandomId(),
        Name: "Noordwijk",
        X: 332,
        Y: 382,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Wassenaar",
        X: 316,
        Y: 454.5,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Leiden",
        X: 357.5,
        Y: 441,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Scheveningen",
        X: 259,
        Y: 483.5,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Den Haag",
        X: 273.5,
        Y: 500,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Alphen aan den Rijn",
        X: 433,
        Y: 463,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Delft",
        X: 296.5,
        Y: 550.5,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Zoetermeer",
        X: 352,
        Y: 521,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Gouda",
        X: 456.5,
        Y: 551.5,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Hoek van Holland",
        X: 192,
        Y: 573,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Vlaardingen",
        X: 288,
        Y: 627.5,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Schiedam",
        X: 313.5,
        Y: 622.5,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Rotterdam",
        X: 352,
        Y: 620,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Spijkenisse",
        X: 279,
        Y: 674.5,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Dordrecht",
        X: 433.5,
        Y: 708,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Gorinchem",
        X: 573,
        Y: 690,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Waal",
        X: 640,
        Y: 706,
        Type: "Water"
    },
    {
        RandomId: GetRandomId(),
        Name: "Haringvliet",
        X: 190,
        Y: 703,
        Type: "Water"
    },
    {
        RandomId: GetRandomId(),
        Name: "Hollands Diep",
        X: 358,
        Y: 790,
        Type: "Water"
    },
    {
        RandomId: GetRandomId(),
        Name: "Nieuwe Maas",
        X: 332,
        Y: 634,
        Type: "Water"
    },
    {
        RandomId: GetRandomId(),
        Name: "Westland",
        X: 252,
        Y: 554,
        Type: "Area"
    },
    {
        RandomId: GetRandomId(),
        Name: "Noord-Holland",
        X: 485,
        Y: 312,
        Type: "Province"
    },
    {
        RandomId: GetRandomId(),
        Name: "Utrecht",
        X: 600,
        Y: 500,
        Type: "Province"
    },
    {
        RandomId: GetRandomId(),
        Name: "Gelderland",
        X: 635,
        Y: 663,
        Type: "Province"
    },
    {
        RandomId: GetRandomId(),
        Name: "Noord-Brabant",
        X: 480,
        Y: 850,
        Type: "Province"
    },
    {
        RandomId: GetRandomId(),
        Name: "Zeeland",
        X: 125,
        Y: 810,
        Type: "Province"
    },
]

async function showCorrect() {
    let promise = new Promise((res, rej) => {
        setTimeout(() => res(true), 1000)
    });

    $("#correct").show();

    let result = await promise;

    $("#correct").hide();
}

async function showIncorrect() {
    console.log("Test");
    let promise = new Promise((res, rej) => {
        setTimeout(() => res(true), 1000)
    });

    $("#incorrect").show();

    let result = await promise;

    $("#incorrect").hide();
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

function checkInput() {
    let input = $("#input").val();

    if (input != '') {
        let selectedItem = $(".selected");
        let currentLocation = locations.find(location => location.RandomId == selectedItem.attr("data-random-id"));

        if (input.toLowerCase() == currentLocation.Name.toLowerCase()) {
            showCorrect();

            if (incorrectCount > 0) {
                selectedItem.addClass("correct-after-retry");
                partlyCorrectLocations.push(currentLocation);
            }
            else {
                selectedItem.addClass("correct");
            }
            selectedItem.removeClass("selected");

            incorrectCount = 0;
            $("#tip").hide();
            $("input").attr("placeholder", "Locatie (3 pogingen over)")
            $("input").val('');
            markNewLocation();
        }
        else {
            showIncorrect();

            if (incorrectCount != 2) {
                incorrectCount++;

                spellingMistake = checkSpellingMistake(input, currentLocation.Name);

                if (spellingMistake) {
                    $("#tip").show();
                }
                else {
                    $("#tip").hide();
                }

                switch (incorrectCount) {
                    case 1:
                        $("input").attr("placeholder", "Locatie (2 pogingen over)")
                        $("input").val('');
                        break;
                    case 2:
                        $("input").attr("placeholder", "Locatie (1 poging over)")
                        $("input").val('');
                        break;
                }
            }
            else {
                incorrectCount = 0;
                $("input").attr("placeholder", "Locatie (3 pogingen over)")
                $("input").val('');
                selectedItem.addClass("incorrect");
                selectedItem.removeClass("selected");
                incorrectLocations.push(currentLocation);
                markNewLocation();
            }
        }
    }
}

function checkSpellingMistake(input, correct) {
    let count = 0;

    for (var i = 0; i < input.length; i++) {
        if (input[i] != correct[i]) {
            count++;
        }
    }

    if ((count / input.length * 100) > 60) {
        return false;
    }
    else {
        return true;
    }
}

function markNewLocation() {
    var index = 0;

    if (locations.length != passedIndexes.length) {
        do {
            index = Math.floor(Math.random() * (locations.length));
        }
        while (passedIndexes.includes(index))

        passedIndexes.push(index);

        console.log(index);
        console.log(passedIndexes);

        let currentLocation = locations[index];
        let locationSelector = '*[data-random-id="' + currentLocation.RandomId + '"]';
        var selectElement = $(locationSelector);
        selectElement.addClass("selected");
    }
    else {
        finish();
    }
}

function closeModal() {
    $('.close, .modal').click(function (event) {
        if ($(event.target).is('.modal, .close')) {
            $('#modal').fadeOut();
        }
    });
}

function setup() {
    $("#tip").hide();
    $("#correct").hide();
    $("#incorrect").hide();

    let count = 0;

    locations.forEach(location => {
        let svgNode = '';

        switch (location.Type.toLowerCase()) {
            case "city":
                svgNode = '<svg class="mark circle" style="left:' + location.X + 'px; top:' + location.Y +
                    'px;"><circle id="location-' + count + '" data-random-id="' + location.RandomId + '" cx="5" cy="5" r="10" fill="black" /></svg>';
                break;
            case "water":
                svgNode = '<svg class="mark rectangle" width="10" height="10" style="left:' + location.X + 'px; top:' + location.Y +
                    'px;"><rect x="0" y="0" width="10" height="10" id="location-' + count + '" data-random-id="' + location.RandomId + '" fill="black" /></svg>';
                break;
            case "area":
                svgNode = '<svg class="mark triangle" width="20" height="20" viewBox="0 0 20 20" style="left:' + location.X + 'px; top:' + location.Y +
                    'px;"><polygon points="0,20 20,20 10,0" id="location-' + count + '" data-random-id="' + location.RandomId + '" /></svg>';
                break;
            case "province":
                svgNode = '<svg class="mark star" width="120" height="120" viewBox="0 0 120 120" style="left:' + location.X + 'px; top:' + location.Y +
                    'px;"><polygon points="60,0 75,45 120,45 85,75 96,120 60,90 24,120 35,75 0,45 45,45" id="location-' + count + '" data-random-id="' + location.RandomId + '" /></svg>';
                break;
        }

        $("#map").append(svgNode);

        count++;
    });

    markNewLocation();
}

function finish() {
    let correct = ('<div class="nice-text"><p class="correct">Goed: ' + (locations.length - incorrectLocations.length - partlyCorrectLocations.length) + '</p>');
    let partlyCorrect = ('<p class="correct-after-retry">Goed na herkansing: ' + partlyCorrectLocations.length + '</p>');
    let incorrect = ('<p class="incorrect">Fout: ' + incorrectLocations.length + '</p></div>');

    let modalText = (correct + partlyCorrect + incorrect)

    if ((incorrectLocations.length + partlyCorrectLocations.length) > 0) {
        let tip = '<p class="nice-text">Wij raden aan onderstaande locaties nog even extra goed te leren.<ul class="nice-text">'

        incorrectLocations.forEach(location => {
            tip += ("<li>" + location.Name + "</li>")
        })

        partlyCorrectLocations.forEach(location => {
            tip += ("<li>" + location.Name + "</li>")
        })

        tip += "</ul></p>";

        modalText += tip;
    }

    $(".modal-text").append(modalText);

    $('#modal').fadeIn();
}

function restart() {
    location.reload();
}

$(document).on('keypress', function (key) {
    if (key.which == 13) {
        checkInput();
    }
});

window.onload = () => setup();