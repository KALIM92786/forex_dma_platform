import os
import requests
from dotenv import load_dotenv

load_dotenv()

OANDA_API_KEY = os.getenv("OANDA_API_KEY")
OANDA_ACCOUNT_ID = os.getenv("OANDA_ACCOUNT_ID")
OANDA_BASE_URL = os.getenv("OANDA_BASE_URL", "https://api-fxpractice.oanda.com")


def fetch_oanda_live_rate(instrument: str):
    """
    Fetches the live FX rate for the specified instrument (e.g., 'EUR_USD')
    from the OANDA practice API.
    """
    url = f"{OANDA_BASE_URL}/v3/accounts/{OANDA_ACCOUNT_ID}/pricing"
    headers = {
        "Authorization": f"Bearer {OANDA_API_KEY}"
    }
    params = {
        "instruments": instrument
    }

    response = requests.get(url, headers=headers, params=params)
    if response.status_code != 200:
        print(f"Failed to fetch rate: {response.text}")
        return None

    prices = response.json().get("prices", [])
    if not prices:
        return None

    # Use the midpoint of bid and ask
    bids = prices[0].get("bids", [])
    asks = prices[0].get("asks", [])
    if not bids or not asks:
        return None

    bid = float(bids[0]["price"])
    ask = float(asks[0]["price"])
    return round((bid + ask) / 2, 6)


def execute_oanda_trade(pair: str, units: int, side: str):
    """
    Places a live trade (buy/sell) on the OANDA practice account.
    
    Args:
        pair (str): The trading instrument (e.g., "EUR_USD")
        units (int): The number of units to trade
        side (str): "buy" or "sell"

    Returns:
        dict: Response from OANDA API
    """
    url = f"{OANDA_BASE_URL}/v3/accounts/{OANDA_ACCOUNT_ID}/orders"
    headers = {
        "Authorization": f"Bearer {OANDA_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "order": {
            "instrument": pair,
            "units": str(units if side == "buy" else -units),
            "type": "MARKET",
            "positionFill": "DEFAULT"
        }
    }

    response = requests.post(url, headers=headers, json=data)
    if response.status_code not in [200, 201]:
        raise Exception(f"OANDA API error: {response.status_code} - {response.text}")

    return response.json()
