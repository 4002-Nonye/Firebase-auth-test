/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import { arrayMove } from '@dnd-kit/sortable';
import React, {
  createContext, useContext, useEffect, useReducer,
} from 'react';

const BASE_URL = 'https://api.unsplash.com/photos';
const CLIENT_ID = import.meta.env.VITE_UNSPLASH_ACCESS_TOKEN;

const ImagesContext = createContext();

const initialState = {
  images: [],
  query: '',
  isLoading: true,
  error: '',
};

/// ///////////////////////////////////////////////////////////

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'images/loaded':
      return { ...state, images: action.payload, isLoading: false };

    case 'images/rearranged':
      return { ...state, images: action.payload };

    case 'input/change':
      return { ...state, query: action.payload };

    case 'app/reset':
      return { ...state, query: '' };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action type');
  }
};
function ImagesProvider({ children }) {
  const [{ images, query, isLoading }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  /// /////////////////////////////////////////////////////////////

  // get images on page load
  useEffect(() => {
    const getImages = async () => {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}?client_id=${CLIENT_ID}`);
        const data = await res.json();
        dispatch({ type: 'images/loaded', payload: data });
      } catch (error) {
        dispatch({ type: 'rejected', payload: error });
      }
    };
    getImages();
  }, []);
  /// //////////////////////////////////////////////////////////////////////////////

  // handle input change

  const handleInputChange = (value) => {
    dispatch({ type: 'input/change', payload: value });
  };

  /// ///////////////////////////////////////////////////////////////////////
  // get images by tag

  const filteredImages = images.filter((image) => {
    if (!query || Number.isNaN(query)) return image;

    return image.likes.toString().includes(query);

    // image.likes === Number(query)
  });

  /// ///////////////////////////////////////////////////////////////////////////

  // rearrange images (drag and drop)

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const activeIndex = images.findIndex((image) => image.id === active.id);
      const overIndex = images.findIndex((image) => image.id === over.id);

      // prevent invalid drop
      if (activeIndex !== -1 && overIndex !== -1) {
        // Create a new array with the rearranged images using arrayMove
        const updatedImages = arrayMove(images, activeIndex, overIndex);

        dispatch({ type: 'images/rearranged', payload: updatedImages });
      }
    }
  };

  return (
    <ImagesContext.Provider
      value={{
        filteredImages,
        query,
        handleDragEnd,
        handleInputChange,
        dispatch,
        isLoading,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
}

const useImages = () => {
  const context = useContext(ImagesContext);
  if (context === undefined) { throw new Error('Cannot use Images context outside the Images Provider'); }

  return context;
};

export { ImagesProvider, useImages };
