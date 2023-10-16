function GetRandomId() { return Math.floor(Math.random() * 100000); }

var passedIndexes = []
var incorrectLocations = []
var partlyCorrectLocations = []
var incorrectCount = 0;
var locations = [
    {
        RandomId: GetRandomId(),
        Name: "Reykjavik",
        X: 95.5,
        Y: 124,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "IJsland",
        X: 140,
        Y: 125,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Dublin",
        X: 182,
        Y: 481,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Ierland",
        X: 150,
        Y: 475,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Londen",
        X: 271,
        Y: 556,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Verenigd Koninkrijk",
        X: 250,
        Y: 510,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Amsterdam",
        X: 359.1,
        Y: 547.3,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Nederland",
        X: 365,
        Y: 554,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Brussel",
        X: 343,
        Y: 587,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "België",
        X: 356,
        Y: 598,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Luxemburg",
        X: 373,
        Y: 622.5,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Luxemburg",
        X: 400,
        Y: 620,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Parijs",
        X: 302.5,
        Y: 638,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Frankrijk",
        X: 300,
        Y: 700,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Bern",
        X: 389,
        Y: 702,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Zwitserland",
        X: 392,
        Y: 715,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Madrid",
        X: 153,
        Y: 843,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Spanje",
        X: 134,
        Y: 883,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Lissabon",
        X: 30,
        Y: 855,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Portugal",
        X: 60,
        Y: 822,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Rome",
        X: 488.5,
        Y: 844,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Italië",
        X: 485,
        Y: 815,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Wenen",
        X: 559,
        Y: 670.5,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Oostenrijk",
        X: 525,
        Y: 686,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Praag",
        X: 523.5,
        Y: 619.5,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Tsjechië",
        X: 545,
        Y: 630,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Berlijn",
        X: 503.5,
        Y: 552,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Duitsland",
        X: 440,
        Y: 570,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Warschau",
        X: 635,
        Y: 555.5,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Polen",
        X: 590,
        Y: 560,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Kopenhagen",
        X: 489.5,
        Y: 460.5,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Denemarken",
        X: 434,
        Y: 448,
        Type: "Country"
    },    
    {
        RandomId: GetRandomId(),
        Name: "Stockholm",
        X: 572,
        Y: 357,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Zweden",
        X: 525,
        Y: 280,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Oslo",
        X: 464.5,
        Y: 341,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Noorwegen",
        X: 450,
        Y: 285,
        Type: "Country"
    },
    {
        RandomId: GetRandomId(),
        Name: "Helsinki",
        X: 663.5,
        Y: 322,
        Type: "City"
    },
    {
        RandomId: GetRandomId(),
        Name: "Finland",
        X: 665,
        Y: 170,
        Type: "Country"
    }
]

function isFinished()
{
    return locations.length == passedIndexes.length;
}

async function showCorrect() {
    let promise = new Promise((res, rej) => {
        setTimeout(() => res(true), 1000)
    });

    $("#correct").show();

    let result = await promise;

    $("#correct").hide();
}

async function showIncorrect() {
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

function checkInput(input) {
    if (input != '') {
        let selectedItem = $(".selected");
        let currentLocation = locations.find(location => location.RandomId == selectedItem.attr("data-random-id"));

        if (input.toLowerCase() == currentLocation.Name.toLowerCase()) {
            showCorrect();

            if (incorrectCount > 0) {
                setSelectedStatus("correctAfterRetry");
                partlyCorrectLocations.push(currentLocation);
            }
            else {
                setSelectedStatus("correct");
            }

            incorrectCount = 0;
            $("#tip").hide();
            setTryCountMessage(incorrectCount);
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

                setTryCountMessage(incorrectCount);
            }
            else {
                incorrectCount = 0;
                setTryCountMessage(incorrectCount);
                $("input").val('');
                setSelectedStatus("incorrect");
                incorrectLocations.push(currentLocation);
                markNewLocation();
            }
        }
    }
}

function setTryCountMessage(incorrectCount) {
    switch (incorrectCount) {
        case 2:
            $("#tryCount").text("Je hebt nog 1 poging over.");
            break;
        case 1:
            $("#tryCount").text("Je hebt nog 2 pogingen over.");
            break;
        default:
            $("#tryCount").text("Je hebt nog 3 pogingen over.");
            break;
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

    if (!isFinished()) {
        do {
            index = Math.floor(Math.random() * (locations.length));
        }
        while (passedIndexes.includes(index))

        passedIndexes.push(index);

        let currentLocation = locations[index];
        let locationSelector = '*[data-random-id="' + currentLocation.RandomId + '"]';
        var selectElement = $(locationSelector);

        selectElement.addClass("selected");

        if (getType() == "click") {
            blackOutSelectedMarker();
        }

        if (currentLocation.Type.toLowerCase() == "capital") {
            $(".locationName").text("de hoofdstad");
        }
        else {
            $(".locationName").text(currentLocation.Name);
        }
    }
    else {
        finish();
    }
}

function getType() {
    return $("#type").val();
}

function removeUnusedLocations() {
    var newLocationArray = [];

    locations.forEach(location => {
        let id = ("#" + location.Type.toLowerCase());
        let checked = $(id).is(":checked");

        if (checked) {
            newLocationArray.push(location);
        }
    });

    locations = newLocationArray;
}

function checkInputBox() {
    let input = $("#input").val();
    checkInput(input);
}

function checkClicked(clicked) {
    var dataRandomId = clicked.getAttribute("data-random-id");

    if (dataRandomId == null) {
        dataRandomId = clicked.firstChild.getAttribute("data-random-id");
    }

    var location = locations.find(location => location.RandomId == dataRandomId).Name;
    checkInput(location);
}

function setSelectedStatus(status) {

    let selectedItem = $(".selected");

    switch (status) {
        case "correct":
            selectedItem.addClass("correct");
            break;
        case "correctAfterRetry":
            selectedItem.addClass("correct-after-retry");
            break;
        case "incorrect":
            selectedItem.addClass("incorrect");
            break;
    }

    selectedItem.removeClass("selected");
}

function addLocation() {
    let count = 0;

    locations.forEach(location => {
        let node = '';
        let onclickEvent = (getType() == "click") ? 'clickable" onclick="checkClicked(this)"' : '"';

        switch (location.Type.toLowerCase()) {
            case "city":
                node = '<svg class="mark circle ' + onclickEvent + ' style="left:' + location.X + 'px; top:' + location.Y +
                    'px;"><circle id="location-' + count + '" data-random-id="' + location.RandomId + '" cx="5" cy="5" r="10" fill="black"/></svg>';
                break;
            case "water":
                node = '<svg class="mark rectangle ' + onclickEvent + ' width="10" height="10" style="left:' + location.X + 'px; top:' + location.Y +
                    'px;"><rect x="0" y="0" width="10" height="10" id="location-' + count + '" data-random-id="' + location.RandomId + '" fill="black"/></svg>';
                break;
            case "area":
                node = '<svg class="mark triangle ' + onclickEvent + ' width="20" height="20" viewBox="0 0 20 20" style="left:' + location.X + 'px; top:' + location.Y +
                    'px;"  ' + onclickEvent + ' ><polygon points="0,20 20,20 10,0" id="location-' + count + '" data-random-id="' + location.RandomId + '"/></svg>';
                break;
            case "province":
                node = '<svg class="mark star ' + onclickEvent + ' width="120" height="120" viewBox="0 0 120 120" style="left:' + location.X + 'px; top:' + location.Y +
                    'px;"  ' + onclickEvent + ' ><polygon points="60,0 75,45 120,45 85,75 96,120 60,90 24,120 35,75 0,45 45,45" id="location-' + count + '" data-random-id="' + location.RandomId + '"/></svg>';
                break;
            case "river":
                node = '<a class="mark ' + onclickEvent + ' style="left:' + location.X + 'px; top:' + location.Y + 'px;  ' + onclickEvent + ' id="location-' + count + '" data-random-id="' + location.RandomId + '">⼮</a>';
                break;
            case "airport":
                node = '<a class="mark ' + onclickEvent + ' style="left:' + location.X + 'px; top:' + location.Y + 'px;  ' + onclickEvent + ' id="location-' + count + '" data-random-id="' + location.RandomId + '">🛧</a>';
                break;
            case "country":
                node = '<svg class="mark triangle ' + onclickEvent + ' width="20" height="20" viewBox="0 0 20 20" style="left:' + location.X + 'px; top:' + location.Y +
                    'px;"  ' + onclickEvent + ' ><polygon points="0,20 20,20 10,0" id="location-' + count + '" data-random-id="' + location.RandomId + '"/></svg>';
                break;
        }

        $("#map").append(node);

        if (location.Capital == true && getType() != 'write') {
            var capitalCity =
            {
                RandomId: GetRandomId(),
                Name: location.Name,
                X: location.X,
                Y: location.Y,
                Type: "Capital"
            };

            locations.push(capitalCity);

            node = '<svg class="mark circle capitalCity ' + onclickEvent + ' style="left:' + capitalCity.X + 'px; top:' + capitalCity.Y +
                'px;"><circle id="location-' + count + '-capital" data-random-id="' + capitalCity.RandomId + '" data-capital="true" cx="5" cy="5" r="10" fill="none"/></svg>';

            $("#map").append(node);
        }

        count++;
    });

    return count;
}

function blackOutSelectedMarker() {
    $(".selected").css("animation", "none");
    $(".selected").css("-webkit-animation", "none");
    $(".selected").css("-moz-animation", "none");
    $(".selected").css("-ms-animation", "none");
    $(".selected").css("fill", "black");
    $(".selected").css("color", "black");
}

function setType() {
    var type = getType();

    switch (type.toLowerCase()) {
        case "learn":
            $("#showLocationNameBox").show();
            break;
        case "click":
            $("#guessLocationNameBox").show();
            setTryCountMessage(incorrectCount);
            $("#tryCountBox").show();
            $("#tip").remove();
            blackOutSelectedMarker();
            break;
        case "write":
            $("#inputbox").show();
            setTryCountMessage(incorrectCount);
            $("#tryCountBox").show();
            break;
    }
}

function setup() {
    $("#tip").hide();
    $("#correct").hide();
    $("#incorrect").hide();
    $("#inputbox").hide();
    $("#guessLocationNameBox").hide();
    $("#showLocationNameBox").hide();
    $("#tryCountBox").hide();

    removeUnusedLocations();
    var countLocations = addLocation();

    if (countLocations == 0) {
        $("#menu-alert").text("Selecteer op zijn minst één onderdeel.");
    }
    else {
        markNewLocation();
        setType();
        $("#menu").hide();
        $("#board").fadeIn();
    }
}

function nextLocation() {
    setSelectedStatus();
    markNewLocation();
}

function finish() {
    let modalText = "";

    if (getType() != "learn") {
        let correct = ('<div class="nice-text"><p class="correct">Goed: ' + (locations.length - incorrectLocations.length - partlyCorrectLocations.length) + '</p>');
        let partlyCorrect = ('<p class="correct-after-retry">Goed na herkansing: ' + partlyCorrectLocations.length + '</p>');
        let incorrect = ('<p class="incorrect">Fout: ' + incorrectLocations.length + '</p></div>');

        modalText = (correct + partlyCorrect + incorrect)

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
    }
    else {
        modalText = '<p class="nice-text">Dit was de les. 😀 Door het venster te sluiten kun je het opnieuw proberen.<ul class="nice-text">'
    }

    $(".modal-text").append(modalText);
    $('#modal').fadeIn();
}

function restart() {
    location.reload();
}

$(document).on('keypress', function (key) {
    if (key.which == 13) {
        var type = getType();

        switch (type.toLowerCase()) {
            case "learn":
                if (!isFinished()) {
                    nextLocation();
                }
                break;
            case "write":
                checkInputBox();
                break;
        }
    }
}
);

$(document).ready(() => {
    $("#board").hide();
    $("#menu").fadeIn();
});