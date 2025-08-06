"use client"

import React, { useState } from "react"

import { AppContext } from "../context"

type AppProviderProps = {
  children?: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [show, setShow] = useState(true)

  const value = {
    show,
    setShow,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
