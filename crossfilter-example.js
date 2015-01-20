function print_filter(filter){
	var f=eval(filter);

	if (typeof(f.length) != "undefined") {}
	else{}
	
	if (typeof(f.top) != "undefined") {
		f=f.top(Infinity);
	}
	else{}
	
	if (typeof(f.dimension) != "undefined") {
		f=f.dimension(function(d) { 
			return "";
		}).top(Infinity);
	}
	else{}
	console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
} 

var data = [
  {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
  {date: "2011-11-14T16:20:19Z", quantity: 2, total: 190, tip: 100, type: "tab"},
  {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa"},
  {date: "2011-11-14T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T16:48:46Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T16:53:41Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T16:54:06Z", quantity: 1, total: 100, tip: 0, type: "cash"},
  {date: "2011-11-14T16:58:03Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T17:07:21Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T17:22:59Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T17:25:45Z", quantity: 2, total: 200, tip: 0, type: "cash"},
  {date: "2011-11-14T17:29:52Z", quantity: 1, total: 200, tip: 100, type: "visa"}
];

var ndx = crossfilter(data); 
var totalDim = ndx.dimension(function(item){
	return item.total;
});

var totalCash = ndx.groupAll().reduceSum(function(item){
	return item.total;
}).value();

console.log("total cash = "+totalCash);

var total_90 = totalDim.filter(90); // same as totalDim.filterExact(90);
print_filter("total_90");

var typeDim = ndx.dimension(function(item){
	return item.type;
});
var type_visa = typeDim.filter("visa");
print_filter("type_visa");
var type_cash = typeDim.filter("cash");
print_filter("type_cash");

var totalPerType = typeDim.group().reduceSum(function(item){
	return item.total;
});
/*
	"total(3) = [
		{"key":"tab","value":920},
		{"key":"visa","value":500},
		{"key":"cash","value":300}
	]"
*/

print_filter("totalPerType");

typeDim.filterAll(); // clear all filters 
totalDim.filterAll(); 

var cash_and_visa_filter = typeDim.filter(function(type) { 
	if (type ==="visa" || type==="cash") {
		return type;
	} 
});

print_filter("cash_and_visa_filter");