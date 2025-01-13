export type Role = 'USER' | 'ROLE'

export type Status = 'opérationnel' | 'blessé' | 'suspendu' | 'inconnu'

export type Position = 'gk' | 'def' | 'mf' | 'fw'

export const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/
