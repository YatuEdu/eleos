'use client'

import Eleos 
                from "@/lib/client/model/Eleos"
import { FC, useContext, useRef, useState } 
                from "react"

import React from 'react';
import { EleosContext } from '@/lib/context/EleosContext';
              

type EleosAppProviderProps = {
    children: React.ReactNode
}

export function useElos() {
    return useContext(EleosContext);
}

export const EleosAppProvider = ({children}: EleosAppProviderProps) => {
    const eleos = new Eleos()
    const ref = useRef(eleos)
    const [language, setLanguage] = React.useState(eleos.lang);

    return (
        <EleosContext.Provider value={{ref, language, setLanguage}}>
            {children}
        </EleosContext.Provider>
    )
}