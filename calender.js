(function () {
    "use strict";

    function Calender() {
        this.baseDate = new Date();
        this.dateObject = {};
        this.dateObject.day = this.baseDate.getDate();
        this.dateObject.month = this.baseDate.getMonth() + 1;
        this.dateObject.year = this.baseDate.getFullYear();
        this.init();
    }

    Calender.prototype = {
        init: function () {
            this.render();
        },
        daysInMonth: function (month, year) {
            return new Date(year, month, 0).getDate();
        },
        createMonth: function () {
            var monthMatrix = [],
                weekVector = [],
                monthDays = this.daysInMonth(this.dateObject.month, this.dateObject.year),
                i,
                thisDay,
                firstPosition,
                lastPosition,
                weekPosition,
                backAYear = false;
            for (i = 0; i < monthDays; i += 1) {
                thisDay = new Date(this.dateObject.month + "/" + (i + 1) + "/" + this.dateObject.year);
                weekPosition = thisDay.getDay();
                if (i === 0) {
                    firstPosition = weekPosition;
                }
                if (weekPosition === 0) {
                    monthMatrix.push(weekVector);
                    weekVector = [];
                }
                weekVector[weekPosition] = {
                    day: thisDay.getDate(),
                    month: thisDay.getMonth() + 1,
                    year: thisDay.getFullYear()
                };
            }
            monthMatrix.push(weekVector);
            lastPosition = weekPosition;
            if (this.dateObject.month === 1) {
                backAYear = true;
            }
            for (i = 0; i < firstPosition; i += 1) {
                if (backAYear) {
                    monthMatrix[0][i] = {
                        day: 32 - (firstPosition - i),
                        month: 12,
                        year: this.dateObject.year - 1
                    };
                } else {
                    monthMatrix[0][i] = {
                        day: this.daysInMonth(this.dateObject.month - 1, this.dateObject.year) - (1 - i),
                        month: this.dateObject.month - 1,
                        year: this.dateObject.year
                    };
                }
            }
            for (i = lastPosition + 1; i < 7; i += 1) {
                monthMatrix[monthMatrix.length - 1][i] = {
                    day: i - lastPosition,
                    month: this.dateObject.month + 1 > 12 ? 1 : this.dateObject.month + 1,
                    year: this.dateObject.year
                };
            }
            return monthMatrix;
        },
        changeDate: function (month, day, year) {
            day = day || this.dateObject.day;
            year = year || this.dateObject.year;
            if (!month) {
                return;
            }

            this.dateObject.day = day;
            this.dateObject.year = year;
            this.dateObject.month = month;
            this.render();
        },
        render: function () {
            var wrap = document.getElementById("calender_wrap"),
                template = wrap.children.calender_template,
                templateHTML = "<div onclick=\"calender.action_day_click( {{day}} , {{month}} , {{year}} )\" class=\"calender_week_view\">" + template.innerHTML + "</div>\n",
                temp_templateHTML = templateHTML,
                regex = /{{\S+}}/g,
                month = this.createMonth(),
                variableName,
                i,
                j,
                k,
                thisDay,
                week,
                week_wrap = document.getElementById("calender_week_wrap");
            template.style.display = "none";

            if (week_wrap !== null) {
                wrap.removeChild(week_wrap);
            }

            week_wrap = document.createElement("div");
            week_wrap.id = "calender_week_wrap";
            for (i = 0; i < month.length; i += 1) {
                week = document.createElement("div");
                week.className = "calender_week";
                if (month[i].length === 0) {
                    continue;
                }
                for (j = 0; j < 7; j += 1) {
                    for (k = 0; k < templateHTML.match(regex).length; k += 1) {
                        thisDay = month[i][j];
                        variableName = templateHTML.match(regex)[k].replace("{{", "").replace("}}", "");
                        temp_templateHTML = temp_templateHTML.replace(templateHTML.match(regex)[k], thisDay[variableName]);
                        temp_templateHTML = temp_templateHTML.replace(templateHTML.match(regex)[k], thisDay[variableName]);
                    }
                    week.innerHTML += temp_templateHTML;
                    temp_templateHTML = templateHTML;
                }
                week_wrap.appendChild(week);
            }
            wrap.appendChild(week_wrap);
        },
        action_day_click: function (day, month, year) {
            var event = new CustomEvent('calender_day_click', { 'detail': {day: day, month: month, year: year} });
            document.dispatchEvent(event);
        }
    };

    window.calender = new Calender();

}());