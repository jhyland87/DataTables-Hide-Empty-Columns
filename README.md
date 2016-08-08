# DataTables Plugin - Hide Empty Columns #

**Current HEC Version**: *v1.2.1*
**Supported jQuery**: *v1.11.3+*
**Supported DataTables**: *v1.10.9+*

Set the column visibility to hidden for any targeted columns that contain nothing but null or empty values.

*([Demo Here](http://demo.jsdigest.com/DataTables-Hide-Empty-Columns/examples/))*

### Parameters ###
Parameter                       | Type                      | Default  	   	| Description
------------------------------- | ------------------------- | ------------- | ------------
`hideEmptyCols`                 | boolean/object            | true	       	| Enable/Disable hideEmptyCols plugin
`hideEmptyCols.columns`         | array                     | *All Columns* | Determine which columns to target, can either use the [column name](http://datatables.net/reference/option/columns.name), the [index](http://datatables.net/reference/api/column().index()), or a negative integer to target columns starting from the right side of the table
`hideEmptyCols.whiteList`       | boolean                   | true 		   	| Determine if the targets listed in `hideEmptyCols.columns` should be treated as a whitelist or blacklist (`false` will target all columns except those listed)
`hideEmptyCols.trim`            | boolean                   | true		   	| Trim the values before determining if the cell is empty
`hideEmptyCols.perPage`         | boolean 					| false			| Only hide column(s) if they're empty on the current page (executes on necessary events)
`hideEmptyCols.emptyVals`       | array/string/number/regex | *N/A*         | Define extra values to be interpred as empty (String, Number or Regex pattern, or an array of said values)
`hideEmptyCols.onStateLoad`     | boolean                   | true          | Determine if the column visibility should be set when the DataTables [stateLoadParams](https://datatables.net/reference/event/stateLoadParams) event is fired (when [saveState](https://datatables.net/reference/option/stateSave) is enabled)


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

Target the column indexes 0 and 3, and the column on the right side of the table
```javascript
$('#example-1').DataTable({
    hideEmptyCols: [ 0, 3, -1 ]
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

Target column indexes 1 and 4, adding custom empty values, and only hide the column if empty on current page
```javascript
$('#example').DataTable({
    hideEmptyCols: {
        columns: [ 1, 4 ],
        perPage: true,
        emptyVals: [ '0', /(no|false|disabled)/i ]
    }
})
```

### ToDo ###

Features I plan on adding whenever time permits..

* **Persistent user preferences (`perPage` setting)** - When a viewer hides/shows a specific column or columns, said column(s) should stay in that state, regardless of if they're populated or not; Currently, if a viewer hides/shows a column, then changes pages or filters the table (anything causing the JS to re-execute the column population checks), the columns will be toggled, despite what the viewer set them to be manually.
* **Compatibility with DataTables `[stateSave](https://datatables.net/reference/option/stateSave)` setting** - As shown in an [issue](https://github.com/jhyland87/DataTables-Hide-Empty-Columns/issues/2) opened by a user, the DataTables `stateSave` setting clashes with *HEC*, I need to fix that :(