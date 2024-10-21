import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

const COLORS = ['#0088FE', '#FF8042'];

const TaskStatsModal = ({ open, onClose }) => {
  const { tasks } = useSelector((state) => state.tasks);

  // Calcular tareas completadas y pendientes
  const completed = tasks.filter(task => task.completed).length;
  const pending = tasks.filter(task => !task.completed).length;

  const data = [
    { name: 'Completadas', value: completed },
    { name: 'Pendientes', value: pending },
  ];

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      aria-labelledby="task-stats-dialog-title" 
      fullWidth 
      maxWidth="sm"
      // Asegúrate de no usar disableEnforceFocus aquí
    >
      <DialogTitle id="task-stats-dialog-title">Estadísticas de Tareas</DialogTitle>
      <DialogContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskStatsModal;
