import { store } from '../store'

export const isNumber = (num) => !isNaN(num) && num.trim() !== ''

// for single user
export const getAllWeekBeediPfDistributionWithFormat = (userPf) => {
  const userBeedi = ((userPf * 10) / store.getState().rate.wage) * 1000
  const result = store.getState().weekList.weekList.map((week, idx) => {
    const weekFraction =
      Number(week.value) / store.getState().weekList.totalBeedi

    // for week-i
    const totalBeedi = weekFraction * userBeedi
    const totalWage = (store.getState().rate.wage * totalBeedi) / 1000
    const totalBonus = (store.getState().rate.bonus * totalBeedi) / 1000
    const total = totalWage + totalBonus

    return {
      id: `${week.id}-${idx}`,
      totalBeedi: Math.round((totalBeedi + Number.EPSILON) * 100) / 100,
      totalWage: Math.round((totalWage + Number.EPSILON) * 100) / 100,
      totalBonus: Math.round((totalBonus + Number.EPSILON) * 100) / 100,
      total: Math.round((total + Number.EPSILON) * 100) / 100,
    }
  })

  return result
}

// for all users
export const getPfDistributionForAllUsers = (pfValues) => {
  return store.getState().weekList.weekList.map((week, idx) => {
    const weekFraction = week.value / store.getState().weekList.totalBeedi
    const value = pfValues.map((pf) => {
      const userBeedi =
        ((Number(pf.value) * 10) / store.getState().rate.wage) * 1000
      const totalBeedi = weekFraction * userBeedi
      const totalWage = (store.getState().rate.wage * totalBeedi) / 1000
      const totalBonus = (store.getState().rate.bonus * totalBeedi) / 1000
      const total = totalWage + totalBonus

      return {
        id: `${pf.id}-${idx}`,
        pfAmount: Math.round((Number(pf.value) + Number.EPSILON) * 100) / 100,
        totalBeedi: Math.round((totalBeedi + Number.EPSILON) * 100) / 100,
        totalWage: Math.round((totalWage + Number.EPSILON) * 100) / 100,
        totalBonus: Math.round((totalBonus + Number.EPSILON) * 100) / 100,
        total: Math.round((total + Number.EPSILON) * 100) / 100,
      }
    })
    return { id: `${week.id}-${idx}0`, value }
  })
}

// for pf calculation
export const getAllFromWage = (_wage) => {
  const wage = Number(_wage)
  const pf = wage / 10
  const amount = wage - pf
  const bonus =
    (wage / store.getState().rate.wage) * store.getState().rate.bonus
  const paymentAmount = amount + bonus
  return {
    wage: wage.toFixed(2),
    pf: pf.toFixed(2),
    amount: amount.toFixed(2),
    bonus: bonus.toFixed(2),
    paymentAmount: paymentAmount.toFixed(2),
  }
}

export const getAllFromPf = (_pf) => {
  const pf = Number(_pf)
  const wage = pf * 10
  const amount = wage - pf
  const bonus =
    (wage / store.getState().rate.wage) * store.getState().rate.bonus
  const paymentAmount = amount + bonus
  return {
    wage: wage.toFixed(2),
    pf: pf.toFixed(2),
    amount: amount.toFixed(2),
    bonus: bonus.toFixed(2),
    paymentAmount: paymentAmount.toFixed(2),
  }
}
