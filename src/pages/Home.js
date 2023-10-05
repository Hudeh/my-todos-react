import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Div from '../components/Div';
import AppBar from '../components/AppBar';
import Todos from '../components/Task/Todos'
import taskServices from '../services/todos-services'



const Home = ({ setIsAuthenticatd }) => {
   const { data } = useQuery({
     queryKey: ['todos_list'],
     queryFn: taskServices.fetchTaskList,
   });
  return (
    <Div>
      <AppBar setIsAuthenticatd={setIsAuthenticatd} />
      <Div sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Todos data={data?.data} />
      </Div>
    </Div>
  );
};

export default Home;
