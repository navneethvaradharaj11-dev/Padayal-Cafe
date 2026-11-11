import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EyeOff, Sparkles } from 'lucide-react';

interface LiveWallpaperProps {
  onZenModeChange?: (isZen: boolean) => void;
}

export function LiveWallpaperBackground({ onZenModeChange }: LiveWallpaperProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [zenMode, setZenMode] = useState(false);

  const toggleZen = () => {
    const nextZen = !zenMode;
    setZenMode(nextZen);
    onZenModeChange?.(nextZen);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Natural Ambient & Sunlight
    const ambientLight = new THREE.AmbientLight('#FAF8F5', 2.0);
    scene.add(ambientLight);

    const sunBeam = new THREE.DirectionalLight('#FFF5DE', 3.0);
    sunBeam.position.set(8, 12, 8);
    scene.add(sunBeam);

    const greenFill = new THREE.PointLight('#2B7A4B', 2.5, 20);
    greenFill.position.set(-6, -2, 4);
    scene.add(greenFill);

    const terracottaFill = new THREE.PointLight('#965A38', 2.0, 18);
    terracottaFill.position.set(6, 4, 3);
    scene.add(terracottaFill);

    // 3. Leaf Shapes for Authentic South Indian Botanical Foliage
    // Banana Leaf Shape (Large broad paddle with central vein curve)
    const bananaLeafShape = new THREE.Shape();
    bananaLeafShape.moveTo(0, -1.2);
    bananaLeafShape.bezierCurveTo(0.45, -0.6, 0.55, 0.4, 0, 1.3);
    bananaLeafShape.bezierCurveTo(-0.55, 0.4, -0.45, -0.6, 0, -1.2);

    const bananaLeafGeo = new THREE.ExtrudeGeometry(bananaLeafShape, {
      depth: 0.02,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    });
    bananaLeafGeo.center();

    // Slender Tulsi / Herb Leaf Shape
    const tulsiLeafShape = new THREE.Shape();
    tulsiLeafShape.moveTo(0, -0.6);
    tulsiLeafShape.bezierCurveTo(0.28, -0.2, 0.32, 0.3, 0, 0.7);
    tulsiLeafShape.bezierCurveTo(-0.32, 0.3, -0.28, -0.2, 0, -0.6);

    const tulsiLeafGeo = new THREE.ExtrudeGeometry(tulsiLeafShape, {
      depth: 0.015,
      bevelEnabled: true,
      bevelSegments: 1,
      bevelSize: 0.01,
      bevelThickness: 0.01,
    });
    tulsiLeafGeo.center();

    // 4. Instanced Leaves for high performance (35 banana fronds + 45 herbal leaves)
    const bananaLeafCount = 28;
    const bananaLeafMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2B7A4B'),
      roughness: 0.55,
      metalness: 0.08,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    const bananaInstanced = new THREE.InstancedMesh(bananaLeafGeo, bananaLeafMat, bananaLeafCount);

    const tulsiLeafCount = 42;
    const tulsiLeafMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8A9A5B'),
      roughness: 0.6,
      metalness: 0.05,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const tulsiInstanced = new THREE.InstancedMesh(tulsiLeafGeo, tulsiLeafMat, tulsiLeafCount);

    interface LeafData {
      pos: THREE.Vector3;
      rot: THREE.Euler;
      rotVel: THREE.Vector3;
      speed: number;
      swayFreq: number;
      swayAmp: number;
      scale: number;
    }

    const bananaData: LeafData[] = [];
    const tulsiData: LeafData[] = [];
    const dummy = new THREE.Object3D();

    // Populate Banana Leaves (spread across vertical and depth field)
    for (let i = 0; i < bananaLeafCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 26,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12
      );
      const rot = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = 0.6 + Math.random() * 0.8;
      dummy.position.copy(pos);
      dummy.rotation.copy(rot);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      bananaInstanced.setMatrixAt(i, dummy.matrix);

      bananaData.push({
        pos,
        rot,
        rotVel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.018,
          (Math.random() - 0.5) * 0.01
        ),
        speed: 0.008 + Math.random() * 0.014,
        swayFreq: 0.4 + Math.random() * 0.6,
        swayAmp: 0.01 + Math.random() * 0.015,
        scale,
      });
    }
    bananaInstanced.instanceMatrix.needsUpdate = true;
    scene.add(bananaInstanced);

    // Populate Tulsi / Herbal Leaves
    for (let i = 0; i < tulsiLeafCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 14
      );
      const rot = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = 0.5 + Math.random() * 0.6;
      dummy.position.copy(pos);
      dummy.rotation.copy(rot);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      tulsiInstanced.setMatrixAt(i, dummy.matrix);

      tulsiData.push({
        pos,
        rot,
        rotVel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.016,
          (Math.random() - 0.5) * 0.022,
          (Math.random() - 0.5) * 0.014
        ),
        speed: 0.01 + Math.random() * 0.018,
        swayFreq: 0.6 + Math.random() * 0.8,
        swayAmp: 0.012 + Math.random() * 0.02,
        scale,
      });
    }
    tulsiInstanced.instanceMatrix.needsUpdate = true;
    scene.add(tulsiInstanced);

    // 5. Golden Prana Pollen Spores (Shimmering living particles)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 30;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color('#E3A857'),
      size: 0.18,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Mouse Interaction & Wind Velocity
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const scroll = { y: 0, targetY: 0 };
    let windGust = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const prevX = mouse.targetX;
      const prevY = mouse.targetY;
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;

      // Mouse drag creates immediate natural breeze
      windGust.x = (mouse.targetX - prevX) * 0.25;
      windGust.y = (mouse.targetY - prevY) * 0.25;
    };

    const handleScroll = () => {
      scroll.targetY = window.scrollY * 0.0025;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth interpolation for mouse and scroll
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      scroll.y += (scroll.targetY - scroll.y) * 0.06;

      // Wind gust decay
      windGust.x *= 0.95;
      windGust.y *= 0.95;

      // Parallax camera panning
      camera.position.x = mouse.x * 1.8;
      camera.position.y = mouse.y * 1.2 - scroll.y * 1.5;
      camera.lookAt(0, -scroll.y * 0.8, 0);

      // Light oscillation
      sunBeam.position.x = Math.sin(elapsed * 0.3) * 6 + 8;
      greenFill.position.x = Math.sin(elapsed * 0.4) * 5 - 4;

      // Animate Banana Leaves (fluttering & drifting downwards)
      for (let i = 0; i < bananaLeafCount; i++) {
        const d = bananaData[i];

        d.rot.x += d.rotVel.x + windGust.y * 0.08;
        d.rot.y += d.rotVel.y + windGust.x * 0.08;
        d.rot.z += d.rotVel.z;

        // Downward drift + gentle wave sway
        d.pos.y -= d.speed;
        d.pos.x += Math.sin(elapsed * d.swayFreq + i) * d.swayAmp + windGust.x * 0.1;

        // Reset to top when drifting off screen
        if (d.pos.y < -12) {
          d.pos.y = 12;
          d.pos.x = (Math.random() - 0.5) * 26;
        }

        dummy.position.copy(d.pos);
        dummy.rotation.copy(d.rot);
        dummy.scale.set(d.scale, d.scale, d.scale);
        dummy.updateMatrix();
        bananaInstanced.setMatrixAt(i, dummy.matrix);
      }
      bananaInstanced.instanceMatrix.needsUpdate = true;

      // Animate Tulsi Leaves
      for (let i = 0; i < tulsiLeafCount; i++) {
        const d = tulsiData[i];

        d.rot.x += d.rotVel.x;
        d.rot.y += d.rotVel.y;
        d.rot.z += d.rotVel.z;

        d.pos.y -= d.speed;
        d.pos.x += Math.cos(elapsed * d.swayFreq + i) * d.swayAmp + windGust.x * 0.12;

        if (d.pos.y < -12) {
          d.pos.y = 12;
          d.pos.x = (Math.random() - 0.5) * 28;
        }

        dummy.position.copy(d.pos);
        dummy.rotation.copy(d.rot);
        dummy.scale.set(d.scale, d.scale, d.scale);
        dummy.updateMatrix();
        tulsiInstanced.setMatrixAt(i, dummy.matrix);
      }
      tulsiInstanced.instanceMatrix.needsUpdate = true;

      // Slowly rotate particle field
      particles.rotation.y = elapsed * 0.04 + mouse.x * 0.3;
      particles.rotation.x = elapsed * 0.02 - mouse.y * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      bananaLeafGeo.dispose();
      bananaLeafMat.dispose();
      tulsiLeafGeo.dispose();
      tulsiLeafMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {/* 1. Underlying Rich Botanical Landscape Artwork */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #F9F6F0 0%, #FAF8F5 50%, #F5F1E8 100%)',
        }}
      >
        {/* Layered Botanical Garden Artwork */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url('/images/botanical-live-wallpaper.jpg'), url('/images/hero-banner.jpg')`,
            opacity: zenMode ? 0.95 : 0.42,
            filter: 'saturate(1.15) contrast(1.02)',
          }}
        />

        {/* Dynamic Sunlight God-Rays (Soft volumetric sunbeams streaming down) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 20% 0%, rgba(255, 245, 210, 0.6) 0%, rgba(255, 245, 210, 0) 70%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(138, 154, 91, 0.2) 0%, rgba(138, 154, 91, 0) 65%)',
          }}
        />

        {/* Soft edge vignette to preserve text contrast */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: zenMode
              ? 'transparent'
              : 'linear-gradient(180deg, rgba(250, 248, 245, 0.4) 0%, rgba(250, 248, 245, 0.25) 50%, rgba(250, 248, 245, 0.6) 100%)',
          }}
        />
      </div>

      {/* 2. Interactive 3D WebGL Canvas (Drifting Leaves & Prana Particles) */}
      <div
        ref={mountRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ opacity: zenMode ? 1.0 : 0.88 }}
        aria-hidden="true"
      />

      {/* 3. Floating 'Zen View' Live Wallpaper Control Pill */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50">
        <button
          type="button"
          onClick={toggleZen}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-black/[0.08] text-xs font-semibold text-padayal-text hover:bg-white hover:scale-105 active:scale-95 transition-all select-none"
          title={zenMode ? 'Exit Zen Mode' : 'Admire Full Live Wallpaper'}
        >
          {zenMode ? (
            <>
              <EyeOff className="w-4 h-4 text-padayal-cta" />
              <span>Exit Zen Mode</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-padayal-primary animate-pulse" />
              <span>🌿 Live Wallpaper View</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
