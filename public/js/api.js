// hämta filtrerad data från backend

import { currentIntervalMinutes } from "./config.js";

export async function fetchFilteredData() {
    const since = new Date(Date.now() - currentIntervalMinutes * 60_000).toISOString()
    const res = await fetch(`/api/data?since=${since}`)
    return await res.json()
}
