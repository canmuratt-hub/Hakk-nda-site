import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = isMobile ? 24 : 28;

    // Renderer (Mobilde piksel oranını optimize et)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile, // Mobilde antialias yükünü kaldır
      powerPreference: 'high-performance',
      precision: isMobile ? 'mediump' : 'highp',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isMobile ? 1.2 : Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- 1. Starfield / 3D Space Galaxy Swirl ---
    // Mobilde parçacık sayısını optimize et: 500 (mobilde 60fps akıcılık), masaüstünde 1800
    const particlesCount = isMobile ? 500 : 1800;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    const cyanColor = new THREE.Color('#00f2fe');
    const purpleColor = new THREE.Color('#9d4edd');
    const whiteColor = new THREE.Color('#ffffff');

    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 8 + Math.random() * (isMobile ? 35 : 45);
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * (isMobile ? 35 : 45);

      posArray[i] = Math.cos(theta) * radius;
      posArray[i + 1] = y;
      posArray[i + 2] = Math.sin(theta) * radius;

      const rand = Math.random();
      const mixedColor = rand < 0.45 ? cyanColor : rand < 0.75 ? purpleColor : whiteColor;
      colorsArray[i] = mixedColor.r;
      colorsArray[i + 1] = mixedColor.g;
      colorsArray[i + 2] = mixedColor.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    // Particle Texture
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.4)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particlesMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.35 : 0.28,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // --- 2. Floating 3D Geometric Hologram Rings (Deep Background) ---
    const torusKnotGeo = isMobile
      ? new THREE.TorusKnotGeometry(5, 1.2, 48, 16)
      : new THREE.TorusKnotGeometry(6, 1.4, 96, 24);

    const torusKnotMat = isMobile
      ? new THREE.MeshBasicMaterial({
          color: 0x00f2fe,
          wireframe: true,
          transparent: true,
          opacity: 0.08,
        })
      : new THREE.MeshStandardMaterial({
          color: 0x00f2fe,
          wireframe: true,
          transparent: true,
          opacity: 0.08,
          emissive: 0x003344,
          emissiveIntensity: 0.15,
        });

    const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    torusKnot.position.set(0, 0, -20);
    scene.add(torusKnot);

    const sphereGeo = new THREE.IcosahedronGeometry(isMobile ? 10 : 14, isMobile ? 1 : 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x9d4edd,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(0, 0, -20);
    scene.add(sphereMesh);

    // Lighting (Sadece masaüstünde karmaşık ışıkları kullan)
    if (!isMobile) {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x00f2fe, 2, 50);
      pointLight1.position.set(12, 15, 10);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0x9d4edd, 2, 50);
      pointLight2.position.set(-12, -15, 10);
      scene.add(pointLight2);
    }

    // Mouse Interaction (Sadece fare olan masaüstü cihazlarda dinle)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let onMouseMove;
    if (!isMobile) {
      onMouseMove = (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 1.5;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 1.5;
      };
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(isMobile ? 1.2 : Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', onResize, { passive: true });

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!isMobile) {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        particlesMesh.rotation.x = targetY * 0.12;
        particlesMesh.rotation.z = targetX * 0.12;
        camera.position.x = targetX * 1.2;
        camera.position.y = -targetY * 1.2;
        camera.lookAt(scene.position);
      }

      particlesMesh.rotation.y = elapsedTime * 0.025;
      torusKnot.rotation.x = elapsedTime * 0.1;
      torusKnot.rotation.y = elapsedTime * 0.12;
      sphereMesh.rotation.x = -elapsedTime * 0.05;
      sphereMesh.rotation.y = -elapsedTime * 0.07;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (onMouseMove) window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      torusKnotGeo.dispose();
      torusKnotMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-65"
      style={{ touchAction: 'none' }}
      aria-hidden="true"
    />
  );
}
