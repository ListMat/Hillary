'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function CinematicParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return;

    const container = mountRef.current;
    let animationFrameId: number;
    let isVisible = true;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 2. Geometry & Particles (35mm Silver Halide / Frequency Topology)
    const particleCount = 2400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const opacities = new Float32Array(particleCount);

    const radius = 65;
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      const r = Math.cbrt(Math.random()) * radius;

      const x = r * Math.sqrt(1 - u * u) * Math.cos(theta);
      const y = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 60;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      scales[i] = Math.random() * 1.8 + 0.6;
      opacities[i] = Math.random() * 0.7 + 0.15;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));

    // 3. Custom Shader Material for High Contrast Analog Grain Look
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uAudioGain: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: {
          value: new THREE.Vector2(container.clientWidth, container.clientHeight),
        },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uAudioGain;
        uniform vec2 uMouse;
        attribute float aScale;
        attribute float aOpacity;
        varying float vOpacity;

        void main() {
          vOpacity = aOpacity;
          vec3 pos = position;

          // Waveform undulation
          float wave = sin(pos.x * 0.05 + uTime * 1.2) * cos(pos.z * 0.04 + uTime * 0.8) * 3.5;
          float audioPulse = uAudioGain * 6.0 * sin(uTime * 4.0 + pos.y * 0.1);
          pos.y += wave + audioPulse;

          // Subtle cursor displacement
          vec2 mouseOffset = (pos.xy - uMouse * 40.0) * 0.02;
          pos.x += sin(mouseOffset.y + uTime) * 1.5;
          pos.y += cos(mouseOffset.x + uTime) * 1.5;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aScale * (120.0 / -mvPosition.z) * (1.0 + uAudioGain * 0.5);
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, dist) * vOpacity;
          gl_FragColor = vec4(0.08, 0.08, 0.08, alpha * 0.45);
        }
      `,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 4. Subtle Wireframe Geometry Ring (Architectural Frame)
    const ringGeo = new THREE.TorusGeometry(38, 0.08, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.08,
      wireframe: true,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // 5. Mouse Interaction with smooth interpolation
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      material.uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 7. Visibility IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 8. Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      material.uniforms.uTime.value = elapsedTime;
      material.uniforms.uMouse.value.set(mouse.x, mouse.y);
      material.uniforms.uAudioGain.value = 0.25;

      // Slow scene rotation
      particles.rotation.y = elapsedTime * 0.03 + mouse.x * 0.15;
      particles.rotation.x = elapsedTime * 0.015 - mouse.y * 0.1;

      ring.rotation.z = elapsedTime * 0.05;
      ring.rotation.x = Math.PI / 3 + mouse.y * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-75"
      aria-hidden="true"
    />
  );
}
