'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { api, type OrderStatus } from '@/lib/api'
import { supabase } from '@/lib/supabase'
import clsx from 'clsx'

export default function StatusPage() {
  const params = useParams()
  const orderId = params.orderId as string

  const [status, setStatus] = useState<OrderStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [cancelling, setCancelling] = useState(false)

  const fetchStatus = useCallback(async () => {
    try {
      const data = await api.getStatus(orderId)
      setStatus(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [orderId])

  // Initial load + polling every 30s
  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 30_000)
    return () => clearInterval(interval)
  }, [fetchStatus])

  // Supabase realtime — instant updates when scanner finds a slot
  useEffect(() => {
    const channel = supabase
      .channel(`order:${orderId}`)
      .on('broadcast', { event: 'slot_found' }, () => {
        fetchStatus()  // Re-fetch full status
      })
      .on('postgres_changes', {
        event: 'UPDATE', schema: 'public', table: 'scan_jobs',
        filter: `order_id=eq.${orderId}`,
      }, () => fetchStatus())
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'found_slots',
        filter: `order_id=eq.${orderId}`,
      }, () => fetchStatus())
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [orderId, fetchStatus])

  async function handleConfirm() {
    if (!status?.foundSlot) return
    setConfirming(true)
    try {
      await api.confirmSlot(orderId, status.foundSlot.id)
      await fetchStatus()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Confirmation failed')
    } finally {
      setConfirming(false)
    }
  }

  async function handleReject() {
    if (!status?.foundSlot) return
    try {
      await api.rejectSlot(orderId, status.foundSlot.id)
      await fetchStatus()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed')
    }
  }

  async function handleCancel() {
    if (!confirm('Cancel this search? No charge will be made.')) return
    setCancelling(true)
    try {
      await api.cancelOrder(orderId)
      await fetchStatus()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Cancellation failed')
    } finally {
      setCancelling(false)
    }
  }

  if (loading) return <LoadingScreen />
  if (error) return <ErrorScreen error={error} />
  if (!status) return null

  const { order, scanner, foundSlot, booking } = status
  const isActive = ['scanning', 'slot_found', 'confirming'].includes(order.status)
  const isDone = order.status === 'booked'
  const isCancelled = ['cancelled', 'expired'].includes(order.status)

  return (
    <div className="min-h-screen bg-paper">
      {/* Nav */}
      <nav className="border-b border-ink/8 bg-paper/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xl text-ink">DriveSlot</Link>
          <div className="flex items-center gap-3">
            <StatusBadge status={order.status} />
            {isActive && (
              <button onClick={handleCancel} disabled={cancelling}
                className="btn-ghost text-xs text-red/60 hover:text-red">
                {cancelling ? 'Cancelling...' : 'Cancel search'}
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">

        {/* SLOT FOUND ALERT */}
        {foundSlot && order.status === 'slot_found' && (
          <SlotFoundCard slot={foundSlot} onConfirm={handleConfirm} onReject={handleReject} confirming={confirming} />
        )}

        {/* CONFIRMING STATE */}
        {order.status === 'confirming' && <ConfirmingCard />}

        {/* BOOKING CONFIRMED */}
        {isDone && booking && <BookingConfirmedCard booking={booking} />}

        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-ink/40 font-mono mb-1">Order #{orderId.slice(0, 8).toUpperCase()}</p>
            <h1 className="font-display text-2xl text-ink">
              {order.testClass} Road Test — {order.locations.slice(0, 2).join(', ')}{order.locations.length > 2 ? ` +${order.locations.length - 2}` : ''}
            </h1>
            <p className="text-sm text-ink/50 mt-1">
              Searching {formatDate(order.dateFrom)} → {formatDate(order.dateTo)}
              {order.timePref !== 'any' && ` · ${order.timePref}`}
            </p>
          </div>
        </div>

        {/* SCANNER STATS */}
        {scanner && isActive && (
          <ScannerStats scanner={scanner} locations={order.locations} />
        )}

        {/* ORDER DETAILS */}
        <div className="grid sm:grid-cols-2 gap-6">
          <OrderDetails order={order} />
          {status.notifications.length > 0 && (
            <NotificationLog notifications={status.notifications} />
          )}
        </div>

        {/* CANCELLED */}
        {isCancelled && (
          <div className="card text-center py-10">
            <p className="text-ink/40 mb-4">This search has been cancelled. No charge was made.</p>
            <Link href="/order" className="btn-lime px-8">Start a new search</Link>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Slot Found Alert ─────────────────────────────────────────────────────────

function SlotFoundCard({ slot, onConfirm, onReject, confirming }: {
  slot: NonNullable<OrderStatus['foundSlot']>
  onConfirm: () => void; onReject: () => void; confirming: boolean
}) {
  const [timeLeft, setTimeLeft] = useState(slot.expiresInMinutes)

  useEffect(() => {
    const interval = setInterval(() => {
      const mins = Math.max(0, Math.round((new Date(slot.expiresAt).getTime() - Date.now()) / 60_000))
      setTimeLeft(mins)
    }, 10_000)
    return () => clearInterval(interval)
  }, [slot.expiresAt])

  const urgent = timeLeft <= 30

  return (
    <div className={clsx(
      'rounded-2xl p-6 border-2 animate-fade-up animate-once',
      urgent ? 'bg-amber/8 border-amber/40' : 'bg-lime/10 border-lime/40'
    )}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className={clsx('w-2 h-2 rounded-full animate-pulse-dot', urgent ? 'bg-amber' : 'bg-lime-dark')} />
            <span className={clsx('text-sm font-medium', urgent ? 'text-amber' : 'text-ink')}>
              Slot found!
            </span>
          </div>
          <h2 className="font-display text-2xl text-ink">{slot.location} DriveTest</h2>
          <p className="text-ink/60 mt-1">{formatDate(slot.date)} at {formatTime(slot.time)}</p>
        </div>
        <div className={clsx('text-right', urgent ? 'text-amber' : 'text-ink/50')}>
          <p className="text-2xl font-display">{timeLeft}m</p>
          <p className="text-xs">to confirm</p>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button onClick={onConfirm} disabled={confirming}
          className="flex-1 py-3.5 rounded-xl bg-ink text-lime font-medium text-sm transition-all hover:bg-ink-soft disabled:opacity-50">
          {confirming ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-lime/30 border-t-lime rounded-full animate-spin" />
              Booking...
            </span>
          ) : 'Confirm this slot →'}
        </button>
        <button onClick={onReject} disabled={confirming}
          className="py-3.5 px-5 rounded-xl border border-ink/15 text-ink/50 text-sm hover:text-ink hover:border-ink/25">
          Skip
        </button>
      </div>

      <p className="text-xs text-ink/40 mt-3">
        Your card ({slot.location === 'G2' ? '$49' : '$59'}) will only be charged after confirmation.
        Skipping resumes the search.
      </p>
    </div>
  )
}

// ─── Confirming state ─────────────────────────────────────────────────────────

function ConfirmingCard() {
  return (
    <div className="card flex items-center gap-4 animate-fade-up animate-once">
      <div className="w-10 h-10 rounded-full bg-lime/20 flex items-center justify-center shrink-0">
        <span className="w-4 h-4 border-2 border-lime-dark/30 border-t-lime-dark rounded-full animate-spin" />
      </div>
      <div>
        <p className="font-medium text-ink">Booking in progress...</p>
        <p className="text-sm text-ink/50">Completing your appointment on DriveTest.ca. This takes 1–2 minutes.</p>
      </div>
    </div>
  )
}

// ─── Booking confirmed ────────────────────────────────────────────────────────

function BookingConfirmedCard({ booking }: { booking: NonNullable<OrderStatus['booking']> }) {
  return (
    <div className="card-ink animate-fade-up animate-once">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-lime flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 20 20">
            <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-paper/50 text-xs mb-1">Booking confirmed</p>
          <h2 className="font-display text-2xl text-paper mb-3">{booking.location} DriveTest</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Date', value: formatDate(booking.date) },
              { label: 'Time', value: formatTime(booking.time) },
              { label: 'Confirmation', value: booking.confirmation },
            ].map(m => (
              <div key={m.label} className="bg-white/8 rounded-xl p-3">
                <p className="text-xs text-paper/40 mb-1">{m.label}</p>
                <p className="text-sm font-medium text-paper font-mono">{m.value}</p>
              </div>
            ))}
          </div>
          <p className="text-paper/40 text-xs mt-4">
            Check your email for full confirmation details. Arrive 30 minutes early.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Scanner stats ────────────────────────────────────────────────────────────

function ScannerStats({ scanner, locations }: {
  scanner: NonNullable<OrderStatus['scanner']>; locations: string[]
}) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse-dot" />
          <span className="text-sm font-medium text-ink">Live scanner</span>
        </div>
        {scanner.nextScanAt && (
          <p className="text-xs text-ink/40">
            Next scan: {timeFromNow(scanner.nextScanAt)}
          </p>
        )}
      </div>

      {/* Scan count */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Total scans', value: scanner.scanCount.toLocaleString() },
          { label: 'Centres', value: String(locations.length) },
          { label: 'Last scan', value: scanner.lastScanAt ? timeFromNow(scanner.lastScanAt) : '—' },
        ].map(m => (
          <div key={m.label} className="bg-paper-warm rounded-xl p-3">
            <p className="text-xl font-display text-ink">{m.value}</p>
            <p className="text-xs text-ink/40 mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Scan bar animation */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-ink/40 mb-2">
          <span>Scanning</span>
          <span>{scanner.currentLocation ?? 'All centres'}</span>
        </div>
        <div className="h-1.5 bg-ink/8 rounded-full overflow-hidden">
          <div className="h-full bg-lime rounded-full origin-left animate-scan-bar" />
        </div>
      </div>

      {/* Location list */}
      <div className="grid grid-cols-2 gap-1.5">
        {locations.slice(0, 8).map(loc => (
          <div key={loc} className="flex items-center gap-1.5 text-xs text-ink/50">
            <div className="w-1 h-1 rounded-full bg-lime/60" />
            {loc}
          </div>
        ))}
        {locations.length > 8 && (
          <div className="text-xs text-ink/30">+{locations.length - 8} more</div>
        )}
      </div>
    </div>
  )
}

// ─── Order details ────────────────────────────────────────────────────────────

function OrderDetails({ order }: { order: OrderStatus['order'] }) {
  return (
    <div className="card">
      <h3 className="text-sm font-medium text-ink mb-4">Order details</h3>
      <div className="space-y-2.5">
        {[
          { label: 'Test class', value: order.testClass },
          { label: 'Time preference', value: order.timePref },
          { label: 'Date range', value: `${formatDate(order.dateFrom)} → ${formatDate(order.dateTo)}` },
          { label: 'Service fee', value: order.serviceFee },
          { label: 'Centres', value: `${order.locations.length} selected` },
          { label: 'Started', value: timeFromNow(order.createdAt) },
        ].map(m => (
          <div key={m.label} className="flex justify-between text-sm">
            <span className="text-ink/50">{m.label}</span>
            <span className="text-ink font-medium">{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Notification log ─────────────────────────────────────────────────────────

function NotificationLog({ notifications }: { notifications: OrderStatus['notifications'] }) {
  return (
    <div className="card">
      <h3 className="text-sm font-medium text-ink mb-4">Notifications sent</h3>
      <div className="space-y-2">
        {notifications.slice(0, 6).map((n, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={clsx('w-4 h-4 rounded-full flex items-center justify-center', n.channel === 'sms' ? 'bg-ink/8 text-ink' : 'bg-ink/8 text-ink')}>
                {n.channel === 'sms' ? '✉' : '📧'}
              </span>
              <span className="text-ink/60">{n.type.replace(/_/g, ' ')}</span>
              <span className="text-ink/30">{n.channel}</span>
            </div>
            <span className="text-ink/30">{timeFromNow(n.sent_at)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={clsx('badge', `badge-${status}`)}>
      {status === 'scanning' && <span className="w-1.5 h-1.5 rounded-full bg-lime-dark animate-pulse-dot" />}
      {status.replace(/_/g, ' ')}
    </span>
  )
}

// ─── Loading / Error screens ──────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-ink/15 border-t-ink rounded-full animate-spin mx-auto mb-4" />
        <p className="text-ink/40 text-sm">Loading your status...</p>
      </div>
    </div>
  )
}

function ErrorScreen({ error }: { error: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper">
      <div className="text-center max-w-sm">
        <p className="text-ink font-medium mb-2">Couldn't load order</p>
        <p className="text-ink/50 text-sm mb-6">{error}</p>
        <Link href="/" className="btn-outline">Go home</Link>
      </div>
    </div>
  )
}

// ─── Formatters ───────────────────────────────────────────────────────────────

function formatDate(d: string) {
  return new Date(d + 'T12:00:00Z').toLocaleDateString('en-CA', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
}

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number)
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`
}

function timeFromNow(iso: string): string {
  const diff = Math.round((Date.now() - new Date(iso).getTime()) / 60_000)
  if (diff < 1) return 'just now'
  if (diff < 60) return `${diff}m ago`
  if (diff < 1440) return `${Math.round(diff / 60)}h ago`
  return `${Math.round(diff / 1440)}d ago`
}
