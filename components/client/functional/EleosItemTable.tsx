import React, { useState } 
                from 'react';
import Table 
                from '@mui/material/Table';
import TableBody 
                from '@mui/material/TableBody';
import TableCell 
                from '@mui/material/TableCell';
import TableContainer 
                from '@mui/material/TableContainer';
import TableHead 
                from '@mui/material/TableHead';
import TableRow 
                from '@mui/material/TableRow';
import Paper 
                from '@mui/material/Paper';
import TextField 
                from '@mui/material/TextField';
import { SxProps, Theme } 
                from '@mui/system';
import Tooltip, { tooltipClasses } 
                from '@mui/material/Tooltip';
import { RowData } 
                from '@/lib/client/model/EleosMisc';


type Column = {
        label: string;
        type: 'text' | 'number' | 'icon' | 'icon2' | 'editable' | 'button';
};

type TableProps = {
    columns: Column[];
    rows: RowData[];
    onChanged: (row: RowData) => void;
    sx?: SxProps<Theme>;
};

const EleosItemTable: React.FC<TableProps> = ({ columns, rows, onChanged, sx }) => {
    const [editData, setEditData] = useState<{ [key: string]: string }>({});

    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>, rowId: string, columnId: string) => {
        const newEditData = {
            ...editData,
            [`${rowId}-${columnId}`]: event.target.value,
        };
        setEditData(newEditData);
        const modifiedRow = {
            ...rows[parseInt(rowId, 10)],
            [columnId]: event.target.value,
        };
        onChanged(modifiedRow);  
    };

    const tableCellStyles = {
        fontWeight: 'bold', 
        fontSize: '1rem'
    };

    const tableRowStyles = {
        '& td': {
            padding: '6px 16px', // Reducing vertical padding to make rows shorter
            fontSize: '0.875rem' // Optional: Adjust font size if necessary
        }
    };


    return (
        <TableContainer component={Paper} sx={sx}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.label} sx={{ 
                                backgroundColor: '#D3D3D3', 
                                color: 'bleck', 
                                fontSize: '1rem',
                                textAlign: 'center'}}>{column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, idx) => (
                        <TableRow key={idx} sx={tableRowStyles}>
                            {columns.map((column) => {
                                const cellKey   = `${idx}-${column.label}`;
                                const cellValue = row[column.label];
                                const toolTip  = row['ToolTip'];
                                const toolTip2  = row['ToolTip2'];
                                console.log('toolTip', toolTip )
                                let content: string | JSX.Element = '';

                                switch (column.type) {
                                    case 'number':
                                        content = Number(cellValue).toLocaleString() 
                                        break;
                                    case 'editable':
                                        content = (
                                            <TextField
                                                value={editData[cellKey] ?? cellValue}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditChange(event, `${idx}`, column.label)}
                                                size="small"
                                            />
                                        );
                                        break;
                                    case 'icon':
                                        content = toolTip ? (
                                            <Tooltip 
                                                title={toolTip}
                                                componentsProps={{
                                                    tooltip: {
                                                      sx:{
                                                        backgroundColor: '#36454F', 
                                                        color: '#FFD700',
                                                        fontSize: '1.2rem',
                                                    }
                                                  }}}
                                            >
                                                <span>{cellValue}</span>
                                            </Tooltip>
                                        ) : cellValue;
                                        break;
                                        case 'icon2':
                                            content = toolTip ? (
                                                <Tooltip 
                                                    title={toolTip2}
                                                    componentsProps={{
                                                        tooltip: {
                                                          sx:{
                                                            backgroundColor: '#36454F', 
                                                            color: '#FFD700',
                                                            fontSize: '1.2rem',
                                                        }
                                                      }}}
                                                >
                                                    <span>{cellValue}</span>
                                                </Tooltip>
                                            ) : cellValue;
                                            break;
                                    case 'button':
                                        content = cellValue;
                                        break;
                                    case 'text':
                                    default:
                                        content = cellValue;
                                        break;
                                }

                                return <TableCell key={column.label} sx={{ backgroundColor: '#8999a3', color: 'white', fontSize: '1rem' }}>{content}</TableCell>;
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EleosItemTable;
