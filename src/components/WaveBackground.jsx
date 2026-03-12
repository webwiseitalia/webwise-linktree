import { useEffect, useRef, useCallback } from 'react'
import { createNoise2D } from 'simplex-noise'

export default function WaveBackground({
  strokeColor = 'rgba(255, 255, 255, 0.12)',
  backgroundColor = '#030303',
  pointerSize = 175,
  glowColor = 'rgba(46, 186, 235, 0.06)',
}) {
  const svgRef = useRef(null)
  const glowRef = useRef(null)
  const containerRef = useRef(null)
  const animFrameRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000, smoothX: -1000, smoothY: -1000, vx: 0, vy: 0 })
  const gridRef = useRef([])
  const colsRef = useRef(0)
  const rowsRef = useRef(0)
  const pathsRef = useRef([])
  const noise2D = useRef(createNoise2D())
  const timeRef = useRef(0)
  const isMobileRef = useRef(false)

  const SPACING = 22
  const MAX_DISPLACEMENT = 50
  const DAMPING = 0.95
  const SPRING = 0.01
  const MOUSE_LERP = 0.1

  const buildGrid = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const w = container.offsetWidth
    const h = container.offsetHeight
    isMobileRef.current = w < 768
    const spacing = isMobileRef.current ? 30 : SPACING

    const cols = Math.ceil(w / spacing) + 1
    const rows = Math.ceil(h / spacing) + 1
    colsRef.current = cols
    rowsRef.current = rows

    const grid = []
    for (let i = 0; i < cols * rows; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)
      grid.push({
        ox: col * spacing,
        oy: row * spacing,
        dx: 0,
        dy: 0,
        vx: 0,
        vy: 0,
      })
    }
    gridRef.current = grid

    const svg = svgRef.current
    if (!svg) return
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
    svg.setAttribute('width', w)
    svg.setAttribute('height', h)

    while (svg.firstChild) svg.firstChild.remove()

    const paths = []
    for (let c = 0; c < cols; c++) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke', strokeColor)
      path.setAttribute('stroke-width', '1')
      svg.appendChild(path)
      paths.push(path)
    }
    pathsRef.current = paths
  }, [strokeColor])

  const animate = useCallback(() => {
    const grid = gridRef.current
    const cols = colsRef.current
    const rows = rowsRef.current
    const mouse = mouseRef.current
    const noise = noise2D.current
    const paths = pathsRef.current

    if (!grid.length || !paths.length) {
      animFrameRef.current = requestAnimationFrame(animate)
      return
    }

    timeRef.current += 0.003

    mouse.smoothX += (mouse.x - mouse.smoothX) * MOUSE_LERP
    mouse.smoothY += (mouse.y - mouse.smoothY) * MOUSE_LERP

    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${mouse.smoothX}px, ${mouse.smoothY}px)`
    }

    for (let i = 0; i < grid.length; i++) {
      const pt = grid[i]
      const col = i % cols
      const row = Math.floor(i / cols)

      const noiseX = noise(col * 0.06, row * 0.06 + timeRef.current) * 14
      const noiseY = noise(col * 0.06 + 100, row * 0.06 + timeRef.current) * 14

      const ddx = mouse.smoothX - (pt.ox + pt.dx)
      const ddy = mouse.smoothY - (pt.oy + pt.dy)
      const dist = Math.sqrt(ddx * ddx + ddy * ddy)

      if (dist < pointerSize && dist > 0) {
        const force = (1 - dist / pointerSize) * 0.6
        const speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy)
        const mult = Math.min(speed * 0.15, 3) + 1
        pt.vx += mouse.vx * force * mult * 0.02
        pt.vy += mouse.vy * force * mult * 0.02
      }

      pt.vx += (-pt.dx + noiseX) * SPRING
      pt.vy += (-pt.dy + noiseY) * SPRING
      pt.vx *= DAMPING
      pt.vy *= DAMPING
      pt.dx += pt.vx
      pt.dy += pt.vy

      pt.dx = Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, pt.dx))
      pt.dy = Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, pt.dy))
    }

    for (let c = 0; c < cols; c++) {
      let d = ''
      for (let r = 0; r < rows; r++) {
        const pt = grid[r * cols + c]
        const x = pt.ox + pt.dx
        const y = pt.oy + pt.dy
        if (r === 0) {
          d += `M${x.toFixed(1)},${y.toFixed(1)}`
        } else {
          const prev = grid[(r - 1) * cols + c]
          const px = prev.ox + prev.dx
          const py = prev.oy + prev.dy
          const cpY = (py + y) / 2
          d += `C${px.toFixed(1)},${cpY.toFixed(1)} ${x.toFixed(1)},${cpY.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`
        }
      }
      paths[c].setAttribute('d', d)
    }

    animFrameRef.current = requestAnimationFrame(animate)
  }, [pointerSize])

  useEffect(() => {
    buildGrid()

    let prevX = 0, prevY = 0

    const onMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouseRef.current.vx = x - prevX
      mouseRef.current.vy = y - prevY
      mouseRef.current.x = x
      mouseRef.current.y = y
      prevX = x
      prevY = y
    }

    const onTouchMove = (e) => {
      const touch = e.touches[0]
      if (!touch) return
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      mouseRef.current.vx = x - prevX
      mouseRef.current.vy = y - prevY
      mouseRef.current.x = x
      mouseRef.current.y = y
      prevX = x
      prevY = y
    }

    const onMouseLeave = () => {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    const onResize = () => {
      buildGrid()
    }

    const el = containerRef.current
    if (el) {
      el.addEventListener('mousemove', onMouseMove)
      el.addEventListener('touchmove', onTouchMove, { passive: true })
      el.addEventListener('mouseleave', onMouseLeave)
    }
    window.addEventListener('resize', onResize)

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (el) {
        el.removeEventListener('mousemove', onMouseMove)
        el.removeEventListener('touchmove', onTouchMove)
        el.removeEventListener('mouseleave', onMouseLeave)
      }
      window.removeEventListener('resize', onResize)
    }
  }, [buildGrid, animate])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor, zIndex: 0 }}
    >
      <svg
        ref={svgRef}
        className="absolute inset-0"
        style={{ willChange: 'transform' }}
      />

      {/* Glow that follows cursor */}
      <div
        ref={glowRef}
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: '-200px',
          left: '-200px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          willChange: 'transform',
          filter: 'blur(20px)',
        }}
      />

      {/* Noise texture overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  )
}
