import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { ValueFormatterParams } from "ag-grid-community";
import React from "react";

export type GridColumn<TModel> = NonNullable<AgGridReactProps<TModel>["columnDefs"]>[number];

export function Grid<TModel extends {id: string}>(properties: {
    rows: TModel[];
    columns: GridColumn<TModel>[];
}) {
    const newRow: Record<string, any> = {};
    return <div className="Grid ag-theme-quartz">
        <AgGridReact
            pinnedBottomRowData={[newRow]}
            columnDefs={properties.columns}
            rowData={properties.rows}
            autoSizeStrategy={{type: "fitGridWidth"}}
            defaultColDef={{
                valueFormatter: (params: ValueFormatterParams) => {
                    if ( !isEmptyPinnedCell(params) ) return;
                    return "New " + params.colDef.field as any;
                }
            }}
            onCellEditingStopped={event => {
                if ( event.rowPinned === "bottom" ) {
                    console.log(event);
                }
            }}
        />
    </div>;
}

function isEmptyPinnedCell({ node, value }: ValueFormatterParams) {
    return (
        node?.rowPinned === "bottom" && value == null ||
        node?.rowPinned === "bottom" && value == ""
    );
}