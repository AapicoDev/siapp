// components/SegmentPage.tsx

import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box, IconButton, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const rows = [
  { segment: 'Building', description: 'กลุ่มอาคาร', department: 6, customer: 5 },
  { segment: 'Energy', description: 'กลุ่มพลังงาน', department: 1, customer: 1 },
  { segment: 'Education', description: 'กลุ่มการศึกษา', department: 4, customer: 3 },
  { segment: 'Hospitality', description: 'กลุ่มการแพทย์', department: 1, customer: 1 },
];

const SegmentTable: React.FC = () => {
  return (
    <Box >
      
      {/* Main Content */}
      <Box flex={1} p={2}>
        {/* Page Header */}
        <Box display="flex" justifyContent="space-between" justifyItems="center" mb={2}>
          <Box display="flex" gap={2} width="1080px" justifyContent="center" justifyItems="center">
            <TextField label="Segment" variant="outlined" size="small" />
            <TextField label="Description" variant="outlined" size="small" />
            <Button variant="contained" color="primary">+ Add</Button>
            <Button variant="contained">Search</Button>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Checkbox/></TableCell>
                <TableCell>Segment</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell align="center">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell><Checkbox/></TableCell>
                  <TableCell>{row.segment}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default SegmentTable;
