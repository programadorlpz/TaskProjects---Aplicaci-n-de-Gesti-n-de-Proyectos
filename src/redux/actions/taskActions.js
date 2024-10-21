import axios from 'axios';
import {
  FETCH_TASKS_SUCCESS,
  ADD_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
} from '../types';
import { toast } from 'react-toastify';

// Variables para controlar la distribución de tareas
const implementerIds = [8, 9, 10];
const tasksPerImplementer = 3;

// Función para asignar userId basado en el patrón especificado
const assignUserId = (index) => {
  if (index < tasksPerImplementer) return implementerIds[0]; // id: 8
  if (index < tasksPerImplementer * 2) return implementerIds[1]; // id: 9
  return implementerIds[2]; // id: 10
};

// Acción para obtener las tareas
export const fetchTasks = () => async (dispatch, getState) => {
  try {
    // Obtener los usuarios
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = usersResponse.data;

    // Obtener las tareas
    const tasksResponse = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20');
    let tasks = tasksResponse.data;

    // Reasignar userId
    tasks = tasks.map((task, index) => {
      const assignedUserId = assignUserId(index);
      return {
        ...task,
        userId: assignedUserId,
      };
    });

    // Mapeo para incluir el nombre del usuario
    const tasksWithUserData = tasks.map((task) => {
      const user = users.find((u) => u.id === task.userId);
      return { ...task, userName: user ? user.name : 'Desconocido' };
    });

    // Obtener el estado actual para filtrar tareas visibles
    const { auth } = getState();
    const { role, id } = auth.user;

    let visibleTasks = tasksWithUserData;

    if (role === 'implementador') {
      // Para Implementador, solo incluir tareas asignadas a ellos
      visibleTasks = tasksWithUserData.filter((task) => task.userId === id);
    }

    dispatch({ type: FETCH_TASKS_SUCCESS, payload: visibleTasks });
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    // Aquí puedes despachar una acción de error si lo deseas
    toast.error('Error al obtener las tareas');
  }
};

// Acción para agregar una nueva tarea
export const addTask = (taskData) => async (dispatch) => {
  try {
    const newTaskId = Date.now();

    const newTask = {
      id: newTaskId,
      title: taskData.title,
      description: taskData.description, // Utiliza la descripción proporcionada por el usuario
      completed: false,
      userId: parseInt(taskData.userId, 10),
      userName: '',
    };

    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = usersResponse.data;
    const user = users.find((u) => u.id === newTask.userId);
    newTask.userName = user ? user.name : 'Desconocido';

    dispatch({ type: ADD_TASK_SUCCESS, payload: newTask });
    toast.success('Tarea creada exitosamente');
  } catch (error) {
    console.error('Error al agregar la tarea:', error);
    toast.error('Error al crear la tarea');
  }
};

// Acción para actualizar una tarea existente
export const updateTask = (id, taskData) => async (dispatch) => {
  try {
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = usersResponse.data;
    const user = users.find((u) => u.id === taskData.userId);
    const userName = user ? user.name : 'Desconocido';

    const updatedTask = {
      id: id,
      title: taskData.title,
      description: taskData.description, // Utiliza la descripción proporcionada por el usuario
      completed: taskData.completed,
      userId: taskData.userId,
      userName: userName,
    };
    
    dispatch({ type: UPDATE_TASK_SUCCESS, payload: updatedTask });
    toast.success('Tarea actualizada exitosamente');
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    toast.error('Error al actualizar la tarea');
  }
};

// Acción para eliminar una tarea
export const deleteTask = (id) => async (dispatch) => {
  try {
    // Simulamos la eliminación de la tarea
    dispatch({ type: DELETE_TASK_SUCCESS, payload: id });

    // Mostrar toast con desplazamiento personalizado
    toast.success('Tarea eliminada exitosamente', {
      style: { marginBottom: '10px' }, // Desplaza este toast 10px hacia arriba
    });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    toast.error('Error al eliminar la tarea');
  }
};

// Acción para alternar el estado de completado de una tarea
export const toggleTaskCompletion = (task) => async (dispatch) => {
  try {
    // Alternamos el estado de completado
    const updatedTask = { ...task, completed: !task.completed };

    // Obtener los usuarios
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = usersResponse.data;

    const user = users.find((u) => u.id === updatedTask.userId);
    updatedTask.userName = user ? user.name : 'Desconocido';

    dispatch({ type: UPDATE_TASK_SUCCESS, payload: updatedTask });
    toast.success('Estado de la tarea actualizado exitosamente');
  } catch (error) {
    console.error('Error al alternar el estado de la tarea:', error);
    // Despachar una acción de error si es necesario
    toast.error('Error al actualizar el estado de la tarea');
  }
};
