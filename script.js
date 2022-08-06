var date = $("p#currentDay");
var timeBlocks = $(".container");
var selected = "";
var yesterday;
var combined;
var popup = $("div.hide");

// Create date for header
var todayDate = moment();
todayDate.format("MMM Do, YYYY");
var weekDay = todayDate.format("dddd")
var formatDate = moment(todayDate, "MMM Do, YYYY").format("dddd, MMMM do YYYY")
var currentHour = moment().format("HH");
date.text(formatDate);
var forYesterday = formatDate.split(" ")

//clear storage on new day
var compare = localStorage.getItem("yesterday")
if (compare != forYesterday.join(",")) {    
    localStorage.clear();
}

//Create layout
function createGrid () {
    timeBlocks.addClass("time-block description");
    var createPopup = $("<div>");
    timeBlocks.append(createPopup)
    createPopup.addClass("hide description");
    createPopup.html ("Appointment added to <code>localStorage</code> ✔️");
    for (var i = 9; i < 18; i++) {
        var createRow = $("<div>");
        createRow.addClass("row");
        timeBlocks.append(createRow);
        var time = $("<span>");
        time.addClass("col-1 hour padding");
        time.text(i+":00");
        var task = $("<textarea>");
        task.addClass("col ");
        var save = $("<div>");
        save.addClass("col-1 saveBtn padding");
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
        $("div.hide").hide(1000);
    })

    $(".saveBtn").on("click", function() {
        var toDo = document.querySelector(combined).value;
        localStorage.setItem(selected, toDo);
        localStorage.setItem("yesterday", forYesterday)
        renderNew();
    })
}

//Dispaly existing events after refresh
function renderOld () {
    for (k in localStorage) {
    var target = $("#"+k)
    var cell = localStorage.getItem(k);
    if (target === null) {
        continue;
    } else {
        target.val(cell);
    }
    }
}

//Add new events to local storage
function renderNew () {
    var taskCell = localStorage.getItem(selected);
    var scheduledTask = document.querySelector(combined);
    scheduledTask.textContent = taskCell;
    $("div.hide").show(1000);
}
