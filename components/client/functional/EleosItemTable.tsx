import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { SxProps, Theme } from '@mui/system';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';


type Column = {
        label: string;
        type: 'text' | 'icon' | 'editable' | 'button';
};

type RowData = {
    [key: string]: string | JSX.Element;
};

type TableProps = {
    columns: Column[];
    rows: RowData[];
    sx?: SxProps<Theme>;
};

const EleosItemTable: React.FC<TableProps> = ({ columns, rows, sx }) => {
    const [editData, setEditData] = useState<{ [key: string]: string }>({});

    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>, rowId: string, columnId: string) => {
        const newEditData = {
            ...editData,
            [`${rowId}-${columnId}`]: event.target.value,
        };
        setEditData(newEditData);
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
                            <TableCell key={column.label} sx={{ fontWeight: 'bold', fontSize: '1rem' }}>{column.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, idx) => (
                        <TableRow key={idx} sx={tableRowStyles}>
                            {columns.map((column) => {
                                const cellKey = `${idx}-${column.label}`;
                                const cellValue = row[column.label];
                                const toolTips = row['TooolTip'];
                                let content: string | JSX.Element = '';

                                switch (column.type) {
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
                                        content = toolTips ? (
                                            <Tooltip 
                                                title={toolTips}
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

                                return <TableCell key={column.label} sx={{ color: 'grey', fontSize: '1rem' }}>{content}</TableCell>;
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EleosItemTable;
