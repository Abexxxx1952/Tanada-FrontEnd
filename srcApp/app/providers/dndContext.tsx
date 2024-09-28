"use client";
import { Dispatch, SetStateAction } from "react";
import {
  closestCenter,
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragCancelEvent,
  defaultAnnouncements,
  DragOverEvent,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Photo } from "@/srcApp/entities/photo/model/types";

interface DragAndDropContextProps {
  children: React.ReactNode;
  photos: Photo[] | null;
  photosSliced: Photo[] | null;
  setPhotos: Dispatch<SetStateAction<Photo[] | null>>;
}

export const DragAndDropContext = ({
  children,
  photos,
  photosSliced,
  setPhotos,
}: DragAndDropContextProps) => {
  const onDragStart = (event: DragStartEvent) => {
    const activeElement = document.getElementById(`${event.active.id}`);
    if (activeElement) {
      activeElement.style.transition = "transform 0ms linear";
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeElement = document.getElementById(`${event.active.id}`);
    if (activeElement) {
      activeElement.style.transitionProperty = "scale";
      activeElement.style.transitionDuration = "0.3s";
      activeElement.style.transitionTimingFunction = "ease";
      activeElement.style.transitionDelay = "0s";
    }
    if (active.id !== over?.id && photos !== null) {
      setPhotos((prevPhotos: Photo[] | null) => {
        if (prevPhotos === null) {
          return null;
        }
        const oldIndex = prevPhotos.findIndex(
          (photo) => photo.id === active.id
        );
        const newIndex = prevPhotos.findIndex((photo) => photo.id === over?.id);
        return arrayMove(prevPhotos, oldIndex, newIndex);
      });
    }
  };

  const onDragCancel = (event: DragCancelEvent) => {
    const activeElement = document.getElementById(`${event.active.id}`);
    if (activeElement) {
      activeElement.style.transitionProperty = "scale";
      activeElement.style.transitionDuration = "0.3s";
      activeElement.style.transitionTimingFunction = "ease";
      activeElement.style.transitionDelay = "0s";
    }
  };

  const activationConstraint = {
    distance: 10,
    delay: 150,
    tolerance: 10,
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint,
    }),
    useSensor(MouseSensor, {
      activationConstraint,
    }),
    useSensor(TouchSensor, {
      activationConstraint,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const announcements = {
    ...defaultAnnouncements,

    onDragStart: ({ active }: DragStartEvent) =>
      `Dragging started. Item: ${active.id}`,
    onDragOver: ({ active, over }: DragOverEvent) =>
      `Dragging item: ${active.id}. Over: ${over?.id}`,
    onDragEnd: ({ active, over }: DragEndEvent) =>
      `Dragging completed. Item: ${active.id}. Moved to: ${over?.id}`,
    onDragCancel: ({ active }: DragCancelEvent) =>
      `Dragging canceled. Item: ${active.id}`,
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
      sensors={sensors}
      accessibility={{ announcements }}
    >
      <SortableContext
        items={photosSliced ? photosSliced : []}
        strategy={rectSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};
