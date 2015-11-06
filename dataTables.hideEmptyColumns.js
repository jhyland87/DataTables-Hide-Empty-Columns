/**
 * @summary     HideEmptyColumns
 * @description Hide any (or specified) columns if no cells in the column(s)
 *              are populated with any values
 * @version     1.0.0
 * @file        dataTables.hideEmptyColumns.js
 * @author      Justin Hyland (http://www.justinhyland.com)
 * @contact     j@linux.com
 * @copyright   Copyright 2015 Justin Hyland
 * @url         https://github.com/jhyland87/DataTables-Hide-Empty-Columns
 *
 * License      MIT - http://datatables.net/license/mit
 *
 * Set the column visibility to hidden for any targeted columns that contain nothing
 * but null or empty values.
 *
 *
 * Parameters:
 *
 * -------------
 * hideEmptyCols
 *      Required:			true
 *      Type:				boolean|array|object
 *      Aliases:            hideEmptyColumns
 *      Description:		Primary setting, either target all columns, or specify an array for
 *                          a list of cols, or an object for advanced settings
 *      Examples:           hideEmptyCols: true
 *                          hideEmptyCols: [ 0, 2, 'age' ]
 *                          hideEmptyCols: { columns: [ 0, 2, 'age' ] }
 *                          hideEmptyCols: { columns: true }
 *
 * hideEmptyCols.columns
 *      Required:           false
 *      Type:               boolean|array
 *      Description:        Either true for all columns, or an array of indexes or dataSources
 *      Examples:           hideEmptyCols: { columns: [ 0, 2, 'age' ] }
 *                          hideEmptyCols: { columns: true }
 *
 * hideEmptyCols.whiteList
 *      Required:           false
 *      Type:               boolean
 *      Description:        Specify if the column list is to be targeted, or excluded
 *      Examples:           hideEmptyCols: { columns: [ 0, 2, 'age' ], whiteList: true }  // Target cols: [ 0, 2, 'age' ]
 *                          hideEmptyCols: { columns: [ 0, 2, 'age' ], whiteList: false } // Exclude cols: [ 0, 2, 'age' ]
 *
 *
 * @example
 *    // Target all columns - Hide any columns that contain all null/empty values
 *    $('#example').DataTable({
 *        hideEmptyCols: true
 *    });
 *
 * @example
 *    // Target the column indexes 0 & 2
 *    $('#example').DataTable({
 *        hideEmptyCols: [0,2]
 *    });
 *
 * @example
 *    // Target the column with 'age' data source
 *    $('#example').DataTable({
 *        ajax: 'something.js',
 *        hideEmptyCols: ['age'],
 *        buttons: [ 'columnsToggle' ],
 *        columns: [
 *            { name: 'name',     data: 'name' },
 *            { name: 'position', data: 'position' },
 *            { name: 'age',      data: 'age' }
 *        ]
 *    });
 *
 * @example
 *    // Target everything *except* the columns 1, 2 & 3
 *    $('#example').DataTable({
 *        hideEmptyCols: {
 *              columns: [ 1, 2, 3 ],
 *              whiteList: false
 *        }
 *    });
 */
(function(window, document, $) {
    // On DT Initialization
    $(document).on('init.dt', function(e, dtSettings) {
        if ( e.namespace !== 'dt' )
            return;

        // Check for either hideEmptyCols or hideEmptyColumns
        var options = dtSettings.oInit.hideEmptyCols || dtSettings.oInit.hideEmptyColumns;

        if ( options === true
            || ($.isArray(options) && options.length !== 0)
            || ( $.isPlainObject(options) && typeof options.columns !== 'undefined') ) {
                var api         = new $.fn.dataTable.Api( dtSettings ),
                    emptyCount  = 0,
                    colList     = [],
                    isWhiteList = ! ($.isPlainObject(options) && typeof options.whiteList !== 'undefined' && options.whiteList === false); // Default to true


            // If the hideEmptyCols setting is an Array..
            if($.isArray(options)) {
                // And its populated..
                if(options.length !== 0) {
                    // Set the value as the column list
                    colList = options;
                }
                else {
                    // Otherwise, quit! since its just an empty array
                    return;
                }
            }
            // If hideEmptyCols setting is an Object..
            else if($.isPlainObject(options)) {
                // If its just set to true..
                if(options.columns === true) {
                    // Set colList to true, enabling every column as a target
                    colList = api.columns().indexes().toArray();
                }
                // If hideEmptyCols.columns is undefined or empty...
                else if(typeof options.columns === 'undefined' || options.columns.length === 0) {
                    // Just quit, as we have nothing to target
                    return;
                }
                else {
                    // Otherwise, set the colList
                    colList = options.columns;
                }
            }
            // If its just a basic 'true' targeting all columns..
            else if(options === true){
                // .. Then get the list of all column indexes
                colList = api.columns().indexes().toArray();
            }
            // Anything else should just go away
            else {
                return;
            }

            // Iterate through each column within the table
            api.columns().every( function () {
                // Reset the empty cell count
                emptyCount = 0;

                // If the current column is *not* found in the list..
                if ( $.inArray(this.index(), colList) === -1 && $.inArray(api.column(this.index()).dataSrc(), colList) === -1 ) {
                    // .. And the list type is whitelist, then skip this loop
                    if ( isWhiteList === true ) return;
                }
                // If the current column *is* found in the list..
                else {
                    // .. And the list type is blacklist, then skip this loop
                    if ( isWhiteList === false ) return;
                }

                var data = this.data();

                // Keep track of how many empty cells are found
                for (var i = 0; i < data.toArray().length; i++)
                    if (data.toArray()[i] === null || data.toArray()[i].length === 0)
                        emptyCount++;

                // If the # of empty is the same as the length, then no values in col were found
                if(emptyCount === data.toArray().length)
                    api.column( this.index() ).visible( false );
            } );
        }
    });
})(window, document, jQuery);
