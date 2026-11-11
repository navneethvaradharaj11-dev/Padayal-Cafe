import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function LiveBackground3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Fog (Soft dissolve into Padayal warm cream canvas #FAF8F5)
    const scene = new THREE.Scene();
    const bgColor = new THREE.Color('#FAF8F5');
    scene.background = bgColor;
    scene.fog = new THREE.FogExp2('#FAF8F5', 0.035);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 2, 14);

    // 3. Renderer with antialiasing
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight('#EBF5E9', 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight('#FFF3D6', 2.2);
    sunLight.position.set(10, 15, 10);
    scene.add(sunLight);

    const terracottaLight = new THREE.PointLight('#965A38', 2.5, 25);
    terracottaLight.position.set(-6, 3, 4);
    scene.add(terracottaLight);

    const greenLight = new THREE.PointLight('#2B7A4B', 3.0, 30);
    greenLight.position.set(8, -2, 5);
    scene.add(greenLight);

    // 5. Procedural Organic Prana Wave (Undulating 3D natural mesh)
    const waveGeo = new THREE.PlaneGeometry(36, 36, 48, 48);
    const waveMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8A9A5B'),
      roughness: 0.85,
      metalness: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.rotation.x = -Math.PI / 2.3;
    waveMesh.position.set(0, -4, -4);
    scene.add(waveMesh);

    // Store base vertex positions
    const posAttribute = waveGeo.attributes.position;
    const originalPositions = new Float32Array(posAttribute.array);

    // 6. Floating 3D Botanical Leaves (Instanced Mesh for high performance)
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, -0.4);
    leafShape.bezierCurveTo(0.25, -0.2, 0.35, 0.2, 0, 0.5);
    leafShape.bezierCurveTo(-0.35, 0.2, -0.25, -0.2, 0, -0.4);

    const extrudeSettings = {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };
    const leafGeo = new THREE.ExtrudeGeometry(leafShape, extrudeSettings);
    leafGeo.center();

    const leafCount = 45;
    const leafMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2B7A4B'),
      roughness: 0.6,
      metalness: 0.05,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
    });
    const leafInstanced = new THREE.InstancedMesh(leafGeo, leafMat, leafCount);

    const leafData: {
      pos: THREE.Vector3;
      rot: THREE.Euler;
      rotSpeed: THREE.Vector3;
      floatSpeed: number;
      floatOffset: number;
    }[] = [];

    const dummy = new THREE.Object3D();
    for (let i = 0; i < leafCount; i++) {
      const x = (Math.random() - 0.5) * 28;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 18;
      const rot = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      dummy.position.set(x, y, z);
      dummy.rotation.copy(rot);
      const s = 0.5 + Math.random() * 0.7;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      leafInstanced.setMatrixAt(i, dummy.matrix);

      leafData.push({
        pos: new THREE.Vector3(x, y, z),
        rot,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
        floatSpeed: 0.3 + Math.random() * 0.5,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }
    leafInstanced.instanceMatrix.needsUpdate = true;
    scene.add(leafInstanced);

    // 7. Golden Prana Pollen Particles (Floating glowing spores)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 32;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 24;
      particleScales[i] = Math.random() * 0.8 + 0.2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    // Particle material
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color('#D4A373'),
      size: 0.16,
      transparent: true,
      opacity: 0.55,
      blending: THREE.NormalBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. Mouse & Scroll Interaction tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const scroll = { y: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scroll.targetY = window.scrollY * 0.003;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation (lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scroll.y += (scroll.targetY - scroll.y) * 0.05;

      // Parallax camera movement
      camera.position.x = mouse.x * 1.5;
      camera.position.y = 2 - mouse.y * 1.2 - scroll.y * 0.8;
      camera.lookAt(0, -0.5, 0);

      // Light orbit
      terracottaLight.position.x = Math.sin(elapsedTime * 0.4) * 8 + mouse.x * 2;
      terracottaLight.position.y = Math.cos(elapsedTime * 0.3) * 4;
      greenLight.position.x = Math.cos(elapsedTime * 0.5) * 9;
      greenLight.position.z = Math.sin(elapsedTime * 0.5) * 7;

      // Undulate wave mesh geometry
      const pos = waveGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = originalPositions[i * 3];
        const v = originalPositions[i * 3 + 1];
        const wave1 = Math.sin(u * 0.4 + elapsedTime * 1.2) * 0.45;
        const wave2 = Math.cos(v * 0.3 + elapsedTime * 0.9) * 0.35;
        const wave3 = Math.sin((u + v) * 0.2 + elapsedTime * 0.6) * 0.25;
        pos.setZ(i, wave1 + wave2 + wave3);
      }
      pos.needsUpdate = true;

      // Animate floating botanical leaves
      for (let i = 0; i < leafCount; i++) {
        const data = leafData[i];
        data.rot.x += data.rotSpeed.x;
        data.rot.y += data.rotSpeed.y;
        data.rot.z += data.rotSpeed.z;

        // Floating upward drift with gentle sway
        data.pos.y += Math.sin(elapsedTime * data.floatSpeed + data.floatOffset) * 0.008;
        data.pos.x += Math.cos(elapsedTime * 0.3 + data.floatOffset) * 0.006;

        dummy.position.copy(data.pos);
        dummy.rotation.copy(data.rot);
        dummy.updateMatrix();
        leafInstanced.setMatrixAt(i, dummy.matrix);
      }
      leafInstanced.instanceMatrix.needsUpdate = true;

      // Slowly rotate particle field
      particles.rotation.y = elapsedTime * 0.03 + mouse.x * 0.2;
      particles.rotation.x = elapsedTime * 0.015 - mouse.y * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      waveGeo.dispose();
      waveMat.dispose();
      leafGeo.dispose();
      leafMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.92 }}
      aria-hidden="true"
    />
  );
}
