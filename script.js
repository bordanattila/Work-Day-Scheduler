var date = $("p#currentDay");
var timeBlocks = $(".container");

var todayDate = moment();
$("#1a").text(todayDate.format("MMM Do, YYYY"));
var weekDay = todayDate.format("dddd")
$("#2a").text(weekDay);
var formatDate = moment(todayDate, "MMM Do, YYYY").format("dddd, MMMM do YYYY")
var currentHour = moment().format("h");

date.text(formatDate);

for (var i = 7; i < 19; i++) {
    var unorderedList = $("<ul>")
    unorderedList.addClass("list-group list-group-horizontal")
    timeBlocks.append(unorderedList)
    var time = $("<li>");
    time.addClass("list-group-item list-group-item-secondary text-center");
    time.text(i+":00");
    var task = $("<input>");
    task.addClass("list-group-item list-group-item-success");
    task.text("empty");
    var save = $("<li>");
    save.addClass("list-group-item list-group-item-info");
    save.text("💾");
    unorderedList.append(time)
    unorderedList.append(task)
    unorderedList.append(save)
}
