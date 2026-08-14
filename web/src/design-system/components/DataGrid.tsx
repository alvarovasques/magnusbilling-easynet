import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';
import type { ColDef, GridOptions, IDatasource } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

// Tema Easynet: header navy, acento sky/ação, Inter.
const easynetTheme = themeQuartz.withParams({
  accentColor: '#176FA6',
  headerBackgroundColor: '#00243C',
  headerTextColor: '#E8F1F8',
  fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
  borderColor: '#D7E3ED',
  rowHoverColor: '#E3F1FB',
  oddRowBackgroundColor: '#F8FBFD',
});

interface Props<T> {
  columns: ColDef<T>[];
  datasource: IDatasource;
  gridOptions?: GridOptions<T>;
  height?: number | string;
}
export function DataGrid<T>({ columns, datasource, gridOptions, height = '100%' }: Props<T>) {
  return (
    <div style={{ height }}>
      <AgGridReact<T>
        theme={easynetTheme}
        columnDefs={columns}
        rowModelType="infinite"
        datasource={datasource}
        cacheBlockSize={50}
        defaultColDef={{ sortable: true, resizable: true, filter: true, minWidth: 110 }}
        localeText={{ noRowsToShow: 'Sem registros', loadingOoo: 'Carregando…' }}
        {...gridOptions}
      />
    </div>
  );
}
