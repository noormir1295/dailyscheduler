$(document).ready(function () {
  // test flag
  var test = false;

  // get current moment time
  var now = moment().format("MMMM Do YYYY");

  var nowHour24 = moment().format("H");
  var nowHour12 = moment().format("h");

  if (test) {
    nowHour24 = 13;
    nowHour12 = 1;
  }

  var dateHeading = $("#navbar-subtitle");
  dateHeading.text(now);

  // Get stored todos from localStorage by using JSON string
  var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

  if (test) {
    console.log(storedPlans);
  }

  // Updating the plan array to it if plans were retrieved from the localStorage
  if (storedPlans !== null) {
    textArray = storedPlans;
  } else {
    textArray = new Array(9);
  }

  if (test) {
    console.log("full array of planned text", textArray);
  }

  // set variable for planner element
  var plannerDiv = $("#plannerContainer");
  // clear existing elements
  plannerDiv.empty();

  if (test) {
    console.log("current time", nowHour12);
  }

  // build calendar by row for all set of hours
  for (var hour = 9; hour <= 17; hour++) {
    var index = hour - 9;

    // build row components
    var rowDiv = $("<div>");
    rowDiv.addClass("row");
    rowDiv.addClass("plannerRow");
    rowDiv.attr("hour-index", hour);

    // Start building Time box portion of row
    var timeDiv = $("<div>");
    timeDiv.addClass("col-md-2");

    // create timeBox element
    var timeBox = $("<span>");
    // use attribute to get the value
    timeBox.attr("class", "timeBox");

    // formatting hours for display
    var displayHour = 0;
    var time = "";
    if (hour > 12) {
      displayHour = hour - 12;
      time = "pm";
    } else {
      displayHour = hour;
      time = "am";
    }

    // adding time into timebox
    timeBox.text(`${displayHour} ${time}`);

    rowDiv.append(timeDiv);
    timeDiv.append(timeBox);

    // Screating an input for row by adding attributes
    var dailyPlan = $("<input>");

    dailyPlan.attr("id", `input-${index}`);
    dailyPlan.attr("hour-index", index);
    dailyPlan.attr("type", "text");
    dailyPlan.attr("class", "dailyPlan");

    // access index from data array for hour
    dailyPlan.val(textArray[index]);

    // create col to control width
    var inputDiv = $("<div>");
    inputDiv.addClass("col-md-9");

    // add col width and row component to row
    //append new divs and input using variables
    rowDiv.append(inputDiv);
    inputDiv.append(dailyPlan);

    // Creating save div for planner
    var saveDiv = $("<div>");
    saveDiv.addClass("col-md-1");

    var saveBtn = $("<i>");
    saveBtn.attr("id", `saveid-${index}`);
    saveBtn.attr("save-id", index);
    saveBtn.attr("class", "far fa-save saveIcon");

    // add col width and row component to row
    rowDiv.append(saveDiv);
    saveDiv.append(saveBtn);

    // setting row color based on time
    updateRowColor(rowDiv, hour);

    // append row to planner
    plannerDiv.append(rowDiv);
  }

  // creating a function to update row color
  function updateRowColor(hourRow, hour) {
    //using if statement for for row colors
    if (test) {
      console.log("rowColor ", nowHour24, hour);
    }

    if (hour < nowHour24) {
      // adding css to hour hourly rows
      if (test) {
        console.log("lessThan");
      }
      hourRow.css("background-color", "lightgrey");
    } else if (hour > nowHour24) {
      if (test) {
        console.log("greaterthan");
      }
      hourRow.css("background-color", "lightgreen");
    } else {
      if (test) {
        console.log("eqaul");
      }
      hourRow.css("background-color", "red");
    }
  }

  // save to local storage
  // creating onclick function for user clicks on planner
  $(document).on("click", "i", function (event) {
    event.preventDefault();

    if (test) {
      console.log("click pta before " + textArray);
    }

    var indexSave = $(this).attr("save-id");

    var inputId = "#input-" + indexSave;
    var value = $(inputId).val();

    textArray[indexSave] = value;

    if (test) {
      console.log("value ", value);
    }
    if (test) {
      console.log("index ", indexSave);
    }
    if (test) {
      console.log("click pta after " + textArray);
    }

    localStorage.setItem("storedPlans", JSON.stringify(textArray));
  });

  // function to save button on change of input
  $(document).on("change", "input", function (event) {
    event.preventDefault();
    if (test) {
      console.log("onChange");
    }
    if (test) {
      console.log("id", $(this).attr("hour-index"));
    }

    var i = $(this).attr("hour-index");
  });
});
