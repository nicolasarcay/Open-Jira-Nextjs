import { FC, PropsWithChildren, useReducer } from 'react';
import { uiReducer, UIContext } from './';

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}
// Aca le doy el valor por defecto en el inicio de la aplicacion
const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  // usamos el usereducer para manejar los estados
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: 'UI - Open Sidebar' });
  };

  const closeSideMenu = () => {
    dispatch({ type: 'UI - Close Sidebar' });
  };

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: 'UI - Set isAddingEntry', payload: isAdding });
  };

  const startDragging = () => {
    dispatch({ type: 'UI - startDragging' });
  };
  const endDragging = () => {
    dispatch({ type: 'UI - endDragging' });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        //Methods
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
