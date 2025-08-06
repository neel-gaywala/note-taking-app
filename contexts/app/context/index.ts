"use client"

import { createContext, useContext } from "react"

export const AppContext = createContext<Partial<Props>>({})

type Props = {
  show?: boolean
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
}

export const useApp = () => useContext(AppContext)
