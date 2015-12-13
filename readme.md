#calender.js
Calender is a calendar tool, to create and manage calendars

#Install
To Install Calender, you need download the source, and use the file, calender.js inside ```dist/```

#Usage
To use Calender, you need put those elements in your code
```
<div id="calender_wrap">
	<div id="calender_template">
		<span> {{day}} </span> /
		<span> {{month}} </span> / 
		<span> {{year}} </span>
	</div>
</div>
```

```<div id="calender_wrap">``` is the content of all calendar code
```<div id="calender_template">``` is the template of the days.
inside the template you can use ```{{day}}```, ```{{month}}``` and ```{{year}}```, to show the information of this day

before, you need import the script
```<script src="dist/calender.js"></script>```
and the calender will create the calendar on your page

#Functions and events
if you need change the month, of calender
you can use ```calender.changeDate( MONTH_HERE );```

and if you want know if a day is been clicked, you can use this event ```calender_day_click```

```
document.addEventListener('calender_day_click', function(e) {
	console.log(e.detail);
});
```
```e.detail``` is a object, with the date, like this
```
{
	month: 11,
	year: 2015,
	day: 21	
}
```

#Licence
MIT
