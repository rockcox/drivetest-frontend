const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

async function request<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...opts?.headers },
    ...opts,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`)
  return json as T
}

export const api = {
  createOrder: (body: Record<string, unknown>) =>
    request<{ orderId: string; payment: { clientSecret: string; feeFormatted: string } }>(
      '/orders', { method: 'POST', body: JSON.stringify(body) }
    ),

  activateOrder: (id: string, paymentMethodId: string) =>
    request<{ status: string }>(`/orders/${id}/activate`, {
      method: 'POST', body: JSON.stringify({ paymentMethodId }),
    }),

  confirmSlot: (orderId: string, slotId: string) =>
    request<{ status: string }>(`/orders/${orderId}/confirm/${slotId}`, { method: 'POST' }),

  rejectSlot: (orderId: string, slotId: string) =>
    request<{ status: string }>(`/orders/${orderId}/reject-slot`, {
      method: 'POST', body: JSON.stringify({ slotId }),
    }),

  cancelOrder: (id: string) =>
    request<{ status: string }>(`/orders/${id}/cancel`, { method: 'POST' }),

  updateOrder: (id: string, body: Record<string, unknown>) =>
    request<{ message: string }>(`/orders/${id}`, {
      method: 'PATCH', body: JSON.stringify(body),
    }),

  getStatus: (orderId: string) =>
    request<OrderStatus>(`/status/${orderId}`),

  getLocations: () =>
    request<{ locations: string[] }>('/locations'),
}

export interface OrderStatus {
  order: {
    id: string; status: string; testClass: string; locations: string[]
    dateFrom: string; dateTo: string; timePref: string
    serviceFee: string; createdAt: string
  }
  scanner: {
    status: string; scanCount: number; lastScanAt: string | null
    nextScanAt: string | null; currentLocation: string | null
    recentErrors: Array<{ timestamp: string; type: string; message: string }>
  } | null
  foundSlot: {
    id: string; location: string; date: string; time: string
    expiresAt: string; expiresInMinutes: number
  } | null
  booking: {
    confirmation: string; location: string
    date: string; time: string; bookedAt: string
  } | null
  notifications: Array<{ type: string; channel: string; sent_at: string; success: boolean }>
}
