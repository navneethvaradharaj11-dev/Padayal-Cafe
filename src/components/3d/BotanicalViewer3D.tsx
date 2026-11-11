import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3D, Sparkles } from 'lucide-react';

export function BotanicalViewer3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight('#FAF8F5', 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight('#FFF', 3.0);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight('#965A38', 2.5, 10);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const greenAccent = new THREE.PointLight('#2B7A4B', 3.5, 12);
    greenAccent.position.set(3, -3, 2);
    scene.add(greenAccent);

    // Group for the 3D Botanical Mandala / Core
    const group = new THREE.Group();
    scene.add(group);

    // 1. Central Prana Sphere (Glowing jade seed)
    const sphereGeo = new THREE.IcosahedronGeometry(0.85, 4);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#2B7A4B'),
      roughness: 0.2,
      metalness: 0.1,
      transmission: 0.6,
      thickness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(coreSphere);

    // 2. Inner Golden Seed Ring (Torus)
    const innerRingGeo = new THREE.TorusGeometry(1.4, 0.04, 16, 64);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4A373'),
      metalness: 0.8,
      roughness: 0.25,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    group.add(innerRing);

    // 3. Middle Botanical Orbit Ring
    const middleRingGeo = new THREE.TorusGeometry(1.9, 0.03, 16, 64);
    const middleRingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8A9A5B'),
      metalness: 0.5,
      roughness: 0.3,
    });
    const middleRing = new THREE.Mesh(middleRingGeo, middleRingMat);
    middleRing.rotation.x = Math.PI / 3;
    group.add(middleRing);

    // 4. Outer Terracotta Orbit Ring
    const outerRingGeo = new THREE.TorusGeometry(2.35, 0.035, 16, 64);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#965A38'),
      metalness: 0.6,
      roughness: 0.35,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.y = Math.PI / 4;
    group.add(outerRing);

    // 5. Surrounding Floating Leaves (8 symmetrical stylized leaves)
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.bezierCurveTo(0.2, 0.3, 0.25, 0.7, 0, 1.0);
    leafShape.bezierCurveTo(-0.25, 0.7, -0.2, 0.3, 0, 0);

    const leafGeo = new THREE.ShapeGeometry(leafShape);
    leafGeo.center();
    const leafMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2B7A4B'),
      roughness: 0.4,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });

    const leafCount = 8;
    for (let i = 0; i < leafCount; i++) {
      const angle = (i / leafCount) * Math.PI * 2;
      const leafMesh = new THREE.Mesh(leafGeo, leafMat);
      leafMesh.position.set(Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0);
      leafMesh.rotation.z = angle - Math.PI / 2;
      leafMesh.rotation.x = 0.2;
      leafMesh.scale.set(0.65, 0.65, 0.65);
      group.add(leafMesh);
    }

    // 6. Floating Sparkle Particles around the 3D model
    const pCount = 60;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 2.0 + Math.random() * 1.2;
      pPos[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = rad * Math.cos(phi);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: new THREE.Color('#F5E6C8'),
      size: 0.08,
      transparent: true,
      opacity: 0.8,
    });
    const particleField = new THREE.Points(pGeo, pMat);
    group.add(particleField);

    // Mouse Interaction (Drag to rotate in 3D)
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetRotation = { x: 0.2, y: 0.4 };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      targetRotation.y += deltaX * 0.01;
      targetRotation.x += deltaY * 0.01;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Auto rotation when not dragging
      if (!isDragging) {
        targetRotation.y += 0.006;
        targetRotation.x = Math.sin(elapsed * 0.5) * 0.15 + 0.1;
      }

      // Smooth damping (lerp)
      group.rotation.x += (targetRotation.x - group.rotation.x) * 0.08;
      group.rotation.y += (targetRotation.y - group.rotation.y) * 0.08;

      // Independent ring rotations
      innerRing.rotation.z = elapsed * 0.4;
      middleRing.rotation.z = -elapsed * 0.3;
      outerRing.rotation.x = elapsed * 0.25;

      // Pulse core sphere gently
      const pulse = 1 + Math.sin(elapsed * 2) * 0.04;
      coreSphere.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      sphereGeo.dispose();
      sphereMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      middleRingGeo.dispose();
      middleRingMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
      leafGeo.dispose();
      leafMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();

      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-black/[0.06] text-[10px] font-semibold text-padayal-text">
          <Rotate3D className="w-3.5 h-3.5 text-padayal-cta animate-spin" style={{ animationDuration: '8s' }} />
          <span>{isInteracting ? 'Rotating 3D Mandala' : 'Drag to explore 3D Prana'}</span>
        </div>
      </div>
    </div>
  );
}

