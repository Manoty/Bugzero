// Mirrors backend bookings/pricing.py exactly
export const RESIDENTIAL_PRICING = {
  bedsitter:     [3000,  5000],
  '1_bedroom':   [4000,  6500],
  '2_bedroom':   [5500,  8000],
  '3_bedroom':   [7000,  10000],
  '4_bedroom':   [9000,  15000],
  full_tenting:  [20000, 60000],
}

export const PEST_PRICING = {
  bed_bugs:         [4500,  8000],
  cockroaches:      [3500,  6500],
  termites:         [8000,  30000],
  rodents:          [2500,  8500],
  mosquito_fogging: [4000,  12000],
}

export const COMMERCIAL_FLAT = {
  '20ft_container':      [9000,  10000],
  '40ft_container':      [14000, 15000],
  small_office_annual:   [50000, 150000],
}

export const URGENCY_MULTIPLIERS = {
  normal:    [1.0,  1.0],
  weekend:   [1.20, 1.40],
  emergency: [1.30, 1.50],
}

export const INSPECTION_FEE = [3000, 8000]

export function calculateQuote({ propertyType, serviceKey, urgency = 'normal', sizeValue = null, includeInspection = false }) {
  let baseMin, baseMax

  if (propertyType === 'residential') {
    if (!RESIDENTIAL_PRICING[serviceKey]) return null
    ;[baseMin, baseMax] = RESIDENTIAL_PRICING[serviceKey]
  } else if (propertyType === 'pest') {
    if (!PEST_PRICING[serviceKey]) return null
    ;[baseMin, baseMax] = PEST_PRICING[serviceKey]
  } else if (propertyType === 'commercial') {
    if (COMMERCIAL_FLAT[serviceKey]) {
      ;[baseMin, baseMax] = COMMERCIAL_FLAT[serviceKey]
    } else if (serviceKey === 'per_sqm' && sizeValue) {
      baseMin = 25 * sizeValue
      baseMax = 35 * sizeValue
    } else if (serviceKey === 'grain_storage' && sizeValue) {
      baseMin = 8000 * sizeValue
      baseMax = 20000 * sizeValue
    } else if (serviceKey === 'warehouse' && sizeValue) {
      baseMin = 10000 * sizeValue
      baseMax = 25000 * sizeValue
    } else {
      return null
    }
  } else {
    return null
  }

  const [multMin, multMax] = URGENCY_MULTIPLIERS[urgency] || [1, 1]
  let totalMin = Math.round(baseMin * multMin)
  let totalMax = Math.round(baseMax * multMax)

  if (includeInspection) {
    totalMin += INSPECTION_FEE[0]
    totalMax += INSPECTION_FEE[1]
  }

  return {
    estimatedMin: totalMin,
    estimatedMax: totalMax,
    currency: 'KES',
    urgency,
    hasUrgencySurcharge: urgency !== 'normal',
  }
}

export function formatKES(amount) {
  return `KES ${Number(amount).toLocaleString('en-KE')}`
}