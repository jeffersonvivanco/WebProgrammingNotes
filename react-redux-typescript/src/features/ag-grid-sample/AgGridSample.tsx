import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {AgGridReact} from "@ag-grid-community/react";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {setGridRef, getGridRef} from "./gridTestHelper";

function AgGridSample() {

    const gridRef = useRef<any>(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        {field: 'make', filter: true, checkboxSelection: true},
        {field: 'model', filter: true},
        {field: 'price'}
    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo( ()=> ({
        sortable: true,
    }), []);

    // Example of consuming Grid Event
    const cellClickedListener = useCallback( (event: any) => {
        console.log('cellClicked', event);
    }, []);

    // Example load data from sever
    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData))
    }, []);

    // Example using Grid's API
    const buttonListener = useCallback( (e:any) => {
        // @ts-ignore
        gridRef?.current.api.deselectAll();
        // @ts-ignore
        setGridRef('Hello');
        console.log(getGridRef('he'))
    }, []);


    return (
        <div>
            <h1>{process.env.NODE_ENV}</h1>
            {/* Example using Grid's API */}
            <button onClick={buttonListener}>Push Me</button>

            {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
            <div className="ag-theme-alpine" style={{width: 800, height: 500}}>
                <AgGridReact
                    ref={gridRef} // Ref for accessing Grid's API
                    className="ag-theme-alpine"

                    rowData={rowData} // Row Data for Rows

                    columnDefs={columnDefs} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties

                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowSelection='multiple' // Options - allows click selection of rows
                    suppressRowClickSelection={true}

                    onCellClicked={cellClickedListener} // Optional - registering for Grid Event

                    modules={[ClientSideRowModelModule]}
                />
            </div>
        </div>
    )
}

export default AgGridSample;
