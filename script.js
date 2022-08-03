var date = $("p#currentDay");
var timeBlocks = $(".container");
var selected = "";
var enteredTask;
var input = $();
var combined;
var createPopup = $("<div>");

// Create date for header
var todayDate = moment();
todayDate.format("MMM Do, YYYY");
var weekDay = todayDate.format("dddd")
var formatDate = moment(todayDate, "MMM Do, YYYY").format("dddd, MMMM do YYYY")
var currentHour = moment().format("HH");
date.text(formatDate);

//Create layout
function createGrid () {
    timeBlocks.addClass("time-block description");
    timeBlocks.append(createPopup)
    createPopup.addClass("hide");
    for (var i = 6; i < 19; i++) {
        var createRow = $("<div>");
        createRow.addClass("row");
        timeBlocks.append(createRow);
        var time = $("<span>");
        time.addClass("col-1 hour ");
        time.text(i+":00");
        var task = $("<textarea>");
        task.addClass("col ");
        var save = $("<div>");
        save.addClass("col-1 saveBtn");
        save.text("💾");
        createRow.append(time);
        createRow.append(task);
        createRow.append(save);
        if (currentHour == i) {
            task.addClass("present");
        } else if (currentHour > i) {
            task.addClass("past");
        } else {
            task.addClass("future");
        }
    }
    $("textarea").attr("id", function(index) {
        return "task-"+index;
    })
    logEvent();
}

createGrid();
renderOld();

//Add event listener to textarea and save button
function logEvent () {
    $("textarea").on("click", function () {
        selected = $(this).attr("id")
        combined = "#" + selected
    })

    $(".saveBtn").on("click", function() {
        console.log(combined)
        var toDo = document.querySelector(combined).value;
        localStorage.setItem(selected, toDo);
        renderNew();
    })
}

//Dispaly existing events after refresh
function renderOld () {
    for (k in localStorage) {
    var target = document.querySelector("#"+k)
    var cell = localStorage.getItem(k);
    target.textContent = cell
    }
}

//Add new events to local storage
function renderNew () {
        console.log("render")
    var taskCell = localStorage.getItem(selected);
    var scheduledTask = document.querySelector(combined);
    scheduledTask.text = taskCell;
    console.log(taskCell);
    $("div.hide").show(3000);
}
