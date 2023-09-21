import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { ClipLoader } from 'react-spinners';

import { useAuth } from '../../contexts/AuthContext';
import { useImages } from '../../contexts/ImagesContext';
import SortableItem from '../../components/SortableItem/SortableItem';
import InputBar from '../../components/InputBar/InputBar';
import Message from '../../components/Message/Message';
import styles from './Gallery.module.css';
import Logo from '../../components/Logo/Logo';

function Gallery() {
  const {
    filteredImages,
    dispatch,
    handleDragEnd,
    query,
    handleInputChange,
    isLoading,
  } = useImages();
  const { handleSignOut } = useAuth();
  /// /////////////////////////////////////////////////////////////

  const onSignOut = () => {
    handleSignOut();
    dispatch({ type: 'app/reset' });
  };

  /// /////////////////////////////////////////////////////////////////

  return (
    <main className={styles.galleryContainer}>
      <div className={styles.nav}>
        <Logo />
        <button onClick={onSignOut} className={styles.signOut} type="button">
          sign out
        </button>
      </div>

      <InputBar
        str="search"
        placeholder="Filter images by likes"
        value={query}
        func={(e) => handleInputChange(e.target.value)}
      />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredImages} strategy={rectSortingStrategy}>
          <div className={styles.imageContainer}>
            {isLoading ? (
              <ClipLoader size={45} color="#fff" className={styles.loader} />
            ) : (
              <>
                {' '}
                {filteredImages.map((image) => (
                  <SortableItem image={image} key={image.id} />
                ))}
              </>
            )}

            {!isLoading && filteredImages.length === 0 ? (
              <Message
                message={`No images of ${query} likes found`}
                className={styles.errMsg}
              />
            ) : (
              ''
            )}
          </div>
        </SortableContext>
      </DndContext>
    </main>
  );
}

export default Gallery;
