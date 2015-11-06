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
 */
(function(window, document, $) {
    // On DT Initialization
    $(document).on('init.dt', function(e, dtSettings) {
        if ( e.namespace !== 'dt' )
            return;

        var options = dtSettings.oInit.hideEmptyCols;

        if ($.isArray(options) || options === true) {
            var api        = new $.fn.dataTable.Api( dtSettings ),
                emptyCount = 0;

            api.columns().every( function () {
                // Check if were only hiding specific columns
                if(options !== true && ($.isArray(options) && ($.inArray(this.index(), options) === -1 && $.inArray(api.column(this.index()).dataSrc(), options) === -1)))
                    return;

                var data = this.data();

                for (var i = 0; i < data.toArray().length; i++)
                    if (data.toArray()[i] === null || data.toArray()[i].length === 0)
                        emptyCount++;


                // If the # of empty is the same as the length, then no values in col were found
                if(emptyCount === data.toArray().length)
                    api.column( this.index() ).visible( false );

                emptyCount = 0;
            } );
        }
    });
})(window, document, jQuery);
