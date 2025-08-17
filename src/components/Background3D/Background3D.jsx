import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

const vertexShader = `
  varying vec2 vUv;
  varying float vDistortion;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uNoiseStrength;
  
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
  }
  
  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
           
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }
  
  void main() {
    vUv = uv;
    
    vec3 pos = position;
    float noiseFreq = 3.5;
    float noiseAmp = 0.15; 
    vec3 noisePos = vec3(pos.x * noiseFreq + uTime * uSpeed, pos.y, pos.z);
    vDistortion = snoise(noisePos) * noiseAmp;
    pos.z += vDistortion * uNoiseStrength;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying float vDistortion;
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  void main() {
    float distort = vDistortion * 2.0;
    
    vec3 color1 = uColor1;
    vec3 color2 = uColor2;
    vec3 color3 = uColor3;
    
    vec3 finalColor = mix(color1, color2, vUv.x);
    finalColor = mix(finalColor, color3, vUv.y + distort);
    
    float strength = distance(vUv, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 2.0);
    
    finalColor += strength * 0.1;
    
    gl_FragColor = vec4(finalColor, 0.3);
  }
`;

const AnimatedMesh = () => {
  const meshRef = useRef();
  const { viewport } = useThree();
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: 0.1 },
      uNoiseStrength: { value: 0.8 },
      uColor1: { value: new THREE.Color('#4263eb') },
      uColor2: { value: new THREE.Color('#5c7cfa') },
      uColor3: { value: new THREE.Color('#748ffc') },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.elapsedTime;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width / 3, viewport.height / 3, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const FloatingOrbs = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-2, 1, -1]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <MeshDistortMaterial
            color="#4263eb"
            emissive="#4263eb"
            emissiveIntensity={0.2}
            roughness={0.3}
            metalness={0.6}
            distort={0.2}
            speed={1}
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[2, -1, -1]}>
          <octahedronGeometry args={[0.4]} />
          <MeshDistortMaterial
            color="#5c7cfa"
            emissive="#5c7cfa"
            emissiveIntensity={0.2}
            roughness={0.3}
            metalness={0.6}
            distort={0.15}
            speed={1.5}
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh position={[0, 1.5, -2]}>
          <icosahedronGeometry args={[0.35]} />
          <MeshDistortMaterial
            color="#748ffc"
            emissive="#748ffc"
            emissiveIntensity={0.2}
            roughness={0.3}
            metalness={0.6}
            distort={0.2}
            speed={1.2}
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
};

const Background3D = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <AnimatedMesh />
      <FloatingOrbs />
    </>
  );
};

export default Background3D;