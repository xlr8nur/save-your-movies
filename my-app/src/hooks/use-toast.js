"use client";
// Inspired by react-hot-toast library
import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST"
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString();
}

const toastTimeouts = new Map()

const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

// Reducer için yardımcı fonksiyonlar

const addToast = (state, toast) => {
  return {
    ...state,
    toasts: [toast, ...state.toasts].slice(0, TOAST_LIMIT),
  };
};

const updateToast = (state, toast) => {
  return {
    ...state,
    toasts: state.toasts.map((t) =>
      t.id === toast.id ? { ...t, ...toast } : t),
  };
};

const dismissToast = (state, toastId) => {
  if (toastId) {
    addToRemoveQueue(toastId)
  } else {
    state.toasts.forEach((toast) => {
      addToRemoveQueue(toast.id)
    })
  }

  return {
    ...state,
    toasts: state.toasts.map((t) =>
      t.id === toastId || toastId === undefined
        ? { ...t, open: false }
        : t),
  };
};

const removeToast = (state, toastId) => {
  if (toastId === undefined) {
    return {
      ...state,
      toasts: [],
    };
  }
  return {
    ...state,
    toasts: state.toasts.filter((t) => t.id !== toastId),
  };
};

// Reducer fonksiyonu
export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return addToast(state, action.toast);
    case actionTypes.UPDATE_TOAST:
      return updateToast(state, action.toast);
    case actionTypes.DISMISS_TOAST:
      return dismissToast(state, action.toastId);
    case actionTypes.REMOVE_TOAST:
      return removeToast(state, action.toastId);
    default:
      return state;
  }
}

// State dinleyicileri
const listeners = []

let memoryState = { toasts: [] }

function dispatch(action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Toast fonksiyonu
function toast({
  ...props
}) {
  const id = genId()

  const update = (props) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id })

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

// Custom hook: useToast
function useToast() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    };
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
}

export { useToast, toast }