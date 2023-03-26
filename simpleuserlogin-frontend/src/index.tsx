// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { Provider, useDispatch } from 'react-redux';
// import { store } from './store';
// import { fetchHelloWorld, postCounter, resetState } from './responseSlice';
// import ResponseDisplay from './ResponseDisplay';

// const App: React.FC = () => {
//   const handleFetchClick = () => {
//     store.dispatch(fetchHelloWorld());
//   };

//   const handleIncrementClick = () => {
//     store.dispatch(postCounter());
//   };

//   const dispatch = useDispatch();

//   const handleReset = () => {
//     dispatch(resetState());
//   };

//   return (
//     <div>
//       <h1>Redux Async Example</h1>
//       <button onClick={handleFetchClick}>Fetch "Hello, World!"</button>
//       <button onClick={handleIncrementClick}>Increment Count</button>
//       <button onClick={handleReset}>Reset</button>
//       <ResponseDisplay />
//     </div>
//   );
// };

// const rootElement = document.getElementById('root')!;
// const root = createRoot(rootElement);
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

// index.tsx for SaveUser example
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import App from './App';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
