angular.module('calendarDemoApp', [])
// your controller and directive code go here
.directive("calendar", function(calendarLibrary){
	return {
		restrict : 'E',

		templateUrl : 'calendar_directive.html',

		link : function(scope,element,attrs) {
			var today = new Date();
			//set initial month and year
			scope.selectedMonth = today.getMonth();
			scope.months = calendarLibrary.months();
			
			scope.selectedYear = today.getFullYear();
			scope.years = calendarLibrary.years();

			//calculate the range based on current month and year
			var calculateWeeks = function(year, month){
				var date = new Date(year, month, 1);
				var range = CalendarRange.getMonthlyRange(date);

				var weeks = [];
				var week = [];
				var dayCount = 0;
				for (var i = 0; i <= range.days.length; i++) {
					week.push(range.days[i]);
					dayCount++;
					if(dayCount == 7){
						dayCount = 0;
						weeks.push(week);
						week = new Array();
					}
				};

				return weeks;
			}
			scope.weeks = calculateWeeks(scope.selectedYear,scope.selectedMonth );

			//watch for changes in selectedMonth
			scope.$watch('selectedMonth', function(newMonth) {
				scope.updatedWeeks = calculateWeeks(scope.selectedYear,newMonth );
			});

			//watch for changes in selectedYear
			scope.$watch('selectedYear', function(newYear) {
				scope.updatedWeeks = calculateWeeks(newYear,scope.selectedMonth );
			});

			//update weeks on the view
			scope.$watch('updatedWeeks', function(updatedWeeks) {
				scope.weeks = updatedWeeks;
			});

			scope.isToday = function(date){
				var today = new Date();
				today.setHours(0,0,0,0);
				return date == today;
			}
		}
	};
}).factory("calendarLibrary", function(){
	return {
		months : function(){
			
			return [
			{code: 0, name: 'January'},
			{code:1, name: 'February'},
			{code:2, name: 'March'},
			{code:3, name: 'April'},
			{code:4, name: 'May'},
			{code:5, name: 'June'},
			{code:6, name: 'July'},
			{code:7, name: 'August'},
			{code:8, name: 'September'},
			{code:9, name: 'October'},
			{code:10, name: 'November'},
			{code:11, name: 'December'}
			];
		},

		years : function() {
			var currentYear = new Date().getFullYear();
			var years = [];

			var y = 0;
			for (y = currentYear - 20; y <= currentYear + 20; y++) {
				years.push(y);
			};
			return years;
		} 
	};
})
