"""
Fumigation Pricing Engine
Single source of truth for all price calculations.
Mirrors the frontend utility for consistency.
"""

from decimal import Decimal

# ── BASE PRICING TABLE ────────────────────────────────────────────────────────

RESIDENTIAL_PRICING = {
    'bedsitter':      (3000,  5000),
    '1_bedroom':      (4000,  6500),
    '2_bedroom':      (5500,  8000),
    '3_bedroom':      (7000,  10000),
    '4_bedroom':      (9000,  15000),
    'full_tenting':   (20000, 60000),
}

PEST_PRICING = {
    'bed_bugs':          (4500,  8000),
    'cockroaches':       (3500,  6500),
    'termites':          (8000,  30000),
    'rodents':           (2500,  8500),
    'mosquito_fogging':  (4000,  12000),
}

COMMERCIAL_FLAT = {
    '20ft_container':    (9000,  10000),
    '40ft_container':    (14000, 15000),
    'small_office_annual': (50000, 150000),
}

COMMERCIAL_PER_SQM = (25, 35)         # per sqm
COMMERCIAL_GRAIN_PER_TON = (8000, 20000)
COMMERCIAL_WAREHOUSE_PER_500SQM = (10000, 25000)

INSPECTION_FEE = (3000, 8000)

# ── URGENCY MULTIPLIERS ───────────────────────────────────────────────────────

URGENCY_MULTIPLIERS = {
    'normal':    (Decimal('1.0'),  Decimal('1.0')),
    'weekend':   (Decimal('1.20'), Decimal('1.40')),
    'emergency': (Decimal('1.30'), Decimal('1.50')),
}


# ── MAIN CALCULATOR ───────────────────────────────────────────────────────────

def calculate_quote(
    property_type: str,
    service_key: str,
    urgency: str = 'normal',
    size_value: float = None,
    include_inspection: bool = False,
) -> dict:
    """
    Calculate price range for a fumigation service.

    Args:
        property_type: 'residential' | 'commercial' | 'pest'
        service_key:   e.g. '2_bedroom', 'termites', 'per_sqm'
        urgency:       'normal' | 'weekend' | 'emergency'
        size_value:    sqm or tons (required for per-unit commercial services)
        include_inspection: adds inspection fee to estimate

    Returns:
        dict with estimated_min, estimated_max, breakdown
    """

    base_min, base_max = _get_base_price(property_type, service_key, size_value)

    mult_min, mult_max = URGENCY_MULTIPLIERS.get(urgency, (Decimal('1.0'), Decimal('1.0')))

    total_min = Decimal(str(base_min)) * mult_min
    total_max = Decimal(str(base_max)) * mult_max

    breakdown = {
        'base_min': base_min,
        'base_max': base_max,
        'urgency_surcharge': urgency != 'normal',
        'urgency_label': urgency,
    }

    if include_inspection:
        total_min += Decimal(str(INSPECTION_FEE[0]))
        total_max += Decimal(str(INSPECTION_FEE[1]))
        breakdown['inspection_fee'] = INSPECTION_FEE

    return {
        'estimated_min': int(total_min),
        'estimated_max': int(total_max),
        'currency': 'KES',
        'breakdown': breakdown,
    }


def _get_base_price(property_type: str, service_key: str, size_value=None):
    """Resolve base price from the pricing table."""

    if property_type == 'residential':
        if service_key not in RESIDENTIAL_PRICING:
            raise ValueError(f"Unknown residential service: {service_key}")
        return RESIDENTIAL_PRICING[service_key]

    elif property_type == 'pest':
        if service_key not in PEST_PRICING:
            raise ValueError(f"Unknown pest service: {service_key}")
        return PEST_PRICING[service_key]

    elif property_type == 'commercial':
        if service_key in COMMERCIAL_FLAT:
            return COMMERCIAL_FLAT[service_key]

        if service_key == 'per_sqm':
            if not size_value:
                raise ValueError("size_value (sqm) required for per_sqm pricing")
            return (
                COMMERCIAL_PER_SQM[0] * size_value,
                COMMERCIAL_PER_SQM[1] * size_value,
            )

        if service_key == 'grain_storage':
            if not size_value:
                raise ValueError("size_value (tons) required for grain storage")
            return (
                COMMERCIAL_GRAIN_PER_TON[0] * size_value,
                COMMERCIAL_GRAIN_PER_TON[1] * size_value,
            )

        if service_key == 'warehouse':
            if not size_value:
                raise ValueError("size_value (500sqm units) required for warehouse")
            return (
                COMMERCIAL_WAREHOUSE_PER_500SQM[0] * size_value,
                COMMERCIAL_WAREHOUSE_PER_500SQM[1] * size_value,
            )

        raise ValueError(f"Unknown commercial service: {service_key}")

    raise ValueError(f"Unknown property_type: {property_type}")