import React, { useState } 
                from 'react';

import { RowData } 
                from '@/lib/client/model/EleosMisc';
import {
        Table,
        TableBody,
        TableCell,
        TableContainer,
        TableHead,
        TableRow,
        Paper,
        TextField,
        Tooltip,
        IconButton,
    } 
                from '@mui/material';
import EditIcon from 
                '@mui/icons-material/Edit'
import DeleteIcon 
                from '@mui/icons-material/Delete'
import ArrowUpwardIcon 
                from '@mui/icons-material/ArrowUpward';
import { SxProps, Theme } 
                from '@mui/system'

type Column = {
        label: string;
        type: 'text' | 'number' | 'icon' | 'icon2' | 'button' | 'pen' | 'delete' | 'switch-up';
}

export enum TableRowAction {
    EDIT = 'edit',
    DELETE = 'delete',
    MOVE_UP = 'move_up',
}

type TableProps = {
    columns: Column[];
    rows: RowData[];
    onChanged: (row: RowData, action: TableRowAction) => void;
    disableEdit?: boolean;
    sx?: SxProps<Theme>;
};

const EleosItemTable: React.FC<TableProps> = ({ columns, rows, onChanged, disableEdit, sx }) => {
    const tableCellStyles = {
        fontWeight: 'bold', 
        fontSize: '1rem'
    }

    const tableRowStyles = {
        '& td': {
            padding: '6px 16px', // Reducing vertical padding to make rows shorter
            fontSize: '0.875rem' // Optional: Adjust font size if necessary
        }
    }

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
                                textAlign: 'left'}}>{column.label}
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
                                    case 'pen':
                                        content = (
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    disabled={disableEdit}
                                                    onClick={() => onChanged(row, TableRowAction.EDIT)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )
                                        break
                                    case 'delete':
                                        content = (
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    disabled={disableEdit}
                                                    onClick={() => onChanged(row, TableRowAction.DELETE)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>)
                                        break
                                    case 'switch-up':
                                            content = (
                                                <Tooltip title="Move up">
                                                    <IconButton
                                                        disabled={disableEdit}
                                                        onClick={() => onChanged(row, TableRowAction.MOVE_UP)}
                                                    >
                                                        <ArrowUpwardIcon />
                                                    </IconButton>
                                                </Tooltip>)
                                            break
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
