'use client'

import NcInputNumber from '@/components/nc-input-number'
import { GuestsObject } from '@/type'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'

interface Props {
  defaultValue?: GuestsObject
  onChange?: (data: GuestsObject) => void
  className?: string
}

const GuestsInput: FC<Props> = ({ defaultValue, onChange, className }) => {
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(defaultValue?.guestAdults || 0)
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(defaultValue?.guestChildren || 0)
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(defaultValue?.guestInfants || 0)

  useEffect(() => {
    setGuestAdultsInputValue(defaultValue?.guestAdults || 0)
  }, [defaultValue?.guestAdults])
  useEffect(() => {
    setGuestChildrenInputValue(defaultValue?.guestChildren || 0)
  }, [defaultValue?.guestChildren])
  useEffect(() => {
    setGuestInfantsInputValue(defaultValue?.guestInfants || 0)
  }, [defaultValue?.guestInfants])

  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    let newValue = {
      guestAdults: guestAdultsInputValue,
      guestChildren: guestChildrenInputValue,
      guestInfants: guestInfantsInputValue,
    }
    if (type === 'guestAdults') {
      setGuestAdultsInputValue(value)
      newValue.guestAdults = value
    }
    if (type === 'guestChildren') {
      setGuestChildrenInputValue(value)
      newValue.guestChildren = value
    }
    if (type === 'guestInfants') {
      setGuestInfantsInputValue(value)
      newValue.guestInfants = value
    }
    onChange && onChange(newValue)
  }

  return (
    <div className={clsx(`relative flex flex-col`, className)}>
      <h3 className="mb-5 block text-xl font-semibold sm:text-2xl">Who&lsquo;s coming?</h3>
      <NcInputNumber
        className="w-full"
        defaultValue={guestAdultsInputValue}
        onChange={(value) => handleChangeData(value, 'guestAdults')}
        max={20}
        label="Adults"
        description="Ages 13 or above"
        inputName="guestAdults"
      />
      <NcInputNumber
        className="mt-6 w-full"
        defaultValue={guestChildrenInputValue}
        onChange={(value) => handleChangeData(value, 'guestChildren')}
        max={20}
        label="Children"
        description="Ages 2–12"
        inputName="guestChildren"
      />

      <NcInputNumber
        className="mt-6 w-full"
        defaultValue={guestInfantsInputValue}
        onChange={(value) => handleChangeData(value, 'guestInfants')}
        max={20}
        label="Infants"
        description="Ages 0–2"
        inputName="guestInfants"
      />
    </div>
  )
}

export default GuestsInput
