'use client'

import React, { useRef, useMemo, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload } from '@react-three/drei'
import * as random from 'maath/random'

function StarField(props: any) {
    const ref = useRef<any>(null)
    // 1500 points (4500 floats) - lightweight and high-performance
    const sphere = useMemo(() => random.inSphere(new Float32Array(4500), { radius: 1.2 }), [])

    useFrame((state, delta) => {
        if (ref.current) {
            // Smooth, predictable gentle drift with minimal CPU/GPU overhead
            ref.current.rotation.x -= delta * 0.05
            ref.current.rotation.y -= delta * 0.075
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled {...props}>
                <PointMaterial
                    transparent
                    color="#fff"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}

export default function StarsCanvas() {
    const [reducedMotion, setReducedMotion] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
            setReducedMotion(mq.matches)
        }
    }, [])

    if (reducedMotion) {
        return null
    }

    return (
        <div className="w-full h-auto fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 1] }}
                dpr={[1, 1.5]}
                gl={{ powerPreference: 'low-power', antialias: false }}
            >
                <Suspense fallback={null}>
                    <StarField />
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    )
}
