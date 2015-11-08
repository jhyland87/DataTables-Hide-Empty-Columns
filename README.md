# DataTables Plugin - Hide Empty Columns #

Set the column visibility to hidden for any targeted columns that contain nothing but null or empty values.

*([Demo Here](http://www.justinhyland.com/p/dt/datatables-hide-empty-columns/examples/))*

### Parameters ###
Parameter 			      | Type 		   | Default  	   | Description
------------------------- | -------------- | ------------- | ------------
`hideEmptyCols`  		  | boolean/object | true	       | Enable/Disable hideEmptyCols plugin
`hideEmptyCols.columns`   | array		   | *All Columns* | Determine which columns to target, can either use the [column name](http://datatables.net/reference/option/columns.name) or [index](http://datatables.net/reference/api/column().index())
`hideEmptyCols.whiteList` |	boolean 	   | true 		   | Determine if the targets listed in `hideEmptyCols.columns` should be treated as a whitelist or blacklist (`false` will target all columns except those listed)


### Example Usage ###

Basic Initialization - Hide any columns with no values
```javascript
$('#example-1').DataTable({
    hideEmptyCols: true
});
```

Target **all** columns & use DataTables [ColumnsToggle](https://datatables.net/reference/button/columnsToggle) button
```javascript
$('#example-1').DataTable({
    dom: 'Bt',
    buttons: [ 'columnsToggle' ],
    hideEmptyCols: true
});
```

Target columns by Indexes
```javascript
$('#example-1').DataTable({
    hideEmptyCols: [1,3] 
});
```

Target columns via name (Using JSON or AJAX data src with Objects)
```javascript
$('#example-1').DataTable( {
    hideEmptyCols: ['extn', 5], // Target extension col, and 5th col (salary)
    data: dataSet,
    columns: [
        { title: "Name", data: "name" },
        { title: "Position", data: "position" },
        { title: "Office", data: "office" },
        { title: "Extn.", data: "extn" },
        { title: "Start date",  data: "start_date" },
        { title: "Salary",  data: "salary" }
    ]
} );
```

Target *all* columns except column indexes **1** and **3**
```javascript
$('#example-1').DataTable({
    hideEmptyCols: {
    	columns: [1,3],
    	whiteList: false
    }
});
```