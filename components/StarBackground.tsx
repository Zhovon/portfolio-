'use client'

import React, { useState, useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload } from '@react-three/drei'
import * as random from 'maath/random'
import { useScroll, useVelocity, useTransform } from 'framer-motion'

function StarField(props: any) {
    const ref = useRef<any>(null)
    const sphere = useMemo(() => random.inSphere(new Float32Array(6000), { radius: 1.2 }), [])

    // Track scroll velocity for that "Warp" feel
    const { scrollYProgress } = useScroll({})
    const scrollVelocity = useVelocity(scrollYProgress)

    useFrame((state, delta) => {
        if (ref.current) {
            // Speed up rotation based on scroll velocity
            const velocity = Math.abs(scrollVelocity.get())
            const speedMultiplier = 1 + velocity * 5

            ref.current.rotation.x -= (delta / 10) * speedMultiplier
            ref.current.rotation.y -= (delta / 15) * speedMultiplier
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
    return (
        <div className="w-full h-auto fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Suspense fallback={null}>
                    <StarField />
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    )
}
