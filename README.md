# DataTables Plugin - Hide Empty Columns #

Set the column visibility to hidden for any targeted columns that contain nothing but null or empty values.

*([Demo Here](http://www.justinhyland.com/p/dt/datatables-hide-empty-columns/examples/))*

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
    hideEmptyCols: ["extn"],
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
